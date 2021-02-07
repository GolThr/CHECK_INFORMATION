var verify_pwd = 0;
var verify_ep = 0;
var cur_page = 'pwd';
var s_uuid = '';

function init(){
    initUser();
}

function changePage(p){
    var obj = $('#pwd_verify');
    //check cur page
    if(cur_page == 'pwd'){
        obj = $('#pwd_verify');
    }else if(cur_page == 'choose'){
        obj = $('#reg_choose');
    }else if(cur_page == 'verify'){
        obj = $('#reg_email_step_verify');
    }else if(cur_page == 'done'){
        obj = $('#done_sheet');
    }
    //navigator
    if(p == 'pwd'){
        obj.fadeOut(500,function () {
            cur_page = 'pwd';
            $('#reg_choose').fadeIn();
        });
    }else if(p == 'choose'){
        obj.fadeOut(500,function () {
            cur_page = 'choose';
            $('#reg_choose').fadeIn();
        });
    }else if(p == 'verify'){
        $("#reg_email").text(s_userinfo.email);
        obj.fadeOut(500,function () {
            cur_page = 'verify';
            $('#reg_email_step_verify').fadeIn();
        });
    }else if(p == 'done'){
        obj.fadeOut(500,function () {
            cur_page = 'done';
            $('#done_sheet').fadeIn();
        });
    }
}

function logoff(pwd){
    //ajax去服务器端校验
    var data= {"op":"logoff","ver":version,"uuid":s_userinfo.uuid,"pwd":pwd};
    console.log("UserLogOffAjax");
    console.log(data);
    $.ajax({
        url: "server/UserLogOff.php", //后台请求数据
        dataType: "json",
        data:data,
        type: "POST",
        success: function (msg) {
            console.log("success!");
            console.log(msg);
            if(msg['flag'] == '1'){
                changePage('done');
                s_uuid = s_userinfo.uuid;
                Cookies.remove("s_userinfo");
            }else{
                showFloatTip('账号注销失败', 'error');
            }
        },
        error: function (msg) {
            console.log("error!");
            console.log(msg);
            alert("请求失败，请重试");
        }
    });
}

function sendAdvise(){
    var content = $('#reg_done_advise').val();
    if(content != ''){
        //ajax去服务器端校验
        var data= {"op":"advise","ver":version,"uuid":s_uuid,"content":content};
        console.log("UserLogOffAjax");
        console.log(data);
        $.ajax({
            url: "server/UserLogOff.php", //后台请求数据
            dataType: "json",
            data:data,
            type: "POST",
            success: function (msg) {
                console.log("success!");
                console.log(msg);
                if(msg['flag'] == '1'){
                    showFloatTip('反馈成功，感谢您的反馈！');
                }
            },
            error: function (msg) {
                console.log("error!");
                console.log(msg);
                alert("请求失败，请重试");
            }
        });
    }else{
        showFloatTip('请先输入反馈内容，再点击反馈哦~');
    }
}

function getEmailVerify(obj){
    var reg_email = $.trim($('#reg_email').val());
    if(reg_email == ""){
        $("#reg_email").css("border-color", "#ff392f");
        $("#reg_email").shake(2, 10, 400);
    }else if(reg_email != s_userinfo.email){
        $("#reg_email").css("border-color", "#ff392f");
        $("#reg_email").shake(2, 10, 400);
        showFloatTip('该账户未绑定此邮箱!', 'error');
    }else{
        $("#reg_email").css("border-color", "#EAEDF6");
        disableWaitBtn(obj, 'email');
        waitTimeDisplay(60, obj, function () {
            enableWaitBtn(obj, 'email');
        });
        //ajax去服务器端校验
        var data= {"type":"get_email_code","email":reg_email};
        console.log(data);
        console.log("GetRegVerifyCodeAjax");
        $.ajax({
            url: "server/GetRegVerifyCode.php", //后台请求数据
            dataType: "json",
            data:data,
            type: "POST",
            success: function (msg) {
                console.log(msg);
                if(msg['flag'] != '1'){
                    showFloatTip('该邮箱未注册查客账号！', 'error');
                }
            },
            error: function (msg) {
                console.log("error!");
                console.log(msg);
                alert("请求失败，请重试");
            }
        });
    }
}

function enableWaitBtn(obj, type){
    if(type == 'email'){
        $('#get_email_ver_btn').attr('onclick', 'getEmailVerify(this)');
    }
}

function disableWaitBtn(obj, type){
    if(type == 'email'){
        $('#get_email_ver_btn').attr('onclick', 'showFloatTip("请求过于频繁，过一会儿再试吧！","success")');
    }
}

$("#pwd_verify_btn").click(function () {
    var old_pwd = $.trim($('#pwd_verify_in').val());
    if(old_pwd == ""){
        $('#pwd_verify_in').css("border-color", "#ff392f");
        $("#pwd_verify_in").shake(2, 10, 400);
    }else{
        $('#pwd_verify_in').css("border-color", "#EAEDF6");
        //ajax去服务器端校验
        var data= {"op":"verify","uuid":s_userinfo.uuid,"old_pwd":old_pwd};
        console.log("ModifyUserInfoAjax");
        console.log(data);
        $.ajax({
            url: "server/ModifyUserInfo.php", //后台请求数据
            dataType: "json",
            data:data,
            type: "POST",
            success: function (msg) {
                console.log(msg);
                if(msg['flag'] == '1'){
                    changePage('choose');
                    verify_pwd = 1;
                }else{
                    $('#pwd_verify_in').css("border-color", "#ff392f");
                    $("#pwd_verify_in").shake(2, 10, 400);
                    showFloatTip('密码错误, 请重新输入！', 'error');
                }
            },
            error: function (msg) {
                console.log("error!");
                console.log(msg);
                alert("请求失败，请重试");
            }
        });
    }
});

$('#reg_email_next').click(function () {
    var old_pwd = $.trim($('#pwd_verify_in').val());
    var reg_vercode = $.trim($('#reg_email_vercode').val());
    if(reg_vercode == ""){
        $('#reg_email_vercode').css("border-color", "#ff392f");
        $("#reg_email_vercode").shake(2, 10, 400);
    }else{
        $('#reg_email_vercode').css("border-color", "#EAEDF6");
        //ajax去服务器端校验
        var data= {"type":"verify","code_input":reg_vercode};
        console.log("GetRegVerifyCodeAjax");
        console.log(data);
        $.ajax({
            url: "server/GetRegVerifyCode.php", //后台请求数据
            dataType: "json",
            data:data,
            type: "POST",
            success: function (msg) {
                console.log(msg);
                if(msg['flag'] == '1'){
                    if(verify_pwd == 1){
                        logoff(old_pwd);
                    }
                }else{
                    showFloatTip('验证码错误', 'error');
                }
            },
            error: function (msg) {
                console.log("error!");
                console.log(msg);
                alert("请求失败，请重试");
            }
        });
    }
});