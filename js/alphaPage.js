function init(){
    // localStorage为H5新增存储方式，永久存储，低版本浏览器可能不兼容
    // 为方便设置有效期，登录信息使用cookie存储
    var u_cookie = Cookies.get('s_userinfo');
    if(u_cookie == undefined || u_cookie == ''){
        console.log('未登录');
        location.href = 'login.html';
    }else{
        //已登录
        s_userinfo = JSON.parse(u_cookie);
        if(version.substring(0, 5) == 'alpha'){
            if(s_userinfo.alpha_code != null && s_userinfo.alpha_code != undefined && s_userinfo.alpha_code != ''){
                checkAlphaCode(s_userinfo.alpha_code);
            }
        }else{
            location.href = 'index.html';
        }
    }
}

$('#bind_alpha_code').click(function () {
    var code = $.trim($('#alpha_code').val());
    if(code == ''){
        $("#alpha_code").css("border-color", "#ff392f");
        $("#alpha_code").shake(2, 10, 400);
    }else{
        //ajax去服务器端校验
        var data= {"op":"bind","uuid":s_userinfo.uuid,"code":code};
        console.log(data);
        console.log("BindAlphaCodeAjax");
        $.ajax({
            url: "server/BindAlphaCode.php", //后台请求数据
            dataType: "json",
            data:data,
            type: "POST",
            success: function (msg) {
                console.log(msg);
                if(msg['flag'] == '1'){
                    Cookies.remove("s_userinfo");
                    Cookies.set('s_userinfo', JSON.stringify(msg), {expires: 1});
                    location.href = "index.html";
                }else{
                    showFloatTip('内测码不存在或已失效！', 'error');
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