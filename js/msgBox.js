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

document.writeln(
    '<div class="msgbox_back" style="display: none;">\n' +
    '    <!--msgbox_html-->\n' +
    '    <div class="msgbox_body" id="msgbox_html" style="display: none;">\n' +
    '        <span class="msgbox_title"></span>\n' +
    '        <div class="msgbox_content"></div>\n' +
    '        <div class="dialog_btn_line">\n' +
    '            <span class="dialog_btn_main">确定</span>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</div>'
);

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
    //根据textarea标签内容自适应高度
    $.each($("#msgbox_html .msgbox_content textarea"), function(i, n){
        $(n).css("height", n.scrollHeight + "px");
    })
    //自適應彈窗上邊距
    var body_h = msg_back.height();
    var msgbox_h = msgbox.height();
    console.log(body_h+' : '+msgbox_h);
    if(body_h > msgbox_h){
        msgbox.css('margin-top',Math.round((body_h - msgbox_h)/2)-20+'px');
    }
}

function hideMsgBoxHtml(){
    var msg_back = $('.msgbox_back');
    var msgbox = $('#msgbox_html');
    msgbox.css('margin-top','0');
    msgbox.hide();
    msg_back.fadeOut('fast');
}