module.exports = function (RED) {
    var spawn = require('child_process').spawn;
    var util = require('util');

    function indentLines(fnCode, depth) {
        return fnCode.split('\n').map((line) => Array(depth).join(' ') + line).join('\n')
    }

    function spawnFn(self, config) {
	
        const { exec } = require('child_process');
	var command;
	if (config.tputype === '1') {
		command = '((lsusb | grep 1a6e) || (lsusb | grep 18d1)) | wc -l';
	}else {
		command = 'ls -l /dev/apex_* | wc -l';
	}
        const ls = exec(command, function (error, stdout, stderr) {
        if (error) {
            console.log(error.stack);
            console.log('Error code: '+error.code);
            console.log('Signal received: '+error.signal);
        }
	tpu_total = parseInt(stdout, 10);
	if(config.tpunum < 0 || config.tpunum >= tpu_total)
	{
	    
            self.error(`TPU number is incorrect. Fix it and deploy again`)
            self.status({
                   fill: 'red',
                   shape: 'dot',
                   text: 'Stopped, see debug panel'
            });
	}
	self.tpunum = stdout;
        });
        self.child = spawn('python3', ['-uc', self.func.code], {
            stdio: ['pipe', 'pipe', 'pipe', 'ipc']
        });
        self.child.stdout.on('data', function (data) {
            self.log(data.toString());
        });
        self.child.stderr.on('data', function (data) {
            self.error(data.toString());
        });
        self.child.on('close', function (exitCode) {                          
            if (exitCode) {
                self.error(`Python Function process exited with code ${exitCode}`);
                if (self.func.attempts) {
                    spawnFn(self, config);
                    self.func.attempts--;
                } else {
                    self.error(`Function '${self.name}' has failed more than 10 times. Fix it and deploy again`)
                    self.status({
                        fill: 'red',
                        shape: 'dot',
                        text: 'Stopped, see debug panel'
                    });
                }
            }
        });
        self.child.on('message', function (response) {
            switch (response.ctx) {
                case 'send':
                    sendResults(self, response.msgid, response.value);
                    break;
                case 'log':
                case 'warn':
                case 'error':
                case 'status':
                    self[response.ctx].apply(self, response.value);
                    break;
                default:
                    throw new Error(`Don't know what to do with ${response.ctx}`);
            }
        });
        self.log(`Python function '${self.name}' running on PID ${self.child.pid}`);
        self.status({
            fill: 'green',
            shape: 'dot',
            text: 'Running'
        });
    }

    function sendResults(self, _msgid, msgs) {
        if (msgs == null) {
            return;
        } 
	else if (!util.isArray(msgs)) {
            msgs = [msgs];
        }
        var msgCount = 0;
        for (var m = 0; m < msgs.length; m++) {
            if (msgs[m]) {
                if (util.isArray(msgs[m])) {
                    for (var n = 0; n < msgs[m].length; n++) {
                        msgs[m][n]._msgid = _msgid;
                        msgCount++;
                    }
                } else {
                    msgs[m]._msgid = _msgid;
                    msgCount++;
                }
            }
        }
        if (msgCount > 0) {
            self.send(msgs);
        }
    }

    function PythonFunction(config) {
        var self = this;
        RED.nodes.createNode(self, config);
	outimage = config.outimage;
        self.func = {
            code: `
import os
import json
import sys
import cv2
import numpy as np
import PIL
import re
import base64
from io import BytesIO
import io
import time
import threading
from edgetpu.basic import edgetpu_utils
from edgetpu.classification.engine import ClassificationEngine
from edgetpu.utils import dataset_utils
from PIL import Image

# For Config Init
CFG_TYPE = int("""` + config.intype +`""")
CFG_TPUTYPE = int(""" ` + config.tputype +`""")
CFG_TPUNUM = """ ` + config.tpunum +`"""
CFG_MODEL = """ ` + config.modelpath +`"""
CFG_LABEL = """ ` + config.labelpath +`"""
CFG_THRESHOLD = float(""" ` + config.threshold +`""")
CFG_TOPK = int(""" ` + config.topk +`""")
CFG_RESAMPLE = int(""" ` + config.resample +`""")
CFG_IMAGE =   """` + outimage +`"""
CFG_IMAGE = {'false': False, 'true': True}[CFG_IMAGE]

# For OpenCV Init
TYPE_URL = 0
TYPE_CAM = 1
TYPE_VIDEO = 2
TYPE_IMG = 3

# For OpenCV Ctrl
CV_STOP = -1
CV_PAUSE = 0
CV_PLAY = 1
CV_CTRL = CV_STOP

# TPU STRING (global)
TPU = ''


class Msg(object):
    SEND = 'send'
    LOG = 'log'
    WARN = 'warn'
    ERROR = 'error'
    STATUS = 'status'

    def __init__(self, ctx, value, msgid):
        self.ctx = ctx
        self.value = value
        self.msgid = msgid

    def dumps(self):
        return json.dumps(vars(self))  + "\\n"

    @classmethod
    def loads(cls, json_string):
        return cls(**json.loads(json_string))


class Node(object):
    def __init__(self, msgid, channel):
        self.__msgid = msgid
        self.__channel = channel

    def send(self, msg):
        msg = Msg(Msg.SEND, msg, self.__msgid)
        self.send_to_node(msg)

    def log(self, *args):
        msg = Msg(Msg.LOG, args, self.__msgid)
        self.send_to_node(msg)

    def warn(self, *args):
        msg = Msg(Msg.WARN, args, self.__msgid)
        self.send_to_node(msg)

    def error(self, *args):
        msg = Msg(Msg.ERROR, args, self.__msgid)
        self.send_to_node(msg)

    def status(self, *args):
        msg = Msg(Msg.STATUS, args, self.__msgid)
        self.send_to_node(msg)

    def send_to_node(self, msg):
        m = msg.dumps()
        if sys.version_info[0]>2:
             m = m.encode("utf-8")
        self.__channel.write(m)


def inference(engine, labels, frame):
    starttime = int(round(time.time() * 1000))

    im = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    input_buf = Image.fromarray(im)

    # inference
    t1 = time.perf_counter()
    res = engine.classify_with_image(input_buf,
                                     threshold=CFG_THRESHOLD,
                                     top_k=CFG_TOPK,
                                     resample=CFG_RESAMPLE)
    t2 = time.perf_counter()

    if CFG_IMAGE:
        output_buffer = BytesIO()
        input_buf.save(output_buffer, format='JPEG')
        byte_data = output_buffer.getvalue()
        base64_data = base64.b64encode(byte_data)
        base64_data_str=base64_data.decode("UTF-8")

    elapsedTime = t2-t1
	
    json_strings2="""{
      "classes": [
    """
    for idx, cls in enumerate(res):
         clsname = labels[cls[0]]
         score = str(cls[1])
         json_strings2= json_strings2 + """
             {
               "className" : """+ "\\""+ clsname +"\\"" """,
               "score": """+ score+ """
         """
         if idx != len(res)-1:
           json_strings2= json_strings2 + """
             },
           """
         else:
           json_strings2= json_strings2 + """
             }
           """
    json_strings2= json_strings2 + """
      ]
    }
    """
    global TPU
    to_python2 = json.loads(json_strings2)

    if CFG_IMAGE:
        return {'payload': to_python2, 'inf_fps' : round(1/elapsedTime, 2), 'starttime': starttime , 'image':  base64_data_str, 'tpu': TPU}
    else:
        return {'payload': to_python2, 'inf_fps' : round(1/elapsedTime, 2), 'starttime': starttime, 'tpu': TPU}


def init_config():
    global TPU
    if CFG_TPUTYPE == 1:
        tpu_usb = []
        tpu_list = edgetpu_utils.ListEdgeTpuPaths(edgetpu_utils.EDGE_TPU_STATE_UNASSIGNED)
        for tpu_path in tpu_list:
            if "usb" in tpu_path:
                tpu_usb.append(tpu_path)
        TPU = tpu_usb[int(CFG_TPUNUM)]
        engine = ClassificationEngine(CFG_MODEL[1:], TPU)
    else:
        TPU = "/dev/apex_" + CFG_TPUNUM[1:]
        engine = ClassificationEngine(CFG_MODEL[1:], TPU)
    labels = dataset_utils.read_label_file(CFG_LABEL[1:])

    return engine, labels

def init_opencv(type, src):
    if type == TYPE_CAM:
        cap = cv2.VideoCapture(int(src))
        cap.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
        cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)
        cap.set(cv2.CAP_PROP_FPS, 30)
    elif type == TYPE_URL or type == TYPE_VIDEO or type == TYPE_IMG:
        cap = cv2.VideoCapture(src)
    else:
        raise RuntimeError('Received Unrecognized Input Type!')
    return cap

def proc(msg, channel):
    # OpenCV + EdgeTPU Inference + Send
    engine, labels = init_config()
    cap = init_opencv(CFG_TYPE, msg['payload'])
    if (cap.isOpened()):
        while True:
            global CV_CTRL
            ret, img = cap.read()
            if ret == True:
                # EdgeTPU Inference + Send
                msgid = msg["_msgid"]
                node = Node(msgid, channel)
                res_msgs = inference(engine, labels, img)
                node.send(res_msgs)
            else:
                print("End of Image/Video")
                CV_CTRL = CV_STOP
                break

            if CV_CTRL == CV_STOP:
                print("Stop CV")
                break
            elif CV_CTRL == CV_PAUSE:
                while CV_CTRL == CV_PAUSE:
                    if CV_CTRL == CV_PLAY:
                        print("Continue CV")
                        break

def main():
    if sys.version_info[0] < 3:
        channel = os.fdopen(3, "r+")
    else:
        channel = os.fdopen(3, "r+b", buffering=0)

    while True:
        # Read
        raw_msg = channel.readline()
        if not raw_msg:
            raise RuntimeError('Received EOF!')
        msg = json.loads(raw_msg)
        ps = msg['payload'].lower()

        # CV CTRL Options
        global CV_CTRL
        if ps == 'stop':
            CV_CTRL = CV_STOP
        elif ps == 'pause':
            CV_CTRL = {CV_PAUSE: CV_PLAY, CV_PLAY: CV_PAUSE}[CV_CTRL]
        else:
            if CV_CTRL == CV_STOP:
                CV_CTRL = CV_PLAY
                t = threading.Thread(target = proc, args=(msg, channel,))
                t.start()

'''
        # OpenCV + EdgeTPU Inference + Send
        cap = init_opencv(CFG_TYPE, msg['payload'])
        if (cap.isOpened()):
            while True:
                ret, img = cap.read()
                if ret == True:
                    # EdgeTPU Inference + Send
                    msgid = msg["_msgid"]
                    node = Node(msgid, channel)
                    res_msgs = inference(engine, labels, img)
                    node.send(res_msgs)
                else:
                    print("End of Image/Video")
                    break
'''

if __name__ == '__main__':
    main()

`,
            attempts: 10
        };
        spawnFn(self, config);
        self.name = config.name;
        self.on('input', function (msg) {
            var cache = [];
            jsonMsg = JSON.stringify(msg, function (key, value) {
                if (typeof value === 'object' && value !== null) {
                    if (cache.indexOf(value) !== -1) {
                        // Circular reference found, discard key
                        return;
                    }
                    // Store value in our collection
                    cache.push(value);
                }
                return value;
            });
            cache = null; // Enable garbage collection
            self.child.send(JSON.parse(jsonMsg));
        });
        self.on('close', function () {
            self.child.kill();
        });
    }
    RED.nodes.registerType('SZ Image Classification', PythonFunction);
};