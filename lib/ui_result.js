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
      var ip = config.ip;
      if(ui.isDark()){
        var main_color = '#212121'
        var toolbar_color = '#04697c'
        var title_color = '#ffffff'
        var result_node_color = '#2fd4ea'
        var bg_color = '#2f2f2f'
        var model_name_color = '#ffffff'
        var result_name_color = '#ffffff'
        var result_count_color = '#75c2db'
      }
      else{
        var main_color = '#ffffff'
        var toolbar_color = '#2d5fa8'
        var title_color = '#2d5fa8'
        var result_node_color = '#5d8de4'
        var bg_color = '#ffffff'
        var model_name_color = '#686868'
        var result_name_color = '#454545'
        var result_count_color = '#5d8de4'
      }
      var html = String.raw`
<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Play&display=swap');
@import url('http://${ip}:1880/node_modules/node-red-contrib-edgetpu-inference/lib/result_normal.css');
@import url('http://${ip}:1880/node_modules/node-red-contrib-edgetpu-inference/lib/result_tab_horizontal.css') screen and (max-width: 1366px);
@import url('http://${ip}:1880/node_modules/node-red-contrib-edgetpu-inference/lib/result_tab_vertical.css') screen and (min-width: 415px) and (max-width: 768px);
@import url('http://${ip}:1880/node_modules/node-red-contrib-edgetpu-inference/lib/result_mobile_vertical.css') screen and (max-width : 414px);

html {
  font-size: 12px;
}


:root {
  --main-color: ${main_color};
  --toolbar-color : ${toolbar_color};
  --title-color: ${title_color};
  --result-node-color: ${result_node_color};
  --bg-color: ${bg_color};
  --model-name-color: ${model_name_color};
  --result-name-color: ${result_name_color};
  --result-count-color: ${result_count_color};
}


body.nr-dashboard-theme md-content {
  color: var(--main-color);
}
body.nr-dashboard-theme md-sidenav {
  color: var(--main-color);
}

.nr-dashboard-theme .nr-dashboard-template .md-button:disabled {
  color: grey;
}
.nr-dashboard-theme .nr-dashboard-slider .md-thumb:after {
  background-color: var(--main-color);
  border-color: var(--main-color);
}

body.nr-dashboard-theme md-content md-card {
  background-color: var(--main-color);
  border-color: var(--main-color);
}

body.nr-dashboard-theme {
  background-color:var(--main-color) !important;
}

.masonry-container > .visible {
  left: 50px;
  background-color: var(--main-color) ;
  border-color: var(--main-color) ;
}

.nr-dashboard-theme ui-card-panel p.nr-dashboard-cardtitle {
  color: var(--title-color);;
}

.nr-dashboard-theme .nr-dashboard-template {
  background-color: var(--main-color);
}

.head > div {
  background-color : var(--bg-color);
}

.head > div > div {
  color : var(--model-name-color);
}

.Model-Name-putflite {
  color : var(--model-name-color);
}

.bg {
  background-color : var(--bg-color);
}

.Result-Node{
  color: var(--result-node-color);
}

.rtitle{
  color: var(--result-node-color);
}

.Result-Name{
  color: var(--result-name-color);
}

.Result-count{
  color: var(--result-count-color);
}
</style>

 <div class="bg">
  <div class="result_bg_pic"></div>
  <img src="http://${ip}:1880/node_modules/node-red-contrib-edgetpu-inference/lib/img/ic-result.png" class="ic_result">
    <div class="head">
      <div class="Result-Node">Result Node</div>
      <div class="Model-Name-putflite">Model Name : {{msg.model}}</div>
      <div class="re">
        <div class="Resolution-4K">Resolution: {{msg.resolution_width}}*{{msg.resolution_height}}</div>
      </div>

      <div class="in">
        <div class="Resolution-4K">Inference Time: {{msg.inf_fps}} fps</div>
      </div>

    </div>

    <div class="v">
        <img id="ui_screen_shot_{{$id}}" class="Screen_Shot" src="data:image/jpg;base64,{{msg.image}}"/>
        <canvas id="ui_canvas_{{$id}}" class="Screen_canvas"></canvas>
    </div>

    <div id="ui_result_{{$id}}"class="r">
        <div id="ui_result_title_{{$id}}" class="rtitle">Result</div>
        <div id="ui_result_content_{{$id}}"class="r_content"></div>
    </div>
</div>


        `;

        return html;
    }

    var ui = undefined;

    function ResultNode(config) {
        try {
            var node = this;
            if (ui === undefined) {
                ui = RED.require("node-red-dashboard")(RED);
            }
            config.tcol = ui.getTheme()["group-textColor"].value || "#1bbfff";
            // Initialize node
            RED.nodes.createNode(this, config);
            var done = null;
            if (config.width === "0") { delete config.width; }
            if (config.height === "0") { delete config.height; }
            node.autowidth = 25;
            node.autoheight = 14;

            var sizeof = require('../package/image-size');
            var flowContext = this.context().global;

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
                        flowContext.set("tpuID", msg.tpu);
                        var model_name = msg.model;
                        msg.model = model_name.replace(".tflite","");
                        flowContext.set("ModelName", msg.model);
                        if(msg.image){
                            var dimensions = FindResolution(msg);
                            msg.resolution_height = dimensions.height;
                            msg.resolution_width = dimensions.width;
                            msg.inf_fps = msg.inf_fps.toFixed(0)
                        }
                        return {msg};
                    },
                    beforeSend: function (msg, orig) {
                    },
                    initController: function($scope) {
                        var color = ["#0dd746","#2498ff","#fec837","#f14b81","#8e6af0","#a5a5a5"];
                        var cMap = new Map(); //color map
                        var rMap = new Map(); //result map

                        $scope.$watch('msg', function(msg) {
                            var r = canvas_ratio(msg);
                            var title = document.getElementById("ui_result_title_"+$scope.$id);
                            if (msg.image && msg.payload['objects']){
                              title.innerHTML = "Results and counts"

                              if(window.orientation==0 || window.orientation==180 || !window.orientation){
                                if($(window).width() <=414){
                                  var canvas_height = 182;
                                  if (r[2]>323){
                                    var screen_shot_radius = document.getElementById("ui_screen_shot_"+$scope.$id);
                                    screen_shot_radius.style.borderRadius='10px';
                                  }
                                }
                                else if($(window).width() >414 && $(window).width() <=768){
                                  var canvas_height = 357.6;
                                  if (r[2]>639){
                                    var screen_shot_radius = document.getElementById("ui_screen_shot_"+$scope.$id);
                                    screen_shot_radius.style.borderRadius='10px';
                                  }
                                }
                                else if($(window).width() > 768 && $(window).width()<=1366 ){
                                  var canvas_height = 500.2;
                                  if (r[2]>890){
                                    var screen_shot_radius = document.getElementById("ui_screen_shot_"+$scope.$id);
                                    screen_shot_radius.style.borderRadius='10px';
                                  }
                                }
                                else{
                                  var canvas_height = 550;
                                  if (r[2]>960){
                                    var screen_shot_radius = document.getElementById("ui_screen_shot_"+$scope.$id);
                                    screen_shot_radius.style.borderRadius='10px';
                                  }
                                }
                              }
                              else{
                                var canvas_height = 500.2;
                                  if (r[2]>890){
                                    var screen_shot_radius = document.getElementById("ui_screen_shot_"+$scope.$id);
                                    screen_shot_radius.style.borderRadius='10px';
                                  }
                              }

                              clearMap(rMap);
                              draw(msg,canvas_height,r[0],r[1],r[2]);
                              //cal_total_fps(msg);
                              countItem(msg,'objects');
                              resultMap(rMap);

                            }

                            else if(msg.image && msg.payload['classes']){
                              removeDiv();
                              title.innerHTML = "Results and confidence"
                              //cal_total_fps(msg);
                              countItem(msg,'classes');
                            }
                        });

                        function cal_total_fps(msg){
                            var end = (1000/((new Date().getTime())-msg.starttime)).toFixed(0);
                            $scope.$total_fps = end
                        }

                        function draw(msg,canvas_height,ratio_x,ratio_y,canvas_w){
                            var canvas = document.querySelector("canvas#ui_canvas_"+$scope.$id);
                            canvas.height = canvas_height;
                            canvas.width = canvas_w;
                            var ctx = setupCanvas(canvas);
                            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
                            const font = "14px sans-serif";
                            ctx.font = font;
                            ctx.textBaseline = "top";
                            msg.payload['objects'].forEach(prediction => {
                            const x = prediction.bbox[0]/ratio_x;
                            const y = prediction.bbox[1]/ratio_y;
                            const width = (prediction.bbox[2] -prediction.bbox[0])/ratio_x;
                            const height = (prediction.bbox[3] - prediction.bbox[1])/ratio_y;
                            ctx.strokeStyle = setClolr(prediction.className,color);
                            ctx.lineWidth = 2;
                            ctx.strokeRect(x, y, width, height);
                            ctx.fillStyle = setClolr(prediction.className,color);
                            const score_textWidth = ctx.measureText(prediction.score.toFixed(2)).width;
                            const score_textHeight = parseInt(font, 10);
                            ctx.fillRect(x-1, y-18, score_textWidth + 20, score_textHeight + 4);
                            ctx.fillStyle = "#FFFFFF";
                            const classname_textWidth = ctx.measureText(prediction.className).width;
                            const classname_textHeight = parseInt(font, 10);
                            ctx.fillRect(x+34, y-18, classname_textWidth + 30, classname_textHeight + 4);
                            });
                            msg.payload['objects'].forEach(prediction => {
                            const x = prediction.bbox[0]/ratio_x;
                            const y = prediction.bbox[1]/ratio_y;
                            ctx.fillStyle = "#000000";
                            ctx.fillText(prediction.score.toFixed(2), x+3, y-15);
                            ctx.fillText(prediction.className, x+40, y-16);
                            });

                        }

                        function canvas_ratio(msg){

                          if ((msg.resolution_width/msg.resolution_height).toFixed(1)==1.3){

                            if(window.orientation==0 || window.orientation==180 || !window.orientation){
                              if($(window).width() <=414){
                                var ratio_y = (msg.resolution_height/182).toFixed(3);
                              }
                              else if($(window).width() > 414 && $(window).width() <= 768){
                                var ratio_y = (msg.resolution_height/357.6).toFixed(3);
                              }
                              else if ($(window).width() > 768 && $(window).width()<=1366 ){
                                var ratio_y = (msg.resolution_height/500.2).toFixed(3);
                              }
                              else{
                                var ratio_y = (msg.resolution_height/550).toFixed(3);
                              }
                            }
                            else{
                              if ($(window).width() > 768 && $(window).width()<=1366 ){
                                var ratio_y = (msg.resolution_height/500.2).toFixed(3);
                              }
                            }

                            var canvas_w = (msg.resolution_width/ratio_y).toFixed(0);
                            var ratio_x = (msg.resolution_width/canvas_w).toFixed(3);


                          }
                          else{

                            if(window.orientation==0 || window.orientation==180 || !window.orientation){
                              if($(window).width() <=414){
                                var ratio_x = (msg.resolution_width/328).toFixed(3);
                                var ratio_y = (msg.resolution_height/182).toFixed(3);
                              }
                              else if($(window).width() > 414 && $(window).width() <= 768){
                                var ratio_x = (msg.resolution_width/641).toFixed(3);
                                var ratio_y = (msg.resolution_height/357.6).toFixed(3);
                              }
                              else if ($(window).width() > 768 && $(window).width()<=1366 ){
                                var ratio_x = (msg.resolution_width/895).toFixed(3);
                                var ratio_y = (msg.resolution_height/500.2).toFixed(3);
                              }
                              else{
                                var ratio_x = (msg.resolution_width/964.2).toFixed(3);
                                var ratio_y = (msg.resolution_height/550).toFixed(3);
                              }
                            }
                            else{
                              if ($(window).width() > 768 && $(window).width()<=1366 ){
                                var ratio_x = (msg.resolution_width/895).toFixed(3);
                                var ratio_y = (msg.resolution_height/500.2).toFixed(3);
                              }
                            }

                            var canvas_w = Math.floor(msg.resolution_width/ratio_x);
                          }

                          return [ratio_x, ratio_y, canvas_w];


                        }


                        function setClolr(cName,color){

                          if(cMap.get(cName)) return cMap.get(cName);

                          else{
                            if(cMap.size>6){
                              cMap.set(cName, color[5]);
                            }
                            else{
                              cMap.set(cName, color[cMap.size]);
                            }

                          }

                          return cMap.get(cName);

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

                            for (var i=0; i<=className_array.length; i++){
                              if(className_array[i]){
                                rMap.set(className_array[i],times_array[i])
                              }
                            }
                          }
                          else{
                            $scope.$Item_name = [];
                            $scope.$Item_count = [];
                            for (var i=0; i<=msg.payload[type].length; i++){
                                if(msg.payload[type][i].className){
                                  addDiv_image(msg.payload[type][i].className,msg.payload[type][i].score)
                                }
                            }
                        }
                        }

                        function addDiv_image(classname,score){
                          var r = document.getElementById("ui_result_content_"+$scope.$id);

                          var   line=document.createElement("div");
                          line.setAttribute("class","Result-Line");

                          var   newBox=document.createElement("div");
                          newBox.setAttribute("class","Result-Name-box");

                          var   newName=document.createElement("div");
                          newName.setAttribute("class","Result-Name_image")
                          newName.innerHTML = classname;

                          var   newBar=document.createElement("div");
                          newBar.setAttribute("class","Result-Name-bar")

                          var   newBardata=document.createElement("div");
                          newBardata.setAttribute("class","Result-Name-bar_data")
                          newBardata.style.width = ((score*100).toFixed(0)).toString()+"%";

                          var   newCount=document.createElement("div");
                          newCount.setAttribute("class", "Result-count_image");
                          newCount.innerHTML = ((score*100).toFixed(0)).toString();

                          var   newPer=document.createElement("div");
                          newPer.setAttribute("class", "Result-per_image");
                          newPer.innerHTML = "%";

                          newBox.appendChild(newName);
                          newBox.appendChild(newBar);
                          newBar.appendChild(newBardata);
                          newBox.appendChild(newCount);
                          newBox.appendChild(newPer);
                          newBox.appendChild(line);
                          r.appendChild(newBox);

                        }

                        function addDiv_object(classname,times){


                          if(document.getElementById("ui_result_content_"+classname+"_count_"+$scope.$id)){
                            var count = document.getElementById("ui_result_content_"+classname+"_count_"+$scope.$id);
                            count.innerHTML = times;
                          }
                          else{
                            var r = document.getElementById("ui_result_content_"+$scope.$id);

                            var   line=document.createElement("div");
                            line.setAttribute("class","Result-Line");

                            var   newBox=document.createElement("div");
                            newBox.setAttribute("class","Result-Name-box");
                            var   newTag=document.createElement("div");
                            newTag.setAttribute("class","Result-Name-color_tag");
                            newTag.style.backgroundColor = cMap.get(classname);
                            var   newName=document.createElement("div");
                            newName.setAttribute("class","Result-Name")
                            newName.innerHTML = classname;

                            var   newCount=document.createElement("div");
                            newCount.setAttribute("class","Result-count");
                            newCount.setAttribute("id","ui_result_content_"+classname+"_count_"+$scope.$id);
                            newCount.innerHTML = times;


                            newBox.appendChild(newTag);
                            newBox.appendChild(newName);
                            newBox.appendChild(newCount);
                            newBox.appendChild(line);
                            r.appendChild(newBox);
                          }

                        }

                        function removeDiv(){
                          var div = document.getElementById("ui_result_content_"+$scope.$id);
                          while(div.firstChild) {
                              div.removeChild(div.firstChild);
                          }
                        }

                        function clearMap(myMap){
                          for (var key of myMap.keys()) {
                            myMap.set(key,"0")
                          }
                        }

                        function resultMap (myMap){
                          for (var [key, value] of myMap) {
                            addDiv_object(key,value)
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


