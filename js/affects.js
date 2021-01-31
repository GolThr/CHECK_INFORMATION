// function shake(jqelet) {
//     jqelet.css({ position: 'relative' });
//     for (var x = 1; x <= 2; x++) {
//         jqelet.animate({ left: (10 * -1) }, (((400 / 2) / 4)))
//             .animate({ left: 10 }, ((400 / 2) / 2))
//             .animate({ left: 0 }, (((400 / 2) / 4)));
//     }
// }
$.fn.shake = function (intShakes /*Amount of shakes*/, intDistance /*Shake distance*/, intDuration /*Time duration*/) {
    this.each(function () {
        var jqNode = $(this);
        jqNode.css({ position: 'relative' });
        for (var x = 1; x <= intShakes; x++) {
            jqNode.animate({ left: (intDistance * -1) }, (((intDuration / intShakes) / 4)))
                .animate({ left: intDistance }, ((intDuration / intShakes) / 2))
                .animate({ left: 0 }, (((intDuration / intShakes) / 4)));
        }
    });
    return this;
}

function waitToLogin(time){
    if(time > 0){
        $(".time_left").text(time);
        setTimeout(function () {
            waitToLogin(time);
        }, 1000);
        time--;
    }else if (time == 0){
        location.href = "login.html";
    }
}

var interval;
var org_text = '';
function waitTimeDisplay(time, obj, ok_fn){
    org_text = $(obj).text();
    clearInterval(interval);
    interval = setInterval(function (){
        time--;
        $(obj).text(time+'s');
        if(time == 0){
            clearInterval(interval);
            $(obj).text(org_text);
            ok_fn();
        }
    }, 1000);
}

function clearWaitDisplay(obj, ok_fn) {
    clearInterval(interval);
    $(obj).text(org_text);
    ok_fn();
}

function getVerCode(){
    var tmp = ['a','b','c','d','e','f','g','h','i','j','k','5','6','7','8','9','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','0','1','2','3','4']
    var code = "";
    for(var i = 0; i < 6; i++){
        code += tmp[Math.floor((Math.random() * 35) + 0)]
    }
    return code;
}

function getQueryVariable(variable){
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        if(pair[0] == variable){return pair[1];}
    }
    return(false);
}

function getObjectURL(file) {
    var url = null ;
    if (window.createObjectURL!=undefined) { // basic
        url = window.createObjectURL(file) ;
    } else if (window.URL!=undefined) { // mozilla(firefox)
        url = window.URL.createObjectURL(file) ;
    } else if (window.webkitURL!=undefined) { // webkit or chrome
        url = window.webkitURL.createObjectURL(file) ;
    }
    return url ;
}