function init(){
    $("#menu_home").addClass('panel_menu_list_selected');
    $("#menu_manage").removeClass('panel_menu_list_selected');
    $("#menu_mine").removeClass('panel_menu_list_selected');
}

function changePage(p){
    if(p == "home"){
        $('#panel_body_manage').hide();
        $('#panel_body_mine').hide();
        $('#panel_body_home').show();
        $("#menu_home").addClass('panel_menu_list_selected');
        $("#menu_manage").removeClass('panel_menu_list_selected');
        $("#menu_mine").removeClass('panel_menu_list_selected');
    }else if(p == "manage"){
        $('#panel_body_home').hide();
        $('#panel_body_mine').hide();
        $('#panel_body_manage').show();
        $("#menu_home").removeClass('panel_menu_list_selected');
        $("#menu_manage").addClass('panel_menu_list_selected');
        $("#menu_mine").removeClass('panel_menu_list_selected');
    }else if(p == "mine"){
        $('#panel_body_home').hide();
        $('#panel_body_manage').hide();
        $('#panel_body_mine').show();
        $("#menu_home").removeClass('panel_menu_list_selected');
        $("#menu_manage").removeClass('panel_menu_list_selected');
        $("#menu_mine").addClass('panel_menu_list_selected');
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
        success: function (responseStr){
            console.log(responseStr);
            renderTable(responseStr);
            hideDialogTip();
        },
        error: function () {
            alert("上传错误！");
        }
    });
}

function renderTable(msg){
    $('.back_none').fadeOut('fast');
    //render_head
    for(var i in msg){
        $(".manage_info_table").append('<tr id="row' + i + '"></tr>');
        for(var j in msg[i]){
            if(i == 1){
                $('#row'+i).append('<td>' + msg[i][j] + '</td>');
            }else if(j == 0){
                $('#row'+i).append('<td class="readonly_td"><input class="change_able_editor" readonly="true" type="text" value="' + msg[i][j] + '"></input></td>');
            }else{
                $('#row'+i).append('<td class="change_able"><input class="change_able_editor" type="text" value="' + msg[i][j] + '" onblur="onInputNumberBlur(this)" onfocus="onInputNumberFocus(this)"></input></td>');
            }
        }
    }
}

//obj
$(".func_btn_upload").click(function () {
    $("#upload_excel").click();
});