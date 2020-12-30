document.writeln('<div class="dialog_content dialog_content_process" style="display: none;" onclick="dialogBack()">\n' +
    '        <!--tips-->\n' +
    '        <div class="dialog_pop dialog_pop_tips" style="display: none;height: 12rem;width: 28rem;">\n' +
    '            <span class="dialog_header"></span>\n' +
    '            <span class="dialog_title dialog_title_tips">更改成功</span>\n' +
    '            <div class="dialog_btn_line">\n' +
    '                <button class="main_button_default dialog_btn_tips" onclick="dialogBack()" style="width: 70px;">知道了</button>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '    </div>');

function showTip(msg){
    $('.dialog_content').fadeIn('fast');
    $('.dialog_pop_tips').fadeIn('fast');
    $('.dialog_title_tips').text(msg);
}

function dialogBack(){
    $(".dialog_pop_add_driver").hide();
    $(".dialog_pop_delete_driver").hide();
    $(".dialog_content_process").hide();
}

function showTipHtml(msg){
    $('.dialog_content').fadeIn('fast');
    $('.dialog_pop_tips').fadeIn('fast');
    $('.dialog_title_tips').html(msg);
}