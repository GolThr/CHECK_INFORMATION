document.writeln(
    '<div class="popup_back" id="popup_back" style="display: none;">' +
    '    <div class="popup_body" id="popup_html" style="display: none;">' +
    '    </div>\n' +
    '    <div class="popup_close_btn"></div>' +
    '</div>'
);

function showPopupHtml(html) {
    var back = $('#popup_back');
    var content = $('#popup_html');
    back.fadeIn('fast');
    content.fadeIn('fast');
    content.html(html);
    back.unbind('click');
    back.click(function () {
        hidePopupHtml();
    });
}

function hidePopupHtml(){
    var back = $('#popup_back');
    var content = $('#popup_html');
    content.hide();
    back.fadeOut('fast');
}

$("#popup_html").on('click', function (event) {
    event.stopPropagation();
});