/*
<div class="marquee_inline_body" style="display: none;">
    <img class="marquee_inline_img" src="images/ic_warning.png"/>
    <marquee class="marquee_inline_text">那么默认情况下，水平滚动的文字背景与文字同高、与浏览器窗口同宽，使用  width  和  height  参数调整其水平和垂直的范围。</marquee>
    <img class="marquee_inline_img" onclick="hideMarqueeInline()" src="images/ic_close.png"/>
</div>
 */

document.writeln('<div class="marquee_inline_body" id="marquee_inline_body" style="display: none;">\n' +
'        <img class="marquee_inline_img" id="marquee_inline_img" src="images/ic_warning.png"/>\n' +
'        <marquee class="marquee_inline_text" id="marquee_inline_text"></marquee>\n' +
'        <img class="marquee_inline_img" onclick="hideMarqueeInline()" src="images/ic_close.png"/>\n' +
    '</div>');

function showMarqueeInline(title, text, type){
    // default type: warning
    if(type == 'warning'){
        $('#marquee_inline_body').css('background','#ffde6f');
        $('#marquee_inline_img').attr('src','images/ic_warning.png');
    }
    $('#marquee_inline_text').text(title+': '+text);
    $('#marquee_inline_body').fadeIn();
}

function hideMarqueeInline(){
    $('#marquee_inline_body').fadeOut();
}
