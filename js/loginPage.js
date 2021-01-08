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
    console.log(JSON.stringify(data));
    console.log("LoginAjax");
    $.ajax({
        //*&/InformationCheck/&*
        url: "server/login.php", //后台请求数据
        dataType: "json",
        data:data,
        type: "POST",
        success: function (msg) {
            console.log("success!");
            console.log(msg);
            console.log(JSON.stringify(msg));
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
            var parsedJson = JSON.stringify(msg);
            console.log(parsedJson);
            var jsonData = JSON.parse(parsedJson);
            console.log(jsonData);
            alert("请求失败，请重试");
        }
    });
});