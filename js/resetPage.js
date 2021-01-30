var verify_email = '';
var verify_phone = '';
var cur_page = 'choose';

function hideOtherPage(){
    if(cur_page == 'choose'){
        $('#reset_sheet').hide();
    }else if(cur_page == 'email_verify'){
        $('#reset_sheet').hide();
        $('#reg_step_body').hide();
    }else if(cur_page == 'email_input'){
        $('#reset_sheet').hide();
        $('#reg_step_body').hide();
    }
}

function changePage(p){
    // reset_sheet { reg_choose, reg_step_body { reg_email_step_verify, reg_email_step_input } }
    // done_sheet
    /////
    var obj = $('#reset_sheet');
    //check cur page
    if(cur_page == 'choose'){
        obj = $('#reg_choose');
    }else if(cur_page == 'email_verify'){
        obj = $('#reg_email_step_verify');
    }else if(cur_page == 'email_input'){
        obj = $('#reg_email_step_input');
    }else if(cur_page == 'done'){
        obj = $('#done_sheet');
    }
    //navigator
    if(p == 'choose'){
        obj.fadeOut(500,function () {
            hideOtherPage();
            cur_page = 'choose';
            $('#reg_choose').fadeIn();
        });
    }else if(p == 'email_verify'){
        obj.fadeOut(500,function () {
            hideOtherPage();
            cur_page = 'email_verify';
            $('#reset_sheet').show();
            $('#reg_step_body').show();
            $('#reg_email_step_verify').fadeIn();
        });
    }else if(p == 'email_input'){
        obj.fadeOut(500,function () {
            hideOtherPage();
            cur_page = 'email_input';
            $('#reset_sheet').show();
            $('#reg_step_body').show();
            $('#reg_email_step_input').fadeIn();
        });
    }else if(p == 'done'){
        obj.fadeOut(500,function () {
            hideOtherPage();
            cur_page = 'done';
            $('#done_sheet').fadeIn();
        });
    }
}

function reset(){
    var pwd = $.trim($("#reg_email_pwd").val());
    var repwd = $.trim($("#reg_email_repwd").val());
    if(pwd == ""){
        $("#reg_email_pwd").css("border-color", "#EAEDF6");
        $("#reg_email_repwd").css("border-color", "#458CFE");
        $("#reg_email_pwd").shake(2, 10, 400);
    }else if(repwd == ""){
        $("#reg_email_pwd").css("border-color", "#EAEDF6");
        $("#reg_email_repwd").css("border-color", "#ff392f");
        $("#reg_email_repwd").shake(2, 10, 400);
    }else if(repwd != pwd){
        showFloatTip('两次密码输入不一致，请重新输入！', 'error');
        $("#reg_email_pwd").css("border-color", "#EAEDF6");
        $("#reg_email_repwd").css("border-color", "#ff392f");
        $("#reg_email_repwd").shake(2, 10, 400);
    }else{
        $("#reg_email_pwd").css("border-color", "#EAEDF6");
        $("#reg_email_repwd").css("border-color", "#EAEDF6");
        //ajax去服务器端校验
        var data= {"op":"email","email":verify_email,"pwd":pwd};
        console.log("ResetUserPWDAjax");
        console.log(data);
        $.ajax({
            url: "server/ResetUserPWD.php", //后台请求数据
            dataType: "json",
            data:data,
            type: "POST",
            success: function (msg) {
                console.log("success!");
                console.log(msg);
                if(msg['flag'] == '1'){
                    changePage('done');
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

function getEmailVerify(obj){
    var reg_email = $.trim($('#reg_email').val());
    if(reg_email == ""){
        $("#reg_email").css("border-color", "#ff392f");
        $("#reg_email").shake(2, 10, 400);
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
                if(msg['flag'] == '1'){
                    verify_email = reg_email;
                }else{
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

$("#reg_email_next").click(function () {
    var reg_vercode = $.trim($('#reg_email_vercode').val());
    if(reg_vercode == ""){
        $("#reg_email_vercode").css("border-color", "#ff392f");
        $("#reg_email_vercode").shake(2, 10, 400);
    }else{
        $("#reg_email_vercode").css("border-color", "#EAEDF6");//ajax去服务器端校验
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
                    changePage('email_input');
                }else{
                    showFloatTip('验证码错误或已失效！','error');
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