/**
 * Created with JetBrains WebStorm.
 * User: wanli
 * Date: 14-10-11
 * Time: 下午1:58
 * To change this template use File | Settings | File Templates.
 */
(function (){
    var Panelid="Profiler1";
    var chartoptions={
        type:"line",//[line,spline]
        linecolor:"#a0a0a0",//线条颜色
        linewidth:1,//线条粗细
        subbordercolor:"#000000",//小图边框颜色
        subborderwidth:2,//小图边框宽度
        islabel:false,//是否显示label文字
        labelcolor:"#000000",//label文字颜色
        background:"#ffffff",//背景颜色
        asixfontcolor:"#000000",//XY轴字体颜色
        asixticklength:3,//XY轴刻度长度
        asixtickcolor:"#000000",//刻度颜色
        showstandline:true,//是否显示标准线
        pointcolor:"#000000",
        overrangpointcolor:"red"
    }

    var PanelObj=$("<div id='Profiler1'  class='Profilersty'></div>").appendTo($("#chartcontent").css({"background-color":chartoptions.background}));
    if(chartoptions.showstandline){
        PanelObj.css({
            width:($("#chartcontent").width()-100-100)+"px",
            height:($("#chartcontent").height()-100)+"px"
        });

        //右侧标准线容器
        $("<div id='khq_standpanel' class='khq_standpanelsty'></div>").css({
            width:"100px",
            height:($("#chartcontent").height()-100)+"px"
        }).appendTo($("#chartcontent"));
    }else{
        PanelObj.css({
            width:$("#chartcontent").width()-100,
            height:$("#chartcontent").height()-100
        });
    }

    var chartlist=[];//item:canvas,data,points
    var ChartRelationLine={Hlines:[],Vlines:[]};
    var CanvasInfo={width:PanelObj.width(),height:PanelObj.height(),strtx:PanelObj.offset().left,starty:0};
    var subitempars=null;
    var profilterdata={
        group:
        {
            rows:
                [
//                      {row:1,min_y:34,max_y:34.31,float:2,title:"SS发汽量",nowvalue:null,ucl:34.26,lcl:34.14,mid:34.2},//row:行数,min_y:Y轴最小值,max_y:Y轴最大值,float:数据保留小数位数,title:行标题
//                      {row:2,min_y:3.4,max_y:3.62,float:2,title:"燃料气流量",nowvalue:null,ucl:3.57,lcl:3.45,mid:3.51}
                        {row:1,min_y:0.00001,max_y:0.003,float:6,title:"乙烯产品中乙烷浓度",nowvalue:null,ucl:0.0024,lcl:0.0006,mid:0.0015,spvalue:0.0000008},//row:行数,min_y:Y轴最小值,max_y:Y轴最大值,float:数据保留小数位数,title:行标题
                        {row:2,min_y:0.0005,max_y:0.07,float:6,title:"循环乙烷中乙烯浓度",nowvalue:null,ucl:0.056,lcl:0.014,mid:0.035,spvalue:0.0000005},
                        {row:3,min_y:1200,max_y:1800,float:3,title:"能耗(千克标油)",nowvalue:null,ucl:1680,lcl:1320,mid:1500,spvalue:0.0075}
                ],//数据行
            cells:
                [
                    {cell:1,min_x:35000,max_x:60000,float:0,title:"进料流量(kg/h)",nowvalue:null,dir:"down",xitems:[],gno:"FIC2409"},
                    {cell:2,min_x:135000,max_x:190000,float:0,title:"乙烯精馏塔回流量(kg/h)",nowvalue:null,dir:"up",xitems:[],gno:"FIC2414"},//cell:列,min_x:X轴最小值,max_x:X轴最大值,float:数据保留小数位数,title:行标题
                    {cell:3,min_x:45000,max_x:110000,float:0,title:"塔釜丙烯冷剂流量(kg/h)",nowvalue:null,dir:"up",xitems:[],gno:"FIC2503"}//cell:列,min_x:X轴最小值,max_x:X轴最大值,float:数据保留小数位数,title:行标题
                    //cell:列,min_x:X轴最小值,max_x:X轴最大值,float:数据保留小数位数,title:行标题
                ]//数据列
        },
        data:
            [
                //{"id":"row11_canvas","data":[[801.606607,34.1],[802.1224946,34.11],[802.8075674,34.12],[803.4304701,34.13],[804.1539272,34.14],
                //    [804.6313347,34.15],[805.1510553,34.16],[806.464049,34.17],[807.6507176,34.18],[808.6844924,34.19],[809.1407938,34.2],
                //    [809.8742963,34.21],[810.5381272,34.22],[811.0948741,34.23],[811.8444774,34.24],[812.6715604,34.25],[813.2813223,34.26],
                //    [814.2972938,34.27],[815.335494,34.28],[816.3657454,34.29],[817.5135252,34.3]],"row":1,"cell":1},
                //{"id":"row12_canvas","data":[[17.5478923243,34.1],[17.5814172786,34.11],[17.6205482221,34.12],[17.6813447218,34.13],[17.7222249228,34.14],
                //    [17.7629622751,34.15],[17.8042202717,34.16],[17.8493846421,34.17],[17.8820480389,34.18],[17.9250786807,34.19],[17.9614537229,34.2],
                //    [18.0129208592,34.21],[18.0731005799,34.22],[18.1369021694,34.23],[18.1987324851,34.24],[18.2564615792,34.25],[18.3169788073,34.26],
                //    [18.3786118623,34.27],[18.4289574907,34.28],[18.4721911068,34.29],[18.5205912123,34.3]],"row":1,"cell":2},
                //{"id":"row13_canvas","data":[[22.6629547867,34.3],[22.7452396094,34.29],[22.8220826757,34.28],[22.902914033,34.27],[22.9835492221,34.26],
                //    [23.0655284973,34.25],[23.1444092482,34.24],[23.2278614309,34.23],[23.3011265263,34.22],[23.3814039753,34.21],[23.4640064121,34.2],
                //    [23.5458737418,34.19],[23.6217188556,34.18],[23.7071842342,34.17],[23.7849875576,34.16],[23.8621220823,34.15],[23.9435161223,34.14],
                //    [24.0436958026,34.13],[24.1224274598,34.12],[24.2165687371,34.11],[24.3304043448,34.1]],"row":1,"cell":3},
                //{"id":"row21_canvas","data":[[801.606607,3.41],[802.1224946,3.42],[802.8075674,3.43],[803.4304701,3.44],[804.1539272,3.45],[804.6313347,3.46],
                //    [805.1510553,3.47],[806.464049,3.48],[807.6507176,3.49],[808.6844924,3.5],[809.1407938,3.51],[809.8742963,3.52],[810.5381272,3.53],
                //    [811.0948741,3.54],[811.8444774,3.55],[812.6715604,3.56],[813.2813223,3.57],[814.2972938,3.58],[815.335494,3.59],[816.3657454,3.6],
                //    [817.5135252,3.61]],"row":2,"cell":1},
                //{"id":"row22_canvas","data":[[17.5478923243,3.41],[17.5814172786,3.42],[17.6205482221,3.43],[17.6813447218,3.44],[17.7222249228,3.45],
                //    [17.7629622751,3.46],[17.8042202717,3.47],[17.8493846421,3.48],[17.8820480389,3.49],[17.9250786807,3.5],[17.9614537229,3.51],
                //    [18.0129208592,3.52],[18.0731005799,3.53],[18.1369021694,3.54],[18.1987324851,3.55],[18.2564615792,3.56],[18.3169788073,3.57],
                //    [18.3786118623,3.58],[18.4289574907,3.59],[18.4721911068,3.6],[18.5205912123,3.61]],"row":2,"cell":2},
                //{"id":"row23_canvas","data":[[22.6629547867,3.61],[22.7452396094,3.6],[22.8220826757,3.59],[22.902914033,3.58],[22.9835492221,3.57],
                //    [23.0655284973,3.56],[23.1444092482,3.55],[23.2278614309,3.54],[23.3011265263,3.53],[23.3814039753,3.52],[23.4640064121,3.51],[23.5458737418,3.5],
                //    [23.6217188556,3.49],[23.7071842342,3.48],[23.7849875576,3.47],[23.8621220823,3.46],[23.9435161223,3.45],[24.0436958026,3.44],
                //    [24.1224274598,3.43],[24.2165687371,3.42],[24.3304043448,3.41]],"row":2,"cell":3}
                ]
    }

    window.onload=function(){
        InitLineData(profilterdata);//初始化数据
    }
    function StartDraw(){
        subitempars=
        {
            width:PanelObj.width()/profilterdata.group.cells.length,
            height:PanelObj.height()/profilterdata.group.rows.length
        };

        var tempcanvas=null;
        var lefttopobj={left:0,top:0};
        for(var i=0;i<profilterdata.group.rows.length;i++){
            lefttopobj.left=0;
            for(var j=0;j<profilterdata.data.length;j++){
                if(profilterdata.data[j].row==profilterdata.group.rows[i].row){
                    tempcanvas=$("<canvas id='"+profilterdata.data[j].id+"'></canvas>").attr({
                        "width":subitempars.width+"px",
                        "height":subitempars.height+"px"
                    }).css({
                        "position":"absolute",
                        "left":lefttopobj.left+"px",
                        "top":lefttopobj.top+"px"
                    }).appendTo(PanelObj);

                    tempcanvas=document.getElementById(profilterdata.data[j].id);
                    //坐标范围
                    var minmax=GetChartItemMax(profilterdata.data[j].row,profilterdata.data[j].cell,profilterdata.group);
                    //画图
                    var tpoints=NewChart(tempcanvas,profilterdata.data[j].data,minmax,profilterdata.data[j].row);
                    //添加至集合
                    chartlist.push({
                        canvas:tempcanvas,
                        data:profilterdata.data[j].data,
                        points:tpoints,
                        row:profilterdata.data[j].row,
                        cell:profilterdata.data[j].cell,
                        selpoint:GetInitSelPoint(profilterdata.data[j].data),
                        minmax:minmax
                    });

                    lefttopobj.left=lefttopobj.left+subitempars.width;
                }
            }
            lefttopobj.top=lefttopobj.top+subitempars.height;
        }
        //绘制坐标轴
        DrowAxias();
        //显示标题
        showAsixTitle();
        //初始化水平拖拽线
        IntiAllHlines();
        //初始化垂直拖拽线
        InitVlines();
        //绘制规格线
        updateStandLines();
        //规格线设置菜单
        InitStandLineMenu();
    }
//1>绘制折线图
    //1>绘制折线&曲线图
    function NewChart(a_canvas,data,minmax,row){
        var context = a_canvas.getContext("2d");

        context.clearRect(0,0,a_canvas.width,a_canvas.height);

        // 绘制背景
        var gradient = context.createLinearGradient(0,0,0,300);
        context.fillStyle = gradient;
        context.fillRect(0,0,a_canvas.width,a_canvas.height);

        // 描绘边框
        context.lineWidth = chartoptions.subborderwidth;
        context.strokeStyle =chartoptions.subbordercolor;
        context.beginPath();
//        context.moveTo(0,0);
//        context.lineTo(0,a_canvas.height);
//        context.lineTo(a_canvas.width,a_canvas.height);
//        context.lineTo(a_canvas.width,0);
//        context.lineTo(0,0);
        context.moveTo(0,a_canvas.height);
        context.lineTo(a_canvas.width,a_canvas.height);
        context.lineTo(a_canvas.width,0);
        context.stroke();
        // 结束边框描绘

        //获取规格线范围
        var rowdata=GetgroupRowData(row);

        // 将数据换算为坐标
        var points = [];
        var tempoverrang=false;
        for( var i=0; i < data.length; i++){
//            var px =a_canvas.width*(data[i][0] / max_x);
//            var py = a_canvas.height - a_canvas.height*(data[i][1] / max_y);
//
            var px =a_canvas.width*(data[i][0]-minmax.min_x)/(minmax.max_x-minmax.min_x);
            var py = a_canvas.height - (a_canvas.height*(data[i][1]-minmax.min_y)/(minmax.max_y-minmax.min_y));
            tempoverrang=false;
            if(data[i][1]>rowdata.ucl){
                tempoverrang=true;
            }else{
                if(data[i][1]<rowdata.lcl){
                    tempoverrang=true;
                }
            }
            points.push({"x":px,"y":py,isoverrang:tempoverrang});
        }

        //设置字体样式
        context.font = "8px Courier New";


        // 绘制折线
        if(points[0].isoverrang){
            context.fillStyle=chartoptions.overrangpointcolor;
            context.beginPath();
            context.moveTo(points[0].x, points[0].y);
//            context.arc(points[0].x, points[0].y,1,0,2*Math.PI,true);
            context.fillRect(points[0].x-2, points[0].y-2,4,4);
        }else{
            context.fillStyle =chartoptions.pointcolor;
            context.fillRect(points[0].x-2, points[0].y-2,4,4);
        }

        if(chartoptions.type=="line"){

            //绘制超过规格线的点
            for(var i= 1; i< points.length; i++){
                context.moveTo(points[i].x, points[i].y);
                if(points[i].isoverrang){
                    context.fillStyle=chartoptions.overrangpointcolor;
//                    context.arc(points[i].x, points[i].y,2,0,2*Math.PI,true);
                    context.fillRect(points[i].x-2, points[i].y-2,4,4);
                }else{
                    context.fillStyle =chartoptions.pointcolor;
                    context.fillRect(points[i].x-2, points[i].y-2,4,4);
                }

            }
            context.stroke();

            //绘制折线
            context.beginPath();
            context.moveTo(points[0].x,points[0].y);
            context.fillStyle =chartoptions.labelcolor;
            if(chartoptions.islabel){
                context.fillText(data[0][1],points[0].x-3,points[0].y+3);
            }
            for(var i= 1; i< points.length; i++){
                context.lineTo(points[i].x,points[i].y);
                if(chartoptions.islabel){
                    context.fillText(data[i][1],points[i].x-3,points[i].y+3);
                }
            }
        }else{
            //绘制曲线
            var ControlPoint={x1:0,y1:0,x2:0,y2:0};
            var p=0.25;
            for(var i= 0;i<(points.length-1); i++){
                if(i==0){
                    ControlPoint.x1=points[i].x+(points[i+1].x-points[i].x)*p;
                    ControlPoint.y1=points[i].y+(points[i+1].y-points[i].y)*p;
                }else{
                    ControlPoint.x1=points[i].x+(points[i+1].x-points[i-1].x)*p;
                    ControlPoint.y1=points[i].y+(points[i+1].y-points[i-1].y)*p;
                }
                if(points[i+2]==null){
                    ControlPoint.x2=points[i+1].x-(points[i+1].x-points[i].x)*p;
                    ControlPoint.y2=points[i+1].y-(points[i+1].y-points[i].y)*p;
                }else{
                    ControlPoint.x2=points[i+1].x-(points[i+2].x-points[i].x)*p;
                    ControlPoint.y2=points[i+1].y-(points[i+2].y-points[i].y)*p;
                }
                context.bezierCurveTo(ControlPoint.x1,ControlPoint.y1,ControlPoint.x2,ControlPoint.y2,points[i+1].x,points[i+1].y);
            }
        }
        context.lineWidth =chartoptions.linewidth;
        context.strokeStyle =chartoptions.linecolor;
        context.stroke();

        //返回对应点坐标
        return points;
    }

//2>添加拖拽线
    function AddVLine(_lineid,_position){
        var DragLine=$("#"+_lineid);
        DragLine.show().css({"left":_position.left,"top":_position.top,"height":_position.height});
        var bolisbindDrag=VlineManager.VlineIsBindDrag(_lineid);
        if(!bolisbindDrag){
            var DragMenuEnlementHammer=new Hammer(DragLine[0]);
            DragMenuEnlementHammer.ondragstart=function(ev){/*开始移动*/
            }
            DragMenuEnlementHammer.ondrag=function(ev){/*移动中*/
                var PostionValue=0;

                //region 限定拖拽范围
                var dragcanvas=null;
                for(var i=0;i<ChartRelationLine.Vlines.length;i++){
                    if(ChartRelationLine.Vlines[i].lineid==DragLine[0].id){
                        dragcanvas=ChartRelationLine.Vlines[i].canvas[0];
                        break;
                    }
                }

                for(var i=0;i<chartlist.length;i++){
                    if(chartlist[i].canvas.id==dragcanvas){
                        dragcanvas=$(chartlist[i].canvas);
                        break;
                    }
                }

                PostionValue=(ev.touches[0].x-15);
                if(PostionValue>=(dragcanvas.offset().left-10) && PostionValue<=(dragcanvas.offset().left+dragcanvas.width()-20)){
                    DragLine.css({"left":(ev.touches[0].x-15)+"px"});
                }else{
                    return false;
                }
                //endregion 限定拖拽范围

            }
            DragMenuEnlementHammer.ondragend=function(ev){/*移动结束*/
                /*1.根据基准线停放的位置获得对应的X轴或Y轴的值*/
                //var LineValue=GetLineOverValue(_Dir,EndX,EndY,chart);
                /*2.根据获得的X轴获取Y轴的值，将拖拽的基准线定位到相应位置*/
                //LineObj=AddStandardLine(_Dir,LineValue);
                /*4.更新Chart 中相应点的颜色*/
                calvalue(0,(ev.touches[0].x),null,DragLine[0].id);
            }

            VlineManager.VlineBindDrag(_lineid);
        }

    }
//3>计算拖拽线所处位置的折线值
    function calvalue(_type,_x,_y,_vlineid){
        if(chartlist!=null && chartlist.length>0){
            var offsetobj=null;
            //item:canvas,data,points
            var upnumber=0;
            for(var i=0;i<chartlist.length;i++){
                offsetobj=$(chartlist[i].canvas).offset();
                if(_type==0){
                    if(_x>=offsetobj.left && _x<=(offsetobj.left+chartlist[i].canvas.width)){
                        for(var j=1;j<chartlist[i].points.length;j++){
                            if((chartlist[i].points[j].x+offsetobj.left)>=_x && (chartlist[i].points[j-1].x+offsetobj.left)<=_x){
                                //获得两者距离差
                                var mprangevalue=chartlist[i].points[j].x-chartlist[i].points[j-1].x;
                                //获得两者之间x数值差
                                var mxrangevalue=chartlist[i].data[j][0]-chartlist[i].data[j-1][0];

                                //获得两者之间y数值差 若存在负值，还需单独处理
                                var myrangevalue=Math.abs(chartlist[i].data[j][1]-chartlist[i].data[j-1][1]);

                                var xsizevalue=mxrangevalue/mprangevalue;
                                var ysizevalue=myrangevalue/mprangevalue;
                                var xsizerange=_x-offsetobj.left-chartlist[i].points[j-1].x;

                                var thisvalue={
                                    xvalue:chartlist[i].data[j-1][0]+(xsizevalue*(xsizerange)),
                                    yvalue:0,
                                    y:(_x-offsetobj.left-chartlist[i].points[j-1].x)*(chartlist[i].points[j].y-chartlist[i].points[j-1].y)/(chartlist[i].points[j].x-chartlist[i].points[j-1].x)+chartlist[i].points[j-1].y
                                }
                                if(chartlist[i].points[j].y-chartlist[i].points[j-1].y>=0){}else{
                                    thisvalue.y=chartlist[i].points[j-1].y-(_x-offsetobj.left-chartlist[i].points[j-1].x)*(chartlist[i].points[j-1].y-chartlist[i].points[j].y)/(chartlist[i].points[j].x-chartlist[i].points[j-1].x)
                                }

                                if(chartlist[i].data[j][1]>=chartlist[i].data[j-1][1]){
                                    thisvalue.yvalue=chartlist[i].data[j-1][1]+(ysizevalue*(xsizerange));
                                }else{
                                    thisvalue.yvalue=chartlist[i].data[j-1][1]-(ysizevalue*(xsizerange));
                                }

                                //近距离点计算与更新
                                if(xsizerange>(mprangevalue/2)){
                                    chartlist[i].selpoint=j;
                                }else{
                                    chartlist[i].selpoint=j-1;
                                }

                                UpMidStandLineByDrag(chartlist[i].row,thisvalue.yvalue);//更新右侧均值线

                                ShowHline(chartlist[i].canvas,thisvalue.y,thisvalue.yvalue,_vlineid,thisvalue.xvalue,upnumber);
                                upnumber++;
                                //显示提示信息
                                //ShowConsoletext(chartlist[i].canvas.id+" x:"+thisvalue.xvalue+"y:"+thisvalue.yvalue+"</br>");
                                showAsixNowValue(chartlist[i].canvas.id,thisvalue.xvalue,thisvalue.yvalue);
                                break;
                            }
                        }
                    }
                }else{
                }
            }

            //更新其它垂直线显示
            ShowVlines(_vlineid);
            //更新所有标准线显示
            updateStandLines();
            //更新右侧的产物收率(非图形所必须)
            UpdateCwslData();
        }
    }
//4>显示水平线
    function ShowHline(_canvas,_y,_yvalue,_vlineid,_xvalue,upnumber){
        var canvasids=[];
        for(var i=0;i<ChartRelationLine.Hlines.length;i++){
            if(ChartRelationLine.Hlines[i].canvas.indexOf(_canvas.id)>-1){
                $("#"+ChartRelationLine.Hlines[i].lineid).show().css({"left":CanvasInfo.strtx,"top":$(_canvas).offset().top+_y-2,"width":CanvasInfo.width});
                canvasids=ChartRelationLine.Hlines[i].canvas;
                break;
            }
        }

        //region 同一行的一个图形的垂直线移动，重绘其它所有图形(原方法)
        //var canvasid=null;
        //var temppoints=null;
        //for(var i=0;i<chartlist.length;i++){
        //    canvasid=chartlist[i].canvas.id;
        //    if(canvasid!=_canvas.id && canvasids.indexOf(canvasid)>-1){
        //        //更改y值
        //        //chartlist[i].data[chartlist[i].selpoint][1]=_yvalue;
        //        changechartvalue(chartlist[i],chartlist[i].selpoint,_yvalue,chartlist[i].minmax);
        //        //重新绘图
        //        chartlist[i].points=NewChart(chartlist[i].canvas,chartlist[i].data,chartlist[i].minmax,chartlist[i].row);
        //    }
        //}
        //endregion

        //region 更新图形数据新方法
        if(upnumber==0){
            var upcells=[];
            var upchars=[];
            var selcellvalue=_xvalue;
            var selcell=1;
            for(var i=0;i<chartlist.length;i++){
                if(chartlist[i].canvas.id==_canvas.id){
                    selcell=chartlist[i].cell;
                    break;
                }
            }

            for(var i=0;i<chartlist.length;i++){
                if(chartlist[i].cell!=selcell){
                    if(upcells.indexOf(chartlist[i].cell)>-1){}else{
                        upcells.push(chartlist[i].cell);
                    }
                    upchars.push(chartlist[i]);
                }
            }
            changeChartdata(selcell,selcellvalue,upcells,upchars);//更新图形数据
        }
        //endregion
    }
    //4.1>更新图形数据
    function changechartvalue(_chartitem,_selindex,_yvalue,_minmaxobj){
        //只更新一个点数据
        //_chartitem.data[_selindex][1]=_yvalue;

        //更新整条曲线
        //_minmaxobj:{min_x: 0, max_x: 2, min_y: 30, max_y: 40}
        var rowinfo=getRowInfo(_chartitem.row,profilterdata.group.rows);
        var cellInfo=getCellInfo(_chartitem.cell,profilterdata.group.cells);
        var DataYArray=[];
        for(var j=0;j<_chartitem.data.length;j++){
            if(j!=_selindex){
                if(j<_selindex){
                    if(cellInfo.dir=="up"){
                        _chartitem.data[j][1]=getRandomNumber((_minmaxobj.min_y+rowinfo.spvalue),_yvalue,rowinfo.float);
                    }else{
                        _chartitem.data[j][1]=getRandomNumber(_yvalue,(_minmaxobj.max_y-rowinfo.spvalue),rowinfo.float);
                    }
                }else{
                    if(cellInfo.dir=="up"){
                        _chartitem.data[j][1]=getRandomNumber(_yvalue,(_minmaxobj.max_y-rowinfo.spvalue),rowinfo.float);
                    }else{
                        _chartitem.data[j][1]=getRandomNumber((_minmaxobj.min_y+rowinfo.spvalue),_yvalue,rowinfo.float);
                    }
                }
                DataYArray.push(_chartitem.data[j][1]);
            }else{
                _chartitem.data[_selindex][1]=_yvalue;
            }
        }
        if(cellInfo.dir=="up"){
            DataYArray.sort();//正序
        }else{
            DataYArray.sort().reverse();//倒序
        }

        for(var j=0;j<_chartitem.data.length;j++){
            if(j!=_selindex){
                if(j>_selindex){
                    _chartitem.data[j][1]=DataYArray[j-1];
                }else{
                    _chartitem.data[j][1]=DataYArray[j];
                }
            }else{
                _chartitem.data[_selindex][1]=_yvalue;
            }
        }
    }
    //4.2>拖拽垂直线，更新其它列图形数据
    function changeChartdata(_changecell,_changexvalue,_upcells,_updatecharts){
       var  dataJSONa={
            data:
            {
                ctype:_changecell+"",
                cvalue:_changexvalue,
                citems:[
                    //{ipname:"FIC2414",ipvalue:220,ipitems:_groupdata.group.cells[1].xitems},
                    //{ipname:"FIC2503",ipvalue:75,ipitems:_groupdata.group.cells[2].xitems}
                ]
            }
        }
        for(var i=0;i<_upcells.length;i++){
            dataJSONa.data.citems.push(getciteminfo(_upcells[i]));
        }

        DataManager.GetData452(dataJSONa,function(_result){
            caldataparse(_result,profilterdata);
            for(var i=0;i<_updatecharts.length;i++){
                for(var z=0;z<profilterdata.data.length;z++){
                    if(_updatecharts[i].row==profilterdata.data[z].row && _updatecharts[i].cell==profilterdata.data[z].cell){
                        _updatecharts[i].data=profilterdata.data[z].data;
                    }
                }
                _updatecharts[i].points=NewChart(_updatecharts[i].canvas,_updatecharts[i].data,_updatecharts[i].minmax,_updatecharts[i].row);
            }
        });
    }
    //获得子项值
    function getciteminfo(_cell){
        var item={ipname:"",ipvalue:0,ipitems:[]};
        for(var i=0;i<profilterdata.group.cells.length;i++){
            if(profilterdata.group.cells[i].cell==_cell){
                item.ipname=profilterdata.group.cells[i].gno;
                item.ipvalue=profilterdata.group.cells[i].nowvalue;
                item.ipitems=profilterdata.group.cells[i].xitems;
                break;
            }
        }
        return item;
    }
//5>显示提示文字
    function ShowConsoletext(_text){
        //$("#showItem").append(_text);
    }
//6>初始化所有水平线
    function IntiAllHlines(){
        if(profilterdata.group.rows!=null && profilterdata.group.rows.length>0){
            var canvasidarray=null;
            for(var i=0;i<profilterdata.group.rows.length;i++){
                canvasidarray=[];
                for(var j=0;j<profilterdata.data.length;j++){
                    if(profilterdata.data[j].row==profilterdata.group.rows[i].row){
                        canvasidarray.push(profilterdata.data[j].id);
                    }
                }
                ChartRelationLine.Hlines.push({canvas:canvasidarray,lineid:"Hline000"+(i+1)});
            }

            for(var i=0;i<ChartRelationLine.Hlines.length;i++){
                $(document.body).append($("<div class='Hline' id='"+ChartRelationLine.Hlines[i].lineid+"'><div class='Hlineitem'></div></div>").hide());
            }
        }
    }
//7>初始化所有垂直线
    function InitVlines(){
        if(profilterdata.group.cells!=null && profilterdata.group.cells.length>0){
            var canvasidarray=null;
            for(var i=0;i<profilterdata.group.cells.length;i++){
                canvasidarray=[];
                for(var j=0;j<profilterdata.data.length;j++){
                    if(profilterdata.data[j].cell==profilterdata.group.cells[i].cell){
                        canvasidarray.push(profilterdata.data[j].id);
                    }
                }
                ChartRelationLine.Vlines.push({canvas:canvasidarray,lineid:"Vline000"+(i+1)});
            }
        }

        for(var i=0;i<ChartRelationLine.Vlines.length;i++){
            $(document.body).append($("<div class='Vline' id='"+ChartRelationLine.Vlines[i].lineid+"'><div class='Vlineitem'></div></div>").hide());
        }

        var thisoffsetobj=$(chartlist[0].canvas).offset();

        showAsixNowValue(chartlist[0].canvas.id,chartlist[0].data[chartlist[0].selpoint][0],chartlist[0].data[chartlist[0].selpoint][1]);

        AddVLine(ChartRelationLine.Vlines[0].lineid,{left:(thisoffsetobj.left+(chartlist[0].points[chartlist[0].selpoint].x)),top:thisoffsetobj.top,height:CanvasInfo.height});

        //初始化垂直线时，更新其它列的图形显示
        calvalue(0,thisoffsetobj.left+(chartlist[0].points[chartlist[0].selpoint].x)+15,null,ChartRelationLine.Vlines[0].lineid);

        ShowVlines(ChartRelationLine.Vlines[0].lineid);
    }
//8>所有垂直线发生更改
    function ShowVlines(_movelineid){
        if(ChartRelationLine.Vlines!=null && ChartRelationLine.Vlines.length>0){
            for(var i=0;i<ChartRelationLine.Vlines.length;i++){
                if(ChartRelationLine.Vlines[i].lineid!=_movelineid){
                    for(var j=0;j<chartlist.length;j++){
                        if(ChartRelationLine.Vlines[i].canvas.indexOf(chartlist[j].canvas.id)>-1){

                            showAsixNowValue(chartlist[j].canvas.id,chartlist[j].data[chartlist[j].selpoint][0],chartlist[j].data[chartlist[j].selpoint][1]);
                            AddVLine(ChartRelationLine.Vlines[i].lineid,
                                {
                                    left:$(chartlist[j].canvas).offset().left+(chartlist[j].points[chartlist[j].selpoint].x-15),
                                    top:$(chartlist[j].canvas).offset().top,
                                    height:CanvasInfo.height
                                });
                            break;
                        }
                    }
                }
            }
        }
    }
//9>初始化每个图形选中的点
    function GetInitSelPoint(_data){
        var selpointindex=0;
        if(_data.length%2!=0){
            selpointindex= parseInt(_data.length/2);
        }else{
            selpointindex= parseInt(_data.length/2)-1;
        }
        return selpointindex;
    }
//10>垂直线处理
    var VlineManager={
        VlineIsBindDrag:function(_lineid){
            var bolisBind=false;
            if(ChartRelationLine.Vlines!=null && ChartRelationLine.Vlines.length>0){
                for(var i=0;i<ChartRelationLine.Vlines.length;i++){
                    if(_lineid==ChartRelationLine.Vlines[i].lineid){
                        if(ChartRelationLine.Vlines[i].isbinddrag){
                            bolisBind=true;
                        }
                        break;
                    }
                }
            }else{
                bolisBind= false;
            }
            return bolisBind;
        },
        VlineBindDrag:function(_lineid){
            for(var i=0;i<ChartRelationLine.Vlines.length;i++){
                if(_lineid==ChartRelationLine.Vlines[i].lineid){
                    ChartRelationLine.Vlines[i].isbinddrag=true;
                    break;
                }
            }
        }
    }
    //11>行列分组坐标值范围处理
    function GetChartItemMax(_row,_cell,_groupdata){
        var maxvalue={min_x:0,max_x:0,min_y:0,max_y:0};
        for(var i=0;i<_groupdata.rows.length;i++){
            if(_row==_groupdata.rows[i].row){
                maxvalue.max_y=_groupdata.rows[i].max_y;
                maxvalue.min_y=_groupdata.rows[i].min_y;
                break;
            }
        }
        for(var i=0;i<_groupdata.cells.length;i++){
            if(_cell==_groupdata.cells[i].cell){
                maxvalue.max_x=_groupdata.cells[i].max_x;
                maxvalue.min_x=_groupdata.cells[i].min_x;
                break;
            }
        }
        return maxvalue;
    }
    //12>产生随机数
    function getRandomNumber(under, over, floatLength) {
        var numb = 0;
        switch (arguments.length) {
            case 1:
                numb = parseInt(Math.random() * under + 1);
                break;
            case 2:
                numb = parseInt(Math.random() * (over - under + 1) + under);
                break;
            case 3:
            {
                numb = under + Math.random() * (over - under);
                //numb += Math.random();
                var str = numb.toString();
                var eInd = str.indexOf('.') + floatLength;
                str = str.substr(0, eInd + 1);
                numb = parseFloat(str);
                break;
            }
            default:
                numb = 0;
        }
        return numb;
    }
    //13>获取行信息
    function getRowInfo(_rowindex,_groupRows){
        if(_groupRows!=null && _groupRows.length>0){
            for(var i=0;i<_groupRows.length;i++){
                if(_groupRows[i].row==_rowindex){
                    return _groupRows[i];
                }
            }
        }
        return null;
    }
    //13.1>获取列信息
    function getCellInfo(_cellindex,_groupCells){
        if(_groupCells!=null && _groupCells.length>0){
            for(var i=0;i<_groupCells.length;i++){
                if(_groupCells[i].cell==_cellindex){
                    return _groupCells[i];
                }
            }
        }
        return null;
    }
    //14>绘制X，Y轴
    function DrowAxias(){

        //region X轴绘制
        var XAsixInfo={
            startx:CanvasInfo.startx,
            starty:CanvasInfo.starty+(CanvasInfo.height)
        }

        var XAsixCanvas=$("<canvas id='XasixCanvas'></canvas>").attr({width:CanvasInfo.width,height:100}).css({
            "left":(PanelObj.offset().left)+"px",
            "position":"absolute",
            "top":(PanelObj.offset().top+PanelObj.height())+"px"
        });
        XAsixCanvas.appendTo($("#chartcontent"));
        var xcanvs=document.getElementById("XasixCanvas");
        var xcontext = xcanvs.getContext("2d");
        // 绘制背景
        var gradient = xcontext.createLinearGradient(0,0,0,300);
        xcontext.fillStyle = gradient;
        xcontext.fillRect(0,0,xcanvs.width,xcanvs.height);

        // 描绘线条
        xcontext.lineWidth = 1;
//        xcontext.strokeStyle = "#a0a0a0";
        xcontext.strokeStyle =chartoptions.asixtickcolor;
        xcontext.beginPath();
        xcontext.moveTo(0,0);
        xcontext.lineTo(xcanvs.width,0);

        //绘制每列的刻度
        var tickintever=subitempars.width/10;
        var startleft=0;
        var px_sizevalue=null;
        for(var i=0;i<profilterdata.group.cells.length;i++){
            //min_x:0,max_x:19
            px_sizevalue=(profilterdata.group.cells[i].max_x-profilterdata.group.cells[i].min_x)/subitempars.width;
            startleft=(i*subitempars.width);
            for(var j=0;j<10;j++){
                xcontext.moveTo(startleft+(tickintever*(j+1)),0);
                if(j%2==0){
                    xcontext.lineTo(startleft+(tickintever*(j+1)),chartoptions.asixticklength+3);
                    addticklabel(0,xcanvs,startleft+(tickintever*(j+1))-4,4,
                        (profilterdata.group.cells[i].min_x+px_sizevalue*tickintever*(j+1)).toFixed(profilterdata.group.cells[i].float));
                }else{
                    xcontext.lineTo(startleft+(tickintever*(j+1)),chartoptions.asixticklength);
                }
            }
        }
        xcontext.stroke();
        //endregion

        //region Y轴绘制
        var XAsixInfo={
            startx:CanvasInfo.startx,
            starty:CanvasInfo.starty
        }
        var YAsixCanvas=$("<canvas id='YasixCanvas'></canvas>").attr({
            width:100,
            height:CanvasInfo.height
        }).css({
                "position":"absolute",
                "left":(PanelObj.offset().left-100)+"px",
                "top":PanelObj.offset().top+"px"
            });
        YAsixCanvas.appendTo($("#chartcontent"));
        var ycanvs=document.getElementById("YasixCanvas");
        var ycontext = ycanvs.getContext("2d");

        // 描绘线条
        ycontext.lineWidth = 1;
        ycontext.strokeStyle = chartoptions.asixtickcolor;
        ycontext.beginPath();
        ycontext.moveTo(100,0);
        ycontext.lineTo(100,CanvasInfo.height);

        //绘制每列的刻度
        var ytickintever=subitempars.height/10;
        var starttop=(profilterdata.group.rows.length*(subitempars.height+3));
        var temptoppx=starttop;

        var ypx_sizevalue=null;
        for(var i=profilterdata.group.rows.length;i>=1;i--){
            //min_x:0,max_x:19
            ypx_sizevalue=(profilterdata.group.rows[i-1].max_y-profilterdata.group.rows[i-1].min_y)/subitempars.height;
            temptoppx=starttop-((profilterdata.group.rows.length-i)*(subitempars.height+3));
            for(var j=0;j<10;j++){
                ycontext.moveTo(100,temptoppx-(ytickintever*(j+1)));
                if(j%2==0){
                    ycontext.lineTo(100-chartoptions.asixticklength-3,temptoppx-(ytickintever*(j+1)));
                    addticklabel(1,ycanvs,30,temptoppx-(ytickintever*(j+1))-8,
                        (profilterdata.group.rows[i-1].min_y+ypx_sizevalue*ytickintever*(j+1)).toFixed(profilterdata.group.rows[i-1].float));
                }else{
                    ycontext.lineTo(100-chartoptions.asixticklength,temptoppx-(ytickintever*(j+1)));
                }
            }
        }

        ycontext.stroke();

        //endregion
    }
    //15>显示坐标轴标签
    function addticklabel(_type,_canvas,x,y,_value){
        if(_type==0){
            var position={left:$(_canvas).offset().left+x,top:$(_canvas).offset().top+y};
            $("<div class='ticklabelsty'>"+_value+"</div>").css({
                "width":"9px",
                "left":position.left+"px",
                "top":position.top+"px",
                "-webkit-transform":"rotate(90deg)",
                "color":chartoptions.asixfontcolor
            }).appendTo($(document.body));
        }else{
            var position={left:$(_canvas).offset().left+x,top:$(_canvas).offset().top+y};
            $("<div class='ticklabelsty'>"+_value+"</div>").css({
                "width":"60px",
                "left":position.left+"px",
                "top":position.top+"px",
                "textAlign":"right",
                "color":chartoptions.asixfontcolor
            }).appendTo($(document.body));
        }
    }
    //16>显示X，Y标题
    function showAsixTitle(){
        var startleft=null;
        for(var i=0;i<profilterdata.group.cells.length;i++){
            startleft=(i*subitempars.width);
            $("<div class='titlesty'>"+profilterdata.group.cells[i].title+"</div>").css({
                "textAlign":"center",
                "width":subitempars.width+"px",
                "left":(PanelObj.offset().left+startleft)+"px",
                "top":(PanelObj.offset().top+PanelObj.height()+80)+"px",
                "color":chartoptions.asixfontcolor
            }).appendTo($("#chartcontent"));

            $("<div id='labelnowsty_cell"+(i+1)+"' class='labelnowsty'>0.00</div>").css({
                "textAlign":"center",
                "width":subitempars.width+"px",
                "left":(PanelObj.offset().left+startleft)+"px",
                "top":(PanelObj.offset().top+PanelObj.height()+55)+"px"
            }).appendTo($("#chartcontent"));
        }
        var starttop=null;
        var tempnode=null;
        for(var i=0;i<profilterdata.group.rows.length;i++){
            starttop=(i*(subitempars.height+3));
            tempnode=$("<div class='titlesty'>"+profilterdata.group.rows[i].title+"</div>").css({
                "width":"10px",
                "height":subitempars.height+"px",
                "text-align":"right",
                "left":(PanelObj.offset().left-97)+"px",
                "top":(PanelObj.offset().top+starttop)+"px",
                "color":chartoptions.asixfontcolor
            });
            tempnode.appendTo($("#chartcontent"));

            $("<div id='labelnowsty_row"+(i+1)+"' class='labelnowsty'>0.00</div>").css({
                "textAlign":"left",
                "left":(PanelObj.offset().left-80)+"px",
                "top":(PanelObj.offset().top+starttop-3)+"px"
//                "top":(PanelObj.offset().top+starttop+(subitempars.height/2-10))+"px"
            }).appendTo($("#chartcontent"));
        }
    }
    //17>显示X，Y轴实时数值
    function showAsixNowValue(_canvasid,_xvalue,_yvalue){
        var rowcell={
            row:-1,
            cell:-1
        }
        for(var i=0;i<profilterdata.data.length;i++){
            if(profilterdata.data[i].id==_canvasid){
                rowcell.row=profilterdata.data[i].row;
                rowcell.cell=profilterdata.data[i].cell;
                break;
            }
        }
        for(var i=0;i<profilterdata.group.rows.length;i++){
            if(profilterdata.group.rows[i].row==rowcell.row){
                profilterdata.group.rows[i].nowvalue=_yvalue.toFixed(profilterdata.group.rows[i].float);
                $("#labelnowsty_row"+rowcell.row).html(profilterdata.group.rows[i].nowvalue);
                break;
            }
        }
        for(var i=0;i<profilterdata.group.cells.length;i++){
            if(profilterdata.group.cells[i].cell==rowcell.cell){
                profilterdata.group.cells[i].nowvalue=_xvalue.toFixed(profilterdata.group.cells[i].float);
                $("#labelnowsty_cell"+rowcell.cell).html(profilterdata.group.cells[i].nowvalue);
                break;
            }
        }
    }
    //18>绘制规格线区域元素
    function updateStandLines(){
        var khq_standpanel=$("#khq_standpanel");
        khq_standpanel.html("");
        var itemObj={width:khq_standpanel.width(),height:khq_standpanel.height()/profilterdata.group.rows.length}
        if(profilterdata.group.rows!=null){
            khq_standpanel.append("<canvas id='khq_standcanvas' width='"+khq_standpanel.width()+"' height='"+khq_standpanel.height()+"'></canvas>");

            var standline_canvas=document.getElementById("khq_standcanvas");
            var SD_context = standline_canvas.getContext("2d");
            var gradient = SD_context.createLinearGradient(0,0,0,300);
            SD_context.fillStyle = gradient;
            SD_context.fillRect(0,0,standline_canvas.width,standline_canvas.height);

            // 描绘线条
            SD_context.lineWidth = 1;
            SD_context.strokeStyle ="#000000";
            SD_context.beginPath();

            var startpointy=0;
            var rowpx_sizevalue=0;
            var lineobj={min_py:0,max_py:0,mid_py:0};
            for(var i=0;i<profilterdata.group.rows.length;i++){
                SD_context.strokeStyle ="#000000";
                SD_context.beginPath();

                //subitempars
                startpointy=i*itemObj.height;
                SD_context.moveTo(0,startpointy);
                SD_context.lineTo(0,startpointy+itemObj.height);
                SD_context.lineTo(itemObj.width,startpointy+itemObj.height);
                SD_context.lineTo(itemObj.width,startpointy);
                SD_context.lineTo(0,startpointy);
                SD_context.stroke();

                SD_context.beginPath();
                SD_context.strokeStyle ="red";
                rowpx_sizevalue=(profilterdata.group.rows[i].max_y-profilterdata.group.rows[i].min_y)/itemObj.height;
                lineobj.min_py=(profilterdata.group.rows[i].lcl-profilterdata.group.rows[i].min_y)/rowpx_sizevalue;
                DrawDashLine(SD_context,5,(itemObj.width-70),10,5,startpointy+(itemObj.height-lineobj.min_py+3),"(下限:"+profilterdata.group.rows[i].lcl+")");

                lineobj.max_py=(profilterdata.group.rows[i].ucl-profilterdata.group.rows[i].min_y)/rowpx_sizevalue;
                DrawDashLine(SD_context,5,(itemObj.width-70),10,5,startpointy+(itemObj.height-lineobj.max_py+3),"(上限:"+profilterdata.group.rows[i].ucl+")");
                SD_context.stroke();

                SD_context.beginPath();
                SD_context.strokeStyle ="green";
                lineobj.mid_py=(profilterdata.group.rows[i].mid-profilterdata.group.rows[i].min_y)/rowpx_sizevalue;
                DrawDashLine(SD_context,5,(itemObj.width-70),10,5,startpointy+(itemObj.height-lineobj.mid_py+3),null);
                SD_context.stroke();
            }
            SD_context.stroke();
        }
    }
    //19>画虚线
    function DrawDashLine(conext,startpointx,endpointx,stepwidth,spcstep,_y,_showtag){
        for(var i=startpointx;i<endpointx;i++){
            conext.moveTo(i,_y);
            conext.lineTo(i+stepwidth,_y);
            i=i+stepwidth+spcstep-1;
        }
        if(_showtag!=null){
            conext.font = "8px 微软雅黑";
            conext.fillStyle =chartoptions.labelcolor;
            conext.fillText(_showtag,endpointx,_y+5);
        }
    }
    //20>更改一行数据的中位线
    function UpMidStandLineByDrag(_row,_Yvalue){
        for(var i=0;i<profilterdata.group.rows.length;i++){
            if(profilterdata.group.rows[i].row==_row){
                profilterdata.group.rows[i].mid=_Yvalue;
                break;
            }
        }
    }
    //21>规格线菜单处理
    function InitStandLineMenu(){
        $("#standline_menu").bind("click",function(){
           $("#StandLineMenuPanel").remove();
            var htmlcontent="<div id='StandLineMenuPanel' class='SDLineMenuPanelsty'>" +
                "<div class='linemenutitlerow'><div class='linemenuxy'>响应</div><div class='linemenulcl'>下规格限</div><div class='linemenuucl'>上规格限</div></div>";
            if(profilterdata.group.rows!=null && profilterdata.group.rows.length>0){
                for(var i=0;i<profilterdata.group.rows.length;i++){
                    htmlcontent+="<div class='linemenurow' data-row='"+profilterdata.group.rows[i].row+"'>" +
                        "<div class='linemenuxy'>"+profilterdata.group.rows[i].title+"</div>" +
                        "<div class='linemenul'><input type='text' data-type='lcl' value='"+profilterdata.group.rows[i].lcl+"'/></div>" +
                        "<div class='linemenul'><input type='text' data-type='ucl' value='"+profilterdata.group.rows[i].ucl+"'/></div>" +
                        "</div>";
                }
            }
            htmlcontent+="<div class='StandLineSetSaveBar'><div id='StandLineSavebtn' class='StandLineSetSave'>保存</div>&nbsp;&nbsp;&nbsp;&nbsp;<div id='StandLineCancelbtn' class='StandLineSetSave'>取消</div></div>";
            htmlcontent+="</div>";
            var panelobj=$(htmlcontent);
            panelobj.appendTo($(document.body));
            panelobj.css({
                "left":($("#standline_menu").offset().left-175)+"px",
                "top":($("#standline_menu").offset().top-3)+"px"
            }).slideToggle("slow");


            $("#StandLineCancelbtn").unbind().bind("click",function(){
                panelobj.hide();
            })
            $("#StandLineSavebtn").unbind().bind("click",function(){
                //获取数据
                var itemlist=[];
                panelobj.find(".linemenurow").each(function(i,item){
                    itemlist.push({row:$(item).data("row"),lcl:eval($(item).find("input[data-type='lcl']").val()),ucl:eval($(item).find("input[data-type='ucl']").val())});
                });
                //更新数据
                for(var i=0;i<profilterdata.group.rows.length;i++){
                    profilterdata.group.rows[i].lcl=itemlist[i].lcl;
                    profilterdata.group.rows[i].ucl=itemlist[i].ucl;
                }
                //更新显示
                updateStandLines();

                //更新图形显示
                for(var i=0;i<chartlist.length;i++){
                    //重新绘图
                    chartlist[i].points=NewChart(chartlist[i].canvas,chartlist[i].data,chartlist[i].minmax,chartlist[i].row);
                }

                panelobj.hide();
            })
        });
    }
    //22>获取行信息
    function GetgroupRowData(_rown){
        var rowobj=null;
        //更新数据
        for(var i=0;i<profilterdata.group.rows.length;i++){
           if(profilterdata.group.rows[i].row==_rown){
               rowobj=profilterdata.group.rows[i];
               break;
           }
        }
        return rowobj;
    }
    //23>更新产物收率数据
    function UpdateCwslData(){
        if(fixedData.cwsl!=null && fixedData.cwsl.length>0){
            var cwslhtml="<ul>";
            for(var i=0;i<fixedData.cwsl.length;i++){
                fixedData.cwsl[i].value=getRandomNumber(fixedData.cwsl[i].min,fixedData.cwsl[i].max,fixedData.cwsl[i].float);
                cwslhtml+="<li>"+fixedData.cwsl[i].name+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+fixedData.cwsl[i].value+"</li>";
            }
            cwslhtml+="</ul>";
            $("#khq_contentrightlist").html(cwslhtml);
        }
    }

    //24>初始化数据
    function InitLineData(_groupdata){
        var xlableslength=30;
        var xlablesarray=null;
        var xstep=null;
        //初始化X轴
        for(var i=1;i<=_groupdata.group.cells.length;i++){
            xstep=(_groupdata.group.cells[i-1].max_x-_groupdata.group.cells[i-1].min_x)/xlableslength;
            for(var j=_groupdata.group.cells[i-1].min_x;j<_groupdata.group.cells[i-1].max_x;j=j+xstep){
                _groupdata.group.cells[i-1].xitems.push(j+xstep);
            }

            //获得整列的X轴元素
            for(var ca=1;ca<=_groupdata.group.rows.length;ca++){
                _groupdata.data.push({id:"row"+ca+i,data:[],row:ca,cell:i});
                for(var cb=0;cb<_groupdata.group.cells[i-1].xitems.length;cb++){
                    _groupdata.data[_groupdata.data.length-1].data.push([_groupdata.group.cells[i-1].xitems[cb],null]);
                }
            }
        }
        //初始化默认第一列 图形数据

        var dataJSONa={
            data:
            {
                ctype:"2",
                cvalue:162500,
                citems:[
                    {ipname:"FIC2409",ipvalue:48926,ipitems:_groupdata.group.cells[0].xitems},
                    {ipname:"FIC2503",ipvalue:77500,ipitems:_groupdata.group.cells[2].xitems}]
            }
        }


        DataManager.GetData452(dataJSONa,function(_result){
            //{"result":"true","message":"执行成功","groupdata":[{"gname":"FIC2409","gdata":[{"gname":"乙烷","ewvalues":[0.000445,0.000445....]},{"gname":"乙烯","ewvalues":[0.010421,0.010421,0.010421,0.010421....]},{"gname":"能耗","ewvalues":[596.567611,596.567756...]}]},{"gname":"FIC2503","gdata":[{"gname":"乙烷","ewvalues":[0.000441,0.000441,0.000441...]},{"gname":"乙烯","ewvalues":[0.010424,0.010424,0.010424...]},{"gname":"能耗","ewvalues":[596.703857,596.703783...]}]}]}
            caldataparse(_result,_groupdata);
            dataJSONa={
                data:
                {
                    ctype:"1",
                    cvalue:48926,
                    citems:[
                        {ipname:"FIC2414",ipvalue:162500,ipitems:_groupdata.group.cells[1].xitems},
                        {ipname:"FIC2503",ipvalue:77500,ipitems:_groupdata.group.cells[2].xitems}]
                }
            }
            DataManager.GetData452(dataJSONa,function(_result){
                caldataparse(_result,_groupdata);
                StartDraw();
            });
        })
    }
    function caldataparse(_resultdata,_olddata){
        if(_resultdata.groupdata!=null && _resultdata.groupdata.length>0){
            var item=null;
            var cellindex=0;
            var rowindex=0;
            for(var i=0;i<_resultdata.groupdata.length;i++){
                item=_resultdata.groupdata[i];
                if(item.gname=="FIC2409"){
                    cellindex=1;
                }
                if(item.gname=="FIC2414"){
                    cellindex=2;
                }
                if(item.gname=="FIC2503"){
                    cellindex=3;
                }
                for(var j=0;j<item.gdata.length;j++){
                    if(item.gdata[j].gname=="乙烷"){
                        rowindex=1;
                    }
                    if(item.gdata[j].gname=="乙烯"){
                        rowindex=2;
                    }
                    if(item.gdata[j].gname=="能耗"){
                        rowindex=3;
                    }
                    updateOldData(_olddata.data,rowindex,cellindex,item.gdata[j].ewvalues);
                }
            }
        }
    }
    //更新对应行&列，单图的Y轴数据
    function updateOldData(_olddata,_row,_cell,_yvalues){
        for(var i=0;i<_olddata.length;i++){
            if(_olddata[i].row==_row && _olddata[i].cell==_cell){
                for(var j=0;j<_olddata[i].data.length;j++){
                    _olddata[i].data[j][1]=_yvalues[j];
                }
            }
        }
    }
})()
