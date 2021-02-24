var alpha_list = [];
var cur_page = 'list';

function init(){
    var u_cookie = Cookies.get('manager_email');
    if(u_cookie == undefined || u_cookie == ''){
        console.log('未登录');
        location.href = 'login.html';
    }else{
        //已登录
        $('.user_name').text(u_cookie);
    }
    SelectPanelMenuItem('alpha');
    setMainHeadTitle('所有内测码');
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
    if(s_sort == '注册码'){
        sort = 'code';
    }else if(s_sort == '绑定的用户'){
        sort = 'uuid';
    }else if(s_sort == '创建时间'){
        sort = 'add';
    }else if(s_sort == '使用时间'){
        sort = 'used';
    }
    if(s_sort_m == '升序'){
        sort_m = 'asc'
    }else if(s_sort_m == '降序'){
        sort_m = 'desc';
    }
    //ajax去服务器端校验
    var data= {"op":op,"sort":sort,"sort_m":sort_m,"keywords":keywords};
    console.log("AlphaOperateAjax");
    console.log(data);
    $.ajax({
        url: "server/AlphaOperate.php", //后台请求数据
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
                        setMainHeadTitle('所有内测码');
                        initUserList();
                    });
                }else{
                    hideBackBtn();
                    setMainHeadTitle('所有内测码');
                }
                alpha_list = msg['alpha_codes'];
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

    if(alpha_list.length == 0){
        back_empty.show();
        return;
    }
    back_empty.hide();
    manage_all_list.html('');
    var used_img = '';
    var uuid = '';
    var add_time = '';
    var used_time = '';
    for(var i in alpha_list){
        console.log(i);
        if(alpha_list[i]['uuid'] == '0'){
            used_img = 'ic_list_orange.png';
            uuid = '暂未使用';
        }else{
            used_img = 'ic_list_blue.png';
            uuid = alpha_list[i]["uuid"];
        }
        add_time = alpha_list[i]["add_time"].substring(0, 16);
        used_time = alpha_list[i]["used_time"].substring(0, 16);
        used_time = used_time[0] == '0' ? '暂未使用' : used_time;
        manage_all_list.append(
            '<div class="alpha_list_item main_card_body">' +
            '    <div class="user_avatar_body">' +
            '        <img class="user_avatar" src="images/'+used_img+'">' +
            '    </div>' +
            '    <div class="user_info">' +
            '        <span class="user_name">'+alpha_list[i]["code"]+'</span>' +
            '        <span class="user_id">'+uuid+'</span>' +
            '        <span class="user_email">创建: '+add_time+'</span>' +
            '        <span class="user_phone">使用: '+used_time+'</span>' +
            '    </div>' +
            '    <div class="alpha_list_item_send_btn" onclick="delAlphaCode(\''+alpha_list[i]["code"]+'\')">' +
            '        <img src="../images/ic_delete_red.png">' +
            '    </div> ' +
            '</div>'
        );
    }
    $(".manage_list_item_right").on('click', function (event) {
        event.stopPropagation();
    });
}

function delAlphaCode(code) {
    //ajax去服务器端校验
    var data= {"op":"del","code":code};
    console.log("AlphaOperateAjax");
    console.log(data);
    $.ajax({
        url: "server/AlphaOperate.php", //后台请求数据
        dataType: "json",
        data:data,
        type: "POST",
        success: function (msg) {
            console.log(msg);
            if(msg['flag'] == '1'){
                showFloatTip('删除成功!', 'success');
                initUserList();
            }
        },
        error: function (msg) {
            console.log("error!");
            console.log(msg);
            alert("请求失败，请重试");
        }
    });
}

function searchUser(){
    console.log('search');
    initUserList();
}

$('#refresh_btn').click(function () {
    initUserList();
    showFloatTip('刷新成功', 'success');
});

$('#add_alpha_btn').click(function () {
    showDialogTip('确认', '确认要添加一条内测码吗？')
    bindTipOK(function () {
        //ajax去服务器端校验
        var data= {"op":"add"};
        console.log("AlphaOperateAjax");
        console.log(data);
        $.ajax({
            url: "server/AlphaOperate.php", //后台请求数据
            dataType: "json",
            data:data,
            type: "POST",
            success: function (msg) {
                console.log(msg);
                if(msg['flag'] == '1'){
                    showFloatTip('创建内测码成功!', 'success');
                    initUserList();
                }
            },
            error: function (msg) {
                console.log("error!");
                console.log(msg);
                alert("请求失败，请重试");
            }
        });
    });
});