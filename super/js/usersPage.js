var user_list = [];
var cur_page = 'list';

function init(){
    var u_cookie = Cookies.get('manager_email');
    if(u_cookie == undefined || u_cookie == ''){
        console.log('未登录');
        location.href = 'login';
    }else{
        //已登录
        $('.user_name').text(u_cookie);
    }
    SelectPanelMenuItem('users');
    setMainHeadTitle('所有用户');
    initUserList();
}

function initUserList() {
    var s_sort = getMainSelectListSelectedById('select_sort');
    var s_sort_m = getMainSelectListSelectedById('select_sort_m');
    var search_show = getMainSearchIsOpenById('search1');
    var op = 'get';
    var keywords = '';
    if(search_show == 'true'){
        op = 'search';
        keywords = getMainSearchKeyWordById('search1');
    }
    var sort = 'pub';
    var sort_m = 'desc';
    if(s_sort == 'uuid'){
        sort = 'uuid';
    }else if(s_sort == '用户名'){
        sort = 'name';
    }else if(s_sort == '邮箱'){
        sort = 'email';
    }else if(s_sort == '手机号'){
        sort = 'phone';
    }else if(s_sort == '性别'){
        sort = 'gender';
    }else if(s_sort == '注册时间'){
        sort = 'time';
    }
    if(s_sort_m == '升序'){
        sort_m = 'asc'
    }else if(s_sort_m == '降序'){
        sort_m = 'desc';
    }
    //ajax去服务器端校验
    var data= {"op":op,"sort":sort,"sort_m":sort_m,"keywords":keywords};
    console.log("UserOperateAjax");
    console.log(data);
    $.ajax({
        url: "server/UserOperate.php", //后台请求数据
        dataType: "json",
        data:data,
        type: "POST",
        success: function (msg) {
            console.log(msg);
            if(msg.flag == '1'){
                if(op == 'search'){
                    setMainHeadTitle('搜索 - '+keywords);
                    showBackBtn(function () {
                        mainSearchForceHideById('search1');
                        hideBackBtn();
                        setMainHeadTitle('所有用户');
                        initUserList();
                    });
                }else{
                    hideBackBtn();
                    setMainHeadTitle('所有用户');
                }
                user_list = msg['users'];
                renderUserList();
            }
        },
        error: function (msg) {
            console.log("error!");
            console.log(msg);
            alert("请求失败，请重试");
        }
    });
}

function renderUserList(){
    console.log('render');
    var back_empty = $('#back_empty');
    var manage_all_list = $("#manage_all_list");

    if(user_list.length == 0){
        back_empty.show();
        return;
    }
    back_empty.hide();
    manage_all_list.html('');
    var gender_str = '';
    var reg_time = '';
    for(var i in user_list){
        console.log(i);
        if(user_list[i]['gender'] == '1'){
            gender_str = 'ic_gender_male.png';
        }else{
            gender_str = 'ic_gender_female.png';
        }
        reg_time = user_list[i]["reg_time"].substring(0, 16);
        manage_all_list.append(
            '<div class="user_list_item main_card_body">' +
            '    <div class="user_avatar_body">' +
            '        <img class="user_avatar" src="../'+user_list[i]["avatar"]+'">' +
            '        <img class="user_gender" src="../images/'+gender_str+'">' +
            '    </div>' +
            '    <div class="user_info">' +
            '        <span class="user_name">'+user_list[i]["user_name"]+'</span>' +
            '        <span class="user_id">'+user_list[i]["uuid"]+'</span>' +
            '        <span class="user_email">邮箱: '+user_list[i]["email"]+'</span>' +
            '        <span class="user_phone">手机: '+user_list[i]["phone_number"]+'</span>' +
            '        <span class="reg_time">'+reg_time+' 注册</span>' +
            '    </div>' +
            '    <div class="user_list_item_send_btn" onclick="sendMessage('+i+')">' +
            '        <img src="../images/ic_send_blue.png">' +
            '    </div> ' +
            '</div>'
        );
    }
    $(".manage_list_item_right").on('click', function (event) {
        event.stopPropagation();
    });
}

function sendMessage(i){
    location.href = 'message?u='+user_list[i]['uuid'];
}

function searchUser(){
    console.log('search');
    initUserList();
}

$('#refresh_btn').click(function () {
    initUserList();
    showFloatTip('刷新成功', 'success');
});