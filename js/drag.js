/*
<div class="drag_content" id="drag" style="display: none;">
    <div class="drag_bg"></div>
    <div class="drag_text" onselectstart="return false;">请拖动滑块验证</div>
    <div class="drag_btn">
        <div class="drag_btn_flag"></div>
    </div>
</div>
 */

document.writeln('<div class="drag_content" id="drag" style="display: none;">\n' +
    '    <div class="drag_bg"></div>\n' +
    '    <div class="drag_text" onselectstart="return false;">请拖动滑块验证</div>\n' +
    '    <div class="drag_btn">\n' +
    '        <div class="drag_btn_flag"></div>\n' +
    '    </div>\n' +
    '</div>');

function showDragBlock(){
    clearDrag();
    $('#drag').fadeIn();
    bindDragBtnDown();
}

//一、定义一个获取DOM元素的方法
var mDom = function(selector){
        return  document.querySelector(selector);
    },
    box = mDom(".drag_content"),//容器
    bg = mDom(".drag_bg"),//背景
    text = mDom(".drag_text"),//文字
    btn = mDom(".drag_btn"),//滑块
    btn_flag = mDom(".drag_btn_flag"),//滑块标志
    drag_success = false;//是否通过验证的标志

//二、给滑块注册鼠标按下事件
function bindDragBtnDown(){
    btn.onmousedown = function (e){
        var distance = box.offsetWidth - btn.offsetWidth;//滑动成功的宽度（距离）
        //1.鼠标按下之前必须清除掉后面设置的过渡属性
        btn.style.transition = "";
        bg.style.transition ="";
        //说明：clientX 事件属性会返回当事件被触发时，鼠标指针向对于浏览器页面(或客户区)的水平坐标。
        //2.当滑块位于初始位置时，得到鼠标按下时的水平位置
        var e = e || window.event;
        var downX = e.clientX;
        //三、给文档注册鼠标移动事件
        document.onmousemove = function(e){
            var e = e || window.event;
            //1.获取鼠标移动后的水平位置
            var moveX = e.clientX;
            //2.得到鼠标水平位置的偏移量（鼠标移动时的位置 - 鼠标按下时的位置）
            var offsetX = moveX - downX;
            //3.在这里判断一下：鼠标水平移动的距离 与 滑动成功的距离 之间的关系
            if( offsetX > distance){
                offsetX = distance;//如果滑过了终点，就将它停留在终点位置
            }else if( offsetX < 0){
                offsetX = 0;//如果滑到了起点的左侧，就将它重置为起点位置
            }
            //4.根据鼠标移动的距离来动态设置滑块的偏移量和背景颜色的宽度
            btn.style.left = offsetX + "px";
            bg.style.width = 20 + offsetX + "px";
            //如果鼠标的水平移动距离 = 滑动成功的宽度
            if (offsetX == distance) {
                //1.设置滑动成功后的样式
                text.innerHTML = "验证通过";
                text.style.color = "#fff";
                // btn.innerHTML = "&radic;";
                btn_flag.style.borderColor = "#4baf4c";
                bg.style.backgroundColor = "#458CFE";
                //2.设置滑动成功后的状态
                drag_success = true;
                //成功后，清除掉鼠标按下事件和移动事件（因为移动时并不会涉及到鼠标松开事件）
                btn.onmousedown = null;
                document.onmousemove = null;
                //3.成功解锁后的回调函数
                // setTimeout(function(){
                //     alert('解锁成功！');
                // },100);
            }
        }
        //四、给文档注册鼠标松开事件
        document.onmouseup = function(e){
            //如果鼠标松开时，滑到了终点，则验证通过
            if(drag_success){
                return;
            }else{
                //反之，则将滑块复位（设置了1s的属性过渡效果）
                btn.style.left = 0;
                bg.style.width = 20 + "px";
                btn.style.transition = "left 1s ease";
                bg.style.transition = "width 1s ease";
            }
            //只要鼠标松开了，说明此时不需要拖动滑块了，那么就清除鼠标移动和松开事件。
            document.onmousemove = null;
            document.onmouseup = null;
        }
    }
}

function clearDrag() {
    drag_success = false;
    text.innerHTML = "请拖动滑块验证";
    text.style.color = "#757476";
    btn_flag.style.borderColor = "#458CFE";
    bg.style.backgroundColor = "#458CFE";
    btn.style.left = 0;
    bg.style.width = 20 + "px";
    btn.style.transition = "left 1s ease";
    bg.style.transition = "width 1s ease";
    bindDragBtnDown();
}
