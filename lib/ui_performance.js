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
        <p id="CPU_usage_{{$id}}"><font face="monospace" size ="5"></font></p>
        <canvas id="CPU_{{$id}}" width="500" height="300"></canvas>
        <p id="RAM_usage_{{$id}}"><font face="monospace" size ="5"></font></p>
        <canvas id="RAM_{{$id}}" width="500" height="300"></canvas>
        <p><font face="monospace" size ="5">TPU</font></p>
        <canvas id="TPU_{{$id}}" width="500" height="300"></canvas>
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

            function tputemp(){

                var shell = require('../package/shelljs');
                var temp =[];
                for (var i=0;i<=15;i++){
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
                    beforeEmit: function(msg) {

                        let date = new Date(msg.payload)
                        msg.getseconds = date.getSeconds()
                        msg.tmp = tputemp();
                        msg.cpu = getCPUusage().toFixed(2);
                        msg.ram = ((1-osu.freememPercentage())*100).toFixed(2);


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
                        $scope.$watch('msg', function(msg) {

                            var cpu_p =document.querySelector("#CPU_usage_"+$scope.$id);
                            cpu_p.innerHTML = "CPU:"+ msg.cpu +"%";
                            var ram_p =document.querySelector("#RAM_usage_"+$scope.$id);
                            ram_p.innerHTML = "RAM:"+ msg.ram +"%";

                            draw_tpu(msg);

                            var cpu_data = catchdata(cpudata,msg.cpu);
                            var ram_data = catchdata(ramdata,msg.ram);
                            draw_cpu(cpu_data);
                            draw_ram(ram_data);

                        });

                        function catchdata(data,msg){

                            if (data.length<20){
                                data.push(msg);
                            }
                            else{
                                data.shift();
                                data.push(msg);
                            }
                            return data;
                        }
                        function draw_tpu(msg){

                            var chart = document.querySelector("canvas#TPU_"+$scope.$id);
                            Chart.defaults.global.animation.duration = 20; // Animation duration
                            Chart.defaults.global.title.display = false; // Remove title
                            Chart.defaults.global.title.text = "Chart"; // Title
                            Chart.defaults.global.title.position = 'bottom'; // Title position
                            Chart.defaults.global.defaultFontColor = '#999'; // Font color
                            Chart.defaults.global.defaultFontSize = 10; // Font size for every label

                            // Chart.defaults.global.tooltips.backgroundColor = '#FFF'; // Tooltips background color
                            Chart.defaults.global.tooltips.borderColor = 'white'; // Tooltips border color
                            Chart.defaults.global.legend.labels.padding = 0;
                            Chart.defaults.scale.ticks.beginAtZero = true;
                            Chart.defaults.scale.gridLines.zeroLineColor = 'rgba(255, 255, 255, 0.1)';
                            Chart.defaults.scale.gridLines.color = 'rgba(255, 255, 255, 0.02)';
                            Chart.defaults.global.legend.display = false;


                            var myChart = new Chart(chart, {
                                type: 'bar',
                                data: {
                                labels: ["TPU1", "TPU2", "TPU3", "TPU4", "TPU5", 'TPU6','TPU7','TPU8','TPU9','TPU10','TPU11','TPU12','TPU13','TPU14','TPU15','TPU16'],
                                datasets: [{
                                    label: "TPU",
                                    fill: false,
                                    lineTension: 0,
                                    data: msg.tmp,
                                    pointBorderColor: "#4bc0c0",
                                    borderColor: '#4bc0c0',
                                    borderWidth: 2,
                                    showLine: true,
                                }]
                                },
                            });
                        }
                        function draw_cpu(data){
                            var Chart2 = document.querySelector("canvas#CPU_"+$scope.$id);
                            var chart = new Chart(Chart2, {
                              type: 'line',
                              data: {
                                labels: ["60s",'','','','','','','','','','','','','','','','','','','0s'],
                                datasets: [{
                                  label: "CPU",
                                  backgroundColor: 'rgb(255, 99, 132)',
                                  borderColor: 'rgb(255, 79, 116)',
                                  borderWidth: 0,
                                  pointBorderColor: false,
                                  data: data,
                                  fill: false,
                                  lineTension: 0,
                                }]
                              },

                              // Configuration options
                              options: {
                                scales: {
                                    yAxes: [{
                                        ticks: {
                                            max: 100,
                                            min: 0,
                                            stepSize: 10
                                        }
                                    }]
                                }
                            }
                            });
                        }
                        function draw_ram(data){
                            var Chart2 = document.querySelector("canvas#RAM_"+$scope.$id);
                            var chart = new Chart(Chart2, {
                              type: 'line',
                              data: {
                                labels: ["60s",'','','','','','','','','','','','','','','','','','','0s'],
                                datasets: [{
                                  label: "CPU",
                                  backgroundColor: 'rgb(86, 188, 214)',
                                  borderColor: 'rgb(86, 188, 214)',
                                  borderWidth: 0,
                                  pointBorderColor: false,
                                  data: data,
                                  fill: false,
                                  lineTension: 0,
                                }]
                              },

                              // Configuration options
                              options: {
                                scales: {
                                    yAxes: [{
                                        ticks: {
                                            max: 100,
                                            min: 0,
                                            stepSize: 10
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
    // register ui_list node
    // type MUST start with ui_
    RED.nodes.registerType('ui_performance', performanceNode);
};


