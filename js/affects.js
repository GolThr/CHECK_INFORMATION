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

var org_text = '';
function waitDisplayRun(time, obj, ok_fn){
    if(time > 0){
        $(obj).text(time+'s');
        setTimeout(function () {
            time--;
            waitDisplayRun(time, obj, ok_fn);
        }, 1000);
    }else if(time == 0){
        waitTimeDone(obj);
        ok_fn();
    }
}

function waitTimeDone(obj){
    $(obj).text(org_text);
}

function waitTimeDisplay(time, obj, ok_fn){
    org_text = $(obj).text();
    waitDisplayRun(time, obj, ok_fn);
}