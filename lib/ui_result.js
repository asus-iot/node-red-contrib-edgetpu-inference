module.exports = function(RED) {

    // check required configuration
    function checkConfig(node, conf) {
        if (!conf || !conf.hasOwnProperty("group")) {
            node.error(RED._("ui_result.error.no-group"));
            return false;
        }
        return true;
    }

    function HTML(config) {
        var resolution = config.resolution;

        if (resolution=="0"){
            var r_w = 640;
            var r_h = 480;
        }
        else {
            var r_w = 1280;
            var r_h = 720;
        }
        var title = config.title;
        var html = String.raw`
<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Play&display=swap');

html {
  font-size: 12px;
}

.bg {
  width: 1077px;
  height: 713px;
  border-radius: 16px;
  box-shadow: 0px 5px 10px 0 rgba(6, 56, 70, 0.33);
  background-color: #ffffff;
  display: grid;
  grid-template-columns: 32px 812.5px 14.5px 187px 31px;
  grid-template-rows: 222.7px 461.5px 28.8px;
}

.head {
  grid-column: 2 / 5;
  grid-row: 1 / 2;
}

.r {
  border-radius: 10px;
  background-color: rgba(117, 194, 219, 0.15);
  grid-column: 4 / 5;
  grid-row: 2 / 3;
}

.v {
  border-radius: 10px;
  background-color: #c5c5c5;
  grid-column: 2 / 3;
  grid-row: 2 / 3;
  display: flex;
  align-items: center;
  justify-content: center;
}

.Screen_Shot {
  border-radius: 10px;
  max-height: 100%;
  max-width: 100%;
  width: auto;
  height: 461.5px;
  margin: auto;
}

.Screen_canvas {
  border-radius: 10px;
  width: auto;
  height: 461.5px;
  position: absolute;
  z-index: 1;
}

.Result-Node {
  width: 137px;
  height: 17px;
  font-family: "Play", sans-serif;
  font-size: 2rem;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  color: #5d8de4;
  margin: 31px 0px 0px 0px;
}

.Model-Name-putflite {
  font-family: Roboto;
  font-weight: 500;
  font-size: 1.79rem;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.42;
  letter-spacing: normal;
  text-align: left;
  color: #686868;
  margin: 28px 0px 0px 0px;
}

.edgetputest_dataefficientnet-edgetpu-M_quant_embedding_extrac {
  font-family: Roboto;
  font-size: 1.79rem;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.33;
  letter-spacing: normal;
  text-align: left;
  color: #686868;
  grid-area: mName;
}

.re {
  width: 165px;
  height: 25px;
  margin-right: 12px;
  border-radius: 16px;
  border: solid 1px #a0a0a0;
  background-color: #ffffff;
  margin: 29px 20px 0px 0px;
  display: inline-block;
}

.in {
  width: 215px;
  height: 25px;
  margin-right: 12px;
  border-radius: 16px;
  border: solid 1px #a0a0a0;
  background-color: #ffffff;
  margin-right: 20px;
  display: inline-block;
}
.tp {
  width: 235px;
  height: 25px;
  border-radius: 16px;
  border: solid 1px #a0a0a0;
  background-color: #ffffff;
  margin-right: 20px;
  display: inline-block;
}

.Resolution-4K {
  font-family: Roboto;
  font-size: 1.3rem;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: #696969;
  line-height: 1.8;
}

.rtitle {
  margin: 20px 0px 15px 25px;
  width: 54px;
  height: 13px;
  font-family: Play;
  font-size: 1.5rem;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #5d8de4;
}

.Result-Name-box {
  width: 176px;
  height: 69px;
  margin: 0px 6px 0px 5px;
}

.Result-Name {
  font-family: Roboto;
  font-weight: 500;
  font-size: 1.125rem;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  color: #454545;
  margin: 0px 0px 0px 7px;
  display: inline-block;
}

.Result-Name-1-color_tag {
  width: 8px;
  height: 8px;
  border-radius: 999em;
  margin: 11px 0px 0px 18px;
  background-color: #0dd746;
  display: inline-block;
}

.Result-Name-2-color_tag {
  width: 8px;
  height: 8px;
  border-radius: 999em;
  margin: 11px 0px 0px 18px;
  background-color: #2498ff;
  display: inline-block;
}

.Result-Name-3-color_tag {
  width: 8px;
  height: 8px;
  border-radius: 999em;
  margin: 11px 0px 0px 18px;
  background-color: #fec837;
  display: inline-block;
}

.Result-Name-4-color_tag {
  width: 8px;
  height: 8px;
  border-radius: 999em;
  margin: 11px 0px 0px 18px;
  background-color: #0dd746;
  display: inline-block;
}

.Result-Name-5-color_tag {
  width: 8px;
  height: 8px;
  border-radius: 999em;
  margin: 11px 0px 0px 18px;
  background-color: #8e6af0;
  display: inline-block;
}

.Result-Name-6-color_tag {
  width: 8px;
  height: 8px;
  border-radius: 999em;
  margin: 11px 0px 0px 18px;
  background-color: #a5a5a5;
  display: inline-block;
}

.Result-count {
  width: 40px;
  height: 16px;
  margin: 11px 0px 0px 38px;
  font-family: Play;
  font-size: 2rem;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 0.53;
  letter-spacing: normal;
  text-align: right;
  color: #5d8de4;
}

.result_bg_pic {
  width: 220px;
  height: 210px;
  margin: 0px 0px 0px 856px;
  object-fit: contain;
}

.ic_result {
  width: 73px;
  height: 74px;
  margin: 190px 0px 0px -80px;
  object-fit: contain;
}

.Result-Name-bar {
  position:relative;
  width: 100px;
  height: 5px;
  margin: 15px 0px 0px 15px;
  border-radius: 2.5px;
  background: #ddd;
  display:inline-block;
}

.Result-Name-bar_data{
  position: absolute;
  border-radius: 2.5px;
  height: 100%;
  background-color: #5d8de4;
}

.Result-Name_image {
  font-family: Roboto;
  font-weight: 500;
  font-size: 1.125rem;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  color: #454545;
  margin: 0px 0px 0px 27px;
  display: inline-block;
}

.Result-count_image {
  width: 40px;
  height: 16px;
  margin: 0px 0px 0px 10px;
  font-family: Play;
  font-size: 1.8rem;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 0.53;
  letter-spacing: normal;
  text-align: right;
  color: #5d8de4;
  display: inline-block;
}

</style>


 <div class="bg">
  <img src="http://localhost:1880/node_modules/node-red-contrib-edgetpu-inference/lib/img/result-bg-pic.png" class="result_bg_pic">
  <img src="http://localhost:1880/node_modules/node-red-contrib-edgetpu-inference/lib/img/ic-result.png" class="ic_result">
    <div class="head">
      <div class="Result-Node">Result Node</div>
      <div class="Model-Name-putflite">Model Name :</div>
      <div class="edgetputest_dataefficientnet-edgetpu-M_quant_embedding_extrac">{{msg.model}}</div>

      <div class="re">
        <div class="Resolution-4K">Resolution: {{msg.resolution_width}}*{{msg.resolution_height}}</div>
      </div>

      <div class="in">
        <div class="Resolution-4K">Inference Time: {{msg.inf_fps}} fps</div>
      </div>

      <div class="tp">
        <div class="Resolution-4K">Total Process Time: {{$total_fps}} fps</div>
      </div>
      </div>

      <div class="v">
        <img class="Screen_Shot" src="data:image/jpg;base64,{{msg.image}}"/>
        <canvas id="ui_canvas_{{$id}}" class="Screen_canvas"></canvas>
      </div>

      <div class="r">
        <div class="rtitle">Result</div>
        <div class="Result-Name-box">
          <div id="ui_color_tag0{{$id}}" class="Result-Name-1-color_tag"></div>
          <div id="ui_result_name0{{$id}}" class="Result-Name">{{$Item_name[0]}}</div>
          <div id="ui_result_bar0{{$id}}">
            <div id="ui_result_bar_data0{{$id}}"></div>
          </div>
          <div id="ui_result_count0{{$id}}" class="Result-count" >{{$Item_count[0]}}</div>
        </div>
        <div class="Result-Name-box">
          <div id="ui_color_tag1{{$id}}" class="Result-Name-2-color_tag"></div>
          <div id="ui_result_name1{{$id}}" class="Result-Name">{{$Item_name[1]}}</div>
          <div id='ui_result_bar1{{$id}}'>
            <div id='ui_result_bar_data1{{$id}}'></div>
          </div>
          <div id="ui_result_count1{{$id}}" class="Result-count" >{{$Item_count[1]}}</div>
        </div>
        <div class="Result-Name-box">
          <div id="ui_color_tag2{{$id}}" class="Result-Name-3-color_tag"></div>
          <div id="ui_result_name2{{$id}}" class="Result-Name">{{$Item_name[2]}}</div>
          <div id='ui_result_bar2{{$id}}'>
            <div id='ui_result_bar_data2{{$id}}'></div>
          </div>
          <div id="ui_result_count2{{$id}}" class="Result-count" >{{$Item_count[3]}}</div>
        </div>
        <div class="Result-Name-box">
          <div id="ui_color_tag3{{$id}}" class="Result-Name-4-color_tag"></div>
          <div id="ui_result_name3{{$id}}" class="Result-Name">{{$Item_name[3]}}</div>
          <div id='ui_result_bar3{{$id}}'>
            <div id='ui_result_bar_data3{{$id}}'></div>
          </div>
          <div id="ui_result_count3{{$id}}" class="Result-count" >{{$Item_count[3]}}</div>
        </div>
        <div class="Result-Name-box">
          <div id="ui_color_tag4{{$id}}" class="Result-Name-5-color_tag"></div>
          <div id="ui_result_name4{{$id}}" class="Result-Name">{{$Item_name[4]}}</div>
          <div id='ui_result_bar4{{$id}}'>
            <div id='ui_result_bar_data4{{$id}}'></div>
          </div>
          <div id="ui_result_count4{{$id}}" class="Result-count" >{{$Item_count[4]}}</div>
        </div>
        <div class="Result-Name-box">
          <div id="ui_color_tag5{{$id}}" class="Result-Name-6-color_tag"></div>
          <div id="ui_result_name5{{$id}}" class="Result-Name">{{$Item_name[5]}}</div>
          <div id='ui_result_bar5{{$id}}'>
            <div id='ui_result_bar_data5{{$id}}'></div>
          </div>
          <div id="ui_result_count5{{$id}}" class="Result-count" >{{$Item_count[5]}}</div>
        </div>
      </div>

  </div>


        `;

        return html;
    }

    var ui = undefined;

    // Node initialization function
    function ResultNode(config) {
        try {
            var node = this;
            if (ui === undefined) {
                // #1: Load node-red-dashboard module.
                // Should use RED.require API to cope with loading different
                // module.  And it should also be executed at node
                // initialization time to be loaded after initialization of
                // node-red-dashboard module.
                ui = RED.require("node-red-dashboard")(RED);
            }
            config.tcol = ui.getTheme()["group-textColor"].value || "#1bbfff";
            // Initialize node
            RED.nodes.createNode(this, config);
            var done = null;
            if (config.width === "0") { delete config.width; }
            if (config.height === "0") { delete config.height; }
            node.autowidth = 21;
            node.autoheight = 14;

            var sizeof = require('../package/image-size');

            function FindResolution(msg){
                var img = Buffer.from(msg.image.split(';base64,').pop(), 'base64');
                var dimensions = sizeof(img);
                return dimensions;

            }

            if (checkConfig(node, config)) {
                var html = HTML(config);
                done = ui.addWidget({
                    node: node,
                    label: config.title,
                    order: config.order,
                    group: config.group,
                    width: config.width|| config.group.width || node.autowidth,
                    height: config.height || node.autoheight,
                    format: html,
                    templateScope: "local",
                    emitOnlyNewValues: false,
                    forwardInputMessages: false,
                    storeFrontEndInputAsState: false,
                    convertBack: function (value) {
                        return value;
                    },
                    beforeEmit: function(msg) {
                        var model_name = msg.model;
                        msg.model = model_name.replace(".tflite","");
                        if(msg.image){
                            var dimensions = FindResolution(msg);
                            msg.resolution_height = dimensions.height;
                            msg.resolution_width = dimensions.width;
                            msg.inf_fps = msg.inf_fps.toFixed(0)
                            if ((msg.resolution_width/msg.resolution_height).toFixed(1)==1.3){
                              msg.ratio_y = (msg.resolution_height/461.5).toFixed(3);
                              msg.canvas_w = (msg.resolution_width/msg.ratio_y).toFixed(0);
                              msg.ratio_x = (msg.resolution_width/msg.canvas_w).toFixed(3);

                            }

                            else{
                              msg.ratio_x = (msg.resolution_width/812.5).toFixed(3);
                              msg.ratio_y = (msg.resolution_height/461.5).toFixed(3);
                              msg.canvas_w = (msg.resolution_width/msg.ratio_y).toFixed(0);
                            }

                        }
                        return {msg};
                    },
                    beforeSend: function (msg, orig) {
                    },
                    initController: function($scope) {
                        var cMap = new Map();
                        cMap.set('person', '#ed7263');
                        cMap.set('umbrella', '#f6639b');
                        cMap.set('car', '#00FFFF');


                        $scope.$watch('msg', function(msg,) {


                            if (msg.image && msg.payload['objects']){
                                draw(msg);
                                cal_total_fps(msg);
                                countItem(msg,'objects');

                            }

                            else if(msg.image && msg.payload['classes']){
                              changeStyle(msg);
                              cal_total_fps(msg);
                              countItem(msg,'classes');

                            }


                        });

                        function cal_total_fps(msg){
                            var end = (1000/((new Date().getTime())-msg.starttime)).toFixed(0);
                            $scope.$total_fps = end
                        }

                        function draw(msg){
                            var canvas = document.querySelector("canvas#ui_canvas_"+$scope.$id);
                            canvas.height = 461.5;
                            canvas.width = msg.canvas_w;
                            var ctx = setupCanvas(canvas);
                            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
                            const font = "14px sans-serif";
                            ctx.font = font;
                            ctx.textBaseline = "top";
                            msg.payload['objects'].forEach(prediction => {
                            const x = prediction.bbox[0]/msg.ratio_x;
                            const y = prediction.bbox[1]/msg.ratio_y;
                            const width = (prediction.bbox[2] -prediction.bbox[0])/msg.ratio_x;
                            const height = (prediction.bbox[3] - prediction.bbox[1])/msg.ratio_y;
                            ctx.strokeStyle = setClolr(prediction.className);
                            ctx.lineWidth = 4;
                            ctx.strokeRect(x, y, width, height);
                            ctx.fillStyle = setClolr(prediction.className);
                            const score_textWidth = ctx.measureText(prediction.score.toFixed(2)).width;
                            const score_textHeight = parseInt(font, 10);
                            ctx.fillRect(x-1, y-20, score_textWidth + 20, score_textHeight + 4);
                            ctx.fillStyle = "#FFFFFF";
                            const classname_textWidth = ctx.measureText(prediction.className).width;
                            const classname_textHeight = parseInt(font, 10);
                            ctx.fillRect(x+35, y-20, classname_textWidth + 30, classname_textHeight + 4);
                            });
                            msg.payload['objects'].forEach(prediction => {
                            const x = prediction.bbox[0]/msg.ratio_x;
                            const y = prediction.bbox[1]/msg.ratio_y;
                            ctx.fillStyle = "#000000";
                            ctx.fillText(prediction.score.toFixed(2), x+3, y-15);
                            ctx.fillText(prediction.className, x+40, y-16);
                            });

                        }

                        function setClolr(cName){
                            for (var key of cMap.keys()) {
                                if(key == cName){
                                    return cMap.get(key);
                                }
                              }
                            return "#4d9141";
                        }

                        function setupCanvas(canvas) {
                          var dpr = window.devicePixelRatio || 1
                          var rect = canvas.getBoundingClientRect()
                          canvas.width = rect.width * dpr
                          canvas.height = rect.height * dpr
                          var ctx = canvas.getContext('2d')
                          ctx.scale(dpr, dpr)
                          return ctx
                        }

                        function countItem(msg,type){

                          var count_array=new Array();
                          var className_array=new Array();

                          msg.payload[type].forEach(prediction => {
                                count_array.push(prediction.className);
                          });


                          if(type=="objects"){
                            var times_array=new Array();
                              const total_count = count_array.reduce((obj,item)=>{
                                if (item in obj) {
                                  obj[item]++
                                } else {
                                  obj[item] = 1
                                }
                                return obj
                              },{})


                            for (const [key, value] of Object.entries(total_count)) {
                                className_array.push(key)
                                times_array.push(value)

                            }

                            $scope.$Item_name = [];
                            $scope.$Item_count = [];
                            for (var i=0; i<=6; i++){
                                if(className_array[i]){
                                    $scope.$Item_name.push(className_array[i]);
                                    $scope.$Item_count.push(times_array[i]);
                                }
                                else{
                                    $scope.$Item_name.push("");
                                    $scope.$Item_count.push("");
                                }

                            }


                          }
                          else{
                            $scope.$Item_name = [];
                            $scope.$Item_count = [];
                            for (var i=0; i<=5; i++){
                                if(msg.payload[type][i].className){
                                    $scope.$Item_name.push(msg.payload[type][i].className);
                                    $scope.$Item_count.push(msg.payload[type][i].score.toFixed(2));
                                }
                                else{
                                    $scope.$Item_name.push("");
                                    $scope.$Item_count.push("");
                                }

                            }
                        }
                      }
                        function changeStyle(msg){

                          for (var i=0; i<=5; i++){
                            if(msg.payload["classes"][i]){
                              var tag = document.querySelector("div#ui_color_tag"+i.toString()+$scope.$id);
                              tag.setAttribute("class", "");
                              var name = document.getElementById("ui_result_name"+i.toString()+$scope.$id);
                              name.setAttribute("class", "Result-Name_image");
                              var bar = document.getElementById("ui_result_bar"+i.toString()+$scope.$id);
                              bar.setAttribute("class", "Result-Name-bar");
                              var bar_data = document.getElementById("ui_result_bar_data"+i.toString()+$scope.$id);
                              bar_data.setAttribute("class", "Result-Name-bar_data");
                              bar_data.style.width = (msg.payload["classes"][i].score.toFixed(2)*100).toString()+"%";
                              var count = document.getElementById("ui_result_count"+i.toString()+$scope.$id);
                              count.setAttribute("class", "Result-count_image");

                            }
                            else{
                              var tag = document.querySelector("div#ui_color_tag"+i.toString()+$scope.$id);
                              tag.setAttribute("class", "");
                            }
                          }
                        }
                    }
                });
            }
        }
        catch (e) {
            console.log(e);
        }
        node.on("close", function() {
            if (done) {
                done();
            }
        });
    }
    RED.nodes.registerType('ui_result', ResultNode);
};


