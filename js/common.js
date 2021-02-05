var agreement = 'http';
var domain = 'www.chake.ml';
var version = 'alpha_1.0.0';

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

/**
 * 隐式搜索框
 */
function mainSearchShowById(id, w, search_fn) {
    var body = $('#'+id);
    var img = $('#'+id+' img');
    var input = $('#'+id+' input');
    body.attr('d', 'true');
    body.stop();
    body.animate({width:w+'px'}, 200);
    input.show();
    input.unbind('keyup');
    input.bind('keyup', function(e) {
        if (e.keyCode == "13") {
            //回车执行查询
            search_fn();
        }
    });
}

function mainSearchHideById(id) {
    var body = $('#'+id);
    var img = $('#'+id+' img');
    var input = $('#'+id+' input');
    if(input.val() == ''){
        body.attr('d', 'false');
        body.stop();
        input.unbind('keyup');
        input.hide();
        body.animate({width:'50px'}, 200);
    }
}

function mainSearchForceHideById(id) {
    var body = $('#'+id);
    var img = $('#'+id+' img');
    var input = $('#'+id+' input');
    input.val('');
    body.attr('d', 'false');
    body.stop();
    input.unbind('keyup');
    input.hide();
    body.animate({width:'50px'}, 200);
}

function getMainSearchKeyWordById(id) {
    return $('#'+id+' input').val();
}

function getMainSearchIsOpenById(id) {
    var body = $('#'+id);
    return body.attr('d');
}