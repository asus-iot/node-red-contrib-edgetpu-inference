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

        <div layout="row">
            <div flex="90">
                <div layout="column">
                    <div flex="3" id=ui_title_{{$id}}>
                        <h1><font face="monospace">${title}</font></h1>
                    </div>
                    <div flex="2" id=ui_info_{{$id}}>
                        <p><font face="monospace" size ="3">Resolution:4K | Inference:12ps</font></p>
                </div>
                    <div flex="95" id=ui_view_{{$id}}>
                        <img id="object" width=${r_w} height=${r_h} style="position: absolute; left: 0; top: 20; z-index: 0; alt="stream test" src="data:image/jpg;base64,{{msg.image}}"  />
                        <canvas id="ui_canvas_{{$id}}" width=${r_w} height=${r_h} style="position: absolute; left: 0; top: 20; z-index: 1;"></canvas>
                    </div>
                </div>

            </div>
            <div flex="10">
                <div layout="column" id="ui_display_count_{{$id}}">
                    <div flex="20" id="ui_Itemcount_label_{{$id}}"><h1><font face="monospace">Total</font></h1></div>
                    <div flex="20" id="ui_Itemcount_0_{{$id}}"></div>
                    <div flex="20" id="ui_Itemcount_1_{{$id}}"></div>
                    <div flex="20" id="ui_Itemcount_2_{{$id}}"></div>
                    <div flex="" id="ui_Itemcount_3_{{$id}}"></div>
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
            if (config.resolution ==0){
                node.autowidth = 15;
                node.autoheight = 11;
            }
            else{
                node.autowidth = 27;
                node.autoheight = 15;
            }

            if (checkConfig(node, config)) {
                // Generate HTML/Angular code
                var html = HTML(config);
                // Initialize Node-RED Dashboard widget
                // see details: https://github.com/node-red/node-red-ui-nodes/blob/master/docs/api.md
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
                        return {msg};
                    },
                    beforeSend: function (msg, orig) {
                        if (orig) {
                            orig.msg.topic = config.topic;
                            return orig.msg;
                        }
                    },
                    initController: function($scope) {
                        var cMap = new Map();
                        cMap.set('person', '#ed7263');
                        cMap.set('tv', '#f6639b');

                        $scope.$watch('msg', function(msg) {
                            draw(msg);
                            countItem(msg);

                        });

                        function draw(msg){
                            var canvas = document.querySelector("canvas#ui_canvas_"+$scope.$id);
                            var ctx = canvas.getContext('2d')
                            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
                            const font = "16px sans-serif";
                            ctx.font = font;
                            ctx.textBaseline = "top";
                            msg.payload['objects'].forEach(prediction => {
                            const x = prediction.bbox[0];
                            const y = prediction.bbox[1];
                            const width = prediction.bbox[2] -prediction.bbox[0];
                            const height = prediction.bbox[3] - prediction.bbox[1];
                            // Draw the bounding box.
                            ctx.strokeStyle = setClolr(prediction.className);
                            ctx.lineWidth = 4;
                            ctx.strokeRect(x, y, width, height);
                            // Draw the label background.
                            ctx.fillStyle = "#ffc400";
                            const textWidth = ctx.measureText(prediction.className).width;
                            const textHeight = parseInt(font, 10);
                            ctx.fillRect(x, y, textWidth + 4, textHeight + 4);
                            });
                            msg.payload['objects'].forEach(prediction => {
                            const x = prediction.bbox[0];
                            const y = prediction.bbox[1];
                            // Draw the text last to ensure it's on top.
                            ctx.fillStyle = "#000000";
                            ctx.fillText(prediction.className, x, y);
                            });

                        }
                        function setClolr(cName){
                            for (var key of cMap.keys()) {
                                if(key == cName){
                                    return cMap.get(key)
                                }
                                else{
                                    return "#00FFFF";
                                }
                              }
                        }
                        function countItem(msg){
                            var count_array=new Array();
                            msg.payload['objects'].forEach(prediction => {
                                count_array.push(prediction.className);
                            });
                            const total_count = count_array.reduce((obj,item)=>{
                                if (item in obj) {
                                  obj[item]++
                                } else {
                                  obj[item] = 1
                                }
                                return obj
                              },{})

                            var className_array=new Array();
                            var times_array=new Array();
                            for (const [key, value] of Object.entries(total_count)) {
                                className_array.push(key)
                                times_array.push(value)

                            }

                            for (var i=0; i<=6; i++){
                                if(className_array[i]){
                                    var temp =document.querySelector("#ui_Itemcount_"+i+"_"+$scope.$id);
                                    temp.innerHTML = className_array[i]+":"+times_array[i];
                                }
                                else{
                                    var temp =document.querySelector("#ui_Itemcount_"+i+"_"+$scope.$id);
                                    temp.innerHTML = "";
                                    return true;
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
    // register ui_list node
    // type MUST start with ui_
    RED.nodes.registerType('ui_result', ResultNode);
};


