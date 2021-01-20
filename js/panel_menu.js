/*
<div class="panel_menu">
    <div class="panel_menu_head">
        <img class="check_logo" src="images/check_logo.png" alt="logo">
        <ul class="panel_menu_list">
            <li id="menu_home" onclick="changePage('home')">主页</li>
            <li id="menu_manage" onclick="changePage('manage_all')">管理信息</li>
            <li id="menu_mine" onclick="changePage('mine')">个人中心</li>
        </ul>
    </div>
    <span class="panel_menu_exit">退出</span>
</div>
 */

document.writeln('<div class="panel_menu">\n' +
    '    <div class="panel_menu_head">\n' +
    '        <img class="check_logo" src="images/check_logo.png" alt="logo">\n' +
    '        <ul class="panel_menu_list">\n' +
    '            <li id="menu_home" onclick="changeMenu(\'home\')">主页</li>\n' +
    '            <li id="menu_manage" onclick="changeMenu(\'manage_all\')">管理信息</li>\n' +
    '            <li id="menu_mine" onclick="changeMenu(\'mine\')">个人中心</li>\n' +
    '        </ul>\n' +
    '    </div>\n' +
    '    <span class="panel_menu_exit">退出</span>\n' +
    '</div>');

function changeMenu(p){
    if(p == "home"){
        // 主页
        location.href = 'index.html';
    }else if(p == "manage_all"){
        // 管理信息 - 所有表单
        location.href = 'manage.html';
    }else if(p == "manage"){
        // 管理信息 - 管理信息
        $('#panel_body_manage_all').hide();
        $('#panel_body_manage').show();
        $("#menu_home").removeClass('panel_menu_list_selected');
        $("#menu_manage").addClass('panel_menu_list_selected');
        $("#menu_mine").removeClass('panel_menu_list_selected');
        $('.head_back_btn').show();
        $('.head_back_btn').on("click", function (){
            changePage('manage_all');
        });
        $('.head_title').text('管理信息');
    }else if(p == "mine"){
        // 个人中心
        location.href = 'personal.html';
    }
}