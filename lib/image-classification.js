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
	    
            self.error(`TPU number is incorrect. Fix it and deploy again`);
            self.status({
                   fill: 'red',
                   shape: 'dot',
                   text: 'Stopped, see debug panel'
            });
	}
	if(config.speed && config.parselabel == "")
        {
            self.error('Please Input the Label');
            self.status(
                    {
                            fill: 'red',
                            shape: 'dot',
                            text: 'Stopped, see debug panel!'
                    }
            );
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
	loop = config.loop;
	speedup = config.speed
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
import queue
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
CFG_LOOP =   """` + loop +`"""
CFG_LOOP = {'false': False, 'true': True}[CFG_LOOP]
CFG_SPEEDUP =   """` + speedup +`"""
CFG_SPEEDUP = {'false': False, 'true': True}[CFG_SPEEDUP]
CFG_PARSE =   """` + config.parselabel +`"""
CFG_PARSE = CFG_PARSE.lower()

# For OpenCV Init
TYPE_URL = 0
TYPE_CAM = 1
TYPE_VIDEO = 2
TYPE_IMG = 3

# For OpenCV Ctrl
CV_END = -1
CV_PAUSE = 0
CV_PLAY = 1
CV_STOP = 2
CV_CTRL = CV_END

# TPU STRING (global)
TPU = ''

class VideoCapture:

  def __init__(self, name):
    self.cap = cv2.VideoCapture(name)
    if self.cap.isOpened():
        fps = self.cap.get(cv2.CAP_PROP_FPS)
        print("Video FPS:%f" %fps)
        self.delay = 1 / fps
        print("Read delay per %f ms" %self.delay)
    self.q = queue.Queue()
    self._ret = 1
    self.CTRL = CV_PLAY
    t = threading.Thread(target=self._reader)
    t.daemon = True
    t.start()

  def get_cap(self):
    return self.cap
  
  def set_CTRL(self, CTRL):
    self.CTRL = CTRL

  def _reader(self):
    while True:
      while self.CTRL == CV_PAUSE:
        if self.CTRL == CV_PLAY:
          break
      ret, frame = self.cap.read()

      if not ret:
        self._ret = 0
        self.q.put("")
        break
      if not self.q.empty():
        try:
          self.q.get_nowait()   # discard previous (unprocessed) frame
        except queue.Empty:
          pass
      self.q.put(frame)
      time.sleep(self.delay)

  def read(self):
    frame = self.q.get()
    return {0: False, 1: True}[self._ret], frame

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

    cnt_labelmatch = 0
    json_strings2="""{
      "classes": [
    """
    for idx, cls in enumerate(res):
         clsname = labels[cls[0]]
         if CFG_SPEEDUP and CFG_PARSE not in clsname.lower():
             continue
         cnt_labelmatch += 1
         score = str(cls[1])
         json_strings2= json_strings2 + """
             {
               "className" : """+ "\\""+ clsname +"\\"" """,
               "score": """+ score+ """
         """
         json_strings2= json_strings2 + """
           },
         """
    json_strings2 = json_strings2.rstrip()
    json_strings2 = json_strings2.rstrip(',')
    json_strings2= json_strings2 + """
      ]
    }
    """
    if CFG_SPEEDUP and cnt_labelmatch == 0:
        return ""
    global TPU
    to_python2 = json.loads(json_strings2)

    if CFG_IMAGE:
        return {'payload': to_python2, 'inf_fps' : round(1/elapsedTime, 2), 'model' : MODEL_FILE_NAME, 'starttime': starttime , 'image':  base64_data_str, 'tpu': TPU}
    else:
        return {'payload': to_python2, 'inf_fps' : round(1/elapsedTime, 2), 'model' : MODEL_FILE_NAME, 'starttime': starttime, 'tpu': TPU}


def init_config():
    global TPU
    global MODEL_FILE_NAME
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
    MODEL_FILE_NAME = os.path.basename(CFG_MODEL[1:])
    labels = dataset_utils.read_label_file(CFG_LABEL[1:])

    return engine, labels

def init_opencv(type, src):
    if type == TYPE_CAM:
        cap = VideoCapture(int(src))
    elif type == TYPE_URL or type == TYPE_VIDEO or type == TYPE_IMG:
        cap = VideoCapture(src)
    else:
        raise RuntimeError('Received Unrecognized Input Type!')
    cap_open = cap.get_cap()
    return cap, cap_open

def proc(msg, channel):
    # OpenCV + EdgeTPU Inference + Send
    engine, labels = init_config()

    while True:
        cap, cap_open = init_opencv(CFG_TYPE, msg['payload'])
        if (cap_open.isOpened()):
            global CV_CTRL
            CV_CTRL = CV_PLAY
            while True:
                ret, img = cap.read()
                if ret == True:
                    # EdgeTPU Inference + Send
                    msgid = msg["_msgid"]
                    node = Node(msgid, channel)
                    res_msgs = inference(engine, labels, img)
                    if res_msgs != "": 
                        node.send(res_msgs)
                else:
                    print("End of Image/Video")
                    CV_CTRL = CV_END
                    break

                if CV_CTRL == CV_STOP:
                    print("Stop CV")
                    break
                elif CV_CTRL == CV_PAUSE:
                    while CV_CTRL == CV_PAUSE:
                        cap.set_CTRL(CV_PLAY)
                        if CV_CTRL == CV_PLAY:
                            print("Continue CV")
                            cap.setCTRL(CV_CTRL)
                            break
        if not CFG_LOOP or CV_CTRL == CV_STOP:
            print("NO LOOP")
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
            if CV_CTRL != CV_PLAY:
                t = threading.Thread(target = proc, args=(msg, channel,))
                t.start()

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
