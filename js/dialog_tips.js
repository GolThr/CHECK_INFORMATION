document.writeln('<div class="dialog_back" style="display: none;">\n' +
    '        <div class="dialog_body">\n' +
    '            <span class="dialog_title"></span>\n' +
    '            <span class="dialog_content"></span>\n' +
    '            <div class="dialog_btn_line">\n' +
    '                <span class="dialog_btn_seco">取消</span>\n' +
    '                <span class="dialog_btn_main">确定</span>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '    </div>');

function showDialogTip(title,text){
    $('.dialog_back').fadeIn('fast');
    $('.dialog_body').fadeIn('fast');
    $('.dialog_title').text(title);
    $('.dialog_content').text(text);
}

function hideDialogTip(){
    $(".dialog_body").fadeOut('fast');
    $(".dialog_back").fadeOut('fast');
}

$(".dialog_body").click(function (event) {
    event.stopPropagation();
});

$(".dialog_back").click(function () {
    hideDialogTip();
});