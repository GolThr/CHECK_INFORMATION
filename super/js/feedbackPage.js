var cur_page = 'list';
var feedback_list = [];

function init(){
    // var u_cookie = Cookies.get('manager_email');
    // if(u_cookie == undefined || u_cookie == ''){
    //     console.log('未登录');
    //     location.href = 'login.html';
    // }else{
    //     //已登录
    //     $('.user_name').text(u_cookie);
    // }
    SelectPanelMenuItem('feedback');
    setMainHeadTitle('所有反馈');
    initFeedbackList();
}

function changePage(p, subtitle) {
    // notice_list, notice_view, notice_edit
    var obj = $('#notice_list');
    //check cur page
    if(cur_page == 'list'){
        obj = $('#notice_list');
    }else if(cur_page == 'view'){
        obj = $('#notice_view');
    }else if(cur_page == 'edit'){
        obj = $('#notice_edit');
    }
    //navigator
    if(p == 'list'){
        obj.fadeOut(500,function (){
            cur_page = 'list';
            setMainHeadTitle('所有反馈');
            hideBackBtn();
            $('#notice_list').fadeIn();
        });
    }else if(p == 'view'){
        obj.fadeOut(500,function () {
            cur_page = 'view';
            setMainHeadTitle('处理反馈 - '+subtitle);
            showBackBtn(function (){
                changePage('list');
            });
            $('#notice_view').fadeIn();
        });
    }
}

function initFeedbackList() {
    var s_sort = getMainSelectListSelectedById('select_sort');
    var s_sort_m = getMainSelectListSelectedById('select_sort_m');
    var search_show = getMainSearchIsOpenById('search1');
    var op = 'get';
    var keywords = '';
    if(search_show == 'true'){
        op = 'search';
        keywords = getMainSearchKeyWordById('search1');
    }
    var sort = 'time';
    var sort_m = 'desc';
    if(s_sort == 'uuid'){
        sort = 'uuid';
    }else if(s_sort == '类型'){
        sort = 'type';
    }else if(s_sort == '内容'){
        sort = 'content';
    }else if(s_sort == '反馈时间'){
        sort = 'time';
    }else if(s_sort == '是否解决'){
        sort = 'solved';
    }else if(s_sort == '解决时间'){
        sort = 'sol_time';
    }
    if(s_sort_m == '升序'){
        sort_m = 'asc'
    }else if(s_sort_m == '降序'){
        sort_m = 'desc';
    }
    //ajax去服务器端校验
    var data= {"op":op,"sort":sort,"sort_m":sort_m,"keywords":keywords};
    console.log("FeedBackOperateAjax");
    console.log(data);
    $.ajax({
        url: "server/FeedBackOperate.php", //后台请求数据
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
                        setMainHeadTitle('所有反馈');
                        renderFeedbackList();
                    });
                }else{
                    hideBackBtn();
                    setMainHeadTitle('所有反馈');
                }
                feedback_list = msg['feedbacks'];
                renderFeedbackList();
            }
        },
        error: function (msg) {
            console.log("error!");
            console.log(msg);
            alert("请求失败，请重试");
        }
    });
}

function renderFeedbackList(){
    var back_empty = $('#back_empty');
    var all_list = $("#manage_all_list");

    if(feedback_list.length == 0){
        back_empty.show();
        return;
    }
    back_empty.hide();
    all_list.html('');
    var btn_img = 'ic_warning.png';
    var title = '';
    var pub_time = '';
    for(var i in feedback_list){
        if(feedback_list[i]['solved'] == '1'){
            btn_img = 'ic_success.png';
        }else{
            btn_img = 'ic_message_red.png';
        }
        if(feedback_list[i]['type'] == 'bug'){
            title = 'bug反馈';
        }else{
            title = '意见建议';
        }
        pub_time = feedback_list[i]["time"].substring(0, 19);
        var img_html = '';
        var pic_json = feedback_list[i]["pic_json"];
        for(var j in pic_json){
            img_html += '<img src="../'+pic_json[j]+'">';
        }
        all_list.append(
            '<div class="all_list_item" style="height: 140px;" onclick="viewFeedback(\''+i+'\')">\n' +
            '                <div class="all_list_item_left">\n' +
            '                    <img class="all_list_item_img" src="../images/'+btn_img+'">\n' +
            '                    <div class="all_list_item_data_view_body">\n' +
            '                       <span class="all_list_item_title">'+title+'</span>\n' +
            '                       <span class="all_list_item_text">'+feedback_list[i]["content"]+'</span>\n' +
            '                       <div class="all_list_item_img_line">' +
            img_html +
            '                       </div>\n' +
            '                       <div class="all_list_item_left_bottom">\n' +
            '                           <span class="all_list_item_text">'+pub_time+'</span>\n' +
            '                       </div>\n' +
            '                    </div>\n' +
            '                </div>\n' +
            '            </div>'
        );
    }
}

function viewFeedback(i) {
    var view_pub = $('#view_pub');
    var view_end = $('#view_end');
    var view_send_btn = $('#view_send_btn');
    var view_userinfo = $('#view_userinfo');
    var view_img_line = $('#view_img_line');
    var view_text = $('#view_text');
    var edit_words = $('#edit_words');

    var uuid = feedback_list[i]['uuid'];
    var user_name = feedback_list[i]['user_name'];
    var type = feedback_list[i]['type'];
    var content = feedback_list[i]['content'];
    var solved = feedback_list[i]['solved'];
    var sol_words = feedback_list[i]['sol_words'];
    var pub = feedback_list[i]['time'].substring(0, 19);
    var end = feedback_list[i]['sol_time'].substring(0, 19);
    var pic_json = feedback_list[i]["pic_json"];

    changePage('view', type == 'bug' ? 'bug反馈' : '意见建议');

    view_pub.text(pub);
    if(solved == '1'){
        view_end.text(end);
        edit_words.val(sol_words);
        edit_words.attr('readonly', 'true');
        view_send_btn.css({'background':'#fff','color':'#666666'});
        view_send_btn.unbind('click');
    }else{
        view_end.text('暂未处理');
        edit_words.val('');
        edit_words.removeAttr('readonly');
        view_send_btn.css({'background':'#458CFE','color':'#fff'});
        view_send_btn.unbind('click');
        view_send_btn.click(function () {
            finishFeedback(i);
        });
    }
    view_userinfo.text(user_name+' ('+uuid+')');
    view_text.text(content);
    view_img_line.html('');
    for(var j in pic_json){
        view_img_line.append('<img style="cursor: pointer;" src="../'+pic_json[j]+'" onclick="showPicturePopup(\'../'+pic_json[j]+'\')">');
    }
}

function finishFeedback(i) {
    var words = $('#edit_words').val();
    //ajax去服务器端校验
    var data= {"op":"finish","id":feedback_list[i]['id'],"sol_words":words};
    console.log("FeedBackOperateAjax");
    console.log(data);
    $.ajax({
        url: "server/FeedBackOperate.php", //后台请求数据
        dataType: "json",
        data:data,
        type: "POST",
        success: function (msg) {
            console.log(msg);
            if(msg.flag == '1'){
                changePage('list');
                showFloatTip('成功处理一个反馈！', 'success');
                initFeedbackList();
            }
        },
        error: function (msg) {
            console.log("error!");
            console.log(msg);
            alert("请求失败，请重试");
        }
    });
}

function changeTextTextarea(){
    var text = $('#edit_words').val();
    var len = text.length;
    $('#edit_text_cnt').text(len+'/600');
}

function searchFeedback(){
    console.log('search');
    initFeedbackList();
}

$('#refresh_btn').click(function () {
    initFeedbackList();
    showFloatTip('刷新成功', 'success');
});