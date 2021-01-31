var agreement = 'http';
var domain = 'www.chake.ml';

var s_userinfo;
function initUser() {
    // localStorage为H5新增存储方式，永久存储，低版本浏览器可能不兼容
    // 为方便设置有效期，登录信息使用cookie存储
    var u_cookie = Cookies.get('s_userinfo');
    if(u_cookie == undefined || u_cookie == ''){
        console.log('未登录');
        location.href = 'login.html';
    }else{
        //已登录
        s_userinfo = JSON.parse(u_cookie);
        $('.user_name').text(s_userinfo.user_name);
        $('.user_avatar').attr("src", s_userinfo.avatar);
    }
}

function initUserLocalStorage() {
    // localStorage为H5新增存储方式，永久存储，低版本浏览器可能不兼容
    // 为方便设置有效期，登录信息使用cookie存储
    s_userinfo = JSON.parse(localStorage.getItem("s_userinfo"));
    // console.log('Cookie:'+Cookies.get('s_userinfo'));
    // console.log(JSON.parse(Cookies.get('s_userinfo')));
    if(s_userinfo == null || s_userinfo.flag != "1"){
        console.log('未登录');
        location.href = 'login.html';
    }else{
        //已登录
        $('.user_name').text(s_userinfo.user_name);
        $('.user_avatar').attr("src", s_userinfo.avatar);
    }
}