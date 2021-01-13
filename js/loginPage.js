//登录
$(".submit_btn").click(function () {
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
    console.log(data);
    console.log("LoginAjax");
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
});