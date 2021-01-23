/*
<div class="float_tips_body" id="float_tip" style="display: none;">
    <div class="float_tips_item" id="float_tip_item_1" style="background: #f1f6fc;display: none;">
        <img class="float_tip_img" src="images/ic_tips.png"/>
        <span class="float_tip_content"></span>
    </div>
</div>
 */

document.writeln('<div class="float_tips_body" id="float_tip_body" style="display: none;"></div>');

// function showFloatTip(text, type){
//     if(type == 'error'){
//         $('.float_tips_body').css("background","#ffe4e4");
//     }else{
//         $('.float_tips_body').css("background","#f1f6fc");
//     }
//
//     $('.float_tip_content').text(text);
//     $('#float_tip').fadeIn();
//     setTimeout(function (){
//         $('#float_tip').fadeOut();
//     }, 3000);
// }

var FloatTipShowID = 0;
var FloatTipHideID = 0;
var FLoatTipInterval;

function showFloatTip(text, type){
    if(FloatTipHideID == FloatTipShowID){
        $('#float_tip_body').show();
    }
    var c;
    if(type == 'error'){
        c = "#ffe4e4";
    }else{
        c = "#f1f6fc";
    }
    FloatTipShowID++;
    $('#float_tip_body').append('<div class="float_tips_item" id="float_tip_item_'+FloatTipShowID+'" style="background: '+c+';display: none;">\n' +
        '        <img class="float_tip_img" src="images/ic_tips.png"/>\n' +
        '        <span class="float_tip_content">'+text+'</span>\n' +
        '    </div>');

    $('#float_tip_item_'+FloatTipShowID).fadeIn();
    clearInterval(FLoatTipInterval);
    FLoatTipInterval = setInterval(function (){
        //hideFloatTip
        if(FloatTipHideID != FloatTipShowID){
            FloatTipHideID++;
            $('#float_tip_item_'+FloatTipHideID).animate({opacity:'0', height:'hide'},500, function () {
                $('#float_tip_item_'+FloatTipHideID).remove();
            });
            if(FloatTipHideID == FloatTipShowID){
                clearInterval(FLoatTipInterval);
                $('#float_tip_body').fadeOut();
            }
        }
    }, 3000);
}

function hideFloatTip(){

}
