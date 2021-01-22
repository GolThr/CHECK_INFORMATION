/*
<div class="normal_header">
    <div class="normal_header_left">
        <img class="normal_header_logo" src="images/check_logo.png"/>
    </div>
    <div class="normal_header_right">
        <span class="normal_header_title" id="normal_header_title">2test_table</span>
        <span class="normal_header_title">的信息核对</span>
    </div>
</div>
 */

document.writeln('<div class="normal_header">\n' +
    '    <div class="normal_header_left">\n' +
    '        <img class="normal_header_logo" src="images/check_logo.png"/>\n' +
    '    </div>\n' +
    '    <div class="normal_header_right">\n' +
    '        <span class="normal_header_title" id="normal_header_title">2test_table</span>\n' +
    '        <span class="normal_header_title">的信息核对</span>\n' +
    '    </div>\n' +
    '</div>');

function setNormalHeaderTitle(title){
    $('#normal_header_title').text(title);
}