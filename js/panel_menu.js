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
    '            <li id="menu_home" onclick="changeMenu(\'home\')" onmouseover="onMenuItemOver(\'menu_home_title\',32)" onmouseleave="onMenuItemLeave(\'menu_home_title\')"><img src="images/ic_home.png"><span id="menu_home_title">主页</span></li>\n' +
    '            <li id="menu_manage" onclick="changeMenu(\'manage\')" onmouseover="onMenuItemOver(\'menu_manage_title\',64)" onmouseleave="onMenuItemLeave(\'menu_manage_title\')"><img src="images/ic_guanli.png"><span id="menu_manage_title">核对信息</span></li>\n' +
    '            <li id="menu_mine" onclick="changeMenu(\'mine\')" onmouseover="onMenuItemOver(\'menu_mine_title\',64)" onmouseleave="onMenuItemLeave(\'menu_mine_title\')"><img src="images/ic_personal.png"><span id="menu_mine_title">个人中心</span></li>\n' +
    '        </ul>\n' +
    '    </div>\n' +
    '    <span class="panel_menu_exit" onclick="exitLogin()">退出</span>\n' +
    '</div>');

function changeMenu(p){
    if(p == "home"){
        // 主页
        location.href = 'index.html';
    }else if(p == "manage"){
        // 管理信息
        location.href = 'manage.html';
    }else if(p == "mine"){
        // 个人中心
        location.href = 'personal.html';
    }
}

function onMenuItemOver(obj,w){
    $("#"+obj).stop();
    $("#"+obj).show();
    $("#"+obj).animate({width:w,margin:'0 0 0 10px'},200,function () {
        $("#"+obj).animate({opacity:'1'},200);
    });
}

function onMenuItemLeave(obj){
    $("#"+obj).stop();
    $("#"+obj).animate({opacity:'0'},200,function () {
        $("#"+obj).animate({width:'0',margin:'0'},200,function () {
            $("#"+obj).hide();
        });
    });
}

function SelectPanelMenuItem(p){
    if(p == "home"){
        // 主页
        onMenuItemOver('menu_home_title',32);
        $("#menu_home").addClass('panel_menu_list_selected');
        $("#menu_manage").removeClass('panel_menu_list_selected');
        $("#menu_mine").removeClass('panel_menu_list_selected');
        $("#menu_home").attr('onmouseover','');
        $("#menu_home").attr('onmouseover','');
        $("#menu_home").attr('onmouseover','');
        $("#menu_home").attr('onmouseleave','');
        $("#menu_home").attr('onmouseleave','');
        $("#menu_home").attr('onmouseleave','');
    }else if(p == "manage"){
        // 管理信息
        onMenuItemOver('menu_manage_title',64);
        $("#menu_home").removeClass('panel_menu_list_selected');
        $("#menu_manage").addClass('panel_menu_list_selected');
        $("#menu_mine").removeClass('panel_menu_list_selected');
        $("#menu_manage").attr('onmouseover','');
        $("#menu_manage").attr('onmouseover','');
        $("#menu_manage").attr('onmouseover','');
        $("#menu_manage").attr('onmouseleave','');
        $("#menu_manage").attr('onmouseleave','');
        $("#menu_manage").attr('onmouseleave','');
    }else if(p == "mine"){
        // 个人中心
        onMenuItemOver('menu_mine_title',64);
        $('#menu_mine_title').show();
        $("#menu_home").removeClass('panel_menu_list_selected');
        $("#menu_manage").removeClass('panel_menu_list_selected');
        $("#menu_mine").addClass('panel_menu_list_selected');
        $("#menu_mine").attr('onmouseover','');
        $("#menu_mine").attr('onmouseover','');
        $("#menu_mine").attr('onmouseover','');
        $("#menu_mine").attr('onmouseleave','');
        $("#menu_mine").attr('onmouseleave','');
        $("#menu_mine").attr('onmouseleave','');
    }
}

function exitLogin() {
    // localStorage.removeItem("s_userinfo");
    Cookies.remove("s_userinfo");
    location.href = 'login.html';
}