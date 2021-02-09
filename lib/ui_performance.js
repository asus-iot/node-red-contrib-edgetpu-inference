module.exports = function(RED) {

    // check required configuration
    function checkConfig(node, conf) {
        if (!conf || !conf.hasOwnProperty("group")) {
            node.error(RED._("ui_perdormance.error.no-group"));
            return false;
        }
        return true;
    }

    function HTML(config) {

      var ip = config.ip;

      var html = String.raw`
<style>
@import url("https://fonts.googleapis.com/css2?family=Play&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Roboto&display=swap");
@import url('http://${ip}:1880/node_modules/node-red-contrib-edgetpu-inference/lib/performance_normal.css');
@import url('http://${ip}:1880/node_modules/node-red-contrib-edgetpu-inference/lib/performance_tab_horizontal.css') screen and (max-width: 1024px);
@import url('http://${ip}:1880/node_modules/node-red-contrib-edgetpu-inference/lib/performance_tab_vertical.css') screen and (min-width: 376px) and (max-width: 768px);
@import url('http://${ip}:1880/node_modules/node-red-contrib-edgetpu-inference/lib/performance_mobile_vertical.css') screen and (max-width: 375px);

html {
  font-size: 12px;
}

  .result_bg_pic {
  background: url(http://${ip}:1880/node_modules/node-red-contrib-edgetpu-inference/lib/img/result-bg-pic.png) no-repeat;
  }

  .chart_bg {
  background: url(http://${ip}:1880/node_modules/node-red-contrib-edgetpu-inference/lib/img/chart-bg.png) no-repeat;
  }

  @media screen and (max-width: 1024px){
  .chart_bg {
    background: url(http://${ip}:1880/node_modules/node-red-contrib-edgetpu-inference/lib/img/chart-bg_tab_1024.png) no-repeat;
  }
  }

  @media all and (device-width: 768px) and (device-height: 1024px) and (orientation:portrait) {
  .chart_bg {
    background: url(http://${ip}:1880/node_modules/node-red-contrib-edgetpu-inference/lib/img/chart-bg_tab_768.png) no-repeat;
  }
  }

  @media screen and (max-width: 375px){
  .chart_bg {
    background: url(http://${ip}:1880/node_modules/node-red-contrib-edgetpu-inference/lib/img/chart-bg_mobile_375.png) no-repeat;
  }
  .result_bg_pic {
    background: url(http://${ip}:1880/node_modules/node-red-contrib-edgetpu-inference/lib/img/result-bg-pic_375.png) no-repeat;
  }
  }

  .btn_left_able {
  background: url(http://${ip}:1880/node_modules/node-red-contrib-edgetpu-inference/lib/img/btn-left-able.png) no-repeat;
  }

  .btn_left_disable {
  background: url(http://${ip}:1880/node_modules/node-red-contrib-edgetpu-inference/lib/img/btn-left-disable.png) no-repeat;
  }

  .btn_right_able {
  background: url(http://${ip}:1880/node_modules/node-red-contrib-edgetpu-inference/lib/img/btn-right-able.png) no-repeat;
  }

  .btn_right_disable {
  background: url(http://${ip}:1880/node_modules/node-red-contrib-edgetpu-inference/lib/img/btn-right-disable.png) no-repeat;
  }

  .tpu_off {
  background: url("http://${ip}:1880/node_modules/node-red-contrib-edgetpu-inference/lib/img/ic-tpu-off.png") no-repeat;
  }

  .tpu_on {
  background: url("http://${ip}:1880/node_modules/node-red-contrib-edgetpu-inference/lib/img/ic-tpu-on.png") no-repeat;
  }

  </style>

<div class='bg_p'>

  <img src="http://${ip}:1880/node_modules/node-red-contrib-edgetpu-inference/lib/img/performance-bg-down-pic.png" class="performance_bg_down_pic">
  <div class='Performance-Node'>Performance Node</div>
  <img src="http://${ip}:1880/node_modules/node-red-contrib-edgetpu-inference/lib/img/performance-bg-up-pic.png" class="performance_bg_up_pic">
  <img src="http://${ip}:1880/node_modules/node-red-contrib-edgetpu-inference/lib/img/ic-cpu.png" class="ic_cpu">
  <img src="http://${ip}:1880/node_modules/node-red-contrib-edgetpu-inference/lib/img/ic-ram.png" class="ic_ram">
  <img src="http://${ip}:1880/node_modules/node-red-contrib-edgetpu-inference/lib/img/ic-tpu.png" class="ic_tpu">



<div class='cpu_info'>
  <div class="chart_container_cpu" id="chart_container_cpu{{$id}}">
    <canvas id="CPU_{{$id}}"></canvas>
  </div>
  <div class="chart_container_cpu_bar" id="chart_container_cpu_bar{{$id}}">
    <canvas id="CPU_bar_{{$id}}"></canvas>
  </div>
  <div class='info_header'>
    <div class='info_title'>CPU : {{msg.cpu}}%</div>
  </div>
  <div class='info_left'>
    <div class='High'>High</div>
    <div class='cpu_bar_bg'>
      <img src="http://${ip}:1880/node_modules/node-red-contrib-edgetpu-inference/lib/img/bar.png" class="bar_mask">
    </div>
    <div class='Low'>Low</div>
  </div>
  <div class='info_right'>
    <div class='per'>100%</div>
    <div class="chart_bg"></div>
    <div class='minute'>60s</div>
    <div class='s'>0s</div>
  </div>

</div>

<div class='ram_info'>
  <div class="chart_container_ram" id="chart_container_ram{{$id}}">
    <canvas id="RAM_{{$id}}"></canvas>
  </div>

  <div class="chart_container_ram_bar" id="chart_container_ram_bar{{$id}}">
    <canvas id="RAM_bar_{{$id}}"></canvas>
  </div>

  <div class='info_header'>
    <div class='info_title'>RAM : {{msg.ram}}%</div>
  </div>
  <div class='info_left'>
    <div class='High'>High</div>
    <div class='ram_bar_bg'>
      <img src="http://${ip}:1880/node_modules/node-red-contrib-edgetpu-inference/lib/img/bar.png" class="bar_mask">
    </div>
    <div class='Low'>Low</div>
  </div>
  <div class='info_right'>
    <div class='per'>100%</div>
    <div class="chart_bg"></div>
    <div class='minute'>60s</div>
    <div class='s'>0s</div>
  </div>



</div>

<div class='tpu_info'>
  <div class='info_header'>
    <div class='info_title_tpu'>TPU</div>
  </div>

  <div class='tpu_left'>
    <div class='oC'>(℃)</div>
    <div class='temp_info'>100</div>
    <div class='temp_info'>80</div>
    <div class='temp_info'>60</div>
    <div class='temp_info'>40</div>
    <div class='temp_info'>20</div>
    <div class='temp_info'>0</div>
  </div>

  <div id="tpu_right" class='tpu_right'>

  </div>

  <div class='tpu_id' id="tpu_id">

  </div>

  <div class='tpu_btn_container'>
    <input type="button" ng-click="click_A()" id="btn_left{{$id}}" class="btn_left_disable"></button>
    <div id='page1_{{$id}}' class ='tpu_page1'>1</div>
    <div class ='slash'> / </div>
    <div id='page2_{{$id}}' class ='tpu_page2'>2</div>
    <input type="button" ng-click="click_B()" id="btn_right{{$id}}" class="btn_right_able"></button>

  </div>

  <div class="chart_container_tpu_bar" id="chart_container_tpu_bar{{$id}}">
    <canvas id="TPU_bar_{{$id}}"></canvas>
  </div>

</div>

</div>

<script>
removeDiv();
if($(window).width() <=375){
  add_tpu_info(4)
}
else if($(window).width() > 375 && $(window).width() <= 768){
  add_tpu_info(10)
}
else if($(window).width() >768 && $(window).width() <= 1024){
  add_tpu_info(15)
}
else{
  add_tpu_info(7)
}

window.addEventListener("orientationchange", function(){
  removeDiv();
  if(window.orientation==0){
    add_tpu_info(10)
  }
  else{
    add_tpu_info(15)
  }
}, false);

$(document).ready(function(){
  $(window).resize(function() {
    removeDiv();
    if($(window).width() <= 375){
      add_tpu_info(4)
    }
    else if($(window).width() > 375 && $(window).width() <= 768){
      add_tpu_info(10)
    }
    else if($(window).width() >768 && $(window).width() <= 1024){
      add_tpu_info(15)
    }
    else{
      add_tpu_info(7)
    }
  });
});




function add_tpu_info(index){

  var tpu_right = document.getElementById("tpu_right");

  var tpu_status_info=document.createElement("div");
  tpu_status_info.setAttribute("class","tpu_status_info");
  tpu_status_info.setAttribute("id","tpu_status_info");

  for (var i=0;i<=index;i++){
    var   tpu_status=document.createElement("div");
    tpu_status.setAttribute("class","tpu_off");
    tpu_status.setAttribute("id","tpu_status_"+i);
    tpu_status_info.appendChild(tpu_status);
  }

  tpu_right.appendChild(tpu_status_info);

  for (var i=0;i<=index;i++){
    var tooltip=document.createElement("div");
    tooltip.setAttribute("class","tooltip");
    var tpu_bar_mask=document.createElement("img");
    tpu_bar_mask.setAttribute("class","tpu_bar_mask");
    tpu_bar_mask.setAttribute("src", "http://${ip}:1880/node_modules/node-red-contrib-edgetpu-inference/lib/img/tpu-cover.png")
    var tooltiptext=document.createElement("span");
    tooltiptext.setAttribute("class","tooltiptext");
    tooltiptext.setAttribute("id","tpu_tooltiptext_"+i);
    tooltip.appendChild(tpu_bar_mask);
    tooltip.appendChild(tooltiptext);
    tpu_right.appendChild(tooltip);
  }

  var tpu_id = document.getElementById("tpu_id");
  for (var i=0;i<=index;i++){
    var tpu_name =document.createElement("div");
    tpu_name.setAttribute("class","TPU_name");
    tpu_name.setAttribute("id","TPU_name_"+i)
    tpu_name.innerHTML = "tpu"+i;
    tpu_id.appendChild(tpu_name);
  }
}

function removeDiv(){
  var tpu_right = document.getElementById("tpu_right");
  while(tpu_right.firstChild) {
    tpu_right.removeChild(tpu_right.firstChild);
  }

  var tpu_id = document.getElementById("tpu_id");
  while(tpu_id.firstChild) {
    tpu_id.removeChild(tpu_id.firstChild);
  }
}

</script>

        `;

        return html;
    }

    var ui = undefined;

    function performanceNode(config) {
        try {
            var node = this;
            if (ui === undefined) {
                ui = RED.require("node-red-dashboard")(RED);
            }
            config.tcol = ui.getTheme()["group-textColor"].value || "#1bbfff";
            RED.nodes.createNode(this, config);
            var done = null;
            if (config.width === "0") { delete config.width; }
            if (config.height === "0") { delete config.height; }
            node.autowidth = 10;
            node.autoheight = 14;
            var shell = require('../package/shelljs');
            const execSync = require('child_process').execSync;
            const stdout = execSync('ls -l /dev/apex_* | wc -l');
            var tpu_count = `${stdout}`;

            function tputemp(start_index,end_index){
                var temp =[];
                if(end_index==7||end_index==15){
                  for (var i=start_index;i<=end_index;i++){
                    var tmp = shell.cat('/sys/class/apex/apex_'+i+'/temp');
                    temp.push(parseInt(tmp.stdout, 10)/1000)
                  }
                }
                else{
                  var chart_end_index = start_index+7;
                  for (var i=start_index;i<=chart_end_index;i++){
                    if(i<=end_index){
                      var tmp = shell.cat('/sys/class/apex/apex_'+i+'/temp');
                      temp.push(parseInt(tmp.stdout, 10)/1000)
                    }
                    else{
                      var zero_temp = 0;
                      temp.push(zero_temp);
                    }
                  }
                }
                  return temp;
            }

            var meminfo = require('../package/node-meminfo');
            var osu = require('../package/os-utils');
            var os = require('../package/os');
            this.previousTotalTick = [];
            this.previousTotalIdle = [];
            var node = this;
            var flowContext = this.context().flow;

            function getCPUusage(){
                var currentTotalTick = [];
                var currentTotalIdle = [];
                var coreOutputMessages = [];
                var coreArray = [];
                var overallUsagePercentage = 0;

                for(var i = 0, len = os.cpus().length; i < len; i++) {
                    currentTotalTick.push(0);
                    currentTotalIdle.push(0);
                    for(var type in os.cpus()[i].times) {
                        currentTotalTick[i] += os.cpus()[i].times[type];
                    }
                    currentTotalIdle[i] += os.cpus()[i].times.idle;
                    var totalTickDifference = currentTotalTick[i] - ( node.previousTotalTick[i] || 0 );
                    var totalIdleDifference = currentTotalIdle[i] - ( node.previousTotalIdle[i] || 0 );
                    var percentageCPU = 100 - ~~(100 * totalIdleDifference / totalTickDifference);
                    coreOutputMessages.push({ payload:percentageCPU, topic:"core_" + (i+1), model:os.cpus()[i].model, speed:os.cpus()[i].speed });
                    coreArray.push({ name:"core_" + (i+1), usage:percentageCPU, model:os.cpus()[i].model, speed:os.cpus()[i].speed });
                    overallUsagePercentage += percentageCPU;
                }

                overallUsagePercentage = overallUsagePercentage / coreOutputMessages.length;
                node.previousTotalTick = currentTotalTick;
                node.previousTotalIdle = currentTotalIdle;

                return overallUsagePercentage
            }

            if (checkConfig(node, config)) {

                var html = HTML(config);
                done = ui.addWidget({
                    node: node,             // controlling node
                    label: config.title,
                    order: config.order,    // placeholder for position in page
                    group: config.group,    // belonging Dashboard group
                    width: config.width|| config.group.width || node.autowidth,    // config.width width of widget
                    height: config.height || node.autoheight,  // config.height height of widget
                    format: html,           // HTML/Angular code
                    templateScope: "local",	// scope of HTML/Angular(local/global)*
                    emitOnlyNewValues: false,
                    forwardInputMessages: false,
                    storeFrontEndInputAsState: false,
                    convertBack: function (value) {
                        return value;
                    },
                    beforeEmit: function(msg) {
                        msg.tpuID = flowContext.get("tpuID");
                        msg.ModelName = flowContext.get("ModelName");
                        let date = new Date(msg.payload)
                        msg.getseconds = date.getSeconds()
                        if (tpu_count>8){
                          msg.tmpA = tputemp(0,7);
                          msg.tmpB = tputemp(8,tpu_count-1);
                        }
                        else{
                          msg.tmpA = tputemp(0,tpu_count-1)
                          msg.tmpB = [0,0,0,0,0,0,0,0];
                        }
                        msg.cpu = getCPUusage().toFixed(0);
                        var mem = meminfo.get()
                        msg.ram = 100-((mem['MemAvailable']/mem['MemTotal'])*100).toFixed(0);
                        return {msg};
                    },
                    beforeSend: function (msg, orig) {
                        if (orig) {

                            return orig.msg;
                        }

                    },
                    initController: function($scope) {
                        var cpudata = Array(60).fill(null);
                        var ramdata = Array(60).fill(null);
                        var cpudata_bar = []
                        var ramdata_bar = []
                        Chart.defaults.global.animation.duration = 20; // Animation duration
                        Chart.defaults.global.defaultFontSize = 10; // Font size for every label
                        Chart.defaults.global.tooltips.borderColor = 'white'; // Tooltips border color
                        Chart.defaults.global.legend.labels.padding = 0;
                        Chart.defaults.scale.ticks.beginAtZero = true;
                        Chart.defaults.scale.gridLines.zeroLineColor = 'rgba(255, 255, 255, 0.1)';
                        Chart.defaults.scale.gridLines.color = 'rgba(255, 255, 255, 0.02)';
                        Chart.defaults.global.legend.display = false;
                        var current_page = 0
                        var flag=null
                        $scope.$watch('msg', function(msg) {
                            var cpu_data = catchdata(cpudata,msg.cpu);
                            var ram_data = catchdata(ramdata,msg.ram);
                            var cpu_data_bar = catchdata_bar(cpudata_bar,msg.cpu);
                            var ram_data_bar = catchdata_bar(ramdata_bar,msg.ram);
                            var str = msg.tpuID
                            var tpuID =str.replace("pci: ","");

                            if(window.orientation==0 || !window.orientation){
                              if($(window).width() <= 375){ // vertical iphone X
                                var chart_max = 160;
                                var total_page = 4;
                                set_tpu_info_375(msg,tpuID,0,5)
                              }
                              else if($(window).width() > 375 && $(window).width() <= 768 ){
                                var chart_max = 350;
                                set_tpu_info_768(msg,tpuID,0,10)
                              }
                              else if($(window).width() > 768 && $(window).width() <= 1024){
                                var chart_max = 500;
                                set_tpu_info_1024(msg,tpuID)
                              }
                              else{
                                var chart_max = 225;
                                if (tpuID<8){
                                  tpu_status_set_on(tpuID,msg);
                                }
                                removeiframe("chart_container_tpu_bar");
                                draw_tpu(msg.tmpA,[0,1,2,3,4,5,6,7]);
                                insert_tpuname(0,7);
                              }
                            }
                            else {
                              var chart_max = 500; //horizontal ipad
                              set_tpu_info_1024(msg,tpuID)
                            }

                            removeiframe("chart_container_cpu");
                            removeiframe("chart_container_ram");
                            removeiframe("chart_container_cpu_bar");
                            removeiframe("chart_container_ram_bar");

                            draw_cpu(cpu_data,cpu_data_bar,chart_max);
                            draw_ram(ram_data,ram_data_bar,chart_max);
                            $scope.click_A = function(){
                                current_page = current_page-1
                                if(total_page==4){
                                  if(current_page<=0){
                                    flag=0
                                    current_page = 0
                                    set_buton_status_first_page(1,2)
                                  }
                                  else if(current_page==1){
                                    flag=1
                                    set_buton_status_page(2,3)
                                  }
                                  else if(current_page==2){
                                    flag=2
                                    set_buton_status_page(3,4)
                                  }
                                }
                                else{
                                  if(current_page<0 || current_page==0){
                                    flag=0;
                                    current_page = 0
                                  }
                                  set_buton_status_first_page(1,2)
                                }

                            }

                            $scope.click_B = function(){
                              current_page = current_page+1
                              if(total_page==4){
                                if(current_page==1){
                                  flag=1
                                  set_buton_status_page(2,3)
                                }
                                else if(current_page==2){
                                  flag=2
                                  set_buton_status_page(3,4)
                                }
                                else if(current_page>2){
                                  current_page = 3
                                  flag=3
                                  set_buton_status_last_page(3,4)
                                }
                              }
                              else{
                                if(current_page>0 || current_page==0){
                                  flag =1;
                                  current_page = 1
                                }
                                set_buton_status_last_page(1,2)
                              }

                            }

                            if (flag==0){

                              if(window.orientation==0 || !window.orientation){
                                if($(window).width()<=375){
                                  set_tpu_info_375(msg,tpuID,0,5)
                                }
                                else if($(window).width()>375 && $(window).width()<=768){
                                  set_tpu_info_768(msg,tpuID,0,10)
                                }
                                else if($(window).width()>768 && $(window).width()<=1024){
                                  set_tpu_info_1024(msg,tpuID)
                                }
                                else{
                                  if (tpuID<8){
                                    tpu_status_set_on(tpuID,msg);
                                  }
                                  removeiframe("chart_container_tpu_bar");
                                  draw_tpu(msg.tmpA,[0,1,2,3,4,5,6,7]);
                                  insert_tpuname(0,7);
                                }

                              }
                              else{
                                if($(window).width()>768 && $(window).width()<=1024){
                                  set_tpu_info_1024(msg,tpuID)
                                }
                                else{
                                  if(tpuID<8){
                                    tpu_status_set_on(tpuID,msg);
                                  }
                                  removeiframe("chart_container_tpu_bar");
                                  draw_tpu(msg.tmpA,[0,1,2,3,4,5,6,7]);
                                  insert_tpuname(0,7);

                                }
                              }

                            }
                            else if (flag==1){
                              if(window.orientation==0 || !window.orientation){
                                if($(window).width()<=375){
                                  set_tpu_info_375(msg,tpuID,5,10)
                                }
                                else if($(window).width()>375 && $(window).width()<=768){
                                  set_tpu_info_768(msg,tpuID,11,20)
                                }
                                else if($(window).width()>768 && $(window).width()<=1024){
                                  set_tpu_info_1024(msg,tpuID)
                                }
                                else{
                                  removeiframe("chart_container_tpu_bar");
                                  draw_tpu(msg.tmpB,[0,1,2,3,4,5,6,7]);
                                  insert_tpuname(8,7);
                                  if(tpuID<8){
                                    tpu_status_set_off(tpuID,msg);
                                  }
                                }
                              }
                              else{
                                if($(window).width()>768 && $(window).width()<=1024){
                                  set_tpu_info_1024(msg,tpuID)
                                }
                                else{
                                  if(tpuID<8){
                                    tpu_status_set_off(tpuID,msg);
                                  }
                                  removeiframe("chart_container_tpu_bar");
                                  draw_tpu(msg.tmpA,[0,1,2,3,4,5,6,7]);
                                  insert_tpuname(0,7);

                                }
                              }

                            }
                            else if (flag==2){
                              set_tpu_info_375(msg,tpuID,10,15)
                            }
                            else if (flag==3){
                              set_tpu_info_375(msg,tpuID,15,20)
                            }
                        });

                        function catchdata(data,msg){
                            data.shift();
                            data.push(msg);
                            return data;
                        }

                        function catchdata_bar(data,msg){

                            if (data.length<1){
                                data.push(msg);
                            }
                            else{
                                data.shift();
                                data.push(msg);
                            }
                            return data;
                        }

                        function draw_tpu(data,tpu_labels){

                            var ctx_tpu_bar = document.querySelector("canvas#TPU_bar_"+$scope.$id).getContext('2d');
                            var gradientStroke_bar = ctx_tpu_bar.createLinearGradient(0, 0, 0, 75);
                            gradientStroke_bar.addColorStop(0, '#00ff7e');
                            gradientStroke_bar.addColorStop(0.5, '#43edef');
                            gradientStroke_bar.addColorStop(1, '#36fdff');
                            var tpu_bar = new Chart(ctx_tpu_bar, {
                                type: 'bar',
                                data: {
                                labels: tpu_labels,
                                datasets: [{
                                    label: "TPU",
                                    fill: false,
                                    lineTension: 0,
                                    data: data,
                                    pointBorderColor: "#4bc0c0",
                                    borderColor: gradientStroke_bar,
                                    backgroundColor:gradientStroke_bar,
                                    borderWidth: 2,
                                    showLine: false,
                                }],
                                },
                                options: {
                                    maintainAspectRatio: false,
                                    scales: {
                                        yAxes: [{
                                            gridLines: {
                                                zeroLineColor:'transparent',
                                                color : 'rgba(255, 255, 255, 0)'


                                              },
                                            ticks: {
                                                max: 100,
                                                min: 0,
                                                stepSize: 10,
                                                display:false
                                            }
                                        }],
                                        xAxes: [{
                                            categoryPercentage: 0.7,
                                            barPercentage: 0.7,
                                            gridLines: {
                                                zeroLineColor:'transparent',
                                                color : 'rgba(255, 255, 255, 0)'

                                              },
                                            ticks: {
                                                display:false
                                            }
                                        }]
                                    }
                                }

                            });
                        }

                        function draw_cpu(data,data_bar,chart_max){
                            var ctx_cpu_line = document.querySelector("canvas#CPU_"+$scope.$id).getContext('2d');
                            var gradientStroke = ctx_cpu_line.createLinearGradient(100, 0, 500, 0);
                            gradientStroke.addColorStop(0, '#27a6fe');
                            gradientStroke.addColorStop(1, '#067bfe');

                            var chart_cpu = new Chart(ctx_cpu_line, {
                              type: 'line',
                              data: {
                                labels: ['','','','','','','','','','','','','','','','','','','','',
                                '','','','','','','','','','','','','','','','','','','','',
                                '','','','','','','','','','','','','','','','','','','',''],
                                datasets: [{
                                    label: "CPU",
                                    backgroundColor: 'rgb(255, 99, 132)',
                                    borderColor: gradientStroke,
                                    borderWidth: 3,
                                    data: data,
                                    fill: false,
                                    spanGaps: true
                                }]
                              },
                              options: {
                                animation: {
                                duration: 0
                                },
                                hover: {
                                  animationDuration: 0
                                },
                                responsiveAnimationDuration: 0,
                                responsive: true,
                                elements:{
                                    point:{
                                        radius:0
                                    }
                                },
                                scales: {
                                    yAxes: [{
                                        gridLines: {
                                          zeroLineColor: 'transparent'
                                        },
                                        ticks: {
                                            max: chart_max,
                                            min: 0,
                                            stepSize: 10,
                                            display:false
                                        }
                                    }],
                                    xAxes: [{
                                        gridLines: {
                                          zeroLineColor: 'transparent'
                                        },
                                        ticks: {
                                            display:false
                                        }
                                    }]
                                },
                                tooltips:{
                                  enabled:false

                                }
                            }
                            });

                            var ctx_cpu_bar = document.querySelector("canvas#CPU_bar_"+$scope.$id).getContext('2d');
                            var gradientStroke_bar = ctx_cpu_bar.createLinearGradient(0, 0, 0, 75);
                            gradientStroke_bar.addColorStop(0, '#087dfe');
                            gradientStroke_bar.addColorStop(1, '#32a9fe');
                            var cpu_bar = new Chart(ctx_cpu_bar, {
                                type: 'bar',
                                data: {
                                labels: ["CPU"],
                                datasets: [{
                                    label: "CPU",
                                    fill: false,
                                    lineTension: 0,
                                    data: data_bar,
                                    pointBorderColor: "#4bc0c0",
                                    borderColor: gradientStroke_bar,
                                    backgroundColor:gradientStroke_bar,
                                    borderWidth: 2,
                                    showLine: false,
                                }],
                                },
                                options: {
                                    maintainAspectRatio: false,
                                    scales: {
                                        yAxes: [{
                                            ticks: {
                                                max: 100,
                                                min: 0,
                                                stepSize: 10,
                                                display:false
                                            }
                                        }],
                                        xAxes: [{
                                            ticks: {
                                                display:false
                                            }
                                        }]
                                    },
                                    tooltips:{
                                      enabled:false
                                    }
                                }

                            });

                        }

                        function draw_ram(data,data_bar,chart_max){
                            var ctx_ram = document.querySelector("canvas#RAM_"+$scope.$id).getContext('2d');
                            var gradientStroke = ctx_ram.createLinearGradient(100, 0, 500, 0);
                            gradientStroke.addColorStop(0, 'rgba(22, 217, 192, 0.94)');
                            gradientStroke.addColorStop(1, '#02c7b2');

                            var chart_ram = new Chart(ctx_ram, {
                              type: 'line',
                              data: {
                                labels: ['','','','','','','','','','','','','','','','','','','','',
                                         '','','','','','','','','','','','','','','','','','','','',
                                         '','','','','','','','','','','','','','','','','','','',''],
                                datasets: [{
                                    label: "RAM",
                                    backgroundColor: 'rgb(255, 99, 132)',
                                    borderColor: gradientStroke,
                                    borderWidth: 3,
                                    data: data,
                                    fill: false
                                }]
                              },
                              options: {
                                animation: {
                                  duration: 0
                                  },
                                  hover: {
                                    animationDuration: 0
                                  },
                                  responsiveAnimationDuration: 0,
                                responsive: true,
                                elements:{
                                    point:{
                                        radius:0
                                    }
                                },
                                scales: {
                                    yAxes: [{
                                        gridLines: {
                                          zeroLineColor: 'transparent'
                                        },
                                        ticks: {
                                            max: chart_max,
                                            min: 0,
                                            stepSize: 10,
                                            display:false
                                        }
                                    }],
                                    xAxes: [{
                                        gridLines: {
                                          zeroLineColor: 'transparent'
                                        },
                                        ticks: {
                                            display:false
                                        }
                                    }]
                                },
                                tooltips:{
                                  enabled:false

                                }
                            }
                            });

                            var ctx_ram_bar = document.querySelector("canvas#RAM_bar_"+$scope.$id).getContext('2d');
                            var gradientStroke_bar = ctx_ram_bar.createLinearGradient(0, 0, 0, 75);
                            gradientStroke_bar.addColorStop(0, '#00a37d');
                            gradientStroke_bar.addColorStop(1, '#02d397');
                            var cpu_bar = new Chart(ctx_ram_bar, {
                                type: 'bar',
                                data: {
                                labels: ["RAM"],
                                datasets: [{
                                    label: "RAM",
                                    fill: false,
                                    lineTension: 0,
                                    data: data_bar,
                                    pointBorderColor: "#4bc0c0",
                                    borderColor: gradientStroke_bar,
                                    backgroundColor:gradientStroke_bar,
                                    borderWidth: 2,
                                    showLine: false,
                                }],
                                },
                                options: {
                                    maintainAspectRatio: false,
                                    scales: {
                                        yAxes: [{
                                            gridLines: {
                                            zeroLineColor: 'transparent'
                                            },
                                            ticks: {
                                                max: 100,
                                                min: 0,
                                                stepSize: 10,
                                                display:false
                                            }
                                        }],
                                        xAxes: [{
                                            gridLines: {
                                            zeroLineColor: 'transparent'
                                             },
                                            ticks: {
                                                display:false
                                            }
                                        }]
                                    }
                                },
                                tooltips:{
                                  enabled:false

                                }

                            });
                        }

                        function insert_tpuname(start,index){
                          var tpuid =start
                          for (var i=0;i<=index;i++){
                            var tpu_name = document.getElementById("TPU_name_"+i);
                            tpu_name.innerHTML = "tpu"+tpuid;
                            tpu_id.appendChild(tpu_name);
                            tpuid++;

                          }

                        }

                        function tpu_status_set_on(tpu_id,msg){
                          var tpu_class = document.getElementById("tpu_status_"+tpu_id);
                          tpu_class.setAttribute("class","tpu_on");
                          var tpu_tooltiptext_class = document.getElementById("tpu_tooltiptext_"+tpu_id);
                          tpu_tooltiptext_class.innerHTML = msg.ModelName;
                        }

                        function tpu_status_set_off(tpu_id,msg){
                          var tpu_class = document.getElementById("tpu_status_"+tpu_id);
                          tpu_class.setAttribute("class","tpu_off");
                          var tpu_tooltiptext_class = document.getElementById("tpu_tooltiptext_"+tpu_id);
                          tpu_tooltiptext_class.innerHTML = "";
                        }

                        function removeiframe(id){
                          var div = document.getElementById(id+$scope.$id);
                          if(div.firstChild) {
                              div.removeChild(div.firstChild);
                          }
                        }

                        function set_tpu_info_375(msg,tpuID,begin_tpu_id,end_tpu_id){
                          var tmpA = msg.tmpA
                          var tmpB = msg.tmpB
                          var tmp_all = tmpA.concat(tmpB);
                          var tpu_label =[0,1,2,3,4];

                          if( tpuID>=begin_tpu_id && tpuID<end_tpu_id ){
                            tpu_status_set_on(tpuID%5,msg);
                          }
                          else{
                            tpu_status_set_off(tpuID%5,msg);
                          }

                          removeiframe("chart_container_tpu_bar");
                          draw_tpu(tmp_all.slice(begin_tpu_id,end_tpu_id),tpu_label);
                          insert_tpuname(begin_tpu_id,tpu_label.length-1)

                        }

                        function set_tpu_info_768(msg,tpuID,begin_tpu_id,end_tpu_id){
                          var tmpA = msg.tmpA
                          var tmpB = msg.tmpB
                          var tmp_all = tmpA.concat(tmpB);
                          var tpu_label =[0,1,2,3,4,5,6,7,8,9,10];
                          if( tpuID>=begin_tpu_id && tpuID<end_tpu_id ){
                            tpu_status_set_on(tpuID%10,msg);
                          }
                          else{
                            tpu_status_set_off(tpuID%10,msg);
                          }
                          removeiframe("chart_container_tpu_bar");
                          draw_tpu(tmp_all.slice(begin_tpu_id,end_tpu_id),tpu_label);
                          insert_tpuname(begin_tpu_id,tpu_label.length-1)
                        }

                        function set_tpu_info_1024(msg,tpuID){
                          var tmpA = msg.tmpA
                          var tmpB = msg.tmpB
                          var tmp_all = tmpA.concat(tmpB);
                          tpu_status_set_on(tpuID,msg);
                          var tpu_label = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]
                          removeiframe("chart_container_tpu_bar");
                          draw_tpu(tmp_all,tpu_label);
                          insert_tpuname(0,tpu_label.length-1)
                        }

                        function set_buton_status_first_page(pre,next){
                          var btn_A = document.getElementById("btn_left"+$scope.$id);
                          var btn_B = document.getElementById("btn_right"+$scope.$id);
                          btn_A.setAttribute("class","btn_left_disable");
                          btn_B.setAttribute("class","btn_right_able");

                          var page1 = document.getElementById("page1_"+$scope.$id);
                          var page2 = document.getElementById("page2_"+$scope.$id);
                          page1.style.color= '#2d5fa8';
                          page1.style.fontWeight= 'bold';
                          page1.innerHTML=pre
                          page2.style.color= '#99a8c3';
                          page2.style.fontWeight= 'normal';
                          page2.innerHTML=next

                        }

                        function set_buton_status_last_page(pre,next){
                          var btn_A = document.getElementById("btn_left"+$scope.$id);
                          var btn_B = document.getElementById("btn_right"+$scope.$id);
                          btn_A.setAttribute("class","btn_left_able");
                          btn_B.setAttribute("class","btn_right_disable");

                          var page1 = document.getElementById("page1_"+$scope.$id);
                          var page2 = document.getElementById("page2_"+$scope.$id);
                          page1.style.color= '#99a8c3';
                          page1.style.fontWeight= 'normal';
                          page1.innerHTML=pre
                          page2.style.color= '#2d5fa8';
                          page2.style.fontWeight= 'bold';
                          page2.innerHTML=next

                        }

                        function set_buton_status_page(pre,next){
                          var btn_A = document.getElementById("btn_left"+$scope.$id);
                          var btn_B = document.getElementById("btn_right"+$scope.$id);
                          btn_A.setAttribute("class","btn_left_able");
                          btn_B.setAttribute("class","btn_right_able");

                          var page1 = document.getElementById("page1_"+$scope.$id);
                          var page2 = document.getElementById("page2_"+$scope.$id);
                          page1.style.color= '#2d5fa8';
                          page1.style.fontWeight= 'bold';
                          page1.innerHTML=pre
                          page2.style.color= '#2d5fa8';
                          page2.style.fontWeight= 'bold';
                          page2.innerHTML=next

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
    RED.nodes.registerType('ui_performance', performanceNode);
};


