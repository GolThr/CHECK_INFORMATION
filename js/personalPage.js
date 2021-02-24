var cur_page = 'menu';
var showAllLog = 'less';   // less: show less, all: show all
var notice_list = [];
var message_list = [];
var feedback_list = [];
var picArray = [];
var n_picArray = 0;

function init(){
    initUser();
    $('.head_back_btn').hide();
    $('.head_title').text('个人中心');
    SelectPanelMenuItem('mine');

    var page = getQueryVariable('page');
    if(page == 'notice'){
        changePage('notice');
    }else if(page == 'message'){
        changePage('message');
    }
    renderPersonalMenuInfo();
}

function changePage(p){
    // panel_body_menu, panel_body_info, panel_body_security, panel_body_message, panel_body_notice, panel_body_feedback, panel_body_pay, panel_body_about
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
    }else if(cur_page == 'feedback'){
        obj = $('#panel_body_feedback');
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
            showLessLoginLog();
            hideChangePWDPage();
            initLoginLogList();
            initSecurityOptionList();
        });
    }else if(p == 'message'){
        obj.fadeOut(500,function () {
            cur_page = 'message';
            setMainHeadTitle('消息');
            showBackBtn(function (){
                changePage('menu');
            });
            $('#panel_body_message').fadeIn();
            initMessageList();
        });
    }else if(p == 'notice'){
        obj.fadeOut(500,function () {
            cur_page = 'notice';
            setMainHeadTitle('公告');
            showBackBtn(function (){
                changePage('menu');
            });
            $('#panel_body_notice').fadeIn();
            initNoticeList();
        });
    }else if(p == 'feedback'){
        obj.fadeOut(500,function () {
            cur_page = 'feedback';
            setMainHeadTitle('我的反馈');
            showBackBtn(function (){
                changePage('menu');
            });
            $('#panel_body_feedback').fadeIn();
            n_picArray = 0;
            initFeedbackList();
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
            $('#version').text(version);
        });
    }
}

function changeFeedbackPage(p){
    var list = $('#feedback_list');
    var edit = $('#feedback_edit');
    if(p == 'list'){
        list.show();
        edit.hide();
        setMainHeadTitle('我的反馈');
        showBackBtn(function (){
            changePage('menu');
        });
        initFeedbackList();
    }else if(p == 'edit'){
        list.hide();
        edit.show();
        setMainHeadTitle('编辑反馈');
        showBackBtn(function (){
            changeFeedbackPage('list');
        });
        n_picArray = 0;
        picArray = [];
    }
}

function initSecurityOptionList(){
    //ajax去服务器端校验
    var data= {"op":"get","uuid":s_userinfo.uuid};
    console.log("UserSettingsOperateAjax");
    console.log(data);
    $.ajax({
        url: "server/UserSettingsOperate.php", //后台请求数据
        dataType: "json",
        data:data,
        type: "POST",
        success: function (msg) {
            console.log(msg);
            if(msg['flag'] == '1'){
                renderSecurityOptionList(msg['settings']);
            }else{
                showFloatTip('读取用户配置失败！', 'error');
            }
        },
        error: function (msg) {
            console.log("error!");
            console.log(msg);
            alert("请求失败，请重试");
        }
    });
}

function initLoginLogList(){
    //ajax去服务器端校验
    var data= {"type":"less","uuid":s_userinfo.uuid,"n":"5"};
    console.log("GetLoginLogsAjax");
    console.log(data);
    $.ajax({
        url: "server/GetLoginLogs.php", //后台请求数据
        dataType: "json",
        data:data,
        type: "POST",
        success: function (msg) {
            console.log(msg);
            if(msg['flag'] == '1'){
                renderLoginLogList(msg['logs']);
            }else{
                showFloatTip('读取登录信息失败！', 'error');
            }
        },
        error: function (msg) {
            console.log("error!");
            console.log(msg);
            alert("请求失败，请重试");
        }
    });
}

function initLoginLogListAll(){
    //ajax去服务器端校验
    var data= {"type":"all","uuid":s_userinfo.uuid};
    console.log("GetLoginLogsAjax");
    console.log(data);
    $.ajax({
        url: "server/GetLoginLogs.php", //后台请求数据
        dataType: "json",
        data:data,
        type: "POST",
        success: function (msg) {
            console.log(msg);
            if(msg['flag'] == '1'){
                renderLoginLogList(msg['logs']);
            }else{
                showFloatTip('读取登录信息失败！', 'error');
            }
        },
        error: function (msg) {
            console.log("error!");
            console.log(msg);
            alert("请求失败，请重试");
        }
    });
}

function initNoticeList() {
    //ajax去服务器端校验
    var data= {"type":"all"};
    console.log("GetNoticeAjax");
    console.log(data);
    $.ajax({
        url: "server/GetNotice.php", //后台请求数据
        dataType: "json",
        data:data,
        type: "POST",
        success: function (msg) {
            console.log(msg);
            if(msg.flag == '1'){
                notice_list = msg['notices'];
                renderNoticeList();
            }
        },
        error: function (msg) {
            console.log("error!");
            console.log(msg);
            alert("请求失败，请重试");
        }
    });
}

function initMessageList() {
    //ajax去服务器端校验
    var data= {"type":"get","uuid":s_userinfo.uuid};
    console.log("GetMessageAjax");
    console.log(data);
    $.ajax({
        url: "server/GetMessage.php", //后台请求数据
        dataType: "json",
        data:data,
        type: "POST",
        success: function (msg) {
            console.log(msg);
            if(msg.flag == '1'){
                message_list = msg['messages'];
                renderMessageList();
            }
        },
        error: function (msg) {
            console.log("error!");
            console.log(msg);
            alert("请求失败，请重试");
        }
    });
}

function initFeedbackList() {
    //ajax去服务器端校验
    var data= {"op":"get","uuid":s_userinfo.uuid};
    console.log("FeedBackOperateAjax");
    console.log(data);
    $.ajax({
        url: "server/FeedBackOperate.php", //后台请求数据
        dataType: "json",
        data:data,
        type: "POST",
        success: function (msg) {
            console.log(msg);
            if(msg.flag == '1'){
                feedback_list = msg['feedbacks'];
                renderFeedbackList();
            }
        },
        error: function (msg) {
            console.log("error!");
            console.log(msg);
            alert("请求失败，请重试");
        }
    });
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

function renderLoginLogList(msg){
    $('#security_login_history_table').html('');
    $('#security_login_history_table').append('<tr><th>方式</th><th>平台</th><th>IP</th><th>地址</th><th>时间</th></tr>');
    for(var i in msg){
        $('#security_login_history_table').append('<tr><td>'+msg[i]['method']+'</td><td>'+msg[i]['platform']+'</td><td>'+msg[i]['ip']+'</td><td>'+msg[i]['loc']+'</td><td>'+msg[i]['time']+'</td></tr>');
    }
}

function renderSecurityOptionList(msg){
    if(msg['twice_verify'] == 'on'){
        switcherTwiceOpen();
    }else{
        switcherTwiceClose();
    }
    if(msg['loc_verify'] == 'on'){
        switcherLoctechOpen();
    }else{
        switcherLoctechClose();
    }
}

function renderNoticeList() {
    var back_empty = $('#notice_back_empty');
    var all_list = $("#notice_all_list");

    if(notice_list.length == 0){
        back_empty.show();
        return;
    }
    back_empty.hide();
    all_list.html('');
    var btn_img = 'ic_warning.png';
    var pub_time = '';
    var end_time = '';
    for(var i in notice_list){
        if(notice_list[i]['notice_type'] == 'warning'){
            btn_img = 'ic_warning.png';
        }else{
            btn_img = 'ic_serious.png';
        }
        pub_time = notice_list[i]["pub_time"].substring(0, 16);
        end_time = notice_list[i]["end_time"].substring(0, 16);
        all_list.append(
            '<div class="all_list_item" style="height: 80px;" onclick="viewNotice(\''+i+'\')">\n' +
            '                <div class="all_list_item_left">\n' +
            '                    <img class="all_list_item_img" src="images/'+btn_img+'">\n' +
            '                    <div class="all_list_item_data_view_body">\n' +
            '                       <span class="all_list_item_title">'+notice_list[i]["notice_type"]+'</span>\n' +
            '                       <span class="all_list_item_text">(点击查看详情) '+notice_list[i]["summary"]+'</span>\n' +
            '                       <div class="all_list_item_left_bottom">\n' +
            '                           <span class="all_list_item_text">发布时间: '+pub_time+'</span>\n' +
            '                           <span class="all_list_item_text" style="margin-left: 10px;">截止时间: '+end_time+'</span>\n' +
            '                       </div>\n' +
            '                    </div>\n' +
            '                </div>\n' +
            '            </div>'
        );
    }
}

function renderMessageList(){
    var back_empty = $('#message_back_empty');
    var all_list = $("#message_all_list");

    if(message_list.length == 0){
        back_empty.show();
        return;
    }
    back_empty.hide();
    all_list.html('');
    var btn_img = 'ic_warning.png';
    var pub_time = '';
    var end_time = '';
    for(var i in message_list){
        if(message_list[i]['isread'] == '1'){
            btn_img = 'ic_success.png';
        }else{
            btn_img = 'ic_message_red.png';
        }
        pub_time = message_list[i]["pub_time"].substring(0, 19);
        all_list.append(
            '<div class="all_list_item" style="height: 80px;" onclick="viewMessage(\''+i+'\')">\n' +
            '                <div class="all_list_item_left">\n' +
            '                    <img class="all_list_item_img" src="images/'+btn_img+'">\n' +
            '                    <div class="all_list_item_data_view_body">\n' +
            '                       <span class="all_list_item_title">'+message_list[i]["msg_title"]+'</span>\n' +
            '                       <span class="all_list_item_text">'+message_list[i]["msg_text"]+'</span>\n' +
            '                       <div class="all_list_item_left_bottom">\n' +
            '                           <span class="all_list_item_text">'+pub_time+'</span>\n' +
            '                       </div>\n' +
            '                    </div>\n' +
            '                </div>\n' +
            '            </div>'
        );
    }
}

function renderFeedbackList(){
    var back_empty = $('#feedback_back_empty');
    var all_list = $("#feedback_all_list");

    if(feedback_list.length == 0){
        back_empty.show();
        return;
    }
    back_empty.hide();
    all_list.html('');
    var btn_img = 'ic_warning.png';
    var title = '';
    var pub_time = '';
    for(var i in feedback_list){
        if(feedback_list[i]['solved'] == '1'){
            btn_img = 'ic_success.png';
        }else{
            btn_img = 'ic_message_red.png';
        }
        if(feedback_list[i]['type'] == 'bug'){
            title = 'bug反馈';
        }else{
            title = '意见建议';
        }
        pub_time = feedback_list[i]["time"].substring(0, 16);
        var img_html = '';
        var pic_json = feedback_list[i]["pic_json"];
        for(var j in pic_json){
            img_html += '<img src="'+pic_json[j]+'">';
        }
        all_list.append(
            '<div class="all_list_item" style="height: 140px;" onclick="viewFeedback(\''+i+'\')">\n' +
            '                <div class="all_list_item_left">\n' +
            '                    <img class="all_list_item_img" src="images/'+btn_img+'">\n' +
            '                    <div class="all_list_item_data_view_body">\n' +
            '                       <span class="all_list_item_title">'+title+'</span>\n' +
            '                       <span class="all_list_item_text">'+feedback_list[i]["content"]+'</span>\n' +
            '                       <div class="all_list_item_img_line">' +
            img_html +
            '                       </div>\n' +
            '                       <div class="all_list_item_left_bottom">\n' +
            '                           <span class="all_list_item_text">'+pub_time+'</span>\n' +
            '                       </div>\n' +
            '                    </div>\n' +
            '                </div>\n' +
            '            </div>'
        );
    }
}

function viewNotice(i) {
    var type = notice_list[i]['notice_type'];
    var summary = notice_list[i]['summary'];
    var text = notice_list[i]['notice_text'];
    var pub = notice_list[i]['pub_time'].substring(0, 16);
    var end = notice_list[i]['end_time'].substring(0, 16);

    showMsgBoxHtml('公告 ('+pub+' ~ '+end+')',
        '<span class="msgbox_sub_title">摘要</span>' +
        '<span class="msgbox_text">'+summary+'</span>'+
        '<span class="msgbox_sub_title">内容</span>' +
        '<textarea class="msgbox_text" readonly>'+text+'</textarea>'
    );
}

function viewMessage(i) {
    var title = message_list[i]['msg_title'];
    var text = message_list[i]['msg_text'];
    var pub = message_list[i]['pub_time'].substring(0, 16);

    showMsgBoxHtml(title+' ('+pub+')',
        '<span class="msgbox_text">'+text+'</span>'
    );

    //ajax去服务器端校验
    var data= {"type":"read","uuid":s_userinfo.uuid,"msg_id":message_list[i]['msg_id']};
    console.log("GetMessageAjax");
    console.log(data);
    $.ajax({
        url: "server/GetMessage.php", //后台请求数据
        dataType: "json",
        data:data,
        type: "POST",
        success: function (msg) {
            console.log(msg);
            if(msg.flag == '1'){
                initMessageList();
            }
        },
        error: function (msg) {
            console.log("error!");
            console.log(msg);
            alert("请求失败，请重试");
        }
    });
}

function viewFeedback(i) {
    var title = feedback_list[i]['type'] == 'bug' ? 'bug反馈' : '意见建议';
    var text = feedback_list[i]['content'];
    var pub_time = feedback_list[i]["time"].substring(0, 16);
    var img_html = '';
    var pic_json = feedback_list[i]["pic_json"];
    for(var j in pic_json){
        img_html += '<img style="cursor: pointer;" src="'+pic_json[j]+'" onclick="showPicturePopup(\''+pic_json[j]+'\')">';
    }

    showMsgBoxHtml(title+' ('+pub_time+')',
        '<span class="msgbox_text">'+text+'</span>' +
        '<div class="all_list_item_img_line">' +
        img_html +
        '</div>'
    );
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
                    showFloatTip('修改信息成功！', 'success');
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
    showDialogModifyAvatar(s_userinfo.avatar, function () {
        /*获得文件*/
        var fileArray = getDialogUploadAvatar();
        /*初始化 FormData 对象 文件处理对象  序列化表单数据*/
        var formData = new FormData();
        /*给对象中添加文件信息，没有对象或者没有文件信息后台是得不到的*/
        formData.append('file', fileArray);
        formData.append('op', 'avatar');
        formData.append('uuid', s_userinfo.uuid);
        /*jquery ajax 方法*/
        $.ajax({
            url: "server/ModifyUserInfo.php",/*传向后台服务器文件*/
            type: 'POST',    /*传递方法 */
            data:formData,  /*要带的值，在这里只能带一个formdata ，不可以增加其他*/
            //传递的数据
            dataType : 'json',  //传递数据的格式
            async:false, //这是重要的一步，防止重复提交的
            cache: false,  //设置为faldbconfig.phpse，上传文件不需要缓存。
            contentType: false,//设置为false,因为是构造的FormData对象,所以这里设置为false。
            processData: false,//设置为false,因为data值是FormData对象，不需要对数据做处理。
            success: function (msg){
                console.log(msg);
                if(msg['flag'] == '1'){
                    showFloatTip('修改头像成功！', 'success');
                    localStorage.removeItem("s_userinfo");
                    localStorage.setItem("s_userinfo", JSON.stringify(msg));
                    initUser();
                    renderPersonalMenuInfo();
                    location.reload();
                }else if(msg['flag'] == '2'){
                    showFloatTip('图片过大, 只支持5MB以内的图片。', 'error');
                }else if(msg['flag'] == '3'){
                    showFloatTip('图片格式不支持，只支持jpg或png格式的图片。', 'error');
                }
            },
            error: function () {
                alert("上传错误！");
            }
        });
    });
}

function getOldEmailVerifyCode(email) {
    //ajax去服务器端校验
    var data= {"type":"get_email_code","email":email};
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

function toRebindEmail(){
    showDialogModifyVerify('验证您的邮箱', s_userinfo.email, function (){
        getOldEmailVerifyCode(s_userinfo.email);
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
                showFloatTip('成功绑定新邮箱！', 'success');
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

function showLessLoginLog() {
    var displayBody = $('#login_history_content');
    var chPWD = $('#changePWD');
    var op_list = $('#security_option_list');
    var showAllBtn = $('#showAllLogBtn');
    if(showAllLog == 'all'){
        showAllLog = 'less';
        initLoginLogList();
        displayBody.animate({'right':'170px'},200,function () {
            chPWD.fadeIn(200);
            op_list.fadeIn(200);
            showAllBtn.text('查看所有>');
        });
    }
}

function showAllLogToggle(){
    var displayBody = $('#login_history_content');
    var chPWD = $('#changePWD');
    var op_list = $('#security_option_list');
    var showAllBtn = $('#showAllLogBtn');
    if(showAllLog == 'less'){
        showAllLog = 'all';
        initLoginLogListAll();
        chPWD.hide();
        op_list.hide();
        displayBody.animate({'right':'0'},200);
        showAllBtn.text('收起>');
    }else{
        showAllLog = 'less';
        initLoginLogList();
        displayBody.animate({'right':'170px'},200,function () {
            chPWD.fadeIn(200);
            op_list.fadeIn(200);
            showAllBtn.text('查看所有>');
        });
    }
}

function hideChangePWDPage() {
    var displayBody = $('#login_history_content');
    var chPWD = $('#changePWD');
    var op_list = $('#security_option_list');
    var pwdBtnW = '150px';
    var pwdBtnH = '250px';

    chPWD.addClass('me_func_item_goto');
    hideChangePWDChoose();
    chPWD.animate({'width':pwdBtnW,'height':pwdBtnH},200,function () {
        displayBody.fadeIn(200);
        op_list.fadeIn(200);
    });
}

function showChangePWDPage(){
    var displayBody = $('#login_history_content');
    var chPWD = $('#changePWD');
    var op_list = $('#security_option_list');
    var pwdBtnW = '150px';
    var pwdBtnH = '250px';

    displayBody.hide();
    op_list.hide();
    chPWD.removeClass('me_func_item_goto');
    chPWD.animate({'width':'100%','height':'400px'},200, function () {
        showChangePWDChoose();
    });
}

function showChangePWDChoose() {
    $('#security_chpwd_btn_img').hide();
    $('#security_chpwd_btn_title').hide();
    $('#chpwd_body').fadeIn(200);
    changeCHPWDPage('choose');
}

function hideChangePWDChoose() {
    $('#chpwd_body').hide();
    $('#security_chpwd_btn_img').fadeIn(200);
    $('#security_chpwd_btn_title').fadeIn(200);
}

function changeCHPWDPage(p) {
    var choose = $('#chpwd_choose');
    var pwd_verify = $('#chpwd_pwd_verify');
    var verify = $('#chpwd_verify');
    var chpwd = $('#chpwd_main');
    if(p == 'choose'){
        choose.show();
        pwd_verify.hide();
        verify.hide();
        chpwd.hide();
    }else if(p == 'pwd_verify'){
        choose.hide();
        pwd_verify.show();
        verify.hide();
        chpwd.hide();
    }else if(p == 'verify'){
        choose.hide();
        pwd_verify.hide();
        verify.show();
        chpwd.hide();
    }else if(p == 'chpwd'){
        choose.hide();
        pwd_verify.hide();
        verify.hide();
        chpwd.show();
    }
}

function switcherTwiceChange(s) {   // s: on, off
    if(s == 'on' || s == 'off'){
        //ajax去服务器端校验
        var data= {"op":"modify_twice","uuid":s_userinfo.uuid,"new_val":s};
        console.log("UserSettingsOperateAjax");
        console.log(data);
        $.ajax({
            url: "server/UserSettingsOperate.php", //后台请求数据
            dataType: "json",
            data:data,
            type: "POST",
            success: function (msg) {
                console.log(msg);
                if(msg['flag'] != '1'){
                    showFloatTip('配置失败，请重试！', 'error');
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

function switcherTwiceToggle(){
    var sw = $('#switcher_twice');
    var sw_bg = $('#switcher_twice_bg');
    var sw_btn = $('#switcher_twice_btn');
    var w = sw.width();
    var bg_end_w = w - 10;
    var btn_end_w = w - 20;
    if(sw.attr('ischecked') == 'false'){
        sw.attr('ischecked', 'true');
        sw_btn.animate({left:btn_end_w}, 200);
        sw_bg.animate({width:bg_end_w}, 200);
        switcherTwiceChange('on');
    }else{
        sw.attr('ischecked', 'false');
        sw_btn.animate({left:0}, 200);
        sw_bg.animate({width:0}, 200);
        switcherTwiceChange('off');
    }
}

// private use
function switcherTwiceOpen(){
    var sw = $('#switcher_twice');
    var sw_bg = $('#switcher_twice_bg');
    var sw_btn = $('#switcher_twice_btn');
    var w = sw.width();
    var bg_end_w = w - 10;
    var btn_end_w = w - 20;
    sw.attr('ischecked', 'true');
    sw_btn.animate({left:btn_end_w}, 200);
    sw_bg.animate({width:bg_end_w}, 200);
}

// private use
function switcherTwiceClose(){
    var sw = $('#switcher_twice');
    var sw_bg = $('#switcher_twice_bg');
    var sw_btn = $('#switcher_twice_btn');
    var w = sw.width();
    var bg_end_w = w - 10;
    var btn_end_w = w - 20;
    sw.attr('ischecked', 'false');
    sw_btn.animate({left:0}, 200);
    sw_bg.animate({width:0}, 200);
}

function switcherLoctechChange(s) {   // s: on, off
    if(s == 'on' || s == 'off'){
        //ajax去服务器端校验
        var data= {"op":"modify_loc","uuid":s_userinfo.uuid,"new_val":s};
        console.log("UserSettingsOperateAjax");
        console.log(data);
        $.ajax({
            url: "server/UserSettingsOperate.php", //后台请求数据
            dataType: "json",
            data:data,
            type: "POST",
            success: function (msg) {
                console.log(msg);
                if(msg['flag'] != '1'){
                    showFloatTip('配置失败，请重试！', 'error');
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

function switcherLoctechToggle(){
    var sw = $('#switcher_loctech');
    var sw_bg = $('#switcher_loctech_bg');
    var sw_btn = $('#switcher_loctech_btn');
    var w = sw.width();
    var bg_end_w = w - 10;
    var btn_end_w = w - 20;
    if(sw.attr('ischecked') == 'false'){
        sw.attr('ischecked', 'true');
        sw_btn.animate({left:btn_end_w}, 200);
        sw_bg.animate({width:bg_end_w}, 200);
        switcherLoctechChange('on');
    }else{
        sw.attr('ischecked', 'false');
        sw_btn.animate({left:0}, 200);
        sw_bg.animate({width:0}, 200);
        switcherLoctechChange('off');
    }
}

// private use
function switcherLoctechOpen(){
    var sw = $('#switcher_loctech');
    var sw_bg = $('#switcher_loctech_bg');
    var sw_btn = $('#switcher_loctech_btn');
    var w = sw.width();
    var bg_end_w = w - 10;
    var btn_end_w = w - 20;
    sw.attr('ischecked', 'true');
    sw_btn.animate({left:btn_end_w}, 200);
    sw_bg.animate({width:bg_end_w}, 200);
}

// private use
function switcherLoctechClose(){
    var sw = $('#switcher_loctech');
    var sw_bg = $('#switcher_loctech_bg');
    var sw_btn = $('#switcher_loctech_btn');
    var w = sw.width();
    var bg_end_w = w - 10;
    var btn_end_w = w - 20;
    sw.attr('ischecked', 'false');
    sw_btn.animate({left:0}, 200);
    sw_bg.animate({width:0}, 200);
}

function enableWaitBtn(obj, type){
    $('#get_email_ver_btn').attr('onclick', 'getEmailVerify(this)');
}

function disableWaitBtn(obj, type){
    $('#get_email_ver_btn').attr('onclick', 'showFloatTip("请求过于频繁，过一会儿再试吧！","success")');
}

function logoffAcc(){
    showDialogTip('确认要注销吗', '该操作将会永久注销您的账号，包括您账号中包含的数据也将一并删除。若您账号中包含重要数据，请谨慎操作。点击下方确认将视为您已知晓该事项。');
    bindTipOK(function () {
        window.open('goodbye.html');
        hideDialogTip();
    });
}

function del_upload_pic(obj) {
    var upload_pic_btn = $('#upload_pic_btn');
    var pic_id = $(obj).attr('i');
    var upload_pic_line = $('#upload_pic_line');
    picArray.splice(pic_id, 1);
    n_picArray--;
    upload_pic_line.html('');
    for(var i = 0; i < n_picArray; i++){
        var file = picArray[i];
        upload_pic_line.append('<img class="upload_pic" i="'+i+'" id="upload_pic_'+i+'" src="'+getObjectURL(file)+'" onclick="del_upload_pic(this)"/>');
    }
    if(n_picArray < 5){
        upload_pic_btn.show();
    }
}

function onFilePicChange() {
    var upload_pic_btn = $('#upload_pic_btn');
    var upload_pic_line = $('#upload_pic_line');
    var file = document.getElementById('upload_pic').files[0];
    upload_pic_line.append('<img class="upload_pic" i="'+n_picArray+'" id="upload_pic_'+n_picArray+'" src="'+getObjectURL(file)+'" onclick="del_upload_pic(this)"/>');
    picArray[n_picArray++] = file;
    if(n_picArray >= 5){
        upload_pic_btn.hide();
    }
}

function sendFeedback() {
    var type = getMainSelectListSelectedById('edit_type') == 'bug反馈' ? 'bug' : 'advise';
    var text = $('#edit_text').val();
    if(text == ''){
        showMsgBoxHtml('错误', '请输入消息内容');
    }else{
        //ajax去服务器端校验
        var formData = new FormData();
        formData.append('n_picArray', n_picArray);
        for(var i = 0; i < n_picArray; i++){
            formData.append('pic'+i, picArray[i]);
        }
        formData.append('op', 'pub');
        formData.append('text', text);
        formData.append('uuid', s_userinfo.uuid);
        formData.append('type', type);
        console.log("FeedBackOperateAjax");
        console.log(formData);
        $.ajax({
            url: "server/FeedBackOperate.php",/*传向后台服务器文件*/
            type: 'POST',    /*传递方法 */
            data:formData,  /*要带的值，在这里只能带一个formdata ，不可以增加其他*/
            //传递的数据
            dataType : 'json',  //传递数据的格式
            async:false, //这是重要的一步，防止重复提交的
            cache: false,  //设置为faldbconfig.phpse，上传文件不需要缓存。
            contentType: false,//设置为false,因为是构造的FormData对象,所以这里设置为false。
            processData: false,//设置为false,因为data值是FormData对象，不需要对数据做处理。
            success: function (msg){
                console.log(msg);
                var err_code = msg['err_code'];
                if(err_code == '000'){
                    changeFeedbackPage('list');
                    showFloatTip('上传成功', 'success');
                }else if(err_code == '801'){
                    showFloatTip('请先登录', 'error');
                }else if(err_code == '802'){
                    showFloatTip('请选择反馈类型', 'error');
                }else if(err_code == '803'){
                    showFloatTip('请输入反馈描述', 'error');
                }else{
                    showFloatTip(msg['err_text'], 'error');
                }
            },
            error: function () {
                alert("上传错误！");
            }
        });
    }
}

function changeTextTextarea(){
    var text = $('#edit_text').val();
    var len = text.length;
    $('#edit_text_cnt').text(len+'/600');
}

$('#info_edit_blue').click(function () {
    showDialogEditUserinfo(s_userinfo.user_name, s_userinfo.gender, function () {
        modifyUserInfo();
    });
});

$('#chpwd_body').click(function (event) {
    event.stopPropagation();
});

$('#chpwd_get_vercode_btn').click(function () {
    disableWaitBtn(this, 'email');
    waitTimeDisplay(60, this, function () {
        enableWaitBtn(this, 'email');
    });
    getOldEmailVerifyCode(s_userinfo.email);
});

$('#security_chpwd_pwd_next_btn').click(function () {
    var old_pwd = $.trim($('#user_old_pwd').val());
    if(old_pwd == ""){
        $('#user_old_pwd').css("border-color", "#ff392f");
        $("#user_old_pwd").shake(2, 10, 400);
    }else{
        $('#user_old_pwd').css("border-color", "#EAEDF6");
        //ajax去服务器端校验
        var data= {"op":"verify","uuid":s_userinfo.uuid,"old_pwd":old_pwd};
        console.log("ModifyUserInfoAjax");
        console.log(data);
        $.ajax({
            url: "server/ModifyUserInfo.php", //后台请求数据
            dataType: "json",
            data:data,
            type: "POST",
            success: function (msg) {
                console.log(msg);
                if(msg['flag'] == '1'){
                    changeCHPWDPage('chpwd');
                }else{
                    showFloatTip('密码错误, 请重新输入！', 'error');
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

$('#security_chpwd_next_btn').click(function () {
    var reg_vercode = $.trim($('#chpwd_in_vercode').val());
    if(reg_vercode == ""){
        $('#chpwd_in_vercode').css("border-color", "#ff392f");
        $("#chpwd_in_vercode").shake(2, 10, 400);
    }else{
        $('#chpwd_in_vercode').css("border-color", "#EAEDF6");
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
                    changeCHPWDPage('chpwd');
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

$('#security_chpwd_done_btn').click(function () {
    var obj_pwd = $("#reg_email_pwd");
    var obj_repwd = $("#reg_email_repwd");
    var pwd = $.trim(obj_pwd.val());
    var repwd = $.trim(obj_repwd.val());
    if(pwd == ""){
        obj_pwd.css("border-color", "#ff392f");
        obj_repwd.css("border-color", "#EAEDF6");
        obj_pwd.shake(2, 10, 400);
    }else if(repwd == ""){
        obj_pwd.css("border-color", "#EAEDF6");
        obj_repwd.css("border-color", "#ff392f");
        obj_repwd.shake(2, 10, 400);
    }else if(repwd != pwd){
        showFloatTip('两次密码输入不一致，请重新输入！', 'error');
        obj_pwd.css("border-color", "#EAEDF6");
        obj_repwd.css("border-color", "#ff392f");
        obj_repwd.shake(2, 10, 400);
    }else{
        obj_pwd.css("border-color", "#EAEDF6");
        obj_repwd.css("border-color", "#EAEDF6");
        //ajax去服务器端校验
        var data= {"op":"pwd","uuid":s_userinfo.uuid,"pwd":pwd};
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
                    showFloatTip('修改密码成功！', 'success');
                    hideChangePWDPage();
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

$('#edit_pub_btn').click(function () {
    sendFeedback();
});
