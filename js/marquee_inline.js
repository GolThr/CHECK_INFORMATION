/*
<div class="marquee_inline_body" style="display: none;">
    <img class="marquee_inline_img" src="images/ic_warning.png"/>
    <marquee class="marquee_inline_text">那么默认情况下，水平滚动的文字背景与文字同高、与浏览器窗口同宽，使用  width  和  height  参数调整其水平和垂直的范围。</marquee>
    <img class="marquee_inline_img" onclick="hideMarqueeInline()" src="images/ic_close.png"/>
</div>
 */

document.writeln(
    '<div class="marquee_inline_body" id="marquee" style="display: none;">\n' +
    '    <img class="marquee_inline_img" src="images/ic_warning.png"/>\n' +
    '    <div class="marquee_inline_content">\n' +
    '        <span class="marquee_inline_text"></span>\n' +
    '    </div>\n' +
    '    <img class="marquee_inline_img" onclick="hideMarqueeInline()" src="images/ic_close.png"/>\n' +
    '</div>'
);

var marqueeInterval;

function startMarqueeInline() {
    var content = $('#marquee .marquee_inline_content');
    var text = $('#marquee .marquee_inline_content .marquee_inline_text');
    var w_text = text.width();
    var w_content = content.width();
    console.log('start---marquee '+w_text+' : '+w_content);
    var left = w_content - 30;
    clearInterval(marqueeInterval);
    marqueeInterval = setInterval(function () {
        left -= 1;
        if((-left) >= w_text) left = w_content - 30;
        text.css("left",left+'px');
    }, 20);
}

function stopMarqueeInline() {
    clearInterval(marqueeInterval);
}

function showMarqueeInline(title, text, type){
    var body = $('#marquee');
    var img =$('#marquee .marquee_inline_img:nth-child(1)');
    var content = $('#marquee .marquee_inline_content .marquee_inline_text');
    // default type: warning
    if(type == 'warning'){
        body.css('background','#ffde6f');
        img.attr('src','images/ic_warning.png');
    }else{
        body.css('background','#ffa9ab');
        img.attr('src','images/ic_serious.png');
    }
    content.text(title+': '+text);
    body.fadeIn();
    startMarqueeInline();
}

function changeMarqueeInlineText(title, text, type) {
    var body = $('#marquee');
    var img =$('#marquee .marquee_inline_img:nth-child(1)');
    var content = $('#marquee .marquee_inline_content .marquee_inline_text');
    // default type: warning
    if(type == 'warning'){
        body.css('background','#ffde6f');
        img.attr('src','images/ic_warning.png');
    }else{
        body.css('background','#ffa9ab');
        img.attr('src','images/ic_serious.png');
    }
    content.text(title+': '+text);
    startMarqueeInline();
}

function hideMarqueeInline(){
    stopMarqueeInline();
    $('#marquee').fadeOut();
}
