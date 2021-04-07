var TBL_DATA = new Array();
var TBL_HEAD = new Array();
var TBL_ROW = 0;
var TBL_COL = 0;
var TBL_NAME = '';
var cur_row = 0;
var cur_col = 0;
var order_col = 0;
var cur_order = 'asc';
var cur_page = 1;
var modified = 0;

function changePage(p){
    if(p == "manage_all"){
        $('#panel_body_manage_all').show();
        $('#panel_body_manage').hide();
        $('.head_back_btn').hide();
        $('.head_title').text('所有核对');
        getTableList();
    }else if(p == "manage"){
        $('#panel_body_manage_all').hide();
        $('#panel_body_manage').show();
        $('.head_back_btn').show();
        bindBackBtn(function (){
            clearTblArea();
            getTableList();
            changePage('manage_all');
        });
        $('.head_title').text('编辑核对');
    }
}

function init(){
    initUser();
    $('#panel_body_manage_all').show();
    $('#panel_body_manage').hide();
    $('.head_back_btn').hide();
    $('.head_title').text('所有核对');

    SelectPanelMenuItem('manage');

    getTableList();
}

function uploadExcel(){
    showDialogTip('温馨提示', '正在读取信息。。。')
    /*获得文件*/
    var fileArray = document.getElementById('upload_excel').files[0];
    /*初始化 FormData 对象 文件处理对象  序列化表单数据*/
    var formData = new FormData();
    /*给对象中添加文件信息，没有对象或者没有文件信息后台是得不到的*/
    formData.append('file', fileArray);
    formData.append('uuid', s_userinfo.uuid);
    formData.append('tbl_name', TBL_NAME);
    /*jquery ajax 方法*/
    $.ajax({
        url: "server/ReadExcel.php",/*传向后台服务器文件*/
        type: 'POST',    /*传递方法 */
        data:formData,  /*要带的值，在这里只能带一个formdata ，不可以增加其他*/
        //传递的数据
        dataType : 'json',  //传递数据的格式
        async:false, //这是重要的一步，防止重复提交的
        cache: false,  //设置为faldbconfig.phpse，上传文件不需要缓存。
        contentType: false,//设置为false,因为是构造的FormData对象,所以这里设置为false。
        processData: false,//设置为false,因为data值是FormData对象，不需要对数据做处理。
        success: function (msg){
            console.log(msg);
            getTable(TBL_NAME, 0, cur_order, 1);
        },
        error: function () {
            alert("上传错误！");
        }
    });
}

function bakupTBLData(){
    modified = 1;
    renderSaveBtn();
    localStorage.setItem("bak_tbl_data", JSON.stringify(TBL_DATA));
    localStorage.setItem("bak_tbl_row", JSON.stringify(TBL_ROW));
    localStorage.setItem("bak_tbl_col", JSON.stringify(TBL_COL));
    localStorage.setItem("bak_tbl_name", JSON.stringify(TBL_NAME));
}

function renderDeleteBtn(){
    if(cur_row == 0 && (cur_col >= 0 && cur_col < 4)){
        $('.func_btn_del').addClass('btn_grey');
    }else{
        $('.func_btn_del').removeClass('btn_grey');
    }
}

function renderPropertyBtn(){
    if(cur_col >= 0 && cur_col < 4){
        $('.func_btn_property').addClass('btn_grey');
    }else{
        $('.func_btn_property').removeClass('btn_grey');
    }
}

function renderSaveBtn(){
    if(modified == 0){
        $('.func_btn_save').addClass('btn_grey');
    }else{
        $('.func_btn_save').removeClass('btn_grey');
    }
}

function onRowSelected(obj){
    var row = $(obj).attr('row');
    $('#row'+cur_row).css('background', 'rgba(0,0,0,0)');
    cur_row = row;
    if(row != 0){
        $('.col'+cur_col).css('background', 'rgba(0,0,0,0)');
        cur_col = 0;
        $(obj).css('background', '#EAEDF6');
    }
    renderDeleteBtn();
    renderPropertyBtn();
    console.log('cur_row:'+cur_row+', row:'+row+',   cur_col:'+cur_col);
}

function onColSelected(obj){
    var col = $(obj).attr('col');
    console.log('#####order_col:'+order_col+', col:'+col);
    if(order_col == col){
        if (cur_order == 'asc'){
            cur_order = 'desc';
        }else {
            cur_order = 'asc';
        }
    }else{
        order_col = col;
        cur_order = 'asc';
    }
    getTable(TBL_NAME, col, cur_order, 1);
}

function showColSelected(col){
    $('#row'+cur_row).css('background', 'rgba(0,0,0,0)');
    $('.col'+cur_col).css('background', 'rgba(0,0,0,0)');
    cur_row = 0;
    cur_col = col;
    if(!(col >= 0 && col < 4)){
        $('.col'+col).css('background', '#EAEDF6');
    }
    renderDeleteBtn();
    renderPropertyBtn();
    console.log('cur_col:'+cur_col+', col:'+col+',   cur_row:'+cur_row);
}

function showColOrder(col, order) {
    var img = $('.data_order');
    var col_img = $('#col_head_'+col+' .data_order');
    if(order == 'asc'){
        col_img.addClass('order_up');
        col_img.removeClass('order_down');
    }else{
        col_img.removeClass('order_up');
        col_img.addClass('order_down');
    }
    img.each(function (index, elem) {
        $(elem).hide();
        col_img.show();
    });
}

function onInputNumberBlur(obj){
    var row = $(obj).attr('row');
    var col = $(obj).attr('col');
    var new_data = $.trim($(obj).val());
    console.log(row);
    console.log(col);
    console.log(new_data);
    var mod_data = {"row":row,"col":col,"text":new_data};
    //ajax去服务器端校验
    var data= {"uuid":s_userinfo.uuid,"tbl_name":TBL_NAME,"data":mod_data,"op":"mod_data"};
    console.log(data);
    console.log("ModDataAjax");
    $.ajax({
        url: "server/ModifiedTable.php", //后台请求数据
        dataType: "json",
        data:data,
        type: "POST",
        success: function (msg) {
            console.log(msg);
            getTable(TBL_NAME, order_col, cur_order, cur_page);
            hideDialogTip();
        },
        error: function (msg) {
            console.log("error!");
            console.log(msg);
            alert("请求失败，请重试");
        }
    });
}

function parseData(msg){
    TBL_DATA = new Array();
    TBL_ROW = 0;
    TBL_COL = 0;
    TBL_NAME = '';
    for(var i in msg){
        TBL_DATA[i - 1] = new Array();
        for(var j in msg[i]){
            TBL_DATA[i - 1].push(msg[i][j]);
        }
    }
    TBL_ROW = i;
    TBL_COL = j - 0 + 1;
    bakupTBLData();
    // console.log(TBL_DATA);
    console.log(TBL_ROW);
    console.log(TBL_COL);
}

function renderTable(msg, orderByInd, order){
    TBL_HEAD = msg['head_obj'];
    clearTblArea();
    modified = 1;
    // render btn
    renderSaveBtn();
    if(msg['flags']['ischecking'] == 1){
        showPauseBtn();
    }else{
        showStartBtn();
    }

    if(msg['data'].length == 0){
        showTblNone();
        return;
    }
    hideTblNone();

    //render header
    var id_ind = 0;
    $(".manage_info_table").append('<tr id="row0" row="0" onclick="onRowSelected(this)"></tr>');
    for(var j in msg['head_obj']){
        var t = msg['head_obj'][j]['colname'];
        if(t == 'id' || t == 'ischecked' || t == 'isviewed' || t == 'checked_time'){
            $('#row0').append('<th class="regular_col_name col'+ j +'" col="'+ j +'" onclick="onColSelected(this)" id="col_head_'+j+'">' + t + '<img class="data_order order_up" src="images/ic_down.png" style="display: none;"></th>');
        }else{
            // $('#row0').append('<th class="col'+ j +'" col="'+ j +'" onclick="onColSelected(this)">' + t + '</th>');
            $('#row0').append('<th class="col'+ j +'" col="'+ j +'" onclick="onColSelected(this)" id="col_head_'+j+'">' + t + '<img class="data_order order_up" src="images/ic_down.png" style="display: none;"></th>');
        }
        if(msg['head_obj'][j]['colname'] == "id"){
            id_ind = j;
        }
    }
    showColOrder(orderByInd, order);
    //render data
    for(var i in msg['data']){
        //row: row_id
        var row_id = msg['data'][i][id_ind];
        $(".manage_info_table").append('<tr id="row'+ row_id +'" row="'+ row_id +'" onclick="onRowSelected(this)"></tr>');
        for(var j in msg['data'][i]){
            var data = msg['data'][i][j];
            if(data == null){
                data = "";
            }
            if(j >= 0 && j < 4){
                if(j == 1){
                    data = (data == 0) ? '未核对' : '已核对';
                }else if(j == 2){
                    data = (data == 0) ? '未查看' : '已查看';
                }else if(j == 3){
                    data = (data == '') ? '-' : data.substring(0,19);
                }
                $('#row'+row_id).append('<td class="readonly_td col'+ j +'"><input class="change_able_editor" row="'+row_id+'" col="'+j+'" readonly="true" type="text" value="' + data + '"></input></td>');
            }else{
                $('#row'+row_id).append('<td class="change_able col'+ j +'"><input class="change_able_editor" row="'+row_id+'" col="'+j+'" type="text" value="' + data + '" onblur="onInputNumberBlur(this)"></input></td>');
            }
        }
    }
    showColSelected(orderByInd);
    initMainPagingById('paging1', msg['n_pages'], msg['cur_page'], 8, function (p){
        cur_page = p;
        getTable(TBL_NAME, order_col, cur_order, cur_page);
    });
}

function renderTableList(msg){
    console.log(msg);
    console.log(msg.length);
    if(msg.length == 0){
        clearTblListArea();
        showTblListEmpty();
        return;
    }
    hideTblListEmpty();
    clearTblListArea();
    var btn_img = 'ic_modify_open.png';
    var btn_fn = '';
    for(var i in msg){
        if(msg[i]["ischecking"] == 1){
            btn_img = 'ic_modify_pause.png';
            btn_fn = 'pauseChecking(\''+msg[i]["tbl_name"]+'\')';
        }else{
            btn_img = 'ic_modify_open.png';
            btn_fn = 'startChecking(\''+msg[i]["tbl_name"]+'\')';
        }
        $("#manage_all_list").append('<div class="manage_list_item" onclick="openTable(\''+msg[i]["tbl_name"]+'\')">\n' +
            '                <div class="manage_list_item_left">\n' +
            '                    <span class="manage_list_item_title">'+msg[i]["tbl_name"]+'</span>\n' +
            '                    <div class="manage_list_item_data_view_body">\n' +
            '                        <div class="manage_list_item_data_view">\n' +
            '                            <img class="manage_list_item_data_view_img" src="images/ic_num_data.png">\n' +
            '                            <span class="manage_data_text">'+msg[i]["n_all"]+'</span>\n' +
            '                            <span class="manage_data_text" style="margin-left: 5px;">条数据</span>\n' +
            '                        </div>\n' +
            '                        <div class="manage_list_item_data_view">\n' +
            '                            <img class="manage_list_item_data_view_img" src="images/ic_viewed.png">\n' +
            '                            <span class="manage_data_text">'+msg[i]["n_viewed"]+'</span>\n' +
            '                            <span class="manage_data_text" style="margin-left: 5px;">已查看</span>\n' +
            '                        </div>\n' +
            '                        <div class="manage_list_item_data_view">\n' +
            '                            <img class="manage_list_item_data_view_img" src="images/ic_checked.png">\n' +
            '                            <span class="manage_data_text">'+msg[i]["n_checked"]+'</span>\n' +
            '                            <span class="manage_data_text" style="margin-left: 5px;">已核对</span>\n' +
            '                        </div>\n' +
            '                    </div>\n' +
            '                </div>\n' +
            '                <div class="manage_list_item_right">\n' +
            '                    <div class="manage_list_item_btn">\n' +
            '                        <img class="manage_list_item_img" src="images/'+btn_img+'" onclick="'+btn_fn+'">\n' +
            '                    </div>\n' +
            '                    <div class="manage_list_item_btn">\n' +
            '                        <img class="manage_list_item_img" src="images/ic_information_blue.png" onclick="getCheckShareInfo(\''+msg[i]["tbl_name"]+'\')">\n' +
            '                    </div>\n' +
            '                    <div class="manage_list_item_del_btn">\n' +
            '                        <img class="manage_list_item_img" src="images/ic_delete_red.png" onclick="delTable(\''+msg[i]["tbl_name"]+'\')">\n' +
            '                    </div>\n' +
            '                </div>\n' +
            '            </div>');
    }
    $(".manage_list_item_right").on('click', function (event) {
        event.stopPropagation();
    });
}

function getTableList(){
    //ajax去服务器端校验
    var data= {"uuid":s_userinfo.uuid};
    console.log("GetTableListAjax");
    console.log(data);
    $.ajax({
        url: "server/GetTableList.php", //后台请求数据
        dataType: "json",
        data:data,
        type: "POST",
        success: function (msg) {
            console.log(msg);
            renderTableList(msg['tbl_list']);
        },
        error: function (msg) {
            console.log("error!");
            console.log(msg);
            alert("请求失败，请重试");
        }
    });
}

function getTable(tbl_name, col, order, page){
    //ajax去服务器端校验
    var data= {"uuid":s_userinfo.uuid,"tbl_name":tbl_name,"orderBy":col,"order":order,"page":page,"per":20};
    console.log("OpenTableAjax");
    console.log(data);
    $.ajax({
        url: "server/OpenTable.php", //后台请求数据
        dataType: "json",
        data:data,
        type: "POST",
        success: function (msg) {
            console.log(msg);
            renderTable(msg, col, order);
            hideDialogTip();
        },
        error: function (msg) {
            console.log("error!");
            console.log(msg);
            alert("请求失败，请重试");
        }
    });
}

function openTable(tbl_name){
    TBL_NAME = tbl_name;
    changePage('manage');
    $('.head_title').text('编辑核对 - ' + tbl_name);
    getTable(tbl_name, 0, cur_order, 1);
}

function delTable(tbl_name){
    showDialogTip('温馨提示', '是否要删除该表单？');
    bindTipOK(function (){
        hideDialogTip();
        //ajax去服务器端校验
        var data= {"uuid":s_userinfo.uuid,"tbl_name":tbl_name};
        console.log(data);
        console.log("DelTableAjax");
        $.ajax({
            url: "server/DelTable.php", //后台请求数据
            dataType: "json",
            data:data,
            type: "POST",
            success: function (msg) {
                console.log(msg);
                getTableList();
            },
            error: function (msg) {
                console.log("error!");
                console.log(msg);
                alert("请求失败，请重试");
            }
        });
    });
}

function checkConfigRight(tbl_name){
    var code = $.trim($('.dialog_config_code').val());
    var ver_col = getCheckedItem('verify_info_checkbox');
    if(code == ""){
        $(".dialog_config_code").css("border-color", "#ff392f");
        $(".dialog_config_code").shake(2, 10, 400);
        showFloatTip('分享密码不能为空！', 'success');
    }else if(ver_col == undefined || ver_col == null || ver_col.length == 0){
        $("#dialog_config_verify").css("border-color", "#ff392f");
        $("#dialog_config_verify").shake(2, 10, 400);
        showFloatTip('请选择用户验证信息！', 'success');
    }else{
        showFloatTip('正在检测配置是否符合要求，注意选中的验证信息的列中不可有重复的信息！', 'success');
        var data= {"uuid":s_userinfo.uuid,"tbl_name":tbl_name,"s_pwd":code,"ver_col":ver_col};
        console.log("CheckConfigAjax");
        console.log(data);
        $.ajax({
            url: "server/CheckConfig.php", //后台请求数据
            dataType: "json",
            data:data,
            type: "POST",
            success: function (msg) {
                console.log(msg);
                hideDialogPublishConfig();
                if(msg['flags']['flag'] == '0'){
                    showDialogTip('配置错误', '请输入仅含字母数字的6位分享密码，不区分大小写。');
                    bindTipOK(function () {
                        hideDialogTip();
                    });
                }else if(msg['flags']['flag'] == 1){
                    publishCheckInfoShare(tbl_name,code,ver_col);
                }else if(msg['flags']['check_flag'] == 0){
                    showDialogTip('配置错误', '选中的验证信息列中包含重复的信息。请选择不含重复信息的列，以方便用户准确地筛选出属于自己的信息。');
                    bindTipOK(function () {
                        hideDialogTip();
                    });
                }else if(msg['flags']['ischecking'] == 1){
                    showDialogTip('配置错误', '该表单核对已经发布！不可重复发布。');
                    bindTipOK(function () {
                        hideDialogTip();
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
}

function publishCheckInfoShare(tbl_name,s_pwd,ver_col){
    showFloatTip('正在发布核对表单。。。', 'success');
    var data= {"uuid":s_userinfo.uuid,"tbl_name":tbl_name,"s_pwd":s_pwd,"ver_col":ver_col};
    console.log("RegisterCheckInfoShareAjax");
    console.log(data);
    $.ajax({
        url: "server/RegisterCheckInfoShare.php", //后台请求数据
        dataType: "json",
        data:data,
        type: "POST",
        success: function (msg) {
            console.log(msg);
            if(msg['flags']['flag'] == 1){
                //publish success
                hideDialogTip();
                showPauseBtn();
                getTableList();
                showFloatTip('发布成功！', 'success');
                showCheckShareInfo(msg, tbl_name);
            }
        },
        error: function (msg) {
            console.log("error!");
            console.log(msg);
            alert("请求失败，请重试");
        }
    });
}

function getCheckShareInfo(tbl_name){
    var data= {"uuid":s_userinfo.uuid,"tbl_name":tbl_name};
    console.log("GetCheckInfoShareInfoAjax");
    console.log(data);
    $.ajax({
        url: "server/GetCheckInfoShareInfo.php", //后台请求数据
        dataType: "json",
        data:data,
        type: "POST",
        success: function (msg) {
            console.log(msg);
            if(msg['flags']['flag'] == 1){
                showCheckShareInfo(msg, tbl_name);
            }else if(msg['flags']['find_s_flag'] == 0){
                showFloatTip('该表单未发起核对哦~', 'success');
            }else{
                showFloatTip('获取分享信息失败！', 'error');
            }
        },
        error: function (msg) {
            console.log("error!");
            console.log(msg);
            alert("请求失败，请重试");
        }
    });
}

function startChecking(tbl_name){
    var data= {"uuid":s_userinfo.uuid,"tbl_name":tbl_name};
    console.log("GetOptionColNameAjax");
    console.log(data);
    $.ajax({
        url: "server/GetOptionColName.php", //后台请求数据
        dataType: "json",
        data:data,
        type: "POST",
        success: function (msg) {
            console.log(msg);
            showDialogPublishConfig('配置链接', msg['head']);
            bindPublishConfigNext(function (){
                checkConfigRight(tbl_name);
            });
        },
        error: function (msg) {
            console.log("error!");
            console.log(msg);
            alert("请求失败，请重试");
        }
    });
}

function pauseChecking(tbl_name){
    showDialogTip('温馨提示', '是否要取消核对分享？');
    bindTipOK(function (){
        hideDialogTip();
        var data= {"uuid":s_userinfo.uuid,"tbl_name":tbl_name};
        console.log("CancelCheckInfoShareAjax");
        console.log(data);
        $.ajax({
            url: "server/CancelCheckInfoShare.php", //后台请求数据
            dataType: "json",
            data:data,
            type: "POST",
            success: function (msg) {
                console.log(msg);
                if(msg['flags']['flag'] == 1){
                    showStartBtn();
                    getTableList();
                    showFloatTip('已取消核对分享', 'success');
                }else{
                    showFloatTip('取消核对分享失败！', 'error');
                }
            },
            error: function (msg) {
                console.log("error!");
                console.log(msg);
                alert("请求失败，请重试");
            }
        });
    });
}

function showStartBtn(){
    $('.func_btn_start').show();
    $('.func_btn_pause').hide();
    $('.func_btn_s_info').hide();
}

function showPauseBtn(){
    $('.func_btn_start').hide();
    $('.func_btn_pause').show();
    $('.func_btn_s_info').show();
}

function showTblNone(){
    $('#back_none').show();
}

function hideTblNone(){
    $('#back_none').hide();
}

function showTblListEmpty(){
    $('#back_empty').show();
}

function hideTblListEmpty(){
    $('#back_empty').hide();
}

function clearTblArea(){
    $(".manage_info_table").html('');
}

function clearTblListArea(){
    $("#manage_all_list").html('');
}

//obj
$(".float_add_btn").click(function () {
    showDialogInput('新建表单', '输入表名');
    // showDialogHtml('新建表单', '' +
    //     '<input type="text" class="dialog_input main_input" style="padding: 0;" placeholder="输入表名"/>' +
    //     '<div class="dialog_select_line">' +
    //     '    <span>截止日期：</span>' +
    //     '    <div class="main_calendar_borderstyle" id="calendar_create" style="height: 30px;" onclick="mainCalendarToggleById(\'calendar_create\')">\n' +
    //     '        <img class="main_calendar_arrow" style="top: 10px;" src="images/ic_down_arrow.png"/>\n' +
    //     '        <span class="main_select_placeholder" style="line-height: 30px;">请选择日期</span>\n' +
    //     '        <div class="main_calendar_select_body" style="top: 40px;">\n' +
    //     '            <div class="main_btn_line" style="justify-content: flex-end;">\n' +
    //     '                <span class="dialog_btn_seco">取消</span>\n' +
    //     '                <span class="dialog_btn_main">确定</span>\n' +
    //     '            </div>\n' +
    //     '        </div>\n' +
    //     '    </div>' +
    //     '</div>' +
    //     '');
    bindInputOK(function (){
        var t_name = $.trim($('#dialog_input_text').val());
        if(t_name == ""){
            $("#dialog_input_text").css("border-color", "#ff392f");
            $("#dialog_input_text").shake(2, 10, 400);
        }else{
            TBL_NAME = t_name;
            $("#dialog_input_text").css("border-color", "#EAEDF6");
            hideDialogInput();
            //ajax去服务器端校验
            var data= {"uuid":s_userinfo.uuid,"tbl_name":t_name};
            console.log(data);
            console.log("CreateTableAjax");
            /*!!!!!!!!!!!!*
             *!表不允许重名!*
             *!!!!!!!!!!!!*/
            $.ajax({
                url: "server/CreateNewTable.php", //后台请求数据
                dataType: "json",
                data:data,
                type: "POST",
                success: function (msg) {
                    console.log(msg);
                    if(msg.check_name == 0){
                        showDialogTip('温馨提示', '您已有一个命名为该名字的表单。');
                        bindTipOK(function (){
                            hideDialogTip();
                        });
                    }else{
                        openTable(t_name);
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
});

$(".func_btn_upload").click(function () {
    $("#upload_excel").click();
});

$(".func_btn_export").click(function () {
    // if(modified == 0){
    showDialogTip('温馨提示', '正在导出信息。。。若长时间为弹出下载，请取消后重试。');
    bindTipOK(function (){
        hideDialogTip();
    });
    var h = 'export_excel.php?i='+s_userinfo.uuid+'&name='+TBL_NAME;
    location.href = h;
    console.log(h);
    // }else{
    //     showDialogTip('温馨提示', '导出信息需要先保存，要保存信息吗？');
    //     $('#tips_ok_btn').on('click', function (){
    //         saveTBLData();
    //     });
    // }
});

$(".func_btn_addrow").click(function () {
    //ajax去服务器端校验
    var data= {"uuid":s_userinfo.uuid,"tbl_name":TBL_NAME,"data":0,"op":"add_row"};
    console.log(data);
    console.log("AddRowAjax");
    $.ajax({
        url: "server/ModifiedTable.php", //后台请求数据
        dataType: "json",
        data:data,
        type: "POST",
        success: function (msg) {
            console.log(msg);
            order_col = 0;
            cur_order = 'desc';
            getTable(TBL_NAME, order_col, cur_order, 1);
        },
        error: function (msg) {
            console.log("error!");
            console.log(msg);
            alert("请求失败，请重试");
        }
    });
});

$(".func_btn_addcol").click(function () {
    var col_name;
    showDialogColProp("添加列", null, function (){
        col_name = $.trim($('#col_prop_name').val());
        if(col_name == ""){
            $("#col_prop_name").css("border-color", "#ff392f");
            $("#col_prop_name").shake(2, 10, 400);
        }else{
            $("#col_prop_name").css("border-color", "#EAEDF6");
            var type = getMainSelectListSelectedById('dialog_select_type');
            var rule = getMainSelectListSelectedById('dialog_select_rule');
            var col_prop = {"colname":col_name,"type":type,"rule":rule,"regex":""};
            if(rule == '自定义'){
                var regex = $('#col_prop_regex').val();
                col_prop["regex"] = regex;
            }
            //ajax去服务器端校验
            var data= {"uuid":s_userinfo.uuid,"tbl_name":TBL_NAME,"data":col_prop,"op":"add_col"};
            console.log(data);
            console.log("AddColAjax");
            $.ajax({
                url: "server/ModifiedTable.php", //后台请求数据
                dataType: "json",
                data:data,
                type: "POST",
                success: function (msg) {
                    console.log(msg);
                    getTable(TBL_NAME, order_col, cur_order, cur_page);
                    hideDialogInput();
                },
                error: function (msg) {
                    console.log("error!");
                    console.log(msg);
                    alert("请求失败，请重试");
                }
            });
        }
    });
});

$(".func_btn_del").click(function () {
    if(cur_row != 0){
        showDialogTip('温馨提示', '确定要删除该行吗？');
    }else if(!(cur_col >= 0 && cur_col < 4)){
        showDialogTip('温馨提示', '确定要删除该列吗？');
    }
    bindTipOK(function (){
        if(cur_row != 0){
            // 删除行
            //ajax去服务器端校验
            var data= {"uuid":s_userinfo.uuid,"tbl_name":TBL_NAME,"data":cur_row,"op":"del_row"};
            console.log(data);
            console.log("DelRowAjax");
            $.ajax({
                url: "server/ModifiedTable.php", //后台请求数据
                dataType: "json",
                data:data,
                type: "POST",
                success: function (msg) {
                    console.log(msg);
                    getTable(TBL_NAME, order_col, cur_order, cur_page);
                    hideDialogTip();
                },
                error: function (msg) {
                    console.log("error!");
                    console.log(msg);
                    alert("请求失败，请重试");
                }
            });
        }else if(cur_col != 0){
            // 删除列
            //ajax去服务器端校验
            var data= {"uuid":s_userinfo.uuid,"tbl_name":TBL_NAME,"data":cur_col,"op":"del_col"};
            console.log(data);
            console.log("DelColAjax");
            $.ajax({
                url: "server/ModifiedTable.php", //后台请求数据
                dataType: "json",
                data:data,
                type: "POST",
                success: function (msg) {
                    console.log(msg);
                    order_col = 0;
                    cur_order = 'asc';
                    getTable(TBL_NAME, order_col, cur_order, cur_page);
                    hideDialogTip();
                },
                error: function (msg) {
                    console.log("error!");
                    console.log(msg);
                    alert("请求失败，请重试");
                }
            });
        }
    });
});

$(".func_btn_start").click(function () {
    startChecking(TBL_NAME);
});

$(".func_btn_pause").click(function () {
    pauseChecking(TBL_NAME);
});

$(".func_btn_s_info").click(function () {
    getCheckShareInfo(TBL_NAME);
});

$(".func_btn_property").click(function () {
    if(cur_col >= 4){
        showDialogColProp('列属性 - ' + TBL_HEAD[cur_col]['colname'], TBL_HEAD[cur_col], function (){

        });
    }
});