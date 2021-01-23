var s = getQueryVariable('s');
var i_vercol = 0;

function init(){
    verifyLink();
}

function changePage(p){
    if(p == 'verify'){
        $('#check_page_verify').show();
        $('#check_page_query').hide();
        $('#check_page_info').hide();
    }else if(p == 'query'){
        $('#check_page_info').hide();
        $('#link_verify_step1').fadeOut(500,function (){
            $('#check_page_query').fadeIn();
        });
    }else if(p == 'info'){
        $('#check_page_verify').fadeOut(500, function (){
            $('#check_page_info').fadeIn();
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
        if($.inArray(h, vercol) == -1){
            $('#info_page_need').append('<div class="info_page_item">\n' +
                '                        <span class="info_page_subtitle">'+h+'</span>\n' +
                '                        <input class="main_input info_page_in" value="'+d+'"/>\n' +
                '                    </div>');
        }else{
            //is verify info
            $('#info_page_ok').append('<div class="info_page_item">\n' +
                '                        <span class="info_page_subtitle">'+h+'</span>\n' +
                '                        <input class="main_input info_page_in" value="'+d+'"/>\n' +
                '                    </div>');
        }
    }
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
    $('.link_avatar').attr("src", msg['avatar']);
    $('.link_user').text(msg['user_name']);
}

function queryLink(){
    var vercol_in = [];
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
        url: "server/VerifyCheckInfoLink.php", //后台请求数据
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
        url: "server/VerifyCheckInfoLink.php", //后台请求数据
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
        url: "server/VerifyCheckInfoLink.php", //后台请求数据
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