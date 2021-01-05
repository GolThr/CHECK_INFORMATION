document.writeln('<div class="inline_tips_body">\n' +
    '            <div class="inline_tips_head">\n' +
    '                <span class="inline_tips_title tips_title" id="inline_tips_title">温馨提示</span>\n' +
    '                <img class="inline_tips_close" src="images/ic_close.png" alt="close" onclick="close_inline_tips()"/>\n' +
    '            </div>\n' +
    '            <span class="inline_tips_text" id="inline_tips_text">\n' +
    '                1.下方表中，标有蓝色字体的列为系统自动生成，不可删除。<br>\n' +
    '                2.下方表中，标有蓝色字体”用户ID”的列需管理员将其组织/单位的用户唯一标识填入其中，以便用户选择组织/单位方式登录。该列不允许有重复值。<br>\n' +
    '                3.下方表中，标有蓝色字体”密码”的列默认值为“123456"，管理员无法查看。<br>\n' +
    '                4.点击添加信息以添加一条用户信息；点击添加列以添加需要用户核对的信息标题。<br>\n' +
    '                5.上传信息需上传Excel文件，请保证文件中只有一个工作表且第一行与下方表中第一行各列名称相同。\n' +
    '            </span>\n' +
    '        </div>');

function close_inline_tips(){
    $('.inline_tips_body').slideUp(500);
}

$(".inline_tips_body").click(function (event) {
    event.stopPropagation();
});