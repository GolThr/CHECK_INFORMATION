var TBL_DATA = new Array();
var TBL_ROW = 0;
var TBL_COL = 0;
var TBL_NAME = '';
var cur_row = 0;
var cur_col = 0;
var modified = 0;
var s_userinfo;
function initUser() {
    s_userinfo = JSON.parse(localStorage.getItem("s_userinfo"));
    console.log(s_userinfo);
    if(s_userinfo == null || s_userinfo.flag != "1"){
        console.log('未登录');
        location.href = 'login.html';
    }else{
        //已登录
        $('.user_name').text(s_userinfo.user_name);
        $('.user_avatar').attr("src", s_userinfo.avatar);
    }
}

function init(){
    initUser();
    $("#menu_home").addClass('panel_menu_list_selected');
    $("#menu_manage").removeClass('panel_menu_list_selected');
    $("#menu_mine").removeClass('panel_menu_list_selected');
    TBL_DATA = new Array();
    TBL_ROW = 0;
    TBL_COL = 0;
    TBL_NAME = '';
    cur_row = 0;
    cur_col = 0;
    modified = 0;
    var bak_tbl_data = JSON.parse(localStorage.getItem("bak_tbl_data"));
    var bak_tbl_row = JSON.parse(localStorage.getItem("bak_tbl_row"));
    var bak_tbl_col = JSON.parse(localStorage.getItem("bak_tbl_col"));
    var bak_tbl_name = JSON.parse(localStorage.getItem("bak_tbl_name"));
    if(bak_tbl_data != undefined){
        showDialogTip('温馨提示', '您尚有未保存的表单，要继续编辑吗？');
        $('#tips_ok_btn').on('click', function (){
            TBL_DATA = bak_tbl_data;
            TBL_ROW = bak_tbl_row;
            TBL_COL = bak_tbl_col;
            TBL_NAME = bak_tbl_name;
            modified = 1;
            changePage('manage');
            renderTable();
            hideDialogTip();
        });
    }
}

function changePage(p){
    if(p == "home"){
        $('#panel_body_home').show();
        $('#panel_body_manage_all').hide();
        $('#panel_body_manage').hide();
        $('#panel_body_mine').hide();
        $("#menu_home").addClass('panel_menu_list_selected');
        $("#menu_manage").removeClass('panel_menu_list_selected');
        $("#menu_mine").removeClass('panel_menu_list_selected');
    }else if(p == "manage_all"){
        $('#panel_body_home').hide();
        $('#panel_body_manage_all').show();
        $('#panel_body_manage').hide();
        $('#panel_body_mine').hide();
        $("#menu_home").removeClass('panel_menu_list_selected');
        $("#menu_manage").addClass('panel_menu_list_selected');
        $("#menu_mine").removeClass('panel_menu_list_selected');
        $('.head_back_btn').hide();
        $('.head_title').text('所有表单');
        getTableList();
    }else if(p == "manage"){
        $('#panel_body_home').hide();
        $('#panel_body_manage_all').hide();
        $('#panel_body_manage').show();
        $('#panel_body_mine').hide();
        $("#menu_home").removeClass('panel_menu_list_selected');
        $("#menu_manage").addClass('panel_menu_list_selected');
        $("#menu_mine").removeClass('panel_menu_list_selected');
        $('.head_back_btn').show();
        $('.head_back_btn').on("click", function (){
            changePage('manage_all');
        });
        $('.head_title').text('管理信息');
    }else if(p == "mine"){
        $('#panel_body_home').hide();
        $('#panel_body_manage_all').hide();
        $('#panel_body_manage').hide();
        $('#panel_body_mine').show();
        $("#menu_home").removeClass('panel_menu_list_selected');
        $("#menu_manage").removeClass('panel_menu_list_selected');
        $("#menu_mine").addClass('panel_menu_list_selected');
        $('.head_back_btn').hide();
        $('.head_title').text('个人中心');
    }
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
        url: "server/read_excel.php",/*传向后台服务器文件*/
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
            renderTable(msg);
            hideDialogTip();
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
    console.log('cur_row:'+cur_row+', row:'+row+',   cur_col:'+cur_col);
}

function onColSelected(obj){
    var col = $(obj).attr('col');
    $('#row'+cur_row).css('background', 'rgba(0,0,0,0)');
    $('.col'+cur_col).css('background', 'rgba(0,0,0,0)');
    cur_row = 0;
    cur_col = col;
    if(!(col >= 0 && col < 4)){
        $('.col'+col).css('background', '#EAEDF6');
    }
    renderDeleteBtn();
    console.log('cur_col:'+cur_col+', col:'+col+',   cur_row:'+cur_row);
}

function onInputNumberBlur(obj){
    var row = $(obj).attr('row');
    var col = $(obj).attr('col');
    var new_data = $.trim($(obj).val());
    console.log(row);
    console.log(col);
    console.log(new_data);
    TBL_DATA[row][col] = new_data;
    bakupTBLData();
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

function renderTable(msg){
    modified = 1;
    renderSaveBtn();
    $('.back_none').fadeOut('fast');
    $(".manage_info_table").html('');

    //render header
    $(".manage_info_table").append('<tr id="row0" row="0" onclick="onRowSelected(this)"></tr>');
    for(var j in msg['head']){
        $('#row0').append('<th class="col'+ j +'" col="'+ j +'" onclick="onColSelected(this)">' + msg['head'][j] + '</th>');
    }
    //render data
    for(var i in msg['data']){
        $(".manage_info_table").append('<tr id="row'+ (i+1) +'" row="'+ (i+1) +'" onclick="onRowSelected(this)"></tr>');
        for(var j in msg['data'][i]){
            if(j >= 0 && j < 4){
                $('#row'+(i+1)).append('<td class="readonly_td col'+ j +'"><input class="change_able_editor" row="'+(i+1)+'" col="'+j+'" readonly="true" type="text" value="' + msg['data'][i][j] + '"></input></td>');
            }else{
                $('#row'+(i+1)).append('<td class="change_able col'+ j +'"><input class="change_able_editor" row="'+(i+1)+'" col="'+j+'" type="text" value="' + msg['data'][i][j] + '" onblur="onInputNumberBlur(this)"></input></td>');
            }
        }
    }
}

function renderTableList(msg){
    $("#manage_all_list").html('');
    for(var i in msg){
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
            '                    <img class="manage_list_item_del" src="images/ic_delete.png" onclick="delTable(\''+msg[i]["tbl_name"]+'\')">\n' +
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
    console.log(data);
    console.log("GetTableListAjax");
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

function saveTBLData(){
    if(TBL_NAME == ''){
        showDialogInput('输入表名', '表名');
        $('#input_ok_btn').on('click', function (){
            var t_name = $.trim($('.dialog_input').val());
            if(t_name == ""){
                $(".dialog_input").css("border-color", "#ff392f");
                $(".dialog_input").shake(2, 10, 400);
            }else{
                TBL_NAME = t_name;
                $(".dialog_input").css("border-color", "#EAEDF6");
                hideDialogInput();
                saveTBLData();
            }
        });
    }else{
        showDialogTip('温馨提示', '正在保存。。。');
        $('#tips_ok_btn').on('click', function (){
            hideDialogTip();
        });
        //ajax去服务器端校验
        var data= {"uuid":s_userinfo.uuid,"tbl_name":TBL_NAME,"data":TBL_DATA};
        console.log("SaveAjax");
        $.ajax({
            url: "server/save_tbl_data.php", //后台请求数据
            dataType: "json",
            data:data,
            type: "POST",
            success: function (msg) {
                modified = 0;
                hideDialogTip();
                $('.func_btn_save').addClass('btn_grey');
                showDialogTip('温馨提示', '保存成功！');
                $('#tips_ok_btn').on('click', function (){
                    hideDialogTip();
                });
            },
            error: function (msg) {
                console.log("error!");
                alert("请求失败，请重试");
            }
        });
    }
}

function getTable(tbl_name){
    //ajax去服务器端校验
    var data= {"uuid":s_userinfo.uuid,"tbl_name":tbl_name};
    console.log(data);
    console.log("OpenTableAjax");
    $.ajax({
        url: "server/OpenTable.php", //后台请求数据
        dataType: "json",
        data:data,
        type: "POST",
        success: function (msg) {
            console.log(msg);
            renderTable(msg);
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
    $('.head_title').text('管理信息 - ' + tbl_name);
    getTable(tbl_name);
}

function delTable(tbl_name){
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
}

//obj
$(".float_add_btn").click(function () {
    showDialogInput('新建表单', '输入表名');
    $('#input_ok_btn').on('click', function (){
        var t_name = $.trim($('.dialog_input').val());
        if(t_name == ""){
            $(".dialog_input").css("border-color", "#ff392f");
            $(".dialog_input").shake(2, 10, 400);
        }else{
            TBL_NAME = t_name;
            $(".dialog_input").css("border-color", "#EAEDF6");
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
                        $('#tips_ok_btn').on('click', function (){
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
    if(modified == 0){
        showDialogTip('温馨提示', '正在导出信息。。。若长时间为弹出下载，请取消后重试。');
        $('#tips_ok_btn').on('click', function (){
            hideDialogTip();
        });
        location.href = 'export_excel.php';
    }else{
        showDialogTip('温馨提示', '导出信息需要先保存，要保存信息吗？');
        $('#tips_ok_btn').on('click', function (){
            saveTBLData();
        });
    }
});

$(".func_btn_addrow").click(function () {
    TBL_DATA[TBL_ROW++] = new Array();
    TBL_DATA[TBL_ROW - 1][0] = TBL_ROW - 1;
    renderTable();
    bakupTBLData();
});

$(".func_btn_addcol").click(function () {
    var col_name;
    showDialogInput("输入列名", "列名称");
    $('#input_ok_btn').on('click', function (){
        col_name = $.trim($('.dialog_input').val());
        if(col_name == ""){
            $(".dialog_input").css("border-color", "#ff392f");
            $(".dialog_input").shake(2, 10, 400);
        }else{
            $(".dialog_input").css("border-color", "#EAEDF6");
            TBL_DATA[0].push(col_name);
            for(var i = 1; i < TBL_ROW; i++){
                TBL_DATA[i].push();
            }
            TBL_COL++;
            renderTable();
            hideDialogInput();
            bakupTBLData();
        }
    });
});

$(".func_btn_del").click(function () {
    if(cur_row == 0 && (cur_col >= 0 && cur_col < 4)){
        showDialogTip('温馨提示', '单击选中某行或单击表头选中某列来使用删除操作');
        $('#tips_ok_btn').on('click', function (){
            hideDialogTip();
        });
    }else{
        if(cur_row != 0){
            showDialogTip('温馨提示', '确定要删除该行吗？');
        }else if(!(cur_col >= 0 && cur_col < 4)){
            showDialogTip('温馨提示', '确定要删除该列吗？');
        }
        $('#tips_ok_btn').on('click', function (){
            if(cur_row != 0){
                // 删除行
                TBL_DATA.splice(cur_row, 1);
                TBL_ROW--;
            }else if(cur_col != 0){
                // 删除列
                for(var i = 0; i < TBL_ROW; i++){
                    TBL_DATA[i].splice(cur_col, 1);
                }
                TBL_COL--;
            }
            renderTable();
            bakupTBLData();
            hideDialogTip();
        });
    }
});

$(".func_btn_save").click(function () {
    if(modified == 0){
        showDialogTip('温馨提示', '修改后再来保存哦~');
    }else{
        saveTBLData();
    }
});

$(".func_btn_start").click(function () {

});