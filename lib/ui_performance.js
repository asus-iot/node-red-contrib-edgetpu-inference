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
      var img_path = 'http://'+ip+':1880/node_modules/node-red-contrib-edgetpu-inference/lib/img/'
      if(ui.isDark()){
        var main_color = '#212121'
        var toolbar_color = '#04697c'
        var title_color = '#ffffff'
        var bg_rgba_color = 'rgba(0, 0, 0, 0.38)'
        var tpu_right_color = '#2a3134'
        var info_title_color = '#2fd4ea'
        var info_text_color = '#2fd4ea'
        var cpu_bar_bg_color = '#515762'
        var ram_bar_bg_color = '#515762'
        var tpu_page1_color = '#2fd4ea'
        var tpu_page2_color = '#99a8c3'
        var tooltip_box_shadow = '0px 10px 15px 0 rgba(0, 0, 0, 0.67)'
        var bar_src = img_path+'bar_dark.png'
        var btn_left_able_src = img_path+'btn-left-able_dark.png'
        var btn_right_able_src =  img_path+'btn-right-able_dark.png'
        var btn_left_disable_src =  img_path+'btn-left-disable_dark.png'
        var btn_right_disable_src = img_path+'btn-right-disable_dark.png'
      }
      else{
        var main_color = '#ffffff'
        var toolbar_color = '#2d5fa8'
        var title_color = '#2d5fa8'
        var bg_rgba_color = 'rgba(0, 0, 0, 0)'
        var tpu_right_color = '#ebf1fc'
        var info_title_color = '#5d8de4'
        var info_text_color = '#8989a4'
        var cpu_bar_bg_color = '#c3d7ff'
        var ram_bar_bg_color = '#c6e9f4'
        var tpu_page1_color = '#2d5fa8'
        var tpu_page2_color = '#99a8c3'
        var tooltip_box_shadow = '0px 10px 15px 0 rgba(177, 185, 221, 0.67)'
        var bar_src = img_path+'bar.png'
        var btn_left_able_src = img_path+'btn-left-able.png'
        var btn_right_able_src =  img_path+'btn-right-able.png'
        var btn_left_disable_src =  img_path+'btn-left-disable.png'
        var btn_right_disable_src = img_path+'btn-right-disable.png'
      }
      var html = String.raw`
<style>
@import url("https://fonts.googleapis.com/css2?family=Play&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Roboto&display=swap");
@import url('http://${ip}:1880/node_modules/node-red-contrib-edgetpu-inference/lib/performance_normal.css');
@import url('http://${ip}:1880/node_modules/node-red-contrib-edgetpu-inference/lib/performance_tab_horizontal.css') screen and (min-width: 960px) and (max-width: 1366px);
@import url('http://${ip}:1880/node_modules/node-red-contrib-edgetpu-inference/lib/performance_tab_vertical.css') screen and (min-width: 751px) and (max-width: 959px);
@import url('http://${ip}:1880/node_modules/node-red-contrib-edgetpu-inference/lib/performance_mobile_vertical.css') screen and (max-width : 750px);

html {
  font-size: 12px;
}

.result_bg_pic {
  background: url(http://${ip}:1880/node_modules/node-red-contrib-edgetpu-inference/lib/img/result-bg-pic.png) no-repeat;
}

.chart_bg {
  background: url(http://${ip}:1880/node_modules/node-red-contrib-edgetpu-inference/lib/img/chart-bg.png) no-repeat;
}

@media screen and (max-width: 1366px){
  .chart_bg {
    background: url(http://${ip}:1880/node_modules/node-red-contrib-edgetpu-inference/lib/img/chart-bg_tab_1024.png) no-repeat;
  }
}

@media all and (max-width: 959px){
  .chart_bg {
    background: url(http://${ip}:1880/node_modules/node-red-contrib-edgetpu-inference/lib/img/chart-bg_tab_768.png) no-repeat;
  }
}

@media all and (device-width: 959px) and (device-height: 1024px) and (orientation:portrait) {
  .chart_bg {
    background: url(http://${ip}:1880/node_modules/node-red-contrib-edgetpu-inference/lib/img/chart-bg_tab_768.png) no-repeat;
  }
}

@media screen and (max-width: 750px){
  .chart_bg {
    background: url(http://${ip}:1880/node_modules/node-red-contrib-edgetpu-inference/lib/img/chart-bg_mobile_375.png) no-repeat;
  }

  .result_bg_pic {
    background: url(http://${ip}:1880/node_modules/node-red-contrib-edgetpu-inference/lib/img/result-bg-pic_375.png) no-repeat;
  }
}

.btn_left_able {
  background: url(${btn_left_able_src}) no-repeat;
}

.btn_left_disable {
  background: url(${btn_left_disable_src}) no-repeat;
}

.btn_right_able {
  background: url(${btn_right_able_src}) no-repeat;
}

.btn_right_disable {
  background: url(${btn_right_disable_src}) no-repeat;
}

.tpu_off {
  background: url("http://${ip}:1880/node_modules/node-red-contrib-edgetpu-inference/lib/img/ic-tpu-off.png") no-repeat;
}

.tpu_on {
  background: url("http://${ip}:1880/node_modules/node-red-contrib-edgetpu-inference/lib/img/ic-tpu-on.png") no-repeat;
}

:root {
  --main-color: ${main_color};
  --toolbar-color : ${toolbar_color};
  --title-color: ${title_color};
  --bg-rgba-color: ${bg_rgba_color};
  --tpu-right-color: ${tpu_right_color};
  --info-title-color: ${info_title_color};
  --info-text-color: ${info_text_color};
  --cpu-bar-bg-color: ${cpu_bar_bg_color};
  --ram-bar-bg-color: ${ram_bar_bg_color};
  --tpu-page1-color: ${tpu_page1_color};
  --tpu-page2-color: ${tpu_page2_color};
  --tooltip-box-shadow: ${tooltip_box_shadow};
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

.bg_p {
  background-image: linear-gradient(to bottom, var(--bg-rgba-color), var(--bg-rgba-color)), linear-gradient(to top, #2e5fa8, #4b87ce, #58adbd, #59ceb7);
}

.bg_p > div {
  background-color: var(--main-color);
}

.Performance-Node{
  background-color: unset !important;
}

.tpu_right{
  background-color: var(--tpu-right-color);
}

.info_title{
  color: var(--info-title-color);
}

.info_left > div{
  color: var(--info-text-color);
}

.info_right > div{
  color: var(--info-text-color);
}

.info_title_tpu{
  color: var(--info-title-color);
}

.tpu_left > div{
  color: var(--info-text-color);
}

.tpu_id > div{
  color: var(--info-text-color);
}

.cpu_bar_bg {
  background: var(--cpu-bar-bg-color);
}

.ram_bar_bg {
  background: var(--ram-bar-bg-color);
}

.tpu_page1{
  color: var(--tpu-page1-color)
}

.tpu_page2{
  color: var(--tpu-page2-color)
}

.tooltip .tooltiptext{
  box-shadow: var(--tooltip-box-shadow);
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
    <canvas class="chart_canvas" id="CPU_{{$id}}"></canvas>
  </div>
  <div class="chart_container_cpu_bar" id="chart_container_cpu_bar{{$id}}">
    <canvas class="bar_canvas" id="CPU_bar_{{$id}}"></canvas>
  </div>
  <div class='info_header'>
    <div class='info_title'>CPU : {{msg.cpu}}%</div>
  </div>
  <div class='info_left'>
    <div class='High'>High</div>
    <div class='cpu_bar_bg'>
      <img src=${bar_src} class="bar_mask">
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
    <canvas class="chart_canvas" id="RAM_{{$id}}"></canvas>
  </div>

  <div class="chart_container_ram_bar" id="chart_container_ram_bar{{$id}}">
    <canvas class="bar_canvas" id="RAM_bar_{{$id}}"></canvas>
  </div>

  <div class='info_header'>
    <div class='info_title'>RAM : {{msg.ram}}%</div>
  </div>
  <div class='info_left'>
    <div class='High'>High</div>
    <div class='ram_bar_bg'>
      <img src=${bar_src} class="bar_mask">
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

  <div id="tpu_right{{$id}}" class='tpu_right'>

  </div>

  <div class='tpu_id' id="tpu_id{{$id}}">

  </div>

  <div class='tpu_btn_container' id="tpu_btn_container_{{$id}}">
    <input type="button" ng-click="click_A()" id="btn_left{{$id}}" class="btn_left_disable"></button>
    <div id='page1_{{$id}}' class ='tpu_page1'>1</div>
    <div class ='slash'> / </div>
    <div id='page2_{{$id}}' class ='tpu_page2'>2</div>
    <input type="button" ng-click="click_B()" id="btn_right{{$id}}" class="btn_right_able"></button>

  </div>

  <div class="chart_container_tpu_bar" id="chart_container_tpu_bar{{$id}}">
    <canvas class="tpu_bar_canvas" id="TPU_bar_{{$id}}"></canvas>
  </div>

</div>

</div>

<script>

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
                      var zero_temp = "null";
                      temp.push(zero_temp);
                    }
                  }
                }
                  return temp;
            }

            var meminfo = require('../package/node-meminfo');
            var os = require('../package/os');
            this.previousTotalTick = [];
            this.previousTotalIdle = [];
            var node = this;
            var flowContext = this.context().global;

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
            var ip = config.ip;
            var IsDarkMode = ui.isDark();

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
                        msg.tpuID = flowContext.get("tpuID");
                        msg.ModelName = flowContext.get("ModelName");
                        let date = new Date(msg.payload)
                        msg.getseconds = date.getSeconds()
                        msg.ip=ip;
                        msg.IsDarkMode=IsDarkMode;
                        msg.tpucount=tpu_count;
                        if (tpu_count>8){
                          msg.tmpA = tputemp(0,7);
                          msg.tmpB = tputemp(8,tpu_count-1);
                        }
                        else{
                          msg.tmpA = tputemp(0,tpu_count-1)
                          msg.tmpB = [null,null,null,null,null,null,null,null];
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
                        let flag=null
                        var tpuid_map_modelname = new Map();
                        $scope.$watch('msg', function(msg) {
                            var cpu_data = catchdata(cpudata,msg.cpu);
                            var ram_data = catchdata(ramdata,msg.ram);
                            var cpu_data_bar = catchdata_bar(cpudata_bar,msg.cpu);
                            var ram_data_bar = catchdata_bar(ramdata_bar,msg.ram);
                            var str = msg.tpuID
                            var tpuID =str.replace("pci: ","");
                            tpuid_map_modelname.set(parseInt(tpuID, 10),msg.ModelName)

                            removeDiv();
                            if($(window).width() <=750){
                              add_tpu_info(4,msg)
                            }
                            else if($(window).width() > 750 && $(window).width() <= 959){
                              add_tpu_info(10,msg)
                            }
                            else if($(window).width() >959 && $(window).width() <= 1366){
                              add_tpu_info(15,msg)
                            }
                            else{
                              add_tpu_info(7,msg)
                            }

                            window.addEventListener("orientationchange", function(){
                              removeDiv();
                              if(window.orientation==0 || window.orientation==180){
                                if($(window).width()<=959){
                                  add_tpu_info(10,msg)
                                }
                                else{
                                  add_tpu_info(15,msg)
                                }
                              }
                              else{
                                add_tpu_info(15,msg)
                              }
                            }, false);

                            $(document).ready(function(){
                              $(window).resize(function() {
                                removeDiv();
                                if($(window).width() <= 750){
                                  add_tpu_info(4,msg)
                                }
                                else if($(window).width() > 750 && $(window).width() <= 959){
                                  add_tpu_info(10,msg)
                                }
                                else if($(window).width() >959 && $(window).width() <= 1366){
                                  add_tpu_info(15,msg)
                                }
                                else{
                                  add_tpu_info(7,msg)
                                }
                              });
                            });

                            if(window.orientation==0 || window.orientation==180 || !window.orientation){
                              if($(window).width() <= 750){ // vertical iphone X
                                var chart_max = 160;
                                if(parseInt(msg.tpucount, 10)>=6 && parseInt(msg.tpucount, 10)<=10){
                                  var total_page = 2;
                                }
                                else{
                                  var total_page = 4;
                                }
                                set_tpu_info(msg,tpuid_map_modelname,0,5,[0,1,2,3,4])
                              }
                              else if($(window).width() > 750 && $(window).width() <= 959 ){
                                var chart_max = 350;
                                set_tpu_info(msg,tpuID,0,11,[0,1,2,3,4,5,6,7,8,9,10])
                              }
                              else if($(window).width() > 959 && $(window).width() <= 1366){
                                var chart_max = 500;
                                set_tpu_info(msg,tpuid_map_modelname,0,16,[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15])
                              }
                              else{
                                var chart_max = 225;
                                set_tpu_info(msg,tpuID,0,8,[0,1,2,3,4,5,6,7])
                              }
                            }
                            else {
                              var chart_max = 500; //horizontal ipad
                              set_tpu_info(msg,tpuid_map_modelname,0,16,[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15])
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
                                    set_buton_status_first_page(1,2,msg)
                                  }
                                  else if(current_page==1){
                                    flag=1
                                    set_buton_status_page(2,3,msg)
                                  }
                                  else if(current_page==2){
                                    flag=2
                                    set_buton_status_page(3,4,msg)
                                  }
                                }
                                else{
                                  if(current_page<0 || current_page==0){
                                    flag=0;
                                    current_page = 0
                                  }
                                  set_buton_status_first_page(1,2,msg)
                                }

                            }

                            $scope.click_B = function(){
                              current_page = current_page+1
                              if(total_page==4){
                                if(current_page==1){
                                  flag=1
                                  set_buton_status_page(2,3,msg)
                                }
                                else if(current_page==2){
                                  flag=2
                                  set_buton_status_page(3,4,msg)
                                }
                                else if(current_page>2){
                                  current_page = 3
                                  flag=3
                                  set_buton_status_last_page(3,4,msg)
                                }
                              }
                              else{
                                if(current_page>0 || current_page==0){
                                  flag =1;
                                  current_page = 1

                                }
                                set_buton_status_last_page(1,2,msg)
                              }

                            }

                            if (flag==0 || flag==null){

                              if(window.orientation==0 || window.orientation==180 || !window.orientation){
                                if($(window).width()<=750){
                                  set_tpu_info(msg,tpuid_map_modelname,0,5,[0,1,2,3,4])
                                }
                                else if($(window).width()>750 && $(window).width()<=959){
                                  set_tpu_info(msg,tpuid_map_modelname,0,11,[0,1,2,3,4,5,6,7,8,9,10])
                                }
                                else if($(window).width()>959 && $(window).width()<=1366){
                                  set_tpu_info(msg,tpuid_map_modelname,0,16,[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15])
                                }
                                else{
                                  set_tpu_info(msg,tpuid_map_modelname,0,8,[0,1,2,3,4,5,6,7])
                                }

                              }
                              else{
                                if($(window).width()>959 && $(window).width()<=1366){
                                  set_tpu_info(msg,tpuid_map_modelname,0,16,[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15])
                                }
                                else{
                                  set_tpu_info(msg,tpuid_map_modelname,0,8,[0,1,2,3,4,5,6,7])
                                }
                              }

                            }
                            else if (flag==1){
                              if(window.orientation==0 || window.orientation==180 || !window.orientation){
                                if($(window).width()<=750){
                                  set_tpu_info(msg,tpuid_map_modelname,5,10,[0,1,2,3,4])
                                  if(parseInt(msg.tpucount, 10)>=6 && parseInt(msg.tpucount, 10)<=10){
                                    hide_tpuinfo(parseInt(msg.tpucount, 10)-5,4)
                                  }

                                }
                                else if($(window).width()>750 && $(window).width()<=959){
                                  set_tpu_info(msg,tpuid_map_modelname,11,20,[0,1,2,3,4,5,6,7,8,9,10])
                                  if(parseInt(msg.tpucount, 10)>=12 && parseInt(msg.tpucount, 10)<=22){
                                    hide_tpuinfo(parseInt(msg.tpucount, 10)-11,21)
                                  }
                                }
                                else if($(window).width()>959 && $(window).width()<=1366){
                                  set_tpu_info(msg,tpuid_map_modelname,0,16,[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15])
                                }
                                else{
                                  set_tpu_info(msg,tpuid_map_modelname,8,16,[0,1,2,3,4,5,6,7])
                                }
                              }
                              else{
                                if($(window).width()>959 && $(window).width()<=1366){
                                  set_tpu_info(msg,tpuid_map_modelname,0,16,[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15])
                                }
                                else{
                                  set_tpu_info(msg,tpuid_map_modelname,8,16,[0,1,2,3,4,5,6,7])
                                }
                              }

                            }
                            else if (flag==2){
                              set_tpu_info(msg,tpuid_map_modelname,10,15,[0,1,2,3,4])
                            }
                            else if (flag==3){
                              set_tpu_info(msg,tpuid_map_modelname,15,20,[0,1,2,3,4])
                              hide_tpuinfo(1,4)
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
                                                color : 'transparent'


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
                                                color : 'transparent'

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
                                          zeroLineColor: 'transparent',
                                          color : 'transparent'
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
                                          zeroLineColor: 'transparent',
                                          color : 'transparent'
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
                                          gridLines: {
                                            zeroLineColor: 'transparent',
                                            color : 'transparent'
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
                                            zeroLineColor: 'transparent',
                                            color : 'transparent'
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
                                responsive: true,
                                elements:{
                                    point:{
                                        radius:0
                                    }
                                },
                                scales: {
                                    yAxes: [{
                                        gridLines: {
                                          zeroLineColor: 'transparent',
                                          color : 'transparent'
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
                                          zeroLineColor: 'transparent',
                                          color : 'transparent'
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
                                            zeroLineColor: 'transparent',
                                            color : 'transparent'
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
                                            zeroLineColor: 'transparent',
                                            color : 'transparent'
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

                        function add_tpu_info(index,msg){

                          var tpu_right = document.getElementById("tpu_right"+$scope.$id);

                          var tpu_status_info=document.createElement("div");
                          tpu_status_info.setAttribute("class","tpu_status_info");
                          tpu_status_info.setAttribute("id","tpu_status_info"+$scope.$id);

                          for (var i=0;i<=index;i++){
                            var   tpu_status=document.createElement("div");
                            tpu_status.setAttribute("class","tpu_off");
                            tpu_status.setAttribute("id","tpu_status_"+$scope.$id+i);
                            tpu_status_info.appendChild(tpu_status);
                          }

                          tpu_right.appendChild(tpu_status_info);
                          if(msg.IsDarkMode){
                            var tpu_bar_cover = 'tpu-cover_dark.png'
                          }
                          else{
                            var tpu_bar_cover = 'tpu-cover.png'
                          }
                          for (var i=0;i<=index;i++){
                            var tooltip=document.createElement("div");
                            tooltip.setAttribute("class","tooltip");
                            tooltip.setAttribute("id","tpu_tooltip_"+$scope.$id+i)
                            var tpu_bar_mask=document.createElement("img");
                            tpu_bar_mask.setAttribute("class","tpu_bar_mask");
                            tpu_bar_mask.setAttribute("src", "http://"+msg.ip+":1880/node_modules/node-red-contrib-edgetpu-inference/lib/img/"+tpu_bar_cover)
                            var tooltiptext=document.createElement("div");
                            tooltiptext.setAttribute("class","tooltiptext");
                            tooltiptext.setAttribute("id","tpu_tooltiptext_"+$scope.$id+i);
                            tooltip.appendChild(tpu_bar_mask);
                            tooltip.appendChild(tooltiptext);
                            tpu_right.appendChild(tooltip);
                          }

                          var tpu_id = document.getElementById("tpu_id"+$scope.$id);
                          for (var i=0;i<=index;i++){
                            var tpu_name =document.createElement("div");
                            tpu_name.setAttribute("class","TPU_name");
                            tpu_name.setAttribute("id","TPU_name_"+$scope.$id+i)
                            tpu_name.innerHTML = "tpu"+i;
                            tpu_id.appendChild(tpu_name);
                          }

                          if(parseInt(msg.tpucount, 10)-1>index){
                            var tpu_btn_container = document.getElementById("tpu_btn_container_"+$scope.$id);
                            tpu_btn_container.style.visibility = "visible";
                          }
                          else{
                            hide_tpuinfo(parseInt(msg.tpucount, 10),index)
                            var tpu_btn_container = document.getElementById("tpu_btn_container_"+$scope.$id);
                            tpu_btn_container.style.visibility = "hidden";
                          }

                        }

                        function hide_tpuinfo(tpuhide_start_index,tpuhide_end_index){
                          for (var i=tpuhide_start_index;i<=tpuhide_end_index;i++){
                            var tpu_status = document.getElementById("tpu_status_"+$scope.$id+i);
                            tpu_status.style.visibility = "hidden";
                            var tooltip = document.getElementById("tpu_tooltip_"+$scope.$id+i);
                            tooltip.style.visibility = "hidden";
                            var tpu_name = document.getElementById("TPU_name_"+$scope.$id+i);
                            tpu_name.style.visibility = "hidden";
                          }
                        }

                        function removeDiv(){
                          var tpu_right = document.getElementById("tpu_right"+$scope.$id);
                          while(tpu_right.firstChild) {
                            tpu_right.removeChild(tpu_right.firstChild);
                          }

                          var tpu_id = document.getElementById("tpu_id"+$scope.$id);
                          while(tpu_id.firstChild) {
                            tpu_id.removeChild(tpu_id.firstChild);
                          }
                        }

                        function insert_tpuname(start,index){
                          var tpuid =start
                          var tpu_id = document.getElementById("tpu_id"+$scope.$id);
                          for (var i=0;i<=index;i++){
                            var tpu_name = document.getElementById("TPU_name_"+$scope.$id+i);
                            tpu_name.innerHTML = "TPU"+tpuid;
                            //tpu_id.appendChild(tpu_name);
                            tpuid++;
                          }

                        }

                        function tpu_status_set_on(tpu_id,model_name){
                          var tpu_class = document.getElementById("tpu_status_"+$scope.$id+tpu_id);
                          tpu_class.setAttribute("class","tpu_on");
                          var tpu_tooltiptext_class = document.getElementById("tpu_tooltiptext_"+$scope.$id+tpu_id);
                          var modelname=document.createElement("div");
                          modelname.setAttribute("class","Model_Name");
                          modelname.innerHTML=model_name;
                          tpu_tooltiptext_class.style.display='inline';
                          tpu_tooltiptext_class.innerHTML = "Model Name:";
                          tpu_tooltiptext_class.appendChild(modelname);
                        }

                        function tpu_status_set_off(tpu_id){
                          var tpu_class = document.getElementById("tpu_status_"+$scope.$id+tpu_id);
                          tpu_class.setAttribute("class","tpu_off");
                          var tpu_tooltiptext_class = document.getElementById("tpu_tooltiptext_"+$scope.$id+tpu_id);
                          tpu_tooltiptext_class.style.display='none';
                          tpu_tooltiptext_class.innerHTML = "";
                        }

                        function removeiframe(id){
                          var div = document.getElementById(id+$scope.$id);
                          if(div.firstChild) {
                              div.removeChild(div.firstChild);
                          }
                        }

                        function set_tpu_info(msg,tpuid_map_modelname,begin_tpu_id,end_tpu_id,tpu_label){
                          var tmpA = msg.tmpA
                          var tmpB = msg.tmpB
                          var tmp_all = tmpA.concat(tmpB);

                          for(var i=0;i<tpu_label.length;i++){
                            tpu_status_set_off(i);
                          }

                          if (tpuid_map_modelname.size>0){
                            for (var [key, value] of tpuid_map_modelname) {
                              if( key>=begin_tpu_id && key<end_tpu_id ){
                                tpu_status_set_on(key%tpu_label.length,value);
                              }
                            }
                          }

                          removeiframe("chart_container_tpu_bar");
                          draw_tpu(tmp_all.slice(begin_tpu_id,end_tpu_id),tpu_label);
                          insert_tpuname(begin_tpu_id,tpu_label.length-1)
                        }

                        function set_buton_status_first_page(pre,next,msg){
                          var btn_A = document.getElementById("btn_left"+$scope.$id);
                          var btn_B = document.getElementById("btn_right"+$scope.$id);
                          btn_A.setAttribute("class","btn_left_disable");
                          btn_B.setAttribute("class","btn_right_able");

                          if (msg.IsDarkMode){
                            page1_color='#2fd4ea'
                          }
                          else{
                            page1_color='#2d5fa8'
                          }
                          var page1 = document.getElementById("page1_"+$scope.$id);
                          var page2 = document.getElementById("page2_"+$scope.$id);
                          page1.style.color= page1_color;
                          page1.style.fontWeight= 'bold';
                          page1.innerHTML=pre
                          page2.style.color= '#99a8c3';
                          page2.style.fontWeight= 'normal';
                          page2.innerHTML=next

                        }

                        function set_buton_status_last_page(pre,next,msg){
                          var btn_A = document.getElementById("btn_left"+$scope.$id);
                          var btn_B = document.getElementById("btn_right"+$scope.$id);
                          btn_A.setAttribute("class","btn_left_able");
                          btn_B.setAttribute("class","btn_right_disable");

                          if (msg.IsDarkMode){
                            page2_color='#2fd4ea'
                          }
                          else{
                            page2_color='#2d5fa8'
                          }
                          var page1 = document.getElementById("page1_"+$scope.$id);
                          var page2 = document.getElementById("page2_"+$scope.$id);
                          page1.style.color= '#99a8c3';
                          page1.style.fontWeight= 'normal';
                          page1.innerHTML=pre
                          page2.style.color= page2_color;
                          page2.style.fontWeight= 'bold';
                          page2.innerHTML=next

                        }

                        function set_buton_status_page(pre,next,msg){
                          var btn_A = document.getElementById("btn_left"+$scope.$id);
                          var btn_B = document.getElementById("btn_right"+$scope.$id);
                          btn_A.setAttribute("class","btn_left_able");
                          btn_B.setAttribute("class","btn_right_able");

                          if (msg.IsDarkMode){
                            page_color='#2fd4ea'
                          }
                          else{
                            page_color='#2d5fa8'
                          }
                          var page1 = document.getElementById("page1_"+$scope.$id);
                          var page2 = document.getElementById("page2_"+$scope.$id);
                          page1.style.color= page_color;
                          page1.style.fontWeight= 'bold';
                          page1.innerHTML=pre
                          page2.style.color= page_color;
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


