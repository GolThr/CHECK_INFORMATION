var cur_page = 'list';
var verify = 0;

function init(){
    var u_cookie = Cookies.get('manager_email');
    if(u_cookie == undefined || u_cookie == ''){
        console.log('未登录');
        location.href = 'login';
    }else{
        //已登录
        $('.user_name').text(u_cookie);
    }
    SelectPanelMenuItem('assign');
    setMainHeadTitle('转让管理员权限');
}

function changePage(p, subtitle) {
    var obj = $('#verify');
    //check cur page
    if(cur_page == 'verify'){
        obj = $('#verify');
    }else if(cur_page == 'modify'){
        obj = $('#modify');
    }else if(cur_page == 'done'){
        obj = $('#done');
    }
    //navigator
    if(p == 'verify'){
        obj.fadeOut(500,function (){
            cur_page = 'verify';
            $('#verify').fadeIn();
        });
    }else if(p == 'modify'){
        obj.fadeOut(500,function () {
            cur_page = 'modify';
            $('#modify').fadeIn();
        });
    }else if(p == 'done'){
        obj.fadeOut(500,function () {
            cur_page = 'done';
            $('#done').fadeIn();
        });
    }
}

function assignManager(old_email, new_email) {
    //ajax去服务器端校验
    var data= {"op":"assign","old_email":old_email,"new_email":new_email};
    console.log(data);
    console.log("AssignManagerAjax");
    $.ajax({
        url: "server/AssignManager.php", //后台请求数据
        dataType: "json",
        data:data,
        type: "POST",
        success: function (msg) {
            console.log(msg);
            if(msg['flag'] == '1'){
                changePage('done');
                Cookies.remove("manager_email");
                setTimeout(function () {
                    location.href = 'login';
                }, 2000);
            }else{
                showFloatTip('转让失败！', 'error');
            }
        },
        error: function (msg) {
            console.log("error!");
            console.log(msg);
            alert("请求失败，请重试");
        }
    });
}

function verifyOldEmail(vercode){
    //ajax去服务器端校验
    var data= {"type":"verify","code_input":vercode};
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
                verify = 1;
                changePage('modify');
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

function verifyNewEmail(vercode, new_email){
    //ajax去服务器端校验
    var data= {"op":"verify","code_input":vercode};
    console.log("AssignManagerAjax");
    console.log(data);
    $.ajax({
        url: "server/AssignManager.php", //后台请求数据
        dataType: "json",
        data:data,
        type: "POST",
        success: function (msg) {
            console.log(msg);
            if(msg['flag'] == '1'){
                verify = 1;
                assignManager(Cookies.get('manager_email'), new_email);
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

function getOldEmailVerify(obj, email){
    verify = 0;
    disableWaitBtn(obj, 'email');
    waitTimeDisplay(60, obj, function () {
        enableWaitBtn(obj, 'email');
    });
    //ajax去服务器端校验
    var data= {"type":"email","email":email};
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

function getNewEmailVerify(obj, email){
    verify = 0;
    disableWaitBtn(obj, 'email');
    waitTimeDisplay(60, obj, function () {
        enableWaitBtn(obj, 'email');
    });
    //ajax去服务器端校验
    var data= {"op":"vercode","email":email};
    console.log(data);
    console.log("AssignManagerAjax");
    $.ajax({
        url: "server/AssignManager.php", //后台请求数据
        dataType: "json",
        data:data,
        type: "POST",
        success: function (msg) {
            console.log(msg);
            if(msg['flag'] == '1'){
                showFloatTip('验证码已发送。', 'success');
            }else{
                showFloatTip('验证码发送失败！', 'error');
            }
        },
        error: function (msg) {
            console.log("error!");
            console.log(msg);
            alert("请求失败，请重试");
        }
    });
}

function enableWaitBtn(obj, type){
    if(type == 'email'){
        $(this).attr('onclick', 'getEmailVerify(this)');
    }
}

function disableWaitBtn(obj, type){
    if(type == 'email'){
        $(this).attr('onclick', 'showFloatTip("请求过于频繁，过一会儿再试吧！","success")');
    }
}

$("#get_old_ver").click(function () {
    getOldEmailVerify(this, Cookies.get('manager_email'));
});

$("#verify_old_btn").click(function () {
    var reg_vercode = $.trim($('#reg_email_vercode').val());
    if(reg_vercode == ""){
        $("#reg_email_vercode").css("border-color", "#ff392f");
        $("#reg_email_vercode").shake(2, 10, 400);
    }else {
        $("#reg_email_vercode").css("border-color", "#458CFE");
        verifyOldEmail(reg_vercode);
    }
});

$("#get_new_ver").click(function () {
    $('#new_email').attr('readonly','true');
    var new_email = $.trim($('#new_email').val());
    if(new_email == ""){
        $("#new_email").css("border-color", "#ff392f");
        $("#new_email").shake(2, 10, 400);
    }else {
        $("#new_email").css("border-color", "#458CFE");
        getNewEmailVerify(this, new_email);
    }
});

$("#verify_new_btn").click(function () {
    var new_email = $.trim($('#new_email').val());
    var reg_vercode = $.trim($('#new_email_vercode').val());
    if(reg_vercode == ""){
        $("#reg_email_vercode").css("border-color", "#ff392f");
        $("#reg_email_vercode").shake(2, 10, 400);
    }else {
        $("#reg_email_vercode").css("border-color", "#458CFE");
        verifyNewEmail(reg_vercode, new_email);
    }
});