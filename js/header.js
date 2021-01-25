/*
<div class="main_head">
    <div class="head_left">
        <img class="head_back_btn" src="images/ic_back.png">
        <span class="head_title main_title">管理信息</span>
    </div>
    <div class="head_right">
        <span class="user_name">Manager</span>
        <img class="user_avatar" src="images/head_default.png" alt="avatar">
    </div>
</div>
 */

document.writeln('<div class="main_head">\n' +
    '    <div class="head_left">\n' +
    '        <img class="head_back_btn" src="images/ic_back.png" style="display: none;">\n' +
    '        <span class="head_title main_title">管理信息</span>\n' +
    '    </div>\n' +
    '    <div class="head_right">\n' +
    '        <span class="user_name">Manager</span>\n' +
    '        <img class="user_avatar" src="images/head_default.png" alt="avatar">\n' +
    '    </div>\n' +
    '</div>');

function setMainHeadTitle(title){
    $('.head_title').text(title);
}

function showBackBtn(fn){
    $(".head_back_btn").show();
    $(".head_back_btn").unbind('click');
    $(".head_back_btn").click(fn);
}

function hideBackBtn(){
    $(".head_back_btn").unbind('click');
    $(".head_back_btn").hide();
}

function bindBackBtn(fn){
    $(".head_back_btn").unbind('click');
    $(".head_back_btn").click(fn);
}