/*
<div class="msgbox_back" style="display: none;">
    <!--msgbox_html-->
    <div class="msgbox_body" id="msgbox_html" style="display: none;">
        <span class="msgbox_title"></span>
        <span class="msgbox_content"></span>
        <div class="dialog_btn_line">
            <span class="dialog_btn_main">确定</span>
        </div>
    </div>
</div>
 */

document.writeln('<div class="msgbox_back" style="display: none;">\n' +
    '    <!--msgbox_html-->\n' +
    '    <div class="msgbox_body" id="msgbox_html" style="display: none;">\n' +
    '        <span class="msgbox_title"></span>\n' +
    '        <div class="msgbox_content"></div>\n' +
    '        <div class="dialog_btn_line">\n' +
    '            <span class="dialog_btn_main">确定</span>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</div>');

function showMsgBoxHtml(title, html, ok_fn) {
    var msg_back = $('.msgbox_back');
    var msgbox = $('#msgbox_html');
    var msg_title = $('#msgbox_html .msgbox_title');
    var msg_content = $('#msgbox_html .msgbox_content');
    var ok_btn = $('#msgbox_html .dialog_btn_line .dialog_btn_main');
    msg_back.fadeIn('fast');
    msgbox.fadeIn('fast');
    msg_title.text(title);
    msg_content.html(html);
    ok_btn.unbind('click');
    ok_btn.click(function () {
        if(ok_fn != undefined){
            ok_fn();
        }
        // hide
        hideMsgBoxHtml();
    });
}

function hideMsgBoxHtml(){
    var msg_back = $('.msgbox_back');
    var msgbox = $('#msgbox_html');
    msgbox.hide();
    msg_back.fadeOut('fast');
}