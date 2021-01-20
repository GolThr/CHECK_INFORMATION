/*
<div class="float_tips_body" id="float_tip" style="display: none;">
    <img class="float_tip_img" src="images/ic_tips.png"/>
    <span class="float_tip_content">I have always believed that the man who has begun to live more seriously within begins to live more simply without. In an age of extravagance and waste, I wish I could show to the world how few the real wants of humanity are.</span>
</div>
 */

document.writeln('<div class="float_tips_body" id="float_tip" style="display: none;">\n' +
    '    <img class="float_tip_img" src="images/ic_tips.png"/>\n' +
    '    <span class="float_tip_content"></span>\n' +
    '</div>');

function showFloatTip(text, type){
    if(type == 'error'){
        $('.float_tips_body').css("background","#ffe4e4");
    }else{
        $('.float_tips_body').css("background","#f1f6fc");
    }

    $('.float_tip_content').text(text);
    $('#float_tip').fadeIn();
    setTimeout(function (){
        $('#float_tip').fadeOut();
    }, 3000);
}

function hideFloatTip(){
    $('#float_tip').fadeOut();
}
