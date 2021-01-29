function init(){
    initUser();
    SelectPanelMenuItem('home');

    getHomeNumber();
    getNotice();
}

function getHomeNumber(){
    //ajax去服务器端校验
    var data= {"uuid":s_userinfo.uuid};
    console.log(data);
    console.log("GetCntAjax");
    $.ajax({
        url: "server/GetCnt.php", //后台请求数据
        dataType: "json",
        data:data,
        type: "POST",
        success: function (msg) {
            console.log(msg);
            renderIndexCheckTblNum(msg['tbl_list']);
            renderHomeNum(msg['n_notice'],msg['n_messages']);
        },
        error: function (msg) {
            console.log("error!");
            console.log(msg);
            alert("请求失败，请重试");
        }
    });
}

function getNotice(){
    //ajax去服务器端校验
    var data= {"type":"all"};
    console.log(data);
    console.log("GetNoticeAjax");
    $.ajax({
        url: "server/GetNotice.php", //后台请求数据
        dataType: "json",
        data:data,
        type: "POST",
        success: function (msg) {
            console.log(msg);
            showMarqueeInline('温馨提示', '那么默eight  参数调整其水平和垂直的范围。');
        },
        error: function (msg) {
            console.log("error!");
            console.log(msg);
            alert("请求失败，请重试");
        }
    });
}

function renderHomeNum(n_notice,n_messages){
    $('#n_notice').text(n_notice);
    $('#n_messages').text(n_messages);
}

function renderIndexCheckTblNum(msg){
    $("#home_data_view_checking_body").html('');

    var all_cnt = 0;
    var checking_cnt = 0;
    for(var i in msg){
        all_cnt++;
        if(msg[i]["ischecking"] == 1){
            var n_all = msg[i]['n_all'];
            var n_checked = msg[i]['n_checked'];
            var n_viewed = msg[i]['n_viewed'];
            var tbl_name = msg[i]['tbl_name'];
            var n_no = n_all - n_checked;
            var percent = ((n_checked / n_all) * 100).toFixed(2);
            checking_cnt++
            $("#home_data_view_checking_body").append('<div class="home_data_view">\n' +
                '                <div class="home_data_progress_bar" id="tbl_num_'+i+'" style="width: 0;"></div>\n' +
                '                <span class="home_data_view_content_title">'+tbl_name+'</span>\n' +
                '                <div class="home_data_view_content">\n' +
                '                    <div class="home_data_view_body">\n' +
                '                        <span class="home_data_view_number">'+n_all+'</span>\n' +
                '                        <span class="home_data_view_title">条数据</span>\n' +
                '                    </div>\n' +
                '                    <div class="home_data_view_body">\n' +
                '                        <span class="home_data_view_number" style="color: #ffce00">'+n_viewed+'</span>\n' +
                '                        <span class="home_data_view_title">人已查看</span>\n' +
                '                    </div>\n' +
                '                    <div class="home_data_view_body">\n' +
                '                        <span class="home_data_view_number" style="color: #5F9BFD">'+n_checked+'</span>\n' +
                '                        <span class="home_data_view_title">人已核对</span>\n' +
                '                    </div>\n' +
                '                    <div class="home_data_view_body">\n' +
                '                        <span class="home_data_view_number" style="color: #cf3b3f">'+n_no+'</span>\n' +
                '                        <span class="home_data_view_title">人未核对</span>\n' +
                '                    </div>\n' +
                '                    <div class="home_data_view_body">\n' +
                '                        <span class="home_data_view_number">'+percent+'%</span>\n' +
                '                        <span class="home_data_view_title">核对率</span>\n' +
                '                    </div>\n' +
                '                </div>\n' +
                '            </div>');
            $('#tbl_num_'+i).animate({width:percent+"%"});
        }
    }
    $('#n_tbl_all').text(all_cnt);
    $('#n_tbl_checking').text(checking_cnt);
    if(checking_cnt == 0){
        showCheckingEmpty();
    }
}

function showCheckingEmpty(){
    $('#home_data_view_checking_body').append('<div class="back_none" style="margin-top: 50px;">\n' +
        '                <img class="back_none_img" src="images/back_empty.png">\n' +
        '                <p class="back_none_text">什么都没有哦~</p>\n' +
        '            </div>');
}
