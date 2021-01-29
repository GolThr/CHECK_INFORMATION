var cur_page = 'menu';

function init(){
    initUser();
    $('.head_back_btn').hide();
    $('.head_title').text('个人中心');
    SelectPanelMenuItem('mine');

    renderPersonalMenuInfo();
}

function changePage(p){
    // panel_body_menu, panel_body_info, panel_body_security, panel_body_message, panel_body_notice, panel_body_pay, panel_body_about
    /////
    var obj = $('#panel_body_menu');
    //check cur page
    if(cur_page == 'menu'){
        obj = $('#panel_body_menu');
    }else if(cur_page == 'info'){
        obj = $('#panel_body_info');
    }else if(cur_page == 'security'){
        obj = $('#panel_body_security');
    }else if(cur_page == 'message'){
        obj = $('#panel_body_message');
    }else if(cur_page == 'notice'){
        obj = $('#panel_body_notice');
    }else if(cur_page == 'pay'){
        obj = $('#panel_body_pay');
    }else if(cur_page == 'about'){
        obj = $('#panel_body_about');
    }
    //navigator
    if(p == 'menu'){
        obj.fadeOut(500,function (){
            cur_page = 'menu';
            setMainHeadTitle('个人中心');
            hideBackBtn();
            $('#panel_body_menu').fadeIn();
        });
    }else if(p == 'info'){
        obj.fadeOut(500,function () {
            cur_page = 'info';
            setMainHeadTitle('用户信息');
            showBackBtn(function (){
                changePage('menu');
            });
            $('#panel_body_info').fadeIn();
        });
    }else if(p == 'security'){
        obj.fadeOut(500,function () {
            cur_page = 'security';
            setMainHeadTitle('账号安全');
            showBackBtn(function (){
                changePage('menu');
            });
            $('#panel_body_security').fadeIn();
        });
    }else if(p == 'message'){
        obj.fadeOut(500,function () {
            cur_page = 'message';
            setMainHeadTitle('消息');
            showBackBtn(function (){
                changePage('menu');
            });
            $('#panel_body_message').fadeIn();
        });
    }else if(p == 'notice'){
        obj.fadeOut(500,function () {
            cur_page = 'notice';
            setMainHeadTitle('公告');
            showBackBtn(function (){
                changePage('menu');
            });
            $('#panel_body_notice').fadeIn();
        });
    }else if(p == 'pay'){
        obj.fadeOut(500,function () {
            cur_page = 'pay';
            setMainHeadTitle('打赏');
            showBackBtn(function (){
                changePage('menu');
            });
            $('#panel_body_pay').fadeIn();
        });
    }else if(p == 'about'){
        obj.fadeOut(500,function () {
            cur_page = 'about';
            setMainHeadTitle('关于');
            showBackBtn(function (){
                changePage('menu');
            });
            $('#panel_body_about').fadeIn();
        });
    }
}

function renderPersonalMenuInfo(){
    $('.me_func_item_avatar').attr('src', s_userinfo.avatar);
    $('.me_func_item_username').text(s_userinfo.user_name);
    $('#item_line_user_email').text(s_userinfo.email);
    $('#item_line_user_phone').text(s_userinfo.phone_number);
    if(s_userinfo.gender == 0){
        $('.me_func_item_gender').show();
        $('.me_func_item_gender').attr('src', 'images/ic_gender_female.png');
    }else if(s_userinfo.gender == 1){
        $('.me_func_item_gender').show();
        $('.me_func_item_gender').attr('src', 'images/ic_gender_male.png');
    }else{
        $('.me_func_item_gender').hide();
    }
}

function modifyUserInfo(){
    var in_username = getDialogEditUserinfoInput('username');
    var in_gender_text = getRadioSelectText('gender_radio');
    var in_gender = 2;  //  2 is secret
    if(in_username == ''){
        $('#userinfo_name').css("border-color", "#ff392f");
        $("#userinfo_name").shake(2, 10, 400);
    }else{
        if(in_gender_text == '男'){
            in_gender = 1;
        }else if(in_gender_text == '女'){
            in_gender = 0;
        }
        //ajax去服务器端校验
        var data= {"op":"info","uuid":s_userinfo.uuid,"in_username":in_username,"in_gender":in_gender};
        console.log("ModifyUserInfoAjax");
        console.log(data);
        $.ajax({
            url: "server/ModifyUserInfo.php", //后台请求数据
            dataType: "json",
            data:data,
            type: "POST",
            success: function (msg) {
                console.log(msg);
                if(msg.flag == '1'){
                    localStorage.removeItem("s_userinfo");
                    localStorage.setItem("s_userinfo", JSON.stringify(msg));
                    initUser();
                    renderPersonalMenuInfo();
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

function toModifyAvatar() {
    showDialogModifyAvatar(s_userinfo.avatar);
}

function toRebindEmail(){
    showDialogModifyVerify('验证您的邮箱', s_userinfo.email, function (){
        //ajax去服务器端校验
        var data= {"type":"get_email_code","email":s_userinfo.email};
        console.log("GetRegVerifyCodeAjax");
        console.log(data);
        $.ajax({
            url: "server/GetRegVerifyCode.php", //后台请求数据
            dataType: "json",
            data:data,
            type: "POST",
            success: function (msg) {
                console.log(msg);
            },
            error: function (msg) {
                console.log("error!");
                console.log(msg);
                alert("请求失败，请重试");
            }
        });
    }, function () {
        var reg_vercode = getDialogModifyInVerCode();
        if(reg_vercode != ""){
            //ajax去服务器端校验
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
                        changeDialogModifyNewInPage(function (){
                            disableDialogModifyInNew();
                            var newEmail = getDialogModifyInNew();
                            if(newEmail != ''){
                                //ajax去服务器端校验
                                var data= {"type":"email","email":newEmail};
                                console.log("GetRegVerifyCodeAjax");
                                console.log(data);
                                $.ajax({
                                    url: "server/GetRegVerifyCode.php", //后台请求数据
                                    dataType: "json",
                                    data:data,
                                    type: "POST",
                                    success: function (msg) {
                                        console.log(msg);
                                    },
                                    error: function (msg) {
                                        console.log("error!");
                                        console.log(msg);
                                        alert("请求失败，请重试");
                                    }
                                });
                            }
                        }, function () {
                            verifyNewEmail();
                        });
                    }else{
                        showFloatTip('验证码错误', 'error');
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
}

function verifyNewEmail(){
    var newEmail = getDialogModifyInNew();
    var reg_vercode = getDialogModifyInVerCode();
    if(newEmail != "" && reg_vercode != ""){
        //ajax去服务器端校验
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
                    rebindUserEmail(newEmail);
                }else{
                    showFloatTip('验证码错误', 'error');
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

function rebindUserEmail(email){
    //ajax去服务器端校验
    var data= {"op":"email","uuid":s_userinfo.uuid,"email":email};
    console.log("ModifyUserInfoAjax");
    console.log(data);
    $.ajax({
        url: "server/ModifyUserInfo.php", //后台请求数据
        dataType: "json",
        data:data,
        type: "POST",
        success: function (msg) {
            console.log(msg);
            if(msg.flag == '1'){
                localStorage.removeItem("s_userinfo");
                localStorage.setItem("s_userinfo", JSON.stringify(msg));
                showFloatTip('成功绑定新邮箱！', 'success');
                initUser();
                renderPersonalMenuInfo();
            }
        },
        error: function (msg) {
            console.log("error!");
            console.log(msg);
            alert("请求失败，请重试");
        }
    });
}

function showChangeAvatarBtn(){
    $('.me_func_item_avatar_change').show();
}

function hideChangeAvatarBtn(){
    $('.me_func_item_avatar_change').hide();
}

function blueInfoEditBtn(){
    $('#info_edit_blue').show();
    $('#info_edit_grey').hide();
}

function greyInfoEditBtn(){
    $('#info_edit_grey').show();
    $('#info_edit_blue').hide();
}

$('#info_edit_blue').click(function () {
    showDialogEditUserinfo(s_userinfo.user_name, s_userinfo.gender, function () {
        modifyUserInfo();
    });
});