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
        <div layout="column" >
            <div flex="10">
                <div layout="column">
                    <div flex="3" id=ui_title_{{$id}}>
                        <h1><font face="monospace">${title}</font></h1>
                    </div>
                    <div flex="2" id=ui_info_{{$id}}>
                        <p><font face="monospace" size ="3">Resolution:{{msg.resolution_width}}*{{msg.resolution_height}} | Inference:{{msg.inf_fps}}</font></p>
            </div>
            <div flex="90">
                <div layout="row" >
                    <div flex="90">
                        <img id="object" width=${r_w} height=${r_h} style="position: absolute; left: 0; top: 20; z-index: 0; alt="stream test" src="data:image/jpg;base64,{{msg.image}}"  />
                        <canvas id="ui_canvas_{{$id}}" width=${r_w} height=${r_h} style="position: absolute; left: 0; top: 20; z-index: 1;"></canvas>
                    </div>
                    <div flex=""10>
                        <div layout="column" id="ui_display_count_{{$id}}">
                            <div flex="50" id="ui_Itemcount_label_{{$id}}"><h1><font face="monospace">Result</font></h1></div>

                            <mat-nav-list>
                            <mat-list-item>
                            <p matLine>{{$Item_name[0]}}</p>
                            <p matLine>{{$Item_count[0]}}</p>
                            </mat-list-item>

                            <mat-list-item>
                            <p matLine>{{$Item_name[1]}}</p>
                            <p matLine>{{$Item_count[1]}}</p>
                            </mat-list-item>

                            <mat-list-item>
                            <p matLine>{{$Item_name[2]}}</p>
                            <p matLine>{{$Item_count[2]}}</p>
                            </mat-list-item>

                            <mat-list-item>
                            <p matLine>{{$Item_name[3]}}</p>
                            <p matLine>{{$Item_count[3]}}</p>
                            </mat-list-item>

                            <mat-list-item>
                            <p matLine>{{$Item_name[4]}}</p>
                            <p matLine>{{$Item_count[4]}}</p>
                            </mat-list-item>

                            <mat-list-item>
                            <p matLine>{{$Item_name[5]}}</p>
                            <p matLine>{{$Item_count[5]}}</p>
                            </mat-list-item>
                            </mat-nav-list>

                        </div>
                    </div>
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
                        if(msg.image){
                            var dimensions = FindResolution(msg);
                            msg.resolution_height = dimensions.height;
                            msg.resolution_width = dimensions.width;
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
                        $scope.$watch('msg', function(msg) {

                            if (msg.image && msg.payload['objects']){
                                draw(msg);
                                countItem(msg,'objects');
                            }

                            else if(msg.image && msg.payload['classes']){
                                countItem(msg,'classes');
                            }
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
                            ctx.strokeStyle = setClolr(prediction.className);
                            ctx.lineWidth = 4;
                            ctx.strokeRect(x, y, width, height);
                            ctx.fillStyle = setClolr(prediction.className);
                            const score_textWidth = ctx.measureText(prediction.score.toFixed(2)).width;
                            const score_textHeight = parseInt(font, 10);
                            ctx.fillRect(x, y-20, score_textWidth + 4, score_textHeight + 4);
                            ctx.fillStyle = "#FFFFFF";
                            const classname_textWidth = ctx.measureText(prediction.className).width;
                            const classname_textHeight = parseInt(font, 10);
                            ctx.fillRect(x+30, y-20, classname_textWidth + 4, classname_textHeight + 4);
                            });
                            msg.payload['objects'].forEach(prediction => {
                            const x = prediction.bbox[0];
                            const y = prediction.bbox[1];
                            ctx.fillStyle = "#000000";
                            ctx.fillText(prediction.score.toFixed(2), x, y-20);
                            ctx.fillText(prediction.className, x+30, y-20);
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
                        function countItem(msg,type){
                            var count_array=new Array();
                            msg.payload[type].forEach(prediction => {
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
                            $scope.$Item_name = [];
                            $scope.$Item_count = [];
                            for (var i=0; i<=6; i++){
                                if(className_array[i]){
                                    $scope.$Item_name.push(className_array[i]);
                                    $scope.$Item_count.push(times_array[i]);
                                }
                                else{
                                    $scope.$Item_name.push("Null");
                                    $scope.$Item_count.push("0");
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


