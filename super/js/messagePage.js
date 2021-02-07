var message_list = [];
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
    SelectPanelMenuItem('message');
    setMainHeadTitle('所有消息');
    initMessageList();
    var u = getQueryVariable('u');
    if(u != ''){
        checkUUID(u);
    }
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
            setMainHeadTitle('所有公告');
            hideBackBtn();
            $('#notice_list').fadeIn();
        });
    }else if(p == 'view'){
        obj.fadeOut(500,function () {
            cur_page = 'view';
            setMainHeadTitle('查看公告 - ' + subtitle);
            showBackBtn(function (){
                changePage('list');
            });
            $('#notice_view').fadeIn();
        });
    }else if(p == 'edit'){
        obj.fadeOut(500,function () {
            cur_page = 'edit';
            setMainHeadTitle('编辑消息');
            showBackBtn(function (){
                changePage('list');
            });
            $('#notice_edit').fadeIn();
            $('#rec_info').text(subtitle);
            changeTitleTextarea();
            changeTextTextarea();
        });
    }
}

function checkUUID(u) {
    //ajax去服务器端校验
    var data= {"op":"check_u","u":u};
    console.log("MessageOperateAjax");
    console.log(data);
    $.ajax({
        url: "server/MessageOperate.php", //后台请求数据
        dataType: "json",
        data:data,
        type: "POST",
        success: function (msg) {
            console.log(msg);
            if(msg.flag == '1'){
                changePage('edit', msg['user_name']+' ('+msg['uuid']+')');
                var pub_btn = $('#edit_pub_btn');
                pub_btn.unbind('click');
                pub_btn.click(function () {
                    publishMessage(msg['uuid']);
                });
            }
        },
        error: function (msg) {
            console.log("error!");
            console.log(msg);
            alert("请求失败，请重试");
        }
    });
}

function changeTitleTextarea(){
    var summary = $('#edit_summary').val();
    var len = summary.length;
    $('#edit_summary_cnt').text(len+'/50');
}

function changeTextTextarea(){
    var text = $('#edit_text').val();
    var len = text.length;
    $('#edit_text_cnt').text(len+'/600');
}

function publishMessage(uuid) {
    var title = $('#edit_summary').val();
    var text = $('#edit_text').val();
    if(title == ''){
        showMsgBoxHtml('错误', '请输入标题');
    }else if(text == ''){
        showMsgBoxHtml('错误', '请输入消息内容');
    }else{
        //ajax去服务器端校验
        var data= {"op":"pub","uuid":uuid,"title":title,"text":text};
        console.log("MessageOperateAjax");
        console.log(data);
        $.ajax({
            url: "server/MessageOperate.php", //后台请求数据
            dataType: "json",
            data:data,
            type: "POST",
            success: function (msg) {
                console.log(msg);
                if(msg.flag == '1'){
                    showFloatTip('发送消息成功！', 'success');
                    changePage('list');
                    initNoticeList();
                }else{
                    if(msg['err_code'] == '801'){
                        showMsgBoxHtml('错误', '收件人为空');
                    }else if(msg['err_code'] == '802'){
                        showMsgBoxHtml('错误', '标题不能为空');
                    }else if(msg['err_code'] == '803'){
                        showMsgBoxHtml('错误', '消息内容不能为空');
                    }
                }
            },
            error: function (msg) {
                console.log("error!");
                console.log(msg);
                alert("请求失败，请重试");
            }
        });
    }
}

function initMessageList() {
    var s_sort = getMainSelectListSelectedById('select_sort');
    var s_sort_m = getMainSelectListSelectedById('select_sort_m');
    var sort = 'pub';
    var sort_m = 'desc';
    if(s_sort == '收件人ID'){
        sort = 'uuid';
    }else if(s_sort == '收件人'){
        sort = 'name';
    }else if(s_sort == '标题'){
        sort = 'title';
    }else if(s_sort == '内容'){
        sort = 'text';
    }else if(s_sort == '发布时间'){
        sort = 'pub';
    }else if(s_sort == '是否查看'){
        sort = 'read';
    }
    if(s_sort_m == '升序'){
        sort_m = 'asc'
    }else if(s_sort_m == '降序'){
        sort_m = 'desc';
    }
    //ajax去服务器端校验
    var data= {"op":"get","sort":sort,"sort_m":sort_m};
    console.log("MessageOperateAjax");
    console.log(data);
    $.ajax({
        url: "server/MessageOperate.php", //后台请求数据
        dataType: "json",
        data:data,
        type: "POST",
        success: function (msg) {
            console.log(msg);
            if(msg.flag == '1'){
                message_list = msg['messages'];
                renderMessageList();
            }
        },
        error: function (msg) {
            console.log("error!");
            console.log(msg);
            alert("请求失败，请重试");
        }
    });
}

function renderMessageList(){
    console.log('render');
    var back_empty = $('#back_empty');
    var manage_all_list = $("#manage_all_list");

    if(message_list.length == 0){
        back_empty.show();
        return;
    }
    back_empty.hide();
    manage_all_list.html('');
    var btn_img = 'ic_warning.png';
    var pub_time = '';
    var end_time = '';
    for(var i in message_list){
        console.log(i);
        if(message_list[i]['isread'] == '1'){
            btn_img = 'ic_success.png';
        }else{
            btn_img = 'ic_message_red.png';
        }
        pub_time = message_list[i]["pub_time"].substring(0, 19);
        manage_all_list.append(
            '<div class="manage_list_item" onclick="viewMessage(\''+i+'\')">\n' +
            '   <div class="manage_list_item_left">\n' +
            '       <img class="manage_list_item_img" src="../images/'+btn_img+'">\n' +
            '       <div class="manage_list_item_data_view_body">\n' +
            '           <span class="manage_list_item_title">'+message_list[i]["msg_title"]+'</span>\n' +
            '           <span class="manage_list_item_text">'+message_list[i]["msg_text"]+'</span>\n' +
            '           <div class="manage_list_item_left_bottom">\n' +
            '               <span class="manage_list_item_text">发布时间: '+pub_time+'</span>\n' +
            '               <span class="manage_list_item_text" style="margin-left: 10px;">收件人: '+message_list[i]["user_name"]+'</span>\n' +
            '               <span class="manage_list_item_text" style="margin-left: 10px;">收件人ID: '+message_list[i]["uuid"]+'</span>\n' +
            '           </div>\n' +
            '       </div>\n' +
            '   </div>\n' +
            '   <div class="manage_list_item_right">\n' +
            '       <div class="manage_list_item_del_btn">\n' +
            '           <img class="manage_list_item_img" src="../images/ic_delete_red.png" onclick="delMessage(\''+i+'\')">\n' +
            '       </div>\n' +
            '   </div>\n' +
            '</div>'
        );
    }
    $(".manage_list_item_right").on('click', function (event) {
        event.stopPropagation();
    });
}

function viewMessage(i) {
    var view_summary = $('#view_summary');
    var view_text = $('#view_text');
    var view_title = $('#view_title');
    var view_pub = $('#view_pub');
    var view_end = $('#view_end');
    var view_del_btn = $('#view_del_btn');
    var title = message_list[i]['msg_title'];
    var text = message_list[i]['msg_text'];
    var u_name = message_list[i]['user_name'];
    var uuid = message_list[i]['uuid'];
    var pub = message_list[i]['pub_time'].substring(0, 19);
    var read = message_list[i]['read_time'].substring(0, 19);
    read = read[0] == '0' ? '暂未阅读' : read;
    changePage('view', title);
    view_pub.text(pub);
    view_end.text(read);
    view_summary.text(u_name+' (ID: '+uuid+')');
    view_title.text('标题: '+title);
    view_text.text(text);
    view_del_btn.unbind('click');
    view_del_btn.click(function () {
        delMessage(i);
    });
}

function delMessage(i) {
    var msg_id = message_list[i]['msg_id'];
    //ajax去服务器端校验
    var data= {"op":"del","msg_id":msg_id};
    console.log("MessageOperateAjax");
    console.log(data);
    $.ajax({
        url: "server/MessageOperate.php", //后台请求数据
        dataType: "json",
        data:data,
        type: "POST",
        success: function (msg) {
            console.log(msg);
            if(msg.flag == '1'){
                showFloatTip('删除成功！', 'success');
                changePage('list');
                initMessageList();
            }
        },
        error: function (msg) {
            console.log("error!");
            console.log(msg);
            alert("请求失败，请重试");
        }
    });
}

$('#refresh_btn').click(function () {
    initMessageList();
    showFloatTip('刷新成功', 'success');
});

$('#add_message_btn').click(function () {
    showMsgBoxHtml('温馨提示', '请移步\"用户\"选项卡，在需要发送消息的用户卡片内选择发送消息！');
});