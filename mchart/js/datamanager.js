/**
 * Created by wanli on 2015/2/4.
 */
var DataManager={
    addressconfig:"http://localhost/ewservice/service.asmx",
    GetData452:function(_pars,_callback){
        /* jquery1.7.2 post提交方式 */
        var strurl=this.addressconfig+"/" + "getewdata452";
        var parsstr=JSON.stringify(_pars);
        $.post(
            strurl,
            { "jsonData":parsstr},
            function (_result) {
                //_result = JSON.parse(_result);
                _callback(_result);
            },
            "json");
    },
    GetData402:function(_pars,_callback){
        /* jquery1.7.2 post提交方式 */
        var strurl=this.addressconfig+"/" + "getewdata402";
        var parsstr=JSON.stringify(_pars);
        $.post(
            strurl,
            { "jsonData":parsstr},
            function (_result) {
                //_result = JSON.parse(_result);
                _callback(_result);
            },
            "json");
    }
}