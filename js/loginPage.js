var verify_email = '';
var verify_phone = '';
var cur_page = 'login';
var pwd_wrong_times = 0;

var login_loc = '';
function AMapGetPosition(){
    showFloatTip('为保障您的账号安全，请允许 获取位置 权限！若允许后无效， 请尝试刷新页面。');
    var mapObj = new AMap.Map('iCenter');
    mapObj.plugin('AMap.Geolocation', function() {
        var geolocation = new AMap.Geolocation({
            // 是否使用高精度定位，默认：true
            enableHighAccuracy: true,
            // 设置定位超时时间，默认：无穷大
            timeout: 10000,
            // 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
            buttonOffset: new AMap.Pixel(10, 20),
            //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
            zoomToAccuracy: true,
            //  定位按钮的排放位置,  RB表示右下
            buttonPosition: 'RB'
        })

        geolocation.getCurrentPosition()
        AMap.event.addListener(geolocation, 'complete', onComplete)
        AMap.event.addListener(geolocation, 'error', onError)

        function onComplete (data) {
            // data是具体的定位信息
            login_loc = data['addressComponent']['province'] + ',' + data['addressComponent']['city'];
            showLoginPage();
        }

        function onError (data) {
            // 定位出错
        }
    })
}
// AMapGetPosition();

//获取用户所在城市信息
function showCityInfo() {
    //实例化城市查询类
    var citysearch = new AMap.CitySearch();
    //自动获取用户IP，返回当前城市
    citysearch.getLocalCity(function(status, result) {
        if (status === 'complete' && result.info === 'OK') {
            if (result && result.city && result.bounds) {
                var cityinfo = result.city;
                login_loc = result.province + ',' + result.city;
                showLoginPage();
                console.log(result);
            }
        } else {
            console.log(result);
        }
    });
}
showCityInfo();
setTimeout(function() {
    showLoginPage();
}, 5000);

function showLoginPage(){
    $('.sheet_loading_img').hide();
    $('#login_body').slideDown();
}

function hideOtherPage(){
    if(cur_page == 'choose'){
        $('#register_sheet').hide();
    }else if(cur_page == 'email_verify'){
        $('#register_sheet').hide();
        $('#reg_step_body').hide();
    }else if(cur_page == 'email_input'){
        $('#register_sheet').hide();
        $('#reg_step_body').hide();
    }else if(cur_page == 'login_verify_choose'){
        $('#login_verify_sheet').hide();
    }else if(cur_page == 'login_verify'){
        $('#login_verify_sheet').hide();
    }
}

function changePage(p, type){
    // login_sheet(login)
    // register_sheet { reg_choose(choose), reg_step_body { reg_email_step_verify(email_verify), reg_email_step_input(email_input) } }
    // login_verify_sheet { login_verify_choose(login_verify_choose), login_verify(login_verify) }
    // done_sheet(done)
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
    }else if(cur_page == 'login_verify_choose'){
        obj = $('#login_verify_choose');
    }else if(cur_page == 'login_verify'){
        obj = $('#login_verify');
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
            $('#reg_email').removeAttr('readonly');
            $('#reg_email_step_verify').fadeIn();
        });
    }else if(p == 'email_input'){
        obj.fadeOut(500,function () {
            hideOtherPage();
            cur_page = 'email_input';
            $('#register_sheet').show();
            $('#reg_step_body').show();
            changePWDStrength('hide');
            $('#reg_email_step_input').fadeIn();
        });
    }else if(p == 'done'){
        obj.fadeOut(500,function () {
            hideOtherPage();
            cur_page = 'done';
            $('#done_sheet').fadeIn();
        });
    }else if(p == 'login_verify_choose'){
        obj.fadeOut(500,function () {
            hideOtherPage();
            cur_page = 'login_verify_choose';
            $('#login_verify_sheet').show();
            $('#login_verify_choose').fadeIn();
        });
    }else if(p == 'login_verify'){
        obj.fadeOut(500,function () {
            hideOtherPage();
            cur_page = 'login_verify';
            $('#login_verify_sheet').show();
            if(type == 'email'){
                $('#login_verify_subtitle').text('当前邮箱: '+verify_email);
            }else if(type == 'phone'){
                $('#login_verify_subtitle').text('当前手机: '+verify_email);
            }
            $('#login_verify').fadeIn();
        });
    }
}

function login(){
    var account = $.trim($("#account").val());
    var password = $.trim($("#password").val());
    if(account == ""){
        $("#password").css("border-color", "#e4e4e4");
        $("#drag").css("border-color", "#e4e4e4");
        $("#account").css("border-color", "#ff392f");
        $("#account").shake(2, 10, 400);
        //alert("请输入用户名");
        return false;
    }else if(password == ""){
        $("#account").css("border-color", "#e4e4e4");
        $("#drag").css("border-color", "#e4e4e4");
        $("#password").css("border-color", "#ff392f");
        $("#password").shake(2, 10, 400);
        //alert("请输入密码");
        return false;
    }else if(pwd_wrong_times >= 3){
        if(drag_success == false){
            $("#account").css("border-color", "#e4e4e4");
            $("#password").css("border-color", "#e4e4e4");
            $("#drag").css("border-color", "#ff392f");
            $("#drag").shake(2, 10, 400);
            //alert("请验证");
            return false;
        }
    }
    //ajax去服务器端校验
    var data= {"action":"login","account":account,"password":password,"ip":returnCitySN['cip'],"loc":login_loc};
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
                // localStorage.setItem("s_userinfo", JSON.stringify(msg));
                Cookies.set('s_userinfo', JSON.stringify(msg), {expires: 1});
                location.href = "index";
            }else if(msg.flag == '0'){
                pwd_wrong_times++;
                $("#account").css("border-color", "#e4e4e4");
                $("#drag").css("border-color", "#e4e4e4");
                $("#password").css("border-color", "#ff392f");
                $("#password").shake(2, 10, 400);
                if(pwd_wrong_times >= 3){
                    showDragBlock();
                }
            }else if(msg.flag == '2'){
                changePage('login_verify_choose');
                $('#login_verify_title').text('需要二次验证');
                verify_email = msg['email'];
                verify_phone = msg['phone'];
            }else if(msg.flag == '3'){
                changePage('login_verify_choose');
                $('#login_verify_title').text('异地登录验证');
                verify_email = msg['email'];
                verify_phone = msg['phone'];
            }else{
                $("#password").css("border-color", "#e4e4e4");
                $("#drag").css("border-color", "#e4e4e4");
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
    if(acc == "" || isValidLength(acc, 1, 20) || isValidReg(acc)){
        $("#reg_email_username").css("border-color", "#ff392f");
        $("#reg_email_pwd").css("border-color", "#EAEDF6");
        $("#reg_email_repwd").css("border-color", "#EAEDF6");
        $("#reg_email_username").shake(2, 10, 400);
        showFloatTip('用户名1~20字符，不可有特殊违规字符!', 'error');
        console.log('len: '+isValidLength(acc, 1, 20));
        console.log('reg: '+isValidReg(acc));
    }else if(pwd == "" || checkPasswordStrength(pwd) == false || isValidLength(pwd, 6, 20)){
        $("#reg_email_username").css("border-color", "#EAEDF6");
        $("#reg_email_pwd").css("border-color", "#ff392f");
        $("#reg_email_repwd").css("border-color", "#EAEDF6");
        $("#reg_email_pwd").shake(2, 10, 400);
        showFloatTip('密码6~20位，数字、字母、特殊字母任意组合。', 'error');
    }else if(repwd == ""){
        $("#reg_email_username").css("border-color", "#EAEDF6");
        $("#reg_email_pwd").css("border-color", "#EAEDF6");
        $("#reg_email_repwd").css("border-color", "#ff392f");
        $("#reg_email_repwd").shake(2, 10, 400);
    }else if(repwd != pwd){
        showFloatTip('两次密码输入不一致，请重新输入！', 'error');
        $("#reg_email_username").css("border-color", "#EAEDF6");
        $("#reg_email_pwd").css("border-color", "#EAEDF6");
        $("#reg_email_repwd").css("border-color", "#ff392f");
        $("#reg_email_repwd").shake(2, 10, 400);
    }else{
        $("#reg_email_username").css("border-color", "#EAEDF6");
        $("#reg_email_pwd").css("border-color", "#EAEDF6");
        $("#reg_email_repwd").css("border-color", "#EAEDF6");
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
                }else if(msg['flag'] == '2'){
                    showFloatTip('用户名1~20字符，不可有特殊违规字符!', 'error');
                }else if(msg['flag'] == '3'){
                    showFloatTip('密码6~20位，数字、字母、特殊字母任意组合。', 'error');
                }else if(msg['flag'] == '4'){
                    showFloatTip('请输入正确的邮箱！', 'error');
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
    }else if(!isEmailStr(reg_email)){
        console.log(isEmailStr(reg_email));
        $("#reg_email").css("border-color", "#ff392f");
        $("#reg_email").shake(2, 10, 400);
        showFloatTip('请输入正确的邮箱！', 'error');
    }else{
        $("#reg_email").css("border-color", "#EAEDF6");
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
                    verify_email = reg_email;
                }else if(msg['flag'] == '-1'){
                    showFloatTip('该邮箱已被注册！', 'success');
                }else{
                    showFloatTip('注册失败！', 'success');
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
        $(obj).attr('onclick', 'getEmailVerify(this)');
    }
}

function disableWaitBtn(obj, type){
    if(type == 'email'){
        $(obj).attr('onclick', 'showFloatTip("请求过于频繁，过一会儿再试吧！","success")');
    }
}

function getUserEmailVerifyCode(obj) {
    disableWaitBtn(obj, 'email');
    waitTimeDisplay(60, obj, function () {
        enableWaitBtn(obj, 'email');
    });
    //ajax去服务器端校验
    var data= {"type":"get_email_code","email":verify_email};
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
                showFloatTip('验证码已发送', 'success');
            }else{
                showFloatTip('验证码发送失败', 'error');
            }
        },
        error: function (msg) {
            console.log("error!");
            console.log(msg);
            alert("请求失败，请重试");
        }
    });
}

function checkInputPWDStrength(obj){
    var str = $(obj).val();
    if(str != ''){
        var strength = checkPasswordStrength(str);
        changePWDStrength(strength);
    }
}

function changePWDStrength(s){
    var color = $('.pwd_strength_color');
    var text = $('.pwd_strength_text');
    console.log(s);
    if(s == 'hard'){
        color.css('background','#2bbd31');
        text.css('color','#000');
        text.text('强');
        color.show();
        text.show();
    }else if(s == 'middle'){
        color.css('background','#ffcc1f');
        text.css('color','#000');
        text.text('中');
        color.show();
        text.show();
    }else if(s == 'weak'){
        color.css('background','#cf3b3f');
        text.css('color','#000');
        text.text('弱');
        color.show();
        text.show();
    }else if(s == 'hide'){
        color.hide();
        text.hide();
    }else{
        text.css('color','#cf3b3f');
        text.text('密码不符合要求');
        color.hide();
        text.show();
    }
}

//登录
$("#login_btn").click(function () {
    login();
});

$("#reg_email_next").click(function () {
    var reg_vercode = $.trim($('#reg_email_vercode').val());
    if(reg_vercode == ""){
        $("#reg_email_vercode").css("border-color", "#ff392f");
        $("#reg_email_vercode").shake(2, 10, 400);
    }else{
        $("#reg_email_vercode").css("border-color", "#458CFE");//ajax去服务器端校验
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

$("#login_verify_next").click(function () {
    var account = $.trim($("#account").val());
    var password = $.trim($("#password").val());
    var reg_vercode = $.trim($('#login_verify_vercode').val());
    if(reg_vercode == ""){
        $("#login_verify_vercode").css("border-color", "#ff392f");
        $("#login_verify_vercode").shake(2, 10, 400);
    }else{
        $("#login_verify_vercode").css("border-color", "#458CFE");
        //ajax去服务器端校验
        var data= {"action":"get","account":account,"password":password,"ip":returnCitySN['cip'],"loc":login_loc,"code_input":reg_vercode};
        console.log("LoginAjax");
        console.log(data);
        $.ajax({
            url: "server/Login.php", //后台请求数据
            dataType: "json",
            data:data,
            type: "POST",
            success: function (msg) {
                console.log(msg);
                if(msg['flag'] == '1'){
                    Cookies.set('s_userinfo', JSON.stringify(msg), {expires: 1});
                    location.href = "index";
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
