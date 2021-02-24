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

/**
 * verify strings
 */
function isEmailStr(email) {
    // 对电子邮件的验证
    var myreg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
    if (!myreg.test(email)) {
        return false;
    } else {
        return true;
    }
}

function checkPasswordStrength(pwd) {
    // 验证密码
    var hard = /^(?!bai[a-zA-z]+$)(?!\d+$)(?![!@#$%^&*\.]+$)(?![a-zA-z\d]+$)(?![a-zA-z!@#$%^&*\.]+$)(?![\d!@#$%^&*\.]+$)[a-zA-Z\d!@#$%^&*\.]+$/;
    var middle = /^(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&*\.]+$)[a-zA-Z\d!@#$%^&*\.]+$/;
    var weak = /^(?:\d+|[a-zA-Z]+|[!@#$%^&*\.]+)$/;
    if(!hard.test(pwd)){
        if(!middle.test(pwd)){
            if(!weak.test(pwd)){
                return false;
            }else{
                return 'weak';
            }
        }else{
            return 'middle';
        }
    }else{
        return 'hard';
    }
}

function isValidReg(str){
    // 判断是否有列表中的危险字符
    var re=/<|>|\[|\]|\{|\}|『|』|※|○|●|◎|§|△|▲|☆|★|◇|◆|□|▼|㊣|﹋|⊕|⊙|〒|ㄅ|ㄆ|ㄇ|ㄈ|ㄉ|ㄊ|ㄋ|ㄌ|ㄍ|ㄎ|ㄏ|ㄐ|ㄑ|ㄒ|ㄓ|ㄔ|ㄕ|ㄖ|ㄗ|ㄘ|ㄙ|ㄚ|ㄛ|ㄜ|ㄝ|ㄞ|ㄟ|ㄢ|ㄣ|ㄤ|ㄥ|ㄦ|ㄧ|ㄨ|ㄩ|■|▄|▆|\*|@|#|\^|\\/;
    if (re.test(str) == true) {
        return true;
    }else{
        return false;
    }
}

function isValidLength(str, minlen, maxlen) {
    // 判断字符串是否是规定的长度
    if (str.length >= minlen && str.length <= maxlen) {
        return false;
    }
    return true;
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

function getQueryShareId(variable){
    var query = window.location.href;
    var s = '';
    for(var i = query.length - 1; i > 0; i--){
        if(query[i] == '/'){
            break;
        }
        s = query[i] + s;
    }
    return s;
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