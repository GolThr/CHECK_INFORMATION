document.writeln('<div class="panel_menu">\n' +
    '    <div class="panel_menu_head">\n' +
    '        <img class="check_logo" src="../images/check_logo.png" alt="logo">\n' +
    '        <ul class="panel_menu_list">\n' +
    '            <li id="menu_home" onclick="changeMenu(\'home\')">主页</li>\n' +
    '            <li id="menu_users" onclick="changeMenu(\'users\')">用户</li>\n' +
    '            <li id="menu_logoff" onclick="changeMenu(\'logoff\')">注销</li>\n' +
    '            <li id="menu_notice" onclick="changeMenu(\'notice\')">公告</li>\n' +
    '            <li id="menu_message" onclick="changeMenu(\'message\')">消息</li>\n' +
    '            <li id="menu_feedback" onclick="changeMenu(\'feedback\')">反馈</li>\n' +
    '            <li id="menu_advise" onclick="changeMenu(\'advise\')">建议</li>\n' +
    '            <li id="menu_reward" onclick="changeMenu(\'reward\')">打赏</li>\n' +
    '            <li id="menu_alpha" onclick="changeMenu(\'alpha\')">内测</li>\n' +
    '            <li id="menu_assign" onclick="changeMenu(\'assign\')">转让</li>\n' +
    '        </ul>\n' +
    '    </div>\n' +
    '    <span class="panel_menu_exit">退出</span>\n' +
    '</div>');

function changeMenu(p){
    if(p == "home"){
        // 主页
        location.href = 'index.html';
    }else if(p == "users"){
        // 用户
        location.href = 'users.html';
    }else if(p == "logoff"){
        // 已注销的用户
        location.href = 'logoff.html';
    }else if(p == "notice"){
        // 公告
        location.href = 'notice.html';
    }else if(p == "message"){
        // 消息
        location.href = 'message.html';
    }else if(p == "feedback"){
        // 用户反馈
        location.href = 'feedback.html';
    }else if(p == "advise"){
        // 已注销用户建议
        location.href = 'advise.html';
    }else if(p == "reward"){
        // 打赏
        location.href = 'rewards.html';
    }else if(p == "alpha"){
        // 内测
        location.href = 'alpha.html';
    }else if(p == "assign"){
        // 转让管理员权限
        location.href = 'assignment.html';
    }
}

function SelectPanelMenuItem(p){
    var m_home = $("#menu_home");
    var m_users = $("#menu_users");
    var m_logoff = $("#menu_logoff");
    var m_notice = $("#menu_notice");
    var m_message = $("#menu_message");
    var m_feedback = $("#menu_feedback");
    var m_advise = $("#menu_advise");
    var m_reward = $("#menu_reward");
    var m_alpha = $("#menu_alpha");
    var m_assign = $("#menu_assign");
    if(p == "home"){
        // 主页
        m_home.addClass('panel_menu_list_selected');
        m_users.removeClass('panel_menu_list_selected');
        m_logoff.removeClass('panel_menu_list_selected');
        m_notice.removeClass('panel_menu_list_selected');
        m_message.removeClass('panel_menu_list_selected');
        m_feedback.removeClass('panel_menu_list_selected');
        m_advise.removeClass('panel_menu_list_selected');
        m_reward.removeClass('panel_menu_list_selected');
        m_alpha.removeClass('panel_menu_list_selected');
        m_assign.removeClass('panel_menu_list_selected');
    }else if(p == "notice"){
        // 公告
        $('#menu_message_title').show();
        m_home.removeClass('panel_menu_list_selected');
        m_users.removeClass('panel_menu_list_selected');
        m_logoff.removeClass('panel_menu_list_selected');
        m_notice.addClass('panel_menu_list_selected');
        m_message.removeClass('panel_menu_list_selected');
        m_feedback.removeClass('panel_menu_list_selected');
        m_advise.removeClass('panel_menu_list_selected');
        m_reward.removeClass('panel_menu_list_selected');
        m_alpha.removeClass('panel_menu_list_selected');
        m_assign.removeClass('panel_menu_list_selected');
    }else if(p == "users"){
        // 用户
        $('#menu_message_title').show();
        m_home.removeClass('panel_menu_list_selected');
        m_users.addClass('panel_menu_list_selected');
        m_logoff.removeClass('panel_menu_list_selected');
        m_notice.removeClass('panel_menu_list_selected');
        m_message.removeClass('panel_menu_list_selected');
        m_feedback.removeClass('panel_menu_list_selected');
        m_advise.removeClass('panel_menu_list_selected');
        m_reward.removeClass('panel_menu_list_selected');
        m_alpha.removeClass('panel_menu_list_selected');
        m_assign.removeClass('panel_menu_list_selected');
    }else if(p == "logoff"){
        // 已注销的用户
        $('#menu_message_title').show();
        m_home.removeClass('panel_menu_list_selected');
        m_users.removeClass('panel_menu_list_selected');
        m_logoff.addClass('panel_menu_list_selected');
        m_notice.removeClass('panel_menu_list_selected');
        m_message.removeClass('panel_menu_list_selected');
        m_feedback.removeClass('panel_menu_list_selected');
        m_advise.removeClass('panel_menu_list_selected');
        m_reward.removeClass('panel_menu_list_selected');
        m_alpha.removeClass('panel_menu_list_selected');
        m_assign.removeClass('panel_menu_list_selected');
    }else if(p == "message"){
        // 消息
        $('#menu_message_title').show();
        m_home.removeClass('panel_menu_list_selected');
        m_users.removeClass('panel_menu_list_selected');
        m_logoff.removeClass('panel_menu_list_selected');
        m_notice.removeClass('panel_menu_list_selected');
        m_message.addClass('panel_menu_list_selected');
        m_feedback.removeClass('panel_menu_list_selected');
        m_advise.removeClass('panel_menu_list_selected');
        m_reward.removeClass('panel_menu_list_selected');
        m_alpha.removeClass('panel_menu_list_selected');
        m_assign.removeClass('panel_menu_list_selected');
    }else if(p == "feedback"){
        // 用户反馈
        $('#menu_message_title').show();
        m_home.removeClass('panel_menu_list_selected');
        m_users.removeClass('panel_menu_list_selected');
        m_logoff.removeClass('panel_menu_list_selected');
        m_notice.removeClass('panel_menu_list_selected');
        m_message.removeClass('panel_menu_list_selected');
        m_feedback.addClass('panel_menu_list_selected');
        m_advise.removeClass('panel_menu_list_selected');
        m_reward.removeClass('panel_menu_list_selected');
        m_alpha.removeClass('panel_menu_list_selected');
        m_assign.removeClass('panel_menu_list_selected');
    }else if(p == "advise"){
        // 已注销用户建议
        $('#menu_message_title').show();
        m_home.removeClass('panel_menu_list_selected');
        m_users.removeClass('panel_menu_list_selected');
        m_logoff.removeClass('panel_menu_list_selected');
        m_notice.removeClass('panel_menu_list_selected');
        m_message.removeClass('panel_menu_list_selected');
        m_feedback.removeClass('panel_menu_list_selected');
        m_advise.addClass('panel_menu_list_selected');
        m_reward.removeClass('panel_menu_list_selected');
        m_alpha.removeClass('panel_menu_list_selected');
        m_assign.removeClass('panel_menu_list_selected');
    }else if(p == "reward"){
        // 打赏
        $('#menu_message_title').show();
        m_home.removeClass('panel_menu_list_selected');
        m_users.removeClass('panel_menu_list_selected');
        m_logoff.removeClass('panel_menu_list_selected');
        m_notice.removeClass('panel_menu_list_selected');
        m_message.removeClass('panel_menu_list_selected');
        m_feedback.removeClass('panel_menu_list_selected');
        m_advise.removeClass('panel_menu_list_selected');
        m_reward.addClass('panel_menu_list_selected');
        m_alpha.removeClass('panel_menu_list_selected');
        m_assign.removeClass('panel_menu_list_selected');
    }else if(p == "alpha"){
        // 内测
        $('#menu_message_title').show();
        m_home.removeClass('panel_menu_list_selected');
        m_users.removeClass('panel_menu_list_selected');
        m_logoff.removeClass('panel_menu_list_selected');
        m_notice.removeClass('panel_menu_list_selected');
        m_message.removeClass('panel_menu_list_selected');
        m_feedback.removeClass('panel_menu_list_selected');
        m_advise.removeClass('panel_menu_list_selected');
        m_reward.removeClass('panel_menu_list_selected');
        m_alpha.addClass('panel_menu_list_selected');
        m_assign.removeClass('panel_menu_list_selected');
    }else if(p == "assign"){
        // 转让管理员权限
        $('#menu_message_title').show();
        m_home.removeClass('panel_menu_list_selected');
        m_users.removeClass('panel_menu_list_selected');
        m_logoff.removeClass('panel_menu_list_selected');
        m_notice.removeClass('panel_menu_list_selected');
        m_message.removeClass('panel_menu_list_selected');
        m_feedback.removeClass('panel_menu_list_selected');
        m_advise.removeClass('panel_menu_list_selected');
        m_reward.removeClass('panel_menu_list_selected');
        m_alpha.removeClass('panel_menu_list_selected');
        m_assign.addClass('panel_menu_list_selected');
    }
}

function exitLogin() {
    // localStorage.removeItem("s_userinfo");
    Cookies.remove("manager_email");
    location.href = 'login.html';
}