function init(){
    var s = getQueryVariable('s');
    verifyLink(s);
}

function verifyLink(s){
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
            if(msg['flags']['flag'] == 1){
                hideLinkFail();
                showFloatTip('success', 'success');
            }else{
                showLinkFail();
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
    $('.check_page_link_fail').show();
}

function hideLinkFail(){
    $('.check_page_link_fail').hide();
}
