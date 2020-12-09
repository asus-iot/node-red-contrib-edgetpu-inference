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
        @import url('https://fonts.googleapis.com/css2?family=Play&display=swap');
        @import url("https://fonts.googleapis.com/css2?family=Roboto&display=swap");

        html {
        font-size:12px;
        }

        .bg_p {
        width: 537px;
        height: 937px;
        border-radius: 16px;
        box-shadow: 0px 8px 13px 0 rgba(6, 56, 70, 0.33);
        background-image: linear-gradient(to bottom, #59ceb7, #58adbd, #4b87ce, #2e5fa8);
        display: grid;
        grid-template-columns: 36px 465px 36px;
        grid-template-rows: 111px 230px 36px 230px 36px 243px 37px;
        }

        .Performance-Node {
        width: 278px;
        height: 23px;
        margin: 41px 0px 0px 10px;
        font-family: "Play", sans-serif;
        font-size: 2.5rem;
        font-weight: bold;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: normal;
        text-align: left;
        color: #fefeff;
        }

        .info_header{
        height: 43px;
        margin-top: 0px;
        }

        .info_left{
        width: 55px;
        height:187px;
        float:left;
        }

        .cpu_info {
        width: 465px;
        height: 230px;
        box-shadow: 0px 10px 18px 0 rgba(40, 93, 147, 0.33);
        border-radius: 10px;
        background-color: #ffffff;
        grid-column: 2 / 3;
        grid-row: 2 / 3;
        }

        .ram_info {
        width: 465px;
        height: 230px;
        box-shadow: 0px 10px 18px 0 rgba(40, 93, 147, 0.33);
        border-radius: 10px;
        background-color: #ffffff;
        grid-column: 2 / 3;
        grid-row: 4 / 5;
        }

        .tpu_info {
        width: 465px;
        height: 243px;
        box-shadow: 0px 10px 18px 0 rgba(40, 93, 147, 0.33);
        border-radius: 10px;
        background-color: #50b1ec;
        grid-column: 2 / 3;
        grid-row: 6 / 7;
        }

        .info_title {
        width: 130px;
        height: 17px;
        padding: 26px 0px 0px 26px;
        font-family: Play;
        font-size: 2.17rem;
        font-weight: bold;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: normal;
        text-align: left;
        color: #5d8de4;
        }

        .info_title_tpu {
        width: 60px;
        height: 17px;
        padding: 26px 0px 0px 26px;
        font-family: Play;
        font-size: 2.17rem;
        font-weight: bold;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: normal;
        text-align: left;
        display:inline-block;
        color: #ffffff;
        }

        .performance_bg_up_pic {
        width: 302px;
        height: 267px;
        margin: 3px 0px 0px -267px;
        object-fit: contain;
        }

        .performance_bg_down_pic {
        width: 212px;
        height: 218px;
        margin: 716px 5px 0px 8px;
        margin-left: 0px;
        object-fit: contain;
        }

        .ic_cpu {
        width: 89px;
        height: 89px;
        position: absolute;
        top: 83px;
        left: 420px;
        object-fit: contain;
        }

        .ic_ram {
        width: 89px;
        height: 89px;
        position: absolute;
        top: 351px;
        left: 420px;
        object-fit: contain;
        }

        .ic_tpu {
        width: 89px;
        height: 89px;
        position: absolute;
        top: 618px;
        left: 420px;
        object-fit: contain;
        }

        .High {
        width: 28px;
        height: 14px;
        padding:24px 0px 0px 27px;
        font-family: Roboto;
        font-size: 1.17rem;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: normal;
        text-align: left;
        color: #8989a4;
        }

        .Low {
        width: 26px;
        height: 10px;
        padding:0px 0px 0px 27px;
        font-family: Roboto;
        font-size: 1.17rem;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: normal;
        text-align: left;
        color: #8989a4;
        }

        .per {
            width: 33px;
            height: 10px;
            padding:24px 0px 0px 19px;
            font-family: Roboto;
            font-size: 1.17rem;
            font-weight: normal;
            font-stretch: normal;
            font-style: normal;
            line-height: normal;
            letter-spacing: normal;
            text-align: left;
            color: #8989a4;
            display:inline-block;
        }

        .line {
            width: 369px;
            height: 1px;
            margin: 11px 0px 20px 69px;
            opacity: 0.32;
            border: solid 1px #99baff;
            background-color: #99baff;
        }

        .line-last {
            width: 369px;
            height: 1px;
            margin: 0px 0px 5px 69px;
            opacity: 0.32;
            border: solid 1px #99baff;
            background-color: #99baff;
        }

        .minute {
            width: 15px;
            height: 10px;
            margin: 4px 0px 0px 20px;
            font-family: Roboto;
            font-size: 1.17rem;
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
            width: 15px;
            height: 10px;
            margin: 0px 0px 0px 329px;
            font-family: Roboto;
            font-size: 1.17rem;
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
            width: 32px;
            height: 112px;
            object-fit: contain;
            position:absolute;
            z-index: 10;
        }

        .tpu_bar_mask {
            width: 42px;
            height: 112px;
            position:absolute;
            z-index: 10;
        }

        .cpu_bar_bg {
            width: 32px;
            height: 112px;
            margin: 5px 0px 0px 26px;
            background: #c3d7ff;
        }

        .ram_bar_bg {
            width: 32px;
            height: 112px;
            margin: 5px 0px 0px 26px;
            background: #c6e9f4;
        }

        .tpu_bar_bg{
            width: 42px;
            height: 112px;
            margin: 40px 1.5px 0px 0px;
            display:inline-block;
            background: #153e83;
          }

        .chart_container_cpu {
            position: absolute;
            top:135px;
            left:120px;
            margin: auto;
            height: 100px;
            width: 350px;
        }

        .chart_container_cpu_bar {
            position: absolute;
            top:201px;
            left:54px;
            margin: auto;
            height: 117px;
            width: 53px;
        }

        .chart_container_ram {
            position: absolute;
            top:415px;
            left:120px;
            margin: auto;
            height: 100px;
            width: 350px;
        }

        .chart_container_ram_bar {
            position: absolute;
            top: 467px;
            left: 54px;
            margin: auto;
            height: 117px;
            width: 53px;
        }

        .chart_container_tpu_bar {
            position: absolute;
            top:733px;
            left:99px;
            margin: auto;
            height: 117px;
            width: 400px;
        }

        .tpu_right{
            height:200px;
            width: 392px;
            float:right;
        }

        .oC {
            width: 21px;
            height: 12px;
            margin: 22px 0px 11px 27px;
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
            margin: 11px 0px 0px 27px;
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
            width: 32px;
            height: 9px;
            margin: 0px 12px 0px 0px;
            font-family: Play;
            font-size: 14px;
            font-weight: normal;
            font-stretch: normal;
            font-style: normal;
            line-height: normal;
            letter-spacing: normal;
            text-align: left;
            color: #b9e5ff;
            display:inline-block;
        }

        .btn_left_disable {
            width: 20px;
            height: 21px;


        }

        .btn_right_able {
            width: 20px;
            height: 21px;

        }

        .nr-dashboard-theme .nr-dashboard-template .md-button {
            margin: 0px 0px 0px 0px ;
            min-height: 36px;
            min-width: unset;
            line-height: unset;
            display:inline-block;
            background-color: #50b1ec;
        }

        .nr-dashboard-theme .nr-dashboard-template .md-button:not(:first-of-type) {
            margin-top: 0px;
        }


        </style>
        <div class='bg_p'>

        <img src="http://localhost:1880/.node-red/node_modules/node-red-contrib-edge-tpu/lib/img/performance-bg-down-pic.png"
            class="performance_bg_down_pic">
         <div class='Performance-Node'>Performance Node</div>
         <img src="http://localhost:1880/.node-red/node_modules/node-red-contrib-edge-tpu/lib/img/performance-bg-up-pic.png"
         class="performance_bg_up_pic">
        <img src="http://localhost:1880/.node-red/node_modules/node-red-contrib-edge-tpu/lib/img/ic-cpu.png"class="ic_cpu">
        <img src="http://localhost:1880/.node-red/node_modules/node-red-contrib-edge-tpu/lib/img/ic-ram.png"class="ic_ram">
        <img src="http://localhost:1880/.node-red/node_modules/node-red-contrib-edge-tpu/lib/img/ic-tpu.png"class="ic_tpu">


        <div class='cpu_info'>
            <div class="chart_container_cpu">
                <canvas id="CPU_{{$id}}" ></canvas>
            </div>
            <div class="chart_container_cpu_bar">
                <canvas id="CPU_bar_{{$id}}" ></canvas>
            </div>
            <div class='info_header'>
                <div class='info_title'>CPU : {{msg.cpu}}%</div>
            </div>
            <div class='info_left'>
                <div class='High'>High</div>
                <div class='cpu_bar_bg'>
                <img src="http://localhost:1880/.node-red/node_modules/node-red-contrib-edge-tpu/lib/img/bar.png"class="bar_mask">
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
                <canvas id="RAM_{{$id}}" ></canvas>
            </div>

            <div class="chart_container_ram_bar">
                <canvas id="RAM_bar_{{$id}}" ></canvas>
            </div>

            <div class='info_header'>
                <div class='info_title'>RAM : {{msg.ram}}%</div>
            </div>
            <div class='info_left'>
                <div class='High'>High</div>
                <div class='ram_bar_bg'>
                <img src="http://localhost:1880/.node-red/node_modules/node-red-contrib-edge-tpu/lib/img/bar.png"class="bar_mask">
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

                <md-button ng-click="click()">
                <img src="http://localhost:1880/.node-red/node_modules/node-red-contrib-edge-tpu/lib/img/btn-left-disable.png" class="btn_left_disable">
                </md-button>

                <md-button ng-click="click1()">
                    <img src="http://localhost:1880/.node-red/node_modules/node-red-contrib-edge-tpu/lib/img/btn-right-able.png" class="btn_right_able">
                </md-button>
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
                <div class='tpu_bar_bg'>
                    <img src="http://localhost:1880/.node-red/node_modules/node-red-contrib-edge-tpu/lib/img/bar-blue.png" class="tpu_bar_mask">
                </div>
                <div class='tpu_bar_bg'>
                    <img src="http://localhost:1880/.node-red/node_modules/node-red-contrib-edge-tpu/lib/img/bar-blue.png" class="tpu_bar_mask">
                </div>
                <div class='tpu_bar_bg'>
                    <img src="http://localhost:1880/.node-red/node_modules/node-red-contrib-edge-tpu/lib/img/bar-blue.png" class="tpu_bar_mask">
                </div>
                <div class='tpu_bar_bg'>
                    <img src="http://localhost:1880/.node-red/node_modules/node-red-contrib-edge-tpu/lib/img/bar-blue.png" class="tpu_bar_mask">
                </div>
                <div class='tpu_bar_bg'>
                    <img src="http://localhost:1880/.node-red/node_modules/node-red-contrib-edge-tpu/lib/img/bar-blue.png" class="tpu_bar_mask">
                </div>
                <div class='tpu_bar_bg'>
                    <img src="http://localhost:1880/.node-red/node_modules/node-red-contrib-edge-tpu/lib/img/bar-blue.png" class="tpu_bar_mask">
                </div>
                <div class='tpu_bar_bg'>
                    <img src="http://localhost:1880/.node-red/node_modules/node-red-contrib-edge-tpu/lib/img/bar-blue.png" class="tpu_bar_mask">
                </div>
                <div class='tpu_bar_bg'>
                    <img src="http://localhost:1880/.node-red/node_modules/node-red-contrib-edge-tpu/lib/img/bar-blue.png" class="tpu_bar_mask">
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

                <canvas id="TPU_bar_{{$id}}" ></canvas>
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
            node.autowidth = 6;
            node.autoheight = 15;

            function tputemp(s,e){

                var shell = require('../package/shelljs');
                var temp =[];
                for (var i=s;i<=e;i++){
                    var tmp = shell.cat('/sys/class/apex/apex_'+i+'/temp');

                    temp.push(parseInt(tmp.stdout, 10)/1000)

                }
                    return temp;

            }


            var osu = require('../package/os-utils');
            var os = require('../package/os');
            this.previousTotalTick = [];
            this.previousTotalIdle = [];
            var node = this;

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

                        let date = new Date(msg.payload)
                        msg.getseconds = date.getSeconds()
                        msg.tmpA = tputemp(0,7);
                        msg.tmpB = tputemp(8,15);
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

                            $scope.click = function(){
                                flag =1;

                            }

                            $scope.click1 = function(){
                                flag =0;

                            }

                            if (flag==1){
                                $scope.$TPU_ID = ["TPU0","TPU1","TPU2","TPU3","TPU4","TPU5","TPU6","TPU7"];
                                var TPU_ID_label =["TPU0","TPU1","TPU2","TPU3","TPU4","TPU5","TPU6","TPU7"];
                                draw_tpu(msg.tmpA,TPU_ID_label);
                            }
                            else if (flag==0){
                                $scope.$TPU_ID = ["TPU8","TPU9","TPU10","TPU11","TPU12","TPU13","TPU14","TPU15"];
                                var TPU_ID_label =["TPU8","TPU9","TPU10","TPU11","TPU12","TPU13","TPU14","TPU15"];
                                draw_tpu(msg.tmpB,TPU_ID_label);
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


                        function draw_tpu(data,TPU_ID_label){

                            var ctx_tpu_bar = document.querySelector("canvas#TPU_bar_"+$scope.$id).getContext('2d');
                            var gradientStroke_bar = ctx_tpu_bar.createLinearGradient(0, 0, 0, 75);
                            gradientStroke_bar.addColorStop(0, '#00ff7e');
                            gradientStroke_bar.addColorStop(0.5, '#43edef');
                            gradientStroke_bar.addColorStop(1, '#36fdff');
                            var tpu_bar = new Chart(ctx_tpu_bar, {
                                type: 'bar',
                                data: {
                                labels: TPU_ID_label,
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
                                                color : 'rgba(255, 255, 255, 0)',
                                                categoryPercentage: 0.5,
                                                barPercentage: 0.5

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
                                labels: ['60s','','','','','','','','','','','','','','','','','','','',
                                         '','','','','','','','','','','','','','','','','','','','0s'],
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
                                            max: 150,
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
                                }

                            });
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


