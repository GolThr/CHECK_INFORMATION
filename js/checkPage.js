var s = getQueryShareId();
var i_vercol = 0;
var vercol_in = [];
var col_name = [];
var col_val = [];
var col_mod = [];
var col_mod_flag = [];  //0:normal, 1:modified, -1:wrong
const minWidth = 300;
const margin = 20;

window.onresize = function(){
    adjustWidth();
}

function init(){
    verifyLink();
    adjustWidth();
}

function adjustWidth(){
    var win = document.documentElement.clientWidth - 40;
    var w = 0;
    var rest = win % (minWidth + margin);
    var n = parseInt(win / (minWidth + margin));
    if(rest > 20){
        w = minWidth + parseInt(rest / n);
    }
    if(w > 40){
        $('.info_page_item').css("width", w);
    }else{
        $('.info_page_item').css("width", '100%');
    }
    console.log("win="+win+", w="+w+", rest="+rest+", n="+n);
}

function changePage(p){
    // verify { fail, step1, query }
    // info
    // done
    if(p == 'verify'){
        $('#check_page_verify').show();
        $('#check_page_query').hide();
        $('#check_page_info').hide();
    }else if(p == 'query'){
        $('#check_page_done').hide();
        $('#check_page_info').hide();
        $('#link_verify_step1').fadeOut(500,function (){
            $('#check_page_query').fadeIn();
        });
    }else if(p == 'info'){
        $('#check_page_done').hide();
        $('#check_page_verify').fadeOut(500, function (){
            $('#check_page_info').fadeIn();
        });
    }else if(p == 'done'){
        $('#check_page_verify').hide();
        $('#check_page_info').fadeOut(500, function (){
            $('#check_page_done').fadeIn();
        });
    }else if(p == 'fail'){
        $('#check_page_verify').show();
        $('#check_page_query').hide();
        $('#check_page_info').hide();
        showLinkFail();
        hideLinkVerify();
    }else if(p == 'verify_link'){
        $('#check_page_verify').show();
        $('#check_page_query').hide();
        $('#check_page_info').hide();
        showLinkVerify();
        hideLinkFail();
    }
}

function renderQueryResult(msg){
    var vercol = msg['vercol'];
    $('#info_page_ok').html('');
    $('#info_page_need').html('');
    for(var i in msg['head']){
        var h = msg['head'][i];
        var d = msg['data'][i];
        col_name.push(h);
        col_val.push(d);
        col_mod.push(d);
        col_mod_flag.push(0);
        if($.inArray(h, vercol) == -1){
            $('#info_page_need').append('<div class="info_page_item">\n' +
                '                        <span class="info_page_subtitle">'+h+'</span>\n' +
                '                        <input class="main_input info_page_in" type="text" id="info_in_'+i+'" ind="'+i+'" value="'+d+'" onchange="onInfoPageInChange(this)" onblur="onInfoPageInBlur(this)"/>\n' +
                '                    </div>');
        }else{
            //is verify info
            $('#info_page_ok').append('<div class="info_page_item">\n' +
                '                        <span class="info_page_subtitle">'+h+'</span>\n' +
                '                        <input class="info_page_in_ok" type="text" readonly="true" value="'+d+'"/>\n' +
                '                    </div>');
        }
    }
    adjustWidth();
}

function renderQueryVerify(vercol){
    $('#check_page_query').html('');
    for(var i in vercol){
        $('#check_page_query').append('<input type="text" class="main_input link_verify_input" id="vercol_'+i+'" col="'+vercol[i]+'" placeholder="请输入'+vercol[i]+'"/>');
    }
    $('#check_page_query').append('<span class="dialog_btn_main link_query_btn" id="link_query_btn" onclick="queryLink();">下一步</span>');
    i_vercol = i;
}

function renderLinkVerify(msg){
    setNormalHeaderTitle(msg['tbl_name']);
    $('.link_avatar').attr("src", '../'+msg['avatar']);
    $('.link_user').text(msg['user_name']);
}

function renderInfoPageIn(obj){
    var ind = $(obj).attr('ind');
    if(col_val[ind] == col_mod[ind]){
        $(obj).addClass('info_page_in_nochange');
        $(obj).removeClass('info_page_in_changed');
        $(obj).removeClass('info_page_in_wrong');
        col_mod_flag[ind] = 0;
    }else{
        $(obj).removeClass('info_page_in_nochange');
        $(obj).addClass('info_page_in_changed');
        $(obj).removeClass('info_page_in_wrong');
        col_mod_flag[ind] = 1;
    }
}

function onInfoPageInChange(obj){
    var ind = $(obj).attr('ind');
    col_mod[ind] = $(obj).val();
    renderInfoPageIn(obj);
}

function onInfoPageInBlur(obj){
    var ind = $(obj).attr('ind');
    col_mod[ind] = $(obj).val();
    renderInfoPageIn(obj);
}

function queryLink(){
    for(var i = 0; i <= i_vercol; i++){
        var t = $.trim($('#vercol_'+i).val());
        if(t == ""){
            $('#vercol_'+i).css("border-color", "#ff392f");
            $('#vercol_'+i).shake(2, 10, 400);
            return;
        }
        vercol_in.push(t);
    }
    var data= {"s":s,"op":"query","data":vercol_in};
    console.log("VerifyCheckInfoLinkAjax");
    console.log(data);
    $.ajax({
        url: "../server/VerifyCheckInfoLink.php", //后台请求数据
        dataType: "json",
        data:data,
        type: "POST",
        success: function (msg) {
            console.log(msg);
            if(msg['flags']['flag'] == 1){
                renderQueryResult(msg);
                changePage('info');
            }else{
                showDialogTip('查询错误', '查询不到您的信息，请联系核对发起者以获取帮助。');
                bindTipOK(function (){
                    hideDialogTip();
                })
            }
        },
        error: function (msg) {
            console.log("error!");
            console.log(msg);
            alert("请求失败，请重试");
        }
    });
}

function verifyLink(){
    var data= {"s":s,"op":"check","data":0};
    console.log("VerifyCheckInfoLinkAjax");
    console.log(data);
    $.ajax({
        url: "../server/VerifyCheckInfoLink.php", //后台请求数据
        dataType: "json",
        data:data,
        type: "POST",
        success: function (msg) {
            console.log(msg);
            if(msg['flags']['find_s_flag'] == 1){
                renderLinkVerify(msg);
                changePage('verify_link');
            }else{
                changePage('fail');
            }
        },
        error: function (msg) {
            console.log("error!");
            console.log(msg);
            alert("请求失败，请重试");
        }
    });
}

function checkInfoVerify(){
    var w = 0, f = 0;
    for(var i in col_mod_flag){
        if(col_mod_flag[i] == -1){
            // Has Wrong
            w = -1;
        }
        f = f || col_mod_flag[i];
    }
    if(w == -1){
        // Has Wrong
        showDialogTip('温馨提示','信息中包含错误，请修改红色框表示的错误信息！');
        bindTipOK(function (){
            hideDialogTip();
        });
    }else if(f == 0){
        showDialogTip('温馨提示','信息未修改，是否确认无误？');
        bindTipOK(function () {
            hideDialogTip();
            checkInfoOK();
        });
    }else{
        showDialogTip('温馨提示','确认保存修改的信息吗？保存之后请再次核对，信息正确后，点击“确认无误”按钮完成核对。');
        bindTipOK(function () {
            hideDialogTip();
            checkInfoSave();
        });
    }
}

function checkInfoOK(){
    var data= {"s":s,"op":"ok","query_ver":vercol_in};
    console.log("CheckInfoActionAjax");
    console.log(data);
    $.ajax({
        url: "../server/CheckInfoAction.php", //后台请求数据
        dataType: "json",
        data:data,
        type: "POST",
        success: function (msg) {
            console.log(msg);
            if(msg['flags']['flag'] == 1){
                changePage('done');
            }
        },
        error: function (msg) {
            console.log("error!");
            console.log(msg);
            alert("请求失败，请重试");
        }
    });
}

function checkInfoSave(){
    var data_col = [];
    var data_mod = [];
    for(var i in col_mod_flag){
        if(col_mod_flag[i] == 1){
            data_col.push(col_name[i]);
            data_mod.push(col_mod[i]);
        }
    }
    var data= {"s":s,"op":"save","query_ver":vercol_in,"data_col":data_col,"data_mod":data_mod};
    console.log("CheckInfoActionAjax");
    console.log(data);
    $.ajax({
        url: "../server/CheckInfoAction.php", //后台请求数据
        dataType: "json",
        data:data,
        type: "POST",
        success: function (msg) {
            console.log(msg);
            if(msg['flags']['flag'] == 1){
                showFloatTip('保存成功','success');
                col_val = [];
                for(var i in col_mod){
                    col_val.push(col_mod[i]);
                    col_mod_flag[i] = 0;
                    renderInfoPageIn('#info_in_'+i);
                }
            }else{
                showFloatTip('保存失败', 'error');
            }
        },
        error: function (msg) {
            console.log("error!");
            console.log(msg);
            alert("请求失败，请重试");
        }
    });
}

function showLinkFail(){
    $('#check_page_link_fail').show();
}

function hideLinkFail(){
    $('#check_page_link_fail').hide();
}

function showLinkVerify(){
    $('#check_page_link_verify').show();
}

function hideLinkVerify(){
    $('#check_page_link_verify').hide();
}

function wrongCodeTip(){
    $("#link_verify_input").css("border-color", "#ff392f");
    $("#link_verify_input").shake(2, 10, 400);
}

$('#link_verify_btn').click(function (){
    var code = $.trim($('#link_verify_input').val());
    if(code == ""){
        wrongCodeTip();
    }
    var data= {"s":s,"op":"verify","data":code};
    console.log("VerifyCheckInfoLinkAjax");
    console.log(data);
    $.ajax({
        url: "../server/VerifyCheckInfoLink.php", //后台请求数据
        dataType: "json",
        data:data,
        type: "POST",
        success: function (msg) {
            console.log(msg);
            if(msg['flags']['flag'] == 1){
                renderQueryVerify(msg['vercol']);
                changePage('query');
            }else{
                wrongCodeTip();
            }
        },
        error: function (msg) {
            console.log("error!");
            console.log(msg);
            alert("请求失败，请重试");
        }
    });
});

$('.info_check_save').click(function (){
    checkInfoVerify();
});

$('.info_check_ok').click(function (){
    checkInfoVerify();
});