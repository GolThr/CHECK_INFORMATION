
document.writeln(
    '<div class="dialog_back" style="display: none;">\n' +
    '    <!--dialog_tips-->\n' +
    '    <div class="dialog_body" id="dialog_tips" style="display: none;">\n' +
    '        <span class="dialog_title"></span>\n' +
    '        <span class="dialog_content"></span>\n' +
    '        <div class="dialog_btn_line" id="tip_btn">\n' +
    '            <span class="dialog_btn_seco" id="tip_cancel">取消</span>\n' +
    '            <span class="dialog_btn_main" id="tip_ok">确定</span>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '    <!--dialog_input-->\n' +
    '    <div class="dialog_body" id="dialog_input" style="display: none;">\n' +
    '        <span class="dialog_title">添加列</span>\n' +
    '        <input type="text" id="dialog_input_text" class="dialog_input main_input" placeholder=""/>\n' +
    '        <div class="dialog_btn_line" id="input_btn">\n' +
    '            <span class="dialog_btn_seco" id="input_cancel">取消</span>\n' +
    '            <span class="dialog_btn_main" id="input_ok">确定</span>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '    <!--dialog_publish_config-->\n' +
    '    <div class="dialog_body" id="dialog_publish_config" style="display: none;">\n' +
    '        <span class="dialog_title">配置链接</span>\n' +
    '        <span class="dialog_sub_title">链接密码(6位，可重写以自定义，不区分大小写)</span>\n' +
    '        <input type="text" class="dialog_config_code main_input"/>\n' +
    '        <span class="dialog_sub_title">验证信息(用于用户查询属于自己的信息，可选择1~2项)</span>\n' +
    '        <div class="dialog_checkbox_content" id="dialog_config_verify">\n' +
    '            <span class="dialog_checkbox_item verify_info_checkbox" id="abc" ischecked="false" isdisabled="false" onclick="onCheckedBox(this)">abc</span>\n' +
    '        </div>\n' +
    '        <div class="dialog_btn_line" id="publish_config_btn">\n' +
    '            <span class="dialog_btn_seco" id="publish_config_cancel">取消</span>\n' +
    '            <span class="dialog_btn_main" id="publish_config_next">下一步</span>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '    <!--dialog_publish_info-->\n' +
    '    <div class="dialog_body" id="dialog_publish_info" style="display: none;">\n' +
    '        <span class="dialog_title">发布成功</span>\n' +
    '        <span class="dialog_sub_title">链接:</span>\n' +
    '        <div class="dialog_text_content" id="dialog_share_link">\n' +
    '            <input type="text" readonly="true" class="dialog_share_link"/>\n' +
    '        </div>\n' +
    '        <span class="dialog_sub_title">验证码:</span>\n' +
    '        <div class="dialog_text_content" id="dialog_share_code">\n' +
    '            <input type="text" readonly="true" class="dialog_share_code"/>\n' +
    '        </div>\n' +
    '        <span class="dialog_sub_title">验证信息:</span>\n' +
    '        <span class="dialog_text_content" id="dialog_share_checkinfo"></span>\n' +
    '        <span class="dialog_sub_title">或扫描二维码</span>\n' +
    '        <div class="dialog_qrcode" id="dialog_qrcode"></div>\n' +
    '        <div class="dialog_btn_line" id="publish_info_btn">\n' +
    '            <span class="dialog_btn_seco" id="publish_info_copy">复制</span>\n' +
    '            <span class="dialog_btn_main" id="publish_info_ok">确定</span>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '    <!--dialog_edit_userinfo-->\n' +
    '    <div class="dialog_body" id="dialog_edit_userinfo" style="display: none;">\n' +
    '        <span class="dialog_title">编辑信息</span>\n' +
    '        <span class="dialog_sub_title">用户名</span>\n' +
    '        <input type="text" class="main_input" id="userinfo_name"/>\n' +
    '        <span class="dialog_sub_title">性别</span>\n' +
    '        <div class="dialog_checkbox_content">\n' +
    '            <span class="dialog_radio_item gender_checkbox" id="gender_none" ischecked="false" onclick="checkedRadioItem(\'gender_radio\',this)">保密</span>\n' +
    '            <span class="dialog_radio_item gender_checkbox" id="gender_male" ischecked="false" onclick="checkedRadioItem(\'gender_radio\',this)">男</span>\n' +
    '            <span class="dialog_radio_item gender_checkbox" id="gender_female" ischecked="false" onclick="checkedRadioItem(\'gender_radio\',this)">女</span>\n' +
    '        </div>\n' +
    '        <div class="dialog_btn_line" id="publish_config_btn">\n' +
    '            <span class="dialog_btn_seco" id="edit_userinfo_cancel">取消</span>\n' +
    '            <span class="dialog_btn_main" id="edit_userinfo_ok">确定</span>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '    <!--dialog_modify_verify-->\n' +
    '    <div class="dialog_body" id="dialog_modify_verify" style="display: none;">\n' +
    '        <span class="dialog_title">验证您的邮箱</span>\n' +
    '        <span class="dialog_sub_title" id="user_current_email"></span>\n' +
    '        <div class="dialog_verify_line" id="dialog_modify_verify_in_body" style="display: none;">\n' +
    '            <input type="text" class="main_input" id="dialog_modify_verify_in"/>\n' +
    '        </div>\n' +
    '        <div class="dialog_verify_line" id="dialog_verify_line">\n' +
    '            <input type="text" class="main_input" id="dialog_in_vercode" placeholder="验证码"/>\n' +
    '            <button class="dialog_submit_btn_sec" id="dialog_get_vercode_btn">获取验证码</button>\n' +
    '        </div>\n' +
    '        <div class="dialog_btn_line" id="publish_config_btn">\n' +
    '            <span class="dialog_btn_seco" id="modify_verify_cancel">取消</span>\n' +
    '            <span class="dialog_btn_main" id="modify_verify_next">下一步</span>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '    <!--dialog_modify_avatar-->\n' +
    '    <div class="dialog_body" id="dialog_modify_avatar" style="display: none;">\n' +
    '        <span class="dialog_title">上传头像</span>\n' +
    '        <span class="dialog_sub_title" id="modify_avatar_tip"></span>\n' +
    '        <form action="" method="post" id="t" enctype="multipart/form-data">\n' +
    '            <input type="file" name=\'tables_a[]\' id="dialog_upload_avatar" onchange="dialogUploadAvatarChange()" style="display: none;">\n' +
    '        </form>\n' +
    '        <img class="dialog_upload_avatar_display" id="dialog_upload_avatar_btn" src="images/back_upload.png"/>\n' +
    '        <div class="dialog_btn_line" id="publish_config_btn">\n' +
    '            <span class="dialog_btn_seco" id="modify_avatar_cancel">取消</span>\n' +
    '            <span class="dialog_btn_main" id="modify_avatar_ok">修改</span>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '    <!--dialog_html-->\n' +
    '    <div class="dialog_body" id="dialog_html" style="display: none;">\n' +
    '        <span class="dialog_title"></span>\n' +
    '        <div class="dialog_html_content"></div>\n' +
    '        <div class="dialog_btn_line">\n' +
    '            <span class="dialog_btn_seco" id="dialog_html_cancel">取消</span>\n' +
    '            <span class="dialog_btn_main" id="dialog_html_ok">确定</span>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '    <!--dialog_col_prop-->\n' +
    '    <div class="dialog_body" id="dialog_col_prop" style="display: none;">\n' +
    '        <span class="dialog_title">添加列</span>\n' +
    '        <span class="dialog_sub_title">列名称</span>\n' +
    '        <input type="text" id="col_prop_name" class="dialog_input main_input" placeholder="列名称"/>\n' +
    '        <div class="dialog_select_line" style="margin-top: 0;">' +
    '            <span class="dialog_sub_title" style="margin-top: 0;width: auto;">类型</span>' +
    '            <div class="main_select_list_borderstyle" style="height: 30px;width: 150px;" id="dialog_select_type" onclick="mainSelectListToggleById(\'dialog_select_type\', ToggleColPropRadioEdit)">\n' +
    '                <img class="main_select_arrow" style="top: 10px;" src="images/ic_down_arrow.png"/>\n' +
    '                <span class="main_select_default" style="line-height: 30px;">文本</span>\n' +
    '                <div class="main_select_item" style="top: 30px;">\n' +
    '                    <span>文本</span>\n' +
    '                    <span>单选框</span>\n' +
    '                </div>\n' +
    '            </div>' +
    '        </div>' +
    '        <div class="dialog_select_block" id="prop_edit_radio" style="display: none;">' +
    '            <div class="dialog_select_line" style="margin-bottom: 20px;">' +
    '                <span class="dialog_sub_title" style="margin-top: 0;width: auto;">添加选项</span>' +
    '                <div class="dialog_sub_btn_line">\n' +
    '                    <div class="dialog_sub_btn">' +
    '                        <img src="images/ic_add_grey.png" style="width: auto;height: 15px;"/>' +
    '                    </div>' +
    '                    <div class="dialog_sub_btn">' +
    '                        <img src="images/ic_delete_red.png" style="width: auto;height: 15px;"/>' +
    '                    </div>' +
    '                </div>' +
    '            </div>' +
    '            <div class="dialog_sub_btn_line" style="width: 100%;justify-content: flex-start;">' +
    '                <input class="dialog_checkbox_item verify_info_checkbox" ischecked="false" isdisabled="false" onclick="onCheckedBox(this)" style="border: none;"></input>' +
    '            </div>' +
    '        </div>' +
    '        <div class="dialog_select_line" style="margin-bottom: 20px;">' +
    '            <span class="dialog_sub_title" style="margin-top: 0;width: auto;">输入规则</span>' +
    '            <div class="main_select_list_borderstyle" style="height: 30px;width: 150px;" id="dialog_select_rule" onclick="mainSelectListToggleById(\'dialog_select_rule\',ToggleColPropRegexInput)">\n' +
    '                <img class="main_select_arrow" style="top: 10px;" src="images/ic_down_arrow.png"/>\n' +
    '                <span class="main_select_default" style="line-height: 30px;">无</span>\n' +
    '                <div class="main_select_item" style="top: 30px;">\n' +
    '                    <span>无</span>\n' +
    '                    <span>数字(不限位数)</span>\n' +
    '                    <span>自定义</span>\n' +
    '                </div>\n' +
    '            </div>' +
    '        </div>' +
    '        <input type="text" id="col_prop_regex" class="dialog_input main_input" placeholder="正则表达式" style="margin-top: 0;display: none;"/>' +
    '        <div class="dialog_btn_line" id="input_btn">\n' +
    '            <span class="dialog_btn_seco" id="col_prop_cancel">取消</span>\n' +
    '            <span class="dialog_btn_main" id="col_prop_ok">确定</span>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '    <textarea type="text" id="copy_temp"></textarea>\n' +
    '</div>'
);

var checked_num = 0;

var qrcode = new QRCode("dialog_qrcode", {
    width: 128,
    height: 128,
    colorDark : "#000000",
    colorLight : "#ffffff",
    correctLevel : QRCode.CorrectLevel.H
});

function showDialogHtml(title, html, ok_fn, cancel_fn) {
    var back = $('.dialog_back');
    var dialog_body = $('#dialog_html');
    var dialog_title = $('#dialog_html .dialog_title');
    var dialog_html_content = $('#dialog_html .dialog_html_content');
    var ok_btn = $('#dialog_html .dialog_btn_line #dialog_html_ok');
    var cancel_btn = $('#dialog_html .dialog_btn_line #dialog_html_cancel');
    back.fadeIn('fast');
    dialog_body.fadeIn('fast');
    dialog_title.text(title);
    dialog_html_content.html(html);
    cancel_btn.unbind('click');
    cancel_btn.click(function () {
        if(cancel_fn != undefined){
            cancel_fn();
        }
        // hide
        hideDialogHtml();
    });
    ok_btn.unbind('click');
    ok_btn.click(function () {
        if(ok_fn != undefined){
            ok_fn();
        }
        // hide
        hideDialogHtml();
    });
}

function hideDialogHtml(){
    var back = $('.dialog_back');
    var dialog_body = $('#dialog_html');
    dialog_body.hide();
    back.fadeOut('fast');
}

/**DialogColPropMethod**/
function showDialogColProp(title, prop, ok_fn, cancel_fn) {
    var back = $('.dialog_back');
    var dialog_body = $('#dialog_col_prop');
    var dialog_title = $('#dialog_col_prop .dialog_title');
    var ok_btn = $('#dialog_col_prop .dialog_btn_line #col_prop_ok');
    var cancel_btn = $('#dialog_col_prop .dialog_btn_line #col_prop_cancel');
    back.fadeIn('fast');
    dialog_body.fadeIn('fast');
    dialog_title.text(title);
    var col_prop_name = $('#dialog_col_prop #col_prop_name');
    var prop_edit_radio = $('#prop_edit_radio');
    var col_prop_regex = $('#col_prop_regex');
    if(prop != null && prop != ''){
        if(prop['colname'] != null && prop['colname'] != '' && prop['colname'] != undefined){
            col_prop_name.val(prop['colname']);
        }
        if(prop['type'] != null && prop['type'] != '' && prop['type'] != undefined){
            setMainSelectListSelectedById('dialog_select_type', prop['type']);
            if(prop['type'] == '单选框'){
                prop_edit_radio.show();
            }else{
                prop_edit_radio.hide();
            }
        }
        if(prop['rule'] != null && prop['rule'] != '' && prop['rule'] != undefined){
            setMainSelectListSelectedById('dialog_select_rule', prop['rule']);
            if(prop['rule'] == '自定义'){
                col_prop_regex.show();
            }else{
                col_prop_regex.hide();
            }
        }
        if(prop['options'] != null && prop['options'] != '' && prop['options'] != undefined){
            col_prop_regex.val(prop['options']);
        }
        if(prop['regex'] != null && prop['regex'] != '' && prop['regex'] != undefined){
            col_prop_regex.val(prop['regex']);
        }
    }else{
        col_prop_name.val('');
        setMainSelectListSelectedById('dialog_select_type', '文本');
        setMainSelectListSelectedById('dialog_select_rule', '无');
        col_prop_regex.val('');
        prop_edit_radio.hide();
        col_prop_regex.hide();
    }
    cancel_btn.unbind('click');
    cancel_btn.click(function () {
        if(cancel_fn != undefined){
            cancel_fn();
        }
        // hide
        hideDialogColProp();
    });
    ok_btn.unbind('click');
    ok_btn.click(function () {
        if(ok_fn != undefined){
            ok_fn();
        }
        // hide
        hideDialogColProp();
    });
}

function f() {
    
}

function hideDialogColProp(){
    var back = $('.dialog_back');
    var dialog_body = $('#dialog_col_prop');
    dialog_body.hide();
    back.fadeOut('fast');
}

function ToggleColPropRadioEdit(){
    if(getMainSelectListSelectedById('dialog_select_type') == '单选框'){
        $('#prop_edit_radio').show();
    }else{
        $('#prop_edit_radio').hide();
    }
}

function ToggleColPropRegexInput(){
    if(getMainSelectListSelectedById('dialog_select_rule') == '自定义'){
        $('#col_prop_regex').show();
    }else{
        $('#col_prop_regex').hide();
    }
}
/*****************************/

function showCheckShareInfo(msg, tbl_name){
    var link = agreement + '://' + domain + '/s/' + msg['share_id'];
    var pwd = msg['share_pwd'];
    var vercols = msg['share_vercol'];
    var check_info = '';
    for(var i in vercols){
        if(i != 0){
            check_info += ', ';
        }
        check_info += vercols[i];
    }
    showDialogPublishInfo('发布成功', link, pwd, check_info);
    bindPublishInfoCopy(function (){
        $('#copy_temp').val('【查客核对】'+s_userinfo.user_name+'邀请您参与《'+tbl_name+'》的信息核对，快点击下方链接参加吧！\n链接：'+link+'\n验证码：'+pwd);
        console.log($('#copy_temp').val());
        $("#copy_temp").select();
        document.execCommand("Copy");
        showFloatTip('复制成功', 'success');
    });
}

function showDialogTip(title,text){
    $('.dialog_back').fadeIn('fast');
    $('#dialog_tips').fadeIn('fast');
    $('.dialog_title').text(title);
    $('.dialog_content').text(text);
}

function hideDialogTip(){
    $("#dialog_tips").hide();
    $(".dialog_back").fadeOut('fast');
}

function showDialogInput(title, text){
    $('.dialog_back').fadeIn('fast');
    $('#dialog_input').fadeIn('fast');
    $('.dialog_title').text(title);
    $('#dialog_input_text').val("");
    $('#dialog_input_text').attr("placeholder", text);
}

function hideDialogInput(){
    $("#dialog_input").hide();
    $(".dialog_back").fadeOut('fast');
}

function showDialogPublishInfo(title,link,code,check_info){
    $('.dialog_back').fadeIn('fast');
    $('#dialog_publish_info').fadeIn('fast');
    $('.dialog_title').text(title);
    $('.dialog_share_link').val(link);
    $('.dialog_share_code').val(code);
    $('#dialog_share_checkinfo').text(check_info);
    qrcode.makeCode(link);
}

function hideDialogPublishInfo(){
    $("#dialog_publish_info").hide();
    $(".dialog_back").fadeOut('fast');
}

/*****DialogPublishConfig*****/
function showDialogPublishConfig(title,col_json){
    $('.dialog_back').fadeIn('fast');
    $('#dialog_publish_config').fadeIn('fast');
    $('.dialog_title').text(title);
    $('.dialog_config_code').val(getVerCode());
    $('#dialog_config_verify').html('');
    checked_num = 0;
    for(var i in col_json){
        var col_name = col_json[i];
        $('#dialog_config_verify').append('<span class="dialog_checkbox_item verify_info_checkbox" id="'+col_name+'" ischecked="false" isdisabled="false" onclick="onCheckedBox(this)">'+col_name+'</span>');
    }
}

function hideDialogPublishConfig(){
    $("#dialog_publish_config").hide();
    $(".dialog_back").fadeOut('fast');
}

/**CheckBoxMethod**/
function onCheckedBox(obj){
    if($(obj).attr('ischecked') == 'false'){
        checked_num++;
        $(obj).attr('ischecked', 'true');
        $(obj).css({'background':'#458CFE','color':'#fff'});
    }else{
        checked_num--;
        $(obj).attr('ischecked', 'false');
        $(obj).css({'background':'#EAEDF6','color':'#000'});
    }
    if(checked_num < 0){
        checked_num = 0;
    }else if(checked_num >= 2){
        hideOtherCheckBox('verify_info_checkbox');
    }else{
        showOtherCheckBox('verify_info_checkbox', 'onCheckedBox(this)');
    }
}

function getCheckedItem(checkbox_class){
    var tmp = [];
    $('.'+checkbox_class).each(function (index, elem){
        if($(elem).attr('ischecked') == 'true'){
            tmp.push($(elem).text());
        }
    });
    return tmp;
}

function showOtherCheckBox(checkbox_class, bind_fn_text){
    $('.'+checkbox_class).each(function (index, elem){
        if($(elem).attr('ischecked') == 'false') {
            $(elem).attr('isdisabled', 'false');
            $(elem).attr('onclick', bind_fn_text);
            $(elem).css({'background': '#EAEDF6', 'color': '#000'});
        }
    });
}

function hideOtherCheckBox(checkbox_class){
    $('.'+checkbox_class).each(function (index, elem){
        if($(elem).attr('ischecked') == 'false'){
            $(elem).attr('isdisabled','true');
            $(elem).attr('onclick', '');
            $(elem).css({'background':'#f1f6fc','color':'#bfbfbf'});
        }
    });
}
/*****************************/

/*****DialogEditUserinfo*****/
function showDialogEditUserinfo(username, gender, ok_fn, cancel_fn){
    $('.dialog_back').fadeIn('fast');
    $('#dialog_edit_userinfo').fadeIn('fast');
    $('.dialog_title').text('编辑信息');
    $('#userinfo_name').val(username);
    if(gender == '0'){
        checkedRadioItem('gender_radio', $('#gender_female'));
    }else if(gender == '1'){
        checkedRadioItem('gender_radio', $('#gender_male'));
    }else{
        checkedRadioItem('gender_radio', $('#gender_none'));
    }
    $("#edit_userinfo_ok").unbind('click');
    $("#edit_userinfo_ok").click(function () {
        ok_fn();
        hideDialogEditUserinfo();
    });
    $("#edit_userinfo_cancel").unbind('click');
    if(cancel_fn == undefined){
        $("#edit_userinfo_cancel").click(function (){
            hideDialogEditUserinfo();
        });
    }else{
        $("#edit_userinfo_cancel").click(function () {
            cancel_fn();
            hideDialogEditUserinfo();
        });
    }
}

function hideDialogEditUserinfo(){
    $("#dialog_edit_userinfo").hide();
    $(".dialog_back").fadeOut('fast');
}

function getDialogEditUserinfoInput(text_name) {
    if(text_name == 'username'){
        return $('#userinfo_name').val();
    }
}

/**RadioMethod**/
function getRadioSelectText(checkbox_class){
    var tmp = '';
    $('.'+checkbox_class).each(function (index, elem){
        if($(elem).attr('ischecked') == 'true'){
            tmp = $(elem).text();
        }
    });
    return tmp;
}

function checkedRadioItem(checkbox_class, item_obj){
    $('.'+checkbox_class).each(function (index, elem){
        if($(elem).attr('ischecked') == 'true'){
            $(elem).attr('ischecked','false');
            $(elem).css({'background': '#EAEDF6', 'color': '#000'});
        }
    });
    $(item_obj).attr('ischecked', 'true');
    $(item_obj).css({'background':'#458CFE','color':'#fff'});
}
/*****************************/

/*****DialogModifyVerify*****/
function showDialogModifyVerify(title, email, get_fn, next_fn, cancel_fn){
    $('#user_current_email').show();
    $('#dialog_verify_line').show();
    $('#dialog_modify_verify_in_body').hide();
    $('.dialog_title').text(title);
    $('#user_current_email').text(email);
    $('#modify_verify_next').text('下一步');
    $('.dialog_back').fadeIn('fast');
    $('#dialog_modify_verify').fadeIn('fast');

    $('#dialog_get_vercode_btn').unbind('click');
    $('#dialog_get_vercode_btn').click(function (){
        dialogGetVerifyCode(this, get_fn);
    });

    $("#modify_verify_next").unbind('click');
    $("#modify_verify_next").click(function () {
        next_fn();
    });
    $("#modify_verify_cancel").unbind('click');
    if(cancel_fn == undefined){
        $("#modify_verify_cancel").click(function (){
            hideDialogModifyVerify();
        });
    }else{
        $("#modify_verify_cancel").click(function () {
            cancel_fn();
            hideDialogModifyVerify();
        });
    }
}

function hideDialogModifyVerify(){
    $("#dialog_modify_verify").hide();
    $(".dialog_back").fadeOut('fast');
}

function changeDialogModifyNewInPage(get_fn, next_fn){
    $('#user_current_email').hide();
    $('#dialog_in_vercode').val('');
    $('#dialog_modify_verify_in_body').show();
    $('#dialog_modify_verify_in').removeAttr('readonly');
    $('.dialog_title').text('设置新邮箱');
    $('#dialog_modify_verify_in').attr('placeholder','请输入新的邮箱');
    $('#modify_verify_next').text('确定');
    clearWaitDisplay($('#dialog_get_vercode_btn'), function () {
        enableDialogWaitBtn($('#dialog_get_vercode_btn'), 'email', get_fn);
    });
    $("#modify_verify_next").unbind('click');
    $("#modify_verify_next").click(function () {
        next_fn();
        hideDialogModifyVerify();
    });
}

function enableDialogWaitBtn(obj, type, get_fn){
    if(type == 'email'){
        $(obj).unbind('click');
        $(obj).click(function () {
            dialogGetVerifyCode(this, get_fn);
        });
    }
}

function disableDialogWaitBtn(obj){
    $(obj).unbind('click');
    $(obj).click(function () {
        showFloatTip("请求过于频繁，过一会儿再试吧！","success");
    });
}

function dialogGetVerifyCode(obj, get_fn){
    disableDialogWaitBtn(obj, 'email');
    waitTimeDisplay(60, obj, function () {
        enableDialogWaitBtn(obj, 'email', get_fn);
    });
    get_fn();
}

function disableDialogModifyInNew() {
    $('#dialog_modify_verify_in').attr('readonly','true');
}

function getDialogModifyInVerCode() {
    var tmp = $('#dialog_in_vercode').val();
    if(tmp == ''){
        $('#dialog_in_vercode').css("border-color", "#ff392f");
        $("#dialog_in_vercode").shake(2, 10, 400);
    }
    return tmp;
}

function getDialogModifyInNew() {
    var tmp = $('#dialog_modify_verify_in').val();
    if(tmp == ''){
        $('#dialog_modify_verify_in').css("border-color", "#ff392f");
        $("#dialog_modify_verify_in").shake(2, 10, 400);
    }
    return tmp;
}
/*****************************/

/*****DialogModifyAvatar*****/
function showDialogModifyAvatar(avatar, ok_fn, cancel_fn){
    $('.dialog_title').text('上传头像');
    $('#modify_avatar_tip').text('点击下方图片上传新头像, 不超过5MB, 支持jpg, png格式');
    $("#dialog_upload_avatar_btn").attr('src', avatar);
    $('.dialog_back').fadeIn('fast');
    $('#dialog_modify_avatar').fadeIn('fast');

    $("#dialog_upload_avatar_btn").unbind('click');
    $('#dialog_upload_avatar_btn').click(function () {
        $('#dialog_upload_avatar').click();
    });

    $("#modify_avatar_ok").unbind('click');
    $("#modify_avatar_ok").click(function () {
        ok_fn();
        hideDialogModifyVerify();
    });
    $("#modify_avatar_cancel").unbind('click');
    if(cancel_fn == undefined){
        $("#modify_avatar_cancel").click(function (){
            hideDialogModifyVerify();
        });
    }else{
        $("#modify_avatar_cancel").click(function () {
            cancel_fn();
            hideDialogModifyVerify();
        });
    }
}

function hideDialogModifyAvatar(){
    $("#dialog_modify_avatar").hide();
    $(".dialog_back").fadeOut('fast');
}

function dialogUploadAvatarChange() {
    var fileArray = document.getElementById('dialog_upload_avatar').files[0];
    $('#dialog_upload_avatar_btn').attr('src',getObjectURL(fileArray));
}

function getDialogUploadAvatar() {
    var fileArray = document.getElementById('dialog_upload_avatar').files[0];
    return fileArray;
}
/*****************************/

function bindTipOK(fn){
    $("#tip_ok").unbind('click');
    $("#tip_ok").click(fn);
}

function bindTipCancel(fn){
    $("#tip_cancel").unbind('click');
    $("#tip_cancel").click(fn);
}

function bindInputOK(fn){
    $("#input_ok").unbind('click');
    $("#input_ok").click(fn);
}

function bindInputCancel(fn){
    $("#tip_cancel").unbind('click');
    $("#tip_cancel").click(fn);
}

function bindPublishInfoOK(fn){
    $("#publish_info_ok").unbind('click');
    $("#publish_info_ok").click(fn);
}

function bindPublishInfoCopy(fn){
    $("#publish_info_copy").unbind('click');
    $("#publish_info_copy").click(fn);
}

function bindPublishConfigNext(fn){
    $("#publish_config_next").unbind('click');
    $("#publish_config_next").click(fn);
}

function bindPublishConfigCancel(fn){
    $("#publish_config_cancel").unbind('click');
    $("#publish_config_cancel").click(fn);
}

$(".dialog_body").click(function (event) {
    event.stopPropagation();
});

$("#tip_cancel").click(function () {
    hideDialogTip();
});

$("#input_cancel").click(function () {
    hideDialogInput();
});

$("#publish_info_ok").click(function () {
    hideDialogPublishInfo();
});

$("#publish_config_cancel").click(function () {
    hideDialogPublishConfig();
});

$("#dialog_share_link").click(function () {
    $(".dialog_share_link").select();
    document.execCommand("Copy");
});

$("#dialog_share_code").click(function () {
    $(".dialog_share_code").select();
    document.execCommand("Copy");
});

$(".dialog_config_code").focus(function () {
    $(".dialog_config_code").select();
});