/*
<div class="dialog_back" style="display: none;">
    <!--dialog_tips-->
    <div class="dialog_body" id="dialog_tips" style="display: none;">
        <span class="dialog_title"></span>
        <span class="dialog_content"></span>
        <div class="dialog_btn_line" id="tip_btn">
            <span class="dialog_btn_seco" id="tip_cancel">取消</span>
            <span class="dialog_btn_main" id="tip_ok">确定</span>
        </div>
    </div>
    <!--dialog_input-->
    <div class="dialog_body" id="dialog_input" style="display: none;">
        <span class="dialog_title">输入列名</span>
        <input type="text" class="dialog_input main_input" placeholder=""/>
        <div class="dialog_btn_line" id="input_btn">
            <span class="dialog_btn_seco" id="input_cancel">取消</span>
            <span class="dialog_btn_main" id="input_ok">确定</span>
        </div>
    </div>
    <!--dialog_publish_config-->
    <div class="dialog_body" id="dialog_publish_config" style="display: none;">
        <span class="dialog_title">配置链接</span>
        <span class="dialog_sub_title">链接密码(6位，可重写以自定义，不区分大小写)</span>
        <input type="text" readonly="true" class="dialog_config_code main_input"/>
        <span class="dialog_sub_title">验证信息(用于用户查询属于自己的信息，可选择1~2项)</span>
        <div class="dialog_checkbox_content" id="dialog_config_verify">
            <span class="dialog_checkbox_item" id="abc" ischecked="false" isdisabled="false" onclick="onCheckedBox(this)">abc</span>
        </div>
        <div class="dialog_btn_line" id="publish_config_btn">
            <span class="dialog_btn_seco" id="publish_config_cancel">取消</span>
            <span class="dialog_btn_main" id="publish_config_next">下一步</span>
        </div>
    </div>
    <!--dialog_publish_info-->
    <div class="dialog_body" id="dialog_publish_info" style="display: none;">
        <span class="dialog_title">发布成功</span>
        <span class="dialog_sub_title">链接:</span>
        <div class="dialog_text_content" id="dialog_share_link">
            <input type="text" readonly="true" class="dialog_share_link"/>
        </div>
        <span class="dialog_sub_title">验证码:</span>
        <div class="dialog_text_content" id="dialog_share_code">
            <input type="text" readonly="true" class="dialog_share_code"/>
        </div>
        <span class="dialog_sub_title">验证信息:</span>
        <span class="dialog_text_content" id="dialog_share_checkinfo"></span>
        <span class="dialog_sub_title">或扫描二维码</span>
        <div class="dialog_qrcode" id="dialog_qrcode"></div>
        <div class="dialog_btn_line" id="publish_info_btn">
            <span class="dialog_btn_seco" id="publish_info_copy">复制</span>
            <span class="dialog_btn_main" id="publish_info_ok">确定</span>
        </div>
    </div>
    <textarea type="text" id="copy_temp"></textarea>
</div>
 */
document.writeln('<div class="dialog_back" style="display: none;">\n' +
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
    '        <span class="dialog_title">输入列名</span>\n' +
    '        <input type="text" class="dialog_input main_input" placeholder=""/>\n' +
    '        <div class="dialog_btn_line" id="input_btn">\n' +
    '            <span class="dialog_btn_seco" id="input_cancel">取消</span>\n' +
    '            <span class="dialog_btn_main" id="input_ok">确定</span>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '    <!--dialog_publish_config-->\n' +
    '    <div class="dialog_body" id="dialog_publish_config" style="display: none;">\n' +
    '        <span class="dialog_title">配置链接</span>\n' +
    '        <span class="dialog_sub_title">链接密码(6位，可重写以自定义，不区分大小写)</span>\n' +
    '        <input type="text" readonly="true" class="dialog_config_code main_input"/>\n' +
    '        <span class="dialog_sub_title">验证信息(用于用户查询属于自己的信息，可选择1~2项)</span>\n' +
    '        <div class="dialog_checkbox_content" id="dialog_config_verify">\n' +
    '            <span class="dialog_checkbox_item" id="abc" checked="false" disabled="false" onclick="onCheckedBox(this)">abc</span>\n' +
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
    '    <textarea type="text" id="copy_temp"></textarea>\n' +
    '</div>');

var checked_num = 0;

var qrcode = new QRCode("dialog_qrcode", {
    width: 128,
    height: 128,
    colorDark : "#000000",
    colorLight : "#ffffff",
    correctLevel : QRCode.CorrectLevel.H
});

function showCheckShareInfo(msg){
    var link = 'http://www.golthrcloud.tk/check.html?s='+msg['share_id'];
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
        $('#copy_temp').val('【查客核对】'+s_userinfo.user_name+'邀请您参与《'+TBL_NAME+'》的信息核对，快点击下方链接参加吧！\n链接：'+link+'\n验证码：'+pwd);
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

function showDialogInput(title,text){
    $('.dialog_back').fadeIn('fast');
    $('#dialog_input').fadeIn('fast');
    $('.dialog_title').text(title);
    $('.dialog_input').attr("placeholder", text);
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

function showDialogPublishConfig(title,col_json){
    $('.dialog_back').fadeIn('fast');
    $('#dialog_publish_config').fadeIn('fast');
    $('.dialog_title').text(title);
    $('.dialog_config_code').val(getVerCode());
    $('#dialog_config_verify').html('');
    checked_num = 0;
    for(var i in col_json){
        var col_name = col_json[i];
        $('#dialog_config_verify').append('<span class="dialog_checkbox_item" id="'+col_name+'" ischecked="false" isdisabled="false" onclick="onCheckedBox(this)">'+col_name+'</span>');
    }
}

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
        hideOtherCheckBox();
    }else{
        showOtherCheckBox();
    }
}

function getCheckedItem(){
    var tmp = [];
    $('.dialog_checkbox_item').each(function (index, elem){
        if($(elem).attr('ischecked') == 'true'){
            tmp.push($(elem).text());
        }
    });
    return tmp;
}

function showOtherCheckBox(){
    $('.dialog_checkbox_item').each(function (index, elem){
        if($(elem).attr('ischecked') == 'false') {
            $(elem).attr('isdisabled', 'false');
            $(elem).attr('onclick', 'onCheckedBox(this)');
            $(elem).css({'background': '#EAEDF6', 'color': '#000'});
        }
    });
}

function hideOtherCheckBox(){
    $('.dialog_checkbox_item').each(function (index, elem){
        if($(elem).attr('ischecked') == 'false'){
            $(elem).attr('isdisabled','true');
            $(elem).attr('onclick', '');
            $(elem).css({'background':'#f1f6fc','color':'#bfbfbf'});
        }
    });
}

function hideDialogPublishConfig(){
    $("#dialog_publish_config").hide();
    $(".dialog_back").fadeOut('fast');
}

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