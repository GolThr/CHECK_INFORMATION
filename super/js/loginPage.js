var u_email = '';

function login(){
    var reg_vercode = $.trim($('#reg_email_vercode').val());
    if(reg_vercode == ""){
        $("#reg_email_vercode").css("border-color", "#ff392f");
        $("#reg_email_vercode").shake(2, 10, 400);
    }else{
        $("#reg_email_vercode").css("border-color", "#458CFE");//ajax去服务器端校验
        var data= {"type":"verify","code_input":reg_vercode};
        console.log("GetDynamicPWDAjax");
        console.log(data);
        $.ajax({
            url: "server/GetDynamicPWD.php", //后台请求数据
            dataType: "json",
            data:data,
            type: "POST",
            success: function (msg) {
                console.log(msg);
                if(msg['flag'] == '1'){
                    Cookies.set('manager_email', u_email);
                    location.href = 'index';
                }else{
                    showFloatTip('动态密码错误或已失效！','error');
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
    $('#reg_email').attr('readonly','true');
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
        console.log("GetDynamicPWDAjax");
        $.ajax({
            url: "server/GetDynamicPWD.php", //后台请求数据
            dataType: "json",
            data:data,
            type: "POST",
            success: function (msg) {
                console.log(msg);
                if(msg['flag'] == '1'){
                    u_email = reg_email;
                    showFloatTip('动态密码已发送。', 'success');
                }else{
                    showFloatTip('管理员邮箱不存在！', 'error');
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