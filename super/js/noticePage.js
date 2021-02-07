var notice_list = [];
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
    SelectPanelMenuItem('notice');
    setMainHeadTitle('所有公告');
    initNoticeList();
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
            setMainHeadTitle('编辑公告');
            showBackBtn(function (){
                changePage('list');
            });
            $('#notice_edit').fadeIn();
            changeSummaryTextarea();
            changeTextTextarea();
        });
    }
}

function initNoticeList() {
    var s_sort = getMainSelectListSelectedById('select_sort');
    var s_sort_m = getMainSelectListSelectedById('select_sort_m');
    var sort = 'pub';
    var sort_m = 'desc';
    if(s_sort == '类型'){
        sort = 'type';
    }else if(s_sort == '内容'){
        sort = 'text';
    }else if(s_sort == '发布时间'){
        sort = 'pub';
    }else if(s_sort == '截止时间'){
        sort = 'end';
    }
    if(s_sort_m == '升序'){
        sort_m = 'asc'
    }else if(s_sort_m == '降序'){
        sort_m = 'desc';
    }
    //ajax去服务器端校验
    var data= {"op":"get","sort":sort,"sort_m":sort_m};
    console.log("NoticeOperateAjax");
    console.log(data);
    $.ajax({
        url: "server/NoticeOperate.php", //后台请求数据
        dataType: "json",
        data:data,
        type: "POST",
        success: function (msg) {
            console.log(msg);
            if(msg.flag == '1'){
                notice_list = msg['notices'];
                renderNoticeList();
            }
        },
        error: function (msg) {
            console.log("error!");
            console.log(msg);
            alert("请求失败，请重试");
        }
    });
}

function renderNoticeList(){
    var back_empty = $('#back_empty');
    var manage_all_list = $("#manage_all_list");

    if(notice_list.length == 0){
        back_empty.show();
        return;
    }
    back_empty.hide();
    manage_all_list.html('');
    var btn_img = 'ic_warning.png';
    var pub_time = '';
    var end_time = '';
    for(var i in notice_list){
        if(notice_list[i]['notice_type'] == 'warning'){
            btn_img = 'ic_warning.png';
        }else{
            btn_img = 'ic_serious.png';
        }
        pub_time = notice_list[i]["pub_time"].substring(0, 19);
        end_time = notice_list[i]["end_time"].substring(0, 19);
        manage_all_list.append('<div class="manage_list_item" onclick="viewNotice(\''+i+'\')">\n' +
            '                <div class="manage_list_item_left">\n' +
            '                    <img class="manage_list_item_img" src="../images/'+btn_img+'">\n' +
            '                    <div class="manage_list_item_data_view_body">\n' +
            '                       <span class="manage_list_item_title">'+notice_list[i]["notice_type"]+'</span>\n' +
            '                       <span class="manage_list_item_text">'+notice_list[i]["notice_text"]+'</span>\n' +
            '                       <div class="manage_list_item_left_bottom">\n' +
            '                           <span class="manage_list_item_text">发布时间: '+pub_time+'</span>\n' +
            '                           <span class="manage_list_item_text" style="margin-left: 10px;">截止时间: '+end_time+'</span>\n' +
            '                       </div>\n' +
            '                    </div>\n' +
            '                </div>\n' +
            '                <div class="manage_list_item_right">\n' +
            '                    <div class="manage_list_item_del_btn">\n' +
            '                        <img class="manage_list_item_img" src="../images/ic_delete_red.png" onclick="delNotice(\''+i+'\')">\n' +
            '                    </div>\n' +
            '                </div>\n' +
            '            </div>');
    }
    $(".manage_list_item_right").on('click', function (event) {
        event.stopPropagation();
    });
}

function viewNotice(i) {
    var view_summary = $('#view_summary');
    var view_text = $('#view_text');
    var view_pub = $('#view_pub');
    var view_end = $('#view_end');
    var view_del_btn = $('#view_del_btn');
    var type = notice_list[i]['notice_type'];
    var summary = notice_list[i]['summary'];
    var text = notice_list[i]['notice_text'];
    var pub = notice_list[i]['pub_time'].substring(0, 19);
    var end = notice_list[i]['end_time'].substring(0, 19);
    changePage('view', type);
    view_pub.text(pub);
    view_end.text(end);
    view_summary.text(summary);
    view_text.text(text);
    view_del_btn.unbind('click');
    view_del_btn.click(function () {
        delNotice(i);
    });
}

function delNotice(i) {
    var notice_id = notice_list[i]['notice_id'];
    //ajax去服务器端校验
    var data= {"op":"del","notice_id":notice_id};
    console.log("NoticeOperateAjax");
    console.log(data);
    $.ajax({
        url: "server/NoticeOperate.php", //后台请求数据
        dataType: "json",
        data:data,
        type: "POST",
        success: function (msg) {
            console.log(msg);
            if(msg.flag == '1'){
                showFloatTip('删除成功！', 'success');
                changePage('list');
                initNoticeList();
            }
        },
        error: function (msg) {
            console.log("error!");
            console.log(msg);
            alert("请求失败，请重试");
        }
    });
}

function changeSummaryTextarea(){
    var summary = $('#edit_summary').val();
    var len = summary.length;
    $('#edit_summary_cnt').text(len+'/140');
}

function changeTextTextarea(){
    var text = $('#edit_text').val();
    var len = text.length;
    $('#edit_text_cnt').text(len+'/600');
}

$('#edit_pub_btn').click(function () {
    var n_type = getMainSelectListSelectedById('edit_type');
    var n_end = getMainCalendarSelectedById('edit_end');
    var n_sum = $('#edit_summary').val();
    var n_text = $('#edit_text').val();
    var myDate = new Date();
    var y = myDate.getFullYear(), m = myDate.getMonth() + 1, d = myDate.getDate();
    var mm = m > 9 ? m : '0'+m;
    var dd = d > 9 ? d : '0'+d;
    var today = y + '-' + mm + '-' + dd;
    if(n_end < today || n_end == '请选择日期'){
        showMsgBoxHtml('错误', '截止时间需在今天之后！');
    }else if(n_sum == ''){
        showMsgBoxHtml('错误', '请输入公告摘要');
    }else if(n_text == ''){
        showMsgBoxHtml('错误', '请输入公告内容');
    }else{
        //ajax去服务器端校验
        var data= {"op":"pub","notice_type":n_type,"summary":n_sum,"notice_text":n_text,"end_time":n_end};
        console.log("NoticeOperateAjax");
        console.log(data);
        $.ajax({
            url: "server/NoticeOperate.php", //后台请求数据
            dataType: "json",
            data:data,
            type: "POST",
            success: function (msg) {
                console.log(msg);
                if(msg.flag == '1'){
                    showFloatTip('发布公告成功！', 'success');
                    changePage('list');
                    initNoticeList();
                }else{
                    if(msg['err_code'] == '801'){
                        showMsgBoxHtml('错误', '公告摘要不能为空');
                    }else if(msg['err_code'] == '802'){
                        showMsgBoxHtml('错误', '公告内容不能为空');
                    }else if(msg['err_code'] == '803'){
                        showMsgBoxHtml('错误', '截止时间需在今天之后！');
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
});

$('#refresh_btn').click(function () {
    initNoticeList();
    showFloatTip('刷新成功', 'success');
});