var tips = [
    '权限越大，责任越大',
    '管理员是以邮箱作为账号的，密码为动态密码',
    '转让功能是将管理员权限转让给他人',
    '责任重于泰山',
    '处理反馈和建议时的留言是在用户查看自己的反馈时显示给用户的',
    '用户注销后的反馈将被移到意见选项卡中哦~'
];
var n_tips = tips.length;
var i_tips = 0;

function init(){
    var u_cookie = Cookies.get('manager_email');
    if(u_cookie == undefined || u_cookie == ''){
        console.log('未登录');
        location.href = 'login';
    }else{
        //已登录
        $('.user_name').text(u_cookie);
    }
    SelectPanelMenuItem('home');
    $('#home_tips').text(tips[0]);
    $('#home_tips').fadeIn(1000);
    i_tips = 1;
    setInterval(function () {
        $('#home_tips').fadeOut(1000, function () {
            $('#home_tips').text(tips[i_tips]);
            $('#home_tips').fadeIn();
            if(++i_tips >= n_tips) i_tips = 0;
        });
    }, 5000);
}
