document.writeln(
    '<div class="picture_popup_back" id="picture_popup_back" style="display: none;">\n' +
    '   <img class="picture_popup_img">\n' +
    '   <span class="picture_popup_tips" style="display: none;">鼠标滚轮放大/缩小图片<br>再次点击关闭</span>\n' +
    '</div>'
);

function showPicturePopup(src) {
    var back = $('#picture_popup_back');
    var content = $('#picture_popup_back .picture_popup_img');
    var tips = $('#picture_popup_back .picture_popup_tips');
    content.attr('src',src);
    content.css('height', '80%');
    back.fadeIn('fast');
    content.fadeIn('fast');
    tips.fadeIn('fast');
    setTimeout(function () {
        tips.fadeOut('fast');
    }, 1000);
}

function hidePicturePopup(){
    var back = $('#picture_popup_back');
    var content = $('#picture_popup_back .picture_popup_img');
    content.hide();
    back.fadeOut('fast');
}

$("#picture_popup_back").click(function (){
    hidePicturePopup();
});

var scrollFunc = function (e) {
    var back = $('#picture_popup_back');
    var content = $('#picture_popup_back .picture_popup_img');
    var back_h = back.height();
    var cur_h = content.height();
    e = e || window.event;
    if (e.wheelDelta) { //第一步：先判断浏览器IE，谷歌滑轮事件
        if (e.wheelDelta > 0) { //当滑轮向下滚动时
            cur_h -= 20;
            if(cur_h <= 50){
                cur_h = 50;
            }
            content.css('height', cur_h+'px');
        }
        if (e.wheelDelta < 0) { //当滑轮向下上滚动时
            cur_h += 20;
            if(cur_h >= back_h){
                cur_h = back_h;
            }
            content.css('height', cur_h+'px');
        }
    } else if (e.detail) { //Firefox滑轮事件
        if (e.detail > 0) { //当滑轮向下滚动时
            cur_h -= 20;
            if(cur_h <= 50){
                cur_h = 50;
            }
            content.css('height', cur_h+'px');
        }
        if (e.detail < 0) { //当滑轮向上滚动时
            cur_h += 20;
            if(cur_h >= back_h){
                cur_h = back_h;
            }
            content.css('height', cur_h+'px');
        }
    }
}
//给页面绑定滑轮滚动事件
if (document.addEventListener) {//firefox
    document.addEventListener('DOMMouseScroll', scrollFunc, false);
}          //滚动滑轮触发scrollFunc方法 //ie 谷歌
window.onmousewheel = document.onmousewheel = scrollFunc;