var cur_page = 'menu';

function init(){
    initUser();
    $('.head_back_btn').hide();
    $('.head_title').text('个人中心');
    $("#menu_home").removeClass('panel_menu_list_selected');
    $("#menu_manage").removeClass('panel_menu_list_selected');
    $("#menu_mine").addClass('panel_menu_list_selected');
}

function changePage(p){
    // panel_body_menu, panel_body_info, panel_body_security, panel_body_message, panel_body_notice, panel_body_pay, panel_body_about
    /////
    var obj = $('#panel_body_menu');
    //check cur page
    if(cur_page == 'menu'){
        obj = $('#panel_body_menu');
    }else if(cur_page == 'info'){
        obj = $('#panel_body_info');
    }else if(cur_page == 'security'){
        obj = $('#panel_body_security');
    }else if(cur_page == 'message'){
        obj = $('#panel_body_message');
    }else if(cur_page == 'notice'){
        obj = $('#panel_body_notice');
    }else if(cur_page == 'pay'){
        obj = $('#panel_body_pay');
    }else if(cur_page == 'about'){
        obj = $('#panel_body_about');
    }
    //navigator
    if(p == 'menu'){
        obj.fadeOut(500,function (){
            cur_page = 'menu';
            setMainHeadTitle('个人中心');
            hideBackBtn();
            $('#panel_body_menu').fadeIn();
        });
    }else if(p == 'info'){
        obj.fadeOut(500,function () {
            cur_page = 'info';
            setMainHeadTitle('用户信息');
            showBackBtn(function (){
                changePage('menu');
            });
            $('#panel_body_info').fadeIn();
        });
    }else if(p == 'security'){
        obj.fadeOut(500,function () {
            cur_page = 'security';
            setMainHeadTitle('账号安全');
            showBackBtn(function (){
                changePage('menu');
            });
            $('#panel_body_security').fadeIn();
        });
    }else if(p == 'message'){
        obj.fadeOut(500,function () {
            cur_page = 'message';
            setMainHeadTitle('消息');
            showBackBtn(function (){
                changePage('menu');
            });
            $('#panel_body_message').fadeIn();
        });
    }else if(p == 'notice'){
        obj.fadeOut(500,function () {
            cur_page = 'notice';
            setMainHeadTitle('公告');
            showBackBtn(function (){
                changePage('menu');
            });
            $('#panel_body_notice').fadeIn();
        });
    }else if(p == 'pay'){
        obj.fadeOut(500,function () {
            cur_page = 'pay';
            setMainHeadTitle('打赏');
            showBackBtn(function (){
                changePage('menu');
            });
            $('#panel_body_pay').fadeIn();
        });
    }else if(p == 'about'){
        obj.fadeOut(500,function () {
            cur_page = 'about';
            setMainHeadTitle('关于');
            showBackBtn(function (){
                changePage('menu');
            });
            $('#panel_body_about').fadeIn();
        });
    }
}
