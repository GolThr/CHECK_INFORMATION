/*
<div class="dialog_back" style="display: none;">
    <div class="dialog_body" id="dialog_tips" style="display: none;">
        <span class="dialog_title"></span>
        <span class="dialog_content"></span>
        <div class="dialog_btn_line">
            <span class="dialog_btn_seco">取消</span>
            <span class="dialog_btn_main">确定</span>
        </div>
    </div>
    <div class="dialog_body" id="dialog_input" style="display: none;">
        <span class="dialog_title">输入列名</span>
        <input type="text" class="dialog_input main_input" placeholder=""/>
        <div class="dialog_btn_line">
            <span class="dialog_btn_seco">取消</span>
            <span class="dialog_btn_main">确定</span>
        </div>
    </div>
</div>
 */
document.writeln('<div class="dialog_back" style="display: none;">\n' +
    '        <div class="dialog_body" id="dialog_tips" style="display: none;">\n' +
    '            <span class="dialog_title"></span>\n' +
    '            <span class="dialog_content"></span>\n' +
    '            <div class="dialog_btn_line">\n' +
    '                <span class="dialog_btn_seco" id="tips_cancel_btn">取消</span>\n' +
    '                <span class="dialog_btn_main" id="tips_ok_btn">确定</span>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '        <div class="dialog_body" id="dialog_input" style="display: none;">\n' +
    '            <span class="dialog_title">输入列名</span>\n' +
    '            <input type="text" class="dialog_input main_input" placeholder=""/>\n' +
    '            <div class="dialog_btn_line">\n' +
    '                <span class="dialog_btn_seco" id="input_cancel_btn">取消</span>\n' +
    '                <span class="dialog_btn_main" id="input_ok_btn">确定</span>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '    </div>');

function showDialogTip(title,text){
    $('.dialog_back').fadeIn('fast');
    $('#dialog_tips').fadeIn('fast');
    $('.dialog_title').text(title);
    $('.dialog_content').text(text);
}

function hideDialogTip(){
    $("#dialog_tips").fadeOut('fast');
    $(".dialog_back").fadeOut('fast');
}

function showDialogInput(title,text){
    $('.dialog_back').fadeIn('fast');
    $('#dialog_input').fadeIn('fast');
    $('.dialog_title').text(title);
    $('.dialog_input').attr("placeholder", text);
}

function hideDialogInput(){
    $("#dialog_input").fadeOut('fast');
    $(".dialog_back").fadeOut('fast');
}

$(".dialog_body").click(function (event) {
    event.stopPropagation();
});

$("#tips_cancel_btn").click(function () {
    hideDialogTip();
});

$("#input_cancel_btn").click(function () {
    hideDialogInput();
});