var s_userinfo;
function initUser() {
    s_userinfo = JSON.parse(localStorage.getItem("s_userinfo"));
    console.log(s_userinfo);
    if(s_userinfo == null || s_userinfo.flag != "1"){
        console.log('未登录');
        location.href = 'login.html';
    }else{
        //已登录
        $('.user_name').text(s_userinfo.user_name);
        $('.user_avatar').attr("src", s_userinfo.avatar);
    }
}

function getVerCode(){
    var tmp = ['a','b','c','d','e','f','g','h','i','j','k','5','6','7','8','9','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','0','1','2','3','4']
    var code = "";
    for(var i = 0; i < 6; i++){
        code += tmp[Math.floor((Math.random() * 35) + 0)]
    }
    return code;
}