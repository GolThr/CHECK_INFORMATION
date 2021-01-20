function init(){
    initUser();
    $('.head_back_btn').hide();
    $('.head_title').text('个人中心');
    $("#menu_home").removeClass('panel_menu_list_selected');
    $("#menu_manage").removeClass('panel_menu_list_selected');
    $("#menu_mine").addClass('panel_menu_list_selected');
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
        bindTipOK(function (){
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