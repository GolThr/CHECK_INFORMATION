document.writeln('<div class="panel_menu">\n' +
    '    <div class="panel_menu_head">\n' +
    '        <img class="check_logo" src="images/check_logo.png" alt="logo">\n' +
    '        <ul class="panel_menu_list">\n' +
    '            <li id="menu_home" onclick="changeMenu(\'home\')">主页</li>\n' +
    '            <li id="menu_notice" onclick="changeMenu(\'notice\')">公告</li>\n' +
    '            <li id="menu_message" onclick="changeMenu(\'message\')">消息</li>\n' +
    '        </ul>\n' +
    '    </div>\n' +
    '    <span class="panel_menu_exit">退出</span>\n' +
    '</div>');

function changeMenu(p){
    if(p == "home"){
        // 主页
        location.href = 'index.html';
    }else if(p == "notice"){
        // 管理信息
        location.href = 'notice.html';
    }else if(p == "message"){
        // 个人中心
        location.href = 'message.html';
    }
}

function SelectPanelMenuItem(p){
    var m_home = $("#menu_home");
    var m_notice = $("#menu_notice");
    var m_message = $("#menu_message");
    if(p == "home"){
        // 主页
        m_home.addClass('panel_menu_list_selected');
        m_notice.removeClass('panel_menu_list_selected');
        m_message.removeClass('panel_menu_list_selected');
    }else if(p == "notice"){
        // 管理信息
        m_home.removeClass('panel_menu_list_selected');
        m_notice.addClass('panel_menu_list_selected');
        m_message.removeClass('panel_menu_list_selected');
    }else if(p == "message"){
        // 个人中心
        $('#menu_message_title').show();
        m_home.removeClass('panel_menu_list_selected');
        m_notice.removeClass('panel_menu_list_selected');
        m_message.addClass('panel_menu_list_selected');
    }
}

function exitLogin() {
    // localStorage.removeItem("s_userinfo");
    Cookies.remove("manager_email");
    location.href = 'login.html';
}