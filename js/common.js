var agreement = 'http';
var domain = 'www.chake.link';
var version = 'alpha_2.0.0';

var s_userinfo;
function initUser() {
    // localStorage为H5新增存储方式，永久存储，低版本浏览器可能不兼容
    // 为方便设置有效期，登录信息使用cookie存储
    var u_cookie = Cookies.get('s_userinfo');
    if(u_cookie == undefined || u_cookie == ''){
        console.log('未登录');
        location.href = 'login';
    }else{
        //已登录
        s_userinfo = JSON.parse(u_cookie);
        if(version.substring(0, 5) == 'alpha'){
            if(s_userinfo.alpha_code == null || s_userinfo.alpha_code == undefined || s_userinfo.alpha_code == ''){
                location.href = 'alpha';
            }else{
                checkAlphaCode(s_userinfo.alpha_code);
            }
        }else{
            $('.user_name').text(s_userinfo.user_name);
            $('.user_avatar').attr("src", s_userinfo.avatar);
        }
    }
}

function checkAlphaCode(code) {
    //ajax去服务器端校验
    var data= {"op":"check","uuid":s_userinfo.uuid,"code":code};
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
                $('.user_name').text(s_userinfo.user_name);
                $('.user_avatar').attr("src", s_userinfo.avatar);
            }else{
                location.href = 'alpha';
            }
        },
        error: function (msg) {
            console.log("error!");
            console.log(msg);
            alert("请求失败，请重试");
        }
    });
}

function initUserLocalStorage() {
    // localStorage为H5新增存储方式，永久存储，低版本浏览器可能不兼容
    // 为方便设置有效期，登录信息使用cookie存储
    s_userinfo = JSON.parse(localStorage.getItem("s_userinfo"));
    // console.log('Cookie:'+Cookies.get('s_userinfo'));
    // console.log(JSON.parse(Cookies.get('s_userinfo')));
    if(s_userinfo == null || s_userinfo.flag != "1"){
        console.log('未登录');
        location.href = 'login';
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