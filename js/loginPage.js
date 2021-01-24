var verify_code = '';
var verify_email = '';
var verify_phone = '';
var cur_page = 'login';

function hideOtherPage(){
    if(cur_page == 'choose'){
        $('#register_sheet').hide();
    }else if(cur_page == 'email_verify'){
        $('#register_sheet').hide();
        $('#reg_step_body').hide();
    }else if(cur_page == 'email_input'){
        $('#register_sheet').hide();
        $('#reg_step_body').hide();
    }
}

function changePage(p){
    // login_sheet
    // register_sheet { reg_choose, reg_step_body { reg_email_step_verify, reg_email_step_input } }
    // done_sheet
    /////
    var obj = $('#login_sheet');
    //check cur page
    if(cur_page == 'login'){
        obj = $('#login_sheet');
    }else if(cur_page == 'choose'){
        obj = $('#reg_choose');
    }else if(cur_page == 'email_verify'){
        obj = $('#reg_email_step_verify');
    }else if(cur_page == 'email_input'){
        obj = $('#reg_email_step_input');
    }else if(cur_page == 'done'){
        obj = $('#done_sheet');
    }
    //navigator
    if(p == 'login'){
        obj.fadeOut(500,function (){
            hideOtherPage();
            cur_page = 'login';
            $('#login_sheet').fadeIn();
        });
    }else if(p == 'choose'){
        obj.fadeOut(500,function () {
            hideOtherPage();
            cur_page = 'choose';
            $('#register_sheet').show();
            $('#reg_choose').fadeIn();
        });
    }else if(p == 'email_verify'){
        obj.fadeOut(500,function () {
            hideOtherPage();
            cur_page = 'email_verify';
            $('#register_sheet').show();
            $('#reg_step_body').show();
            $('#reg_email_step_verify').fadeIn();
        });
    }else if(p == 'email_input'){
        obj.fadeOut(500,function () {
            hideOtherPage();
            cur_page = 'email_input';
            $('#register_sheet').show();
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

function login(){
    var account = $.trim($("#account").val());
    var password = $.trim($("#password").val());
    if(account == ""){
        $("#password").css("border-color", "#e4e4e4");
        $("#account").css("border-color", "#ff392f");
        $("#account").shake(2, 10, 400);
        //alert("请输入用户名");
        return false;
    }else if(password == ""){
        $("#account").css("border-color", "#e4e4e4");
        $("#password").css("border-color", "#ff392f");
        $("#password").shake(2, 10, 400);
        //alert("请输入密码");
        return false;
    }
    //ajax去服务器端校验
    var data= {"account":account,"password":password};
    console.log("LoginAjax");
    console.log(data);
    $.ajax({
        url: "server/Login.php", //后台请求数据
        dataType: "json",
        data:data,
        type: "POST",
        success: function (msg) {
            console.log("success!");
            console.log(msg);
            if(msg.flag == '1'){
                localStorage.setItem("s_userinfo", JSON.stringify(msg));
                location.href = "index.html";
            }else if(msg.flag == '0'){
                $("#account").css("border-color", "#e4e4e4");
                $("#password").css("border-color", "#ff392f");
                $("#password").shake(2, 10, 400);
            }else{
                $("#password").css("border-color", "#e4e4e4");
                $("#account").css("border-color", "#ff392f");
                $("#account").shake(2, 10, 400);
            }
        },
        error: function (msg) {
            console.log("error!");
            console.log(msg);
            alert("请求失败，请重试");
        }
    });
}

function register(){
    var acc = $.trim($("#reg_email_username").val());
    var pwd = $.trim($("#reg_email_pwd").val());
    var repwd = $.trim($("#reg_email_repwd").val());
    if(acc == ""){
        $("#reg_email_username").css("border-color", "#ff392f");
        $("#reg_email_pwd").css("border-color", "#458CFE");
        $("#reg_email_repwd").css("border-color", "#458CFE");
        $("#reg_email_username").shake(2, 10, 400);
    }else if(pwd == ""){
        $("#reg_email_username").css("border-color", "#458CFE");
        $("#reg_email_pwd").css("border-color", "#ff392f");
        $("#reg_email_repwd").css("border-color", "#458CFE");
        $("#reg_email_username").shake(2, 10, 400);
    }else if(repwd == ""){
        $("#reg_email_username").css("border-color", "#458CFE");
        $("#reg_email_pwd").css("border-color", "#458CFE");
        $("#reg_email_repwd").css("border-color", "#ff392f");
        $("#reg_email_username").shake(2, 10, 400);
    }else if(repwd == ""){
        showFloatTip('两次密码输入不一致，请重新输入！', 'error');
        $("#reg_email_username").css("border-color", "#458CFE");
        $("#reg_email_pwd").css("border-color", "#458CFE");
        $("#reg_email_repwd").css("border-color", "#ff392f");
        $("#reg_email_username").shake(2, 10, 400);
    }else{
        $("#reg_email_username").css("border-color", "#458CFE");
        $("#reg_email_pwd").css("border-color", "#458CFE");
        $("#reg_email_repwd").css("border-color", "#458CFE");
        //ajax去服务器端校验
        var data= {"type":"email","email":verify_email,"acc":acc,"pwd":pwd};
        console.log("RegisterAjax");
        console.log(data);
        $.ajax({
            url: "server/Register.php", //后台请求数据
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
        $("#reg_email").css("border-color", "#458CFE");
        disableWaitBtn(obj, 'email');
        waitTimeDisplay(60, obj, function () {
            enableWaitBtn(obj, 'email');
        });
        //ajax去服务器端校验
        var data= {"type":"email","email":reg_email};
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
                    verify_code = msg['verify_code'];
                    verify_email = reg_email;
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

//登录
$("#login_btn").click(function () {
    login();
});

$("#reg_email_next").click(function () {
    var reg_vercode = $.trim($('#reg_email_vercode').val());
    if(reg_vercode == "" || reg_vercode != verify_code){
        $("#reg_email_vercode").css("border-color", "#ff392f");
        $("#reg_email_vercode").shake(2, 10, 400);
    }else{
        $("#reg_email_vercode").css("border-color", "#458CFE");
        changePage('email_input');
    }
});