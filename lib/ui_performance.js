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

        var title = config.title;

        var html = String.raw`
        <style>
        @import url("https://fonts.googleapis.com/css2?family=Play&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Roboto&display=swap");

html {
  font-size: 12px;
}

.bg_p {
  width: 430px;
  height: 713px;
  border-radius: 16px;
  box-shadow: 0px 8px 13px 0 rgba(6, 56, 70, 0.33);
  background-image: linear-gradient(to top, #2e5fa8, #4b87ce, #58adbd, #59ceb7);
  display: grid;
  grid-template-columns: 29px 372px 29px;
  grid-template-rows: 60px 185px 30px 185px 31px 195px 27px;
}

.Performance-Node {
  width: 209px;
  height: 17px;
  margin: 21px 0px 0px 8px;
  font-family: "Play", sans-serif;
  font-size: 2rem;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  color: #fefeff;
  z-index:10;
}

.info_header {
  height: 35px;
  margin-top: 0px;
}

.info_left {
  width: 43px;
  height: 150px;
  float: left;
}

.cpu_info {
  width: 372px;
  height: 185px;
  box-shadow: 0px 10px 18px 0 rgba(40, 93, 147, 0.33);
  border-radius: 10px;
  background-color: #ffffff;
  grid-column: 2 / 3;
  grid-row: 2 / 3;
}

.ram_info {
  width: 372px;
  height: 185px;
  box-shadow: 0px 10px 18px 0 rgba(40, 93, 147, 0.33);
  border-radius: 10px;
  background-color: #ffffff;
  grid-column: 2 / 3;
  grid-row: 4 / 5;
}

.tpu_info {
  width: 372px;
  height: 195px;
  box-shadow: 0px 10px 18px 0 rgba(40, 93, 147, 0.33);
  border-radius: 10px;
  background-color: #50b1ec;
  grid-column: 2 / 3;
  grid-row: 6 / 7;
}

.info_title {
  width: 100px;
  height: 12px;
  padding: 16px 0px 0px 21px;
  font-family: Play;
  font-size: 1.54rem;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  color: #5d8de4;
}

.info_title_tpu {
  width: auto;
  height: 17px;
  padding: 16px 10px 0px 21px;
  font-family: Play;
  font-size: 1.54rem;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  display: inline-block;
  color: #ffffff;
}

.performance_bg_up_pic {
  width: 242px;
  height: 214px;
  margin: 0px 0px 0px -214px;
  object-fit: contain;
}

.performance_bg_down_pic {
  width: 169px;
  height: 174px;
  margin: 538px 5px 0px 8px;
  margin-left: 0px;
  object-fit: contain;
}

.ic_cpu {
  width: 77px;
  height: 78px;
  position: absolute;
  top: 31px;
  left: 335px;
  object-fit: contain;
}

.ic_ram {
  width: 77px;
  height: 78px;
  position: absolute;
  top: 250px;
  left: 335px;
  object-fit: contain;
}

.ic_tpu {
  width: 77px;
  height: 78px;
  position: absolute;
  top: 465px;
  left: 335px;
  object-fit: contain;
}

.High {
  width: 24px;
  height: 12px;
  padding: 15px 0px 0px 22px;
  font-family: Roboto;
  font-size: 1rem;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  color: #8989a4;
}

.Low {
  width: 22px;
  height: 9px;
  padding: 4px 0px 0px 22px;
  font-family: Roboto;
  font-size: 1rem;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  color: #8989a4;
}

.per {
  width: 29px;
  height: 9px;
  padding: 16px 0px 14px 19px;
  font-family: Roboto;
  font-size: 1rem;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  color: #8989a4;
  display: inline-block;
}

.line {
  width: 296px;
  height: 0.1px;
  margin: 0px 0px 18px 64px;
  opacity: 0.32;
  border: solid 1px #99baff;
  background-color: #99baff;
}

.line-last {
  width: 296px;
  height: 0.1px;
  margin: 0px 0px 8px 64px;
  opacity: 0.32;
  border: solid 1px #99baff;
  background-color: #99baff;
}

.minute {
  width: 19px;
  height: 9px;
  margin: 0px 0px 0px 20px;
  font-family: Roboto;
  font-size: 1rem;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  color: #8989a4;
  display: inline-block;
}

.s {
  width: 10px;
  height: 9px;
  margin: 0px 0px 0px 260px;
  font-family: Roboto;
  font-size: 1rem;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  color: #8989a4;
  display: inline-block;
}

.bar_mask {
  width: 26px;
  height: 91px;
  object-fit: contain;
  margin: -1.5px 0px 0px -1px;
  position: absolute;
  z-index: 10;
}

.tpu_bar_mask {
  width: 34px;
  height: 99px;
  margin: -1.5px 0px 0px -1px;
  position: absolute;
  z-index: 10;
}

.cpu_bar_bg {
  width: 24px;
  height: 88px;
  margin: 9px 0px 0px 22px;
  background: #c3d7ff;
}

.ram_bar_bg {
  width: 24px;
  height: 88px;
  margin: 9px 0px 0px 22px;
  background: #c6e9f4;
}

.tpu_bar_bg {
  width: 32px;
  height: 97px;
  margin: 0px 1.8px -5px 0px;
  display: inline-block;
  background: #153e83;
}

.tooltip {
  width: 32px;
  height: 97px;
  margin: 0px 1.8px -5px 0px;
  display: inline-block;
  background: #153e83;
  position: relative;
  display: inline-block;
}

.tooltip .tooltiptext {
    visibility: hidden;
    width: 120px;
    height :60px;
    background-color: #ffffff;
    color: #454545;
    text-align: center;
    border-radius: 6px;
    padding: 5px 0;
    position: absolute;
    top:-60px;
    left:-40px;
    z-index: 20;
    word-break: break-all;
}

.tooltip:hover .tooltiptext {
    visibility: visible;
    word-break: break-all;
}

.chart_container_cpu {
  position: absolute;
  top: 78px;
  left: 90px;
  margin: auto;
  height: 50px;
  width: 295px;
}

.chart_container_cpu_bar {
  position: absolute;
  top: 134px;
  left: 42px;
  margin: auto;
  height: 96px;
  width: 49px;
}

.chart_container_ram {
  position: absolute;
  top: 293px;
  left: 90px;
  margin: auto;
  height: 50px;
  width: 295px;
}

.chart_container_ram_bar {
  position: absolute;
  top: 349px;
  left: 42px;
  margin: auto;
  height: 96px;
  width: 49px;
}

.chart_container_tpu_bar {
  position: absolute;
  margin: auto;
  top: 569px;
  left: 81px;
  height: 103px;
  width: 314px;
}

.tpu_right {
  height: 160px;
  width: 311px;
  float: right;
}

.oC {
  width: 20px;
  height: 12px;
  margin: 17px 0px 13px 27px;
  font-family: Roboto;
  font-size: 0.92rem;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #b9e5ff;
}

.temp_info {
  width: 18px;
  height: 8px;
  margin: 2px 0px 7.5px 27px;
  font-family: Roboto;
  font-size: 0.92rem;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: right;
  color: #b9e5ff;
}

.TPU_name {
  width: 26px;
  height: 8px;
  margin: 0px 5px 0px 2.8px;
  font-family: Play;
  font-size: 0.92rem;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  color: #b9e5ff;
  display: inline-block;
}

.nr-dashboard-theme .nr-dashboard-template .md-button {
  margin: 0px -2.6px 5px 0px;
  min-height: 18px;
  min-width: unset;
  line-height: unset;
  display: inline-block;
  background-color: #50b1ec;
}

.nr-dashboard-theme .nr-dashboard-template .md-button:not(:first-of-type) {
  margin-top: 0px;
}

.btn_left{
  background: url(http://localhost:1880/node_modules/node-red-contrib-edgetpu-inference/lib/img/btn-left-able.png) no-repeat ;
  border: none;
  width: 16px;
  height: 18px;
}

.btn_left_after{
  background: url(http://localhost:1880/node_modules/node-red-contrib-edgetpu-inference/lib/img/btn-left-disable.png) no-repeat ;
  border: none;
  width: 16px;
  height: 18px;
}

.btn_right{
  background: url(http://localhost:1880/node_modules/node-red-contrib-edgetpu-inference/lib/img/btn-right-able.png)no-repeat ;
  border: none;
  width: 16px;
  height: 18px;
}

.btn_right_after{
  background: url(http://localhost:1880/node_modules/node-red-contrib-edgetpu-inference/lib/img/btn-right-disable.png)no-repeat ;
  border: none;
  width: 16px;
  height: 18px;
}

.tpu_status{
  margin: 0px 0px 18px 5px;
  width: auto;
  height: 22px;
}

.tpu_off{
  background: url("http://localhost:1880/node_modules/node-red-contrib-edgetpu-inference/lib/img/ic-tpu-off.png") no-repeat ;
  margin: 12px 11.7px 0px 0px;
  height: 22px;
  width: 22px;
  object-fit: contain;
  display: inline-block;
}

.tpu_on{
  background: url("http://localhost:1880/node_modules/node-red-contrib-edgetpu-inference/lib/img/ic-tpu-on.png") no-repeat ;
  margin: 12px 11.7px 0px 0px;
  height: 22px;
  width: 22px;
  object-fit: contain;
  display: inline-block;
}

.button{
  width:100px;
  text-align: center;
  color:#fff;
  font-size:3em;
}
.button:hover .hover{
  display:block;
}
.hover{
  display:none;
  background-color:#ffb2b2;
}

</style>

<div class='bg_p'>

<img src="http://localhost:1880/node_modules/node-red-contrib-edgetpu-inference/lib/img/performance-bg-down-pic.png" class="performance_bg_down_pic">
<div class='Performance-Node'>Performance Node</div>
<img src="http://localhost:1880/node_modules/node-red-contrib-edgetpu-inference/lib/img/performance-bg-up-pic.png" class="performance_bg_up_pic">
<img src="http://localhost:1880/node_modules/node-red-contrib-edgetpu-inference/lib/img/ic-cpu.png" class="ic_cpu">
<img src="http://localhost:1880/node_modules/node-red-contrib-edgetpu-inference/lib/img/ic-ram.png" class="ic_ram">
<img src="http://localhost:1880/node_modules/node-red-contrib-edgetpu-inference/lib/img/ic-tpu.png" class="ic_tpu">

<div class='cpu_info'>
  <div class="chart_container_cpu">
    <canvas id="CPU_{{$id}}"></canvas>
  </div>
  <div class="chart_container_cpu_bar">
    <canvas id="CPU_bar_{{$id}}"></canvas>
  </div>
  <div class='info_header'>
    <div class='info_title'>CPU : {{msg.cpu}}%</div>
  </div>
  <div class='info_left'>
    <div class='High'>High</div>
    <div class='cpu_bar_bg'>
      <img src="http://localhost:1880/node_modules/node-red-contrib-edgetpu-inference/lib/img/bar.png" class="bar_mask">
    </div>
    <div class='Low'>Low</div>
  </div>

  <div class='per'>100%</div>
  <div class='line'></div>
  <div class='line'></div>
  <div class='line'></div>
  <div class='line'></div>
  <div class='line-last'></div>
  <div class='minute'>60s</div>
  <div class='s'>0s</div>
</div>

<div class='ram_info'>
  <div class="chart_container_ram">
    <canvas id="RAM_{{$id}}"></canvas>
  </div>

  <div class="chart_container_ram_bar">
    <canvas id="RAM_bar_{{$id}}"></canvas>
  </div>

  <div class='info_header'>
    <div class='info_title'>RAM : {{msg.ram}}%</div>
  </div>
  <div class='info_left'>
    <div class='High'>High</div>
    <div class='ram_bar_bg'>
      <img src="http://localhost:1880/node_modules/node-red-contrib-edgetpu-inference/lib/img/bar.png" class="bar_mask">
    </div>
    <div class='Low'>Low</div>

  </div>

  <div class='per'>100%</div>
  <div class='line'></div>
  <div class='line'></div>
  <div class='line'></div>
  <div class='line'></div>
  <div class='line-last'></div>
  <div class='minute'>60s</div>
  <div class='s'>0s</div>
</div>

<div class='tpu_info'>
  <div class='info_header'>
    <div class='info_title_tpu'>TPU</div>

    <md-button ng-click="click_A()" id="btn_left{{$id}}" class=" btn_left" ></md-button>
    <md-button ng-click="click_B()" id="btn_right{{$id}}" class="btn_right" ></md-button>
  </div>

  <div class='info_left'>
    <div class='oC'>(℃)</div>
    <div class='temp_info'>100</div>
    <div class='temp_info'>80</div>
    <div class='temp_info'>60</div>
    <div class='temp_info'>40</div>
    <div class='temp_info'>20</div>
    <div class='temp_info'>0</div>
  </div>
  <div class='tpu_right'>

    <div class='tpu_status'>
      <div id="tpu_status_0{{$id}}" class='tpu_off'></div>
      <div id="tpu_status_1{{$id}}" class='tpu_off'></div>
      <div id="tpu_status_2{{$id}}" class='tpu_off'></div>
      <div id="tpu_status_3{{$id}}" class='tpu_off'></div>
      <div id="tpu_status_4{{$id}}" class='tpu_off'></div>
      <div id="tpu_status_5{{$id}}" class='tpu_off'></div>
      <div id="tpu_status_6{{$id}}" class='tpu_off'></div>
      <div id="tpu_status_7{{$id}}" class='tpu_off'></div>
    </div>

    <div class='tooltip'>
      <img src="http://localhost:1880/node_modules/node-red-contrib-edgetpu-inference/lib/img/bar-blue.png" class="tpu_bar_mask">
      <div class="tooltiptext" id="tpu_tooltiptext_0{{$id}}" ></div>
    </div>
    <div class='tooltip'>
      <img src="http://localhost:1880/node_modules/node-red-contrib-edgetpu-inference/lib/img/bar-blue.png" class="tpu_bar_mask">
      <span class="tooltiptext" id="tpu_tooltiptext_1{{$id}}" ></span>
    </div>
    <div class='tooltip'>
      <img src="http://localhost:1880/node_modules/node-red-contrib-edgetpu-inference/lib/img/bar-blue.png" class="tpu_bar_mask">
      <span class="tooltiptext" id="tpu_tooltiptext_2{{$id}}" ></span>
    </div>
    <div class='tooltip'>
      <img src="http://localhost:1880/node_modules/node-red-contrib-edgetpu-inference/lib/img/bar-blue.png" class="tpu_bar_mask">
      <span class="tooltiptext" id="tpu_tooltiptext_3{{$id}}" ></span>
    </div>
    <div class='tooltip'>
      <img src="http://localhost:1880/node_modules/node-red-contrib-edgetpu-inference/lib/img/bar-blue.png" class="tpu_bar_mask">
      <span class="tooltiptext" id="tpu_tooltiptext_4{{$id}}" ></span>
    </div>
    <div class='tooltip'>
      <img src="http://localhost:1880/node_modules/node-red-contrib-edgetpu-inference/lib/img/bar-blue.png" class="tpu_bar_mask">
      <span class="tooltiptext" id="tpu_tooltiptext_5{{$id}}" ></span>
    </div>
    <div class='tooltip'>
      <img src="http://localhost:1880/node_modules/node-red-contrib-edgetpu-inference/lib/img/bar-blue.png" class="tpu_bar_mask">
      <span class="tooltiptext" id="tpu_tooltiptext_6{{$id}}" ></span>
    </div>
    <div class='tooltip'>
      <img src="http://localhost:1880/node_modules/node-red-contrib-edgetpu-inference/lib/img/bar-blue.png" class="tpu_bar_mask">
      <span class="tooltiptext" id="tpu_tooltiptext_6{{$id}}" ></span>
    </div>

    <div class='TPU_name'>{{$TPU_ID[0]}}</div>
    <div class='TPU_name'>{{$TPU_ID[1]}}</div>
    <div class='TPU_name'>{{$TPU_ID[2]}}</div>
    <div class='TPU_name'>{{$TPU_ID[3]}}</div>
    <div class='TPU_name'>{{$TPU_ID[4]}}</div>
    <div class='TPU_name'>{{$TPU_ID[5]}}</div>
    <div class='TPU_name'>{{$TPU_ID[6]}}</div>
    <div class='TPU_name'>{{$TPU_ID[7]}}</div>

  </div>
  <div class="chart_container_tpu_bar">

    <canvas id="TPU_bar_{{$id}}"></canvas>
  </div>

</div>

</div>

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
            node.autowidth = 9;
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
                    beforeEmit: function(msg,$scope) {
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
                        msg.ram = ((1-osu.freememPercentage())*100).toFixed(0);
                        return {msg};
                    },
                    beforeSend: function (msg, orig) {
                        if (orig) {

                            return orig.msg;
                        }

                    },
                    initController: function($scope) {
                        var cpudata = []
                        var ramdata = []
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

                        var flag =null;
                        $scope.$watch('msg', function(msg) {
                            var cpu_data = catchdata(cpudata,msg.cpu);
                            var ram_data = catchdata(ramdata,msg.ram);
                            var cpu_data_bar = catchdata_bar(cpudata_bar,msg.cpu);
                            var ram_data_bar = catchdata_bar(ramdata_bar,msg.ram);
                            draw_cpu(cpu_data,cpu_data_bar);
                            draw_ram(ram_data,ram_data_bar);
                            tpu_status(msg);

                            $scope.click_A = function(){
                                flag =1;
                                var btn_A = document.getElementById("btn_left"+$scope.$id);
                                var btn_B = document.getElementById("btn_right"+$scope.$id);
                                btn_A.setAttribute("class","btn_left_after md-button md-ink-ripple")
                                btn_B.setAttribute("class","btn_right md-button md-ink-ripple")
                            }

                            $scope.click_B = function(){
                                flag =0;
                                var btn_A = document.getElementById("btn_left"+$scope.$id);
                                var btn_B = document.getElementById("btn_right"+$scope.$id);
                                btn_A.setAttribute("class","btn_left md-button md-ink-ripple")
                                btn_B.setAttribute("class","btn_right_after md-button md-ink-ripple")
                            }

                            if (flag==1 || flag==null){
                                $scope.$TPU_ID = ["TPU0","TPU1","TPU2","TPU3","TPU4","TPU5","TPU6","TPU7"];
                                draw_tpu(msg.tmpA);
                            }
                            else if (flag==0){
                                $scope.$TPU_ID = ["TPU8","TPU9","TPU10","TPU11","TPU12","TPU13","TPU14","TPU15"];
                                draw_tpu(msg.tmpB);
                            }

                        });

                        function catchdata(data,msg){

                            if (data.length<40){
                                data.push(msg);
                            }
                            else{
                                data.shift();
                                data.push(msg);
                            }
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


                        function draw_tpu(data){

                            var ctx_tpu_bar = document.querySelector("canvas#TPU_bar_"+$scope.$id).getContext('2d');
                            var gradientStroke_bar = ctx_tpu_bar.createLinearGradient(0, 0, 0, 75);
                            gradientStroke_bar.addColorStop(0, '#00ff7e');
                            gradientStroke_bar.addColorStop(0.5, '#43edef');
                            gradientStroke_bar.addColorStop(1, '#36fdff');
                            var tpu_bar = new Chart(ctx_tpu_bar, {
                                type: 'bar',
                                data: {
                                labels: [0,1,2,3,4,5,6,7],
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
                                                zeroLineColor:'rgba(255, 255, 255, 0)',
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
                                            gridLines: {
                                                zeroLineColor:'rgba(255, 255, 255, 0)',
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
                        function draw_cpu(data,data_bar){
                            var ctx_cpu_line = document.querySelector("canvas#CPU_"+$scope.$id).getContext('2d');
                            var gradientStroke = ctx_cpu_line.createLinearGradient(100, 0, 500, 0);
                            gradientStroke.addColorStop(0, '#27a6fe');
                            gradientStroke.addColorStop(1, '#067bfe');

                            var chart_cpu = new Chart(ctx_cpu_line, {
                              type: 'line',
                              data: {
                                labels: ['','','','','','','','','','','','','','','','','','','','',
                                         '','','','','','','','','','','','','','','','','','','',''],
                                datasets: [{
                                    label: "CPU",
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
                                        ticks: {
                                            max: 180,
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
                        function draw_ram(data,data_bar){
                            var ctx_ram = document.querySelector("canvas#RAM_"+$scope.$id).getContext('2d');
                            var gradientStroke = ctx_ram.createLinearGradient(100, 0, 500, 0);
                            gradientStroke.addColorStop(0, 'rgba(22, 217, 192, 0.94)');
                            gradientStroke.addColorStop(1, '#02c7b2');

                            var chart_ram = new Chart(ctx_ram, {
                              type: 'line',
                              data: {
                                labels: ['60s','','','','','','','','','','','','','','','','','','','',
                                         '','','','','','','','','','','','','','','','','','','','0s'],
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
                                        ticks: {
                                            max: 180,
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
                                    }
                                },
                                tooltips:{
                                  enabled:false

                                }

                            });
                        }

                        function tpu_status(msg){
                          console.log(msg.tpu);
                          var str = msg.tpuID
                          console.log(str)
                          var tpuID =str.replace("/dev/apex_","");
                          var tpu_class = document.getElementById("tpu_status_"+tpuID+$scope.$id);
                          tpu_class.setAttribute("class","tpu_on");
                          var tpu_tooltiptext_class = document.getElementById("tpu_tooltiptext_"+tpuID+$scope.$id);
                          tpu_tooltiptext_class.innerHTML = msg.ModelName;
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


