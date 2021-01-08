document.writeln('<div class="inline_tips_body">\n' +
    '            <div class="inline_tips_head">\n' +
    '                <span class="inline_tips_title tips_title" id="inline_tips_title">温馨提示</span>\n' +
    '                <img class="inline_tips_close" src="images/ic_close.png" alt="close" onclick="close_inline_tips()"/>\n' +
    '            </div>\n' +
    '            <span class="inline_tips_text" id="inline_tips_text">\n' +
    '                1.下方表中，列“id”、“ischecked”(是否核对)，“isviewed”(是否查看)，“checked_time”(核对时间)为系统自动生成，不可删除。<br>\n' +
    '                2.下方表中，标有蓝色字体”密码”的列默认值为“123456"，管理员无法查看。<br>\n' +
    '                3.点击添加信息以添加一条用户信息,点击添加列以添加需要用户核对的信息列。<br>\n' +
    '                4.修改完信息后，点击其他地方即可自动保存。<br>\n' +
    '            </span>\n' +
    '        </div>');

function close_inline_tips(){
    $('.inline_tips_body').slideUp(500);
}

$(".inline_tips_body").click(function (event) {
    event.stopPropagation();
});