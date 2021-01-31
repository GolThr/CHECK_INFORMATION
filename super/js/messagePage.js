function init(){
    var u_cookie = Cookies.get('manager_email');
    if(u_cookie == undefined || u_cookie == ''){
        console.log('未登录');
        location.href = 'login.html';
    }else{
        //已登录
        $('.user_name').text(u_cookie);
    }
    SelectPanelMenuItem('message');
}