/**
 * 滚动通知-自制
 */
var marqueeInterval;
window.onload = (function () {
    var content = $('#marquee1 .marquee_inline_content');
    var text = $('#marquee1 .marquee_inline_content .marquee_inline_text');
    var w_text = text.width();
    var w_content = content.width();
    var left = w_content - 30;
    clearInterval(marqueeInterval);
    marqueeInterval = setInterval(function () {
        left -= 1;
        if((-left) >= w_text) left = w_content - 30;
        text.css("left",left+'px');
    }, 20);
});


/**
 * 单选列表
 * @param id
 */
function mainSelectListToggleById(id) {
    var se_body = $('#'+id);
    var se_arrow = $('#'+id+' .main_select_arrow');
    var se_def = $('#'+id+' .main_select_default');
    var se_item_body = $('#'+id+' .main_select_item');
    var se_item = $('#'+id+' .main_select_item span');
    var show = se_body.attr('d');
    se_item_body.click(function (event) {
        event.stopPropagation();
    });
    if(show == undefined || show == '' || show == 'false'){
        // slide down
        se_body.attr('d', 'true');
        se_item_body.stop();
        se_body.css('border-radius', '10px 10px 0 0');
        se_item_body.css('z-index', '11');
        se_item_body.slideDown(200);
        se_arrow.addClass('main_select_arrow_down');
        se_item.each(function (index, elem) {
            $(elem).unbind('click');
            $(elem).click(function () {
                se_def.text($(this).text());
                mainSelectListToggleById(id);
            });
        });
    }else{
        // slide up
        se_body.attr('d', 'false');
        se_item_body.stop();
        se_item_body.slideUp(200);
        se_item_body.css('z-index', '10');
        se_body.css('border-radius', '10px');
        se_arrow.removeClass('main_select_arrow_down');
    }
}

function getMainSelectListSelectedById(id) {
    return  $('#'+id+' .main_select_default').text();
}

/**
 * 滑动开关
 */
function switcherToggle(){
    var sw = $('#switcher');
    var sw_bg = $('#switcher_bg');
    var sw_btn = $('#switcher_btn');
    var w = sw.width();
    var bg_end_w = w - 10;
    var btn_end_w = w - 20;
    if(sw.attr('ischecked') == 'false'){
        sw.attr('ischecked', 'true');
        sw_btn.animate({left:btn_end_w}, 200);
        sw_bg.animate({width:bg_end_w}, 200);
    }else{
        sw.attr('ischecked', 'false');
        sw_btn.animate({left:0}, 200);
        sw_bg.animate({width:0}, 200);
    }
}

/**
 * 滑动验证
 */
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


/**
 * 日历选取
 */
function mainCalendarToggleById(id) {
    var cal_body = $('#'+id);
    var cal_arrow = $('#'+id+' .main_calendar_arrow');
    var select_body = $('#'+id+' .main_calendar_select_body');

    var show = cal_body.attr('d');
    select_body.click(function (event) {
        event.stopPropagation();
    });

    if(show == undefined || show == '' || show == 'false'){
        cal_body.attr('d', 'true');
        var myDate = new Date();
        initMainCalendarById(id, myDate.getFullYear(), myDate.getMonth() + 1, myDate.getDate(), myDate.getDay());
        select_body.css('z-index', '11');
        select_body.slideDown(200);
        cal_arrow.addClass('main_select_arrow_down');
    }else{
        cal_body.attr('d', 'false');
        select_body.slideUp(200);
        select_body.css('z-index', '10');
        cal_arrow.removeClass('main_select_arrow_down');
    }
}

function initMainCalendarById(id, y, m, d, week) {
    var cal_val = $('#'+id+' .main_select_placeholder');
    var days = [31, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31, 31];
    var cur_days = [];
    var cur_y = y;
    var cur_m = m;
    var cur_d = d;
    var cur_w = week;

    var show_m = m > 9 ? m : '0' + m;
    var show_d = d > 9 ? d : '0' + d;
    cal_val.text(y+'-'+show_m+'-'+show_d);
    if((cur_y[0]+cur_y[1]+cur_y[2]+cur_y[3]) % 4 == 0){
        days[2] = 29;
    }
    if(cur_w == 0) cur_w = 7;
    if(cur_d > 7){
        while(cur_d > 7){
            cur_d -= 7;
        }
    }
    while(cur_d > 1){
        cur_d--;
        cur_w--;
        if(cur_w == 0) cur_w = 7;
    }
    for(var i = 1; i < cur_w; i++){
        var t = {"date":days[cur_m - 1]--,"cur":"0"};
        cur_days.unshift(t);
    }
    for(var i = 1; i <= days[cur_m]; i++){
        var t = {"date":i,"cur":"1"};
        cur_days.push(t);
    }
    for(var i = cur_w - 1 + days[cur_m], j = 1; i <= 42; i++){
        var t = {"date":j++,"cur":"0"};
        cur_days.push(t);
    }
    console.log(cur_days);
    console.log(cur_w);
    renderMainCalendarById(id, cur_days, y, m, d, week);
}

function renderMainCalendarById(id, cur_days, y, m, d, week) {
    var select_body = $('#'+id+' .main_calendar_select_body');
    var show_m = m > 9  ? m : '0' + m;
    var show_d = d > 9  ? d : '0' + d;

    select_body.html('');
    // render header
    select_body.append('<div class="main_calendar_select_header">\n' +
        '                <div class="main_calendar_pre_m" onclick="mainCalendarGetPreMonth(\''+id+'\')"></div>\n' +
        '                <div class="main_calendar_select_header_body" onclick="mainCalendarBackToday(\''+id+'\')">\n' +
        '                    <span class="main_calendar_select_header_body_title" y="'+y+'" m="'+m+'" d="'+d+'" w="'+week+'">'+y+'年'+show_m+'月'+show_d+'日</span>\n' +
        '                    <span style="font-size: 12px;color: #458CFE;">点此返回今天</span>\n' +
        '                </div>\n' +
        '                <div class="main_calendar_next_m" onclick="mainCalendarGetNextMonth(\''+id+'\')"></div>\n' +
        '            </div>\n' +
        '            <div class="main_calendar_select_title">\n' +
        '                <span>一</span>\n' +
        '                <span>二</span>\n' +
        '                <span>三</span>\n' +
        '                <span>四</span>\n' +
        '                <span>五</span>\n' +
        '                <span>六</span>\n' +
        '                <span>日</span>\n' +
        '            </div>');
    for(var i = 0; i < 42; i++){
        var line = '<div class="main_calendar_select_week">';
        while((i + 1) % 7 != 0){
            var date = cur_days[i]['date'];
            var w = (i + 1) % 7 == 0 ? 7 : (i + 1) % 7;
            if(cur_days[i]['cur'] == 0){
                line += '<span class="main_calendar_select_week_grey">'+date+'</span>';
            }else{
                if(date == d){
                    line += '<span class="main_calendar_select_week_active main_calendar_selected" y="'+y+'" m="'+m+'" d="'+date+'" w="'+w+'" onclick="onSelectMainCalendarDate(\''+id+'\',this)">'+date+'</span>';
                }else{
                    line += '<span class="main_calendar_select_week_active" y="'+y+'" m="'+m+'" d="'+date+'" w="'+w+'" onclick="onSelectMainCalendarDate(\''+id+'\',this)">'+date+'</span>';
                }
            }
            i++
        }
        var date = cur_days[i]['date'];
        var w = (i + 1) % 7 == 0 ? 7 : (i + 1) % 7;
        if(cur_days[i]['cur'] == 0){
            line += '<span class="main_calendar_select_week_grey">'+date+'</span>';
        }else{
            if(date == d){
                line += '<span class="main_calendar_select_week_active main_calendar_selected" y="'+y+'" m="'+m+'" d="'+date+'" w="'+w+'" onclick="onSelectMainCalendarDate(\''+id+'\',this)">'+date+'</span>';
            }else{
                line += '<span class="main_calendar_select_week_active" y="'+y+'" m="'+m+'" d="'+date+'" w="'+w+'" onclick="onSelectMainCalendarDate(\''+id+'\',this)">'+date+'</span>';
            }
        }
        line += '</div>';
        select_body.append(line);
    }
    select_body.append('<div class="main_btn_line" style="margin-top:10px;justify-content: flex-end;">\n' +
        '                <span class="dialog_btn_seco" onclick="mainCalendarBackToday(\''+id+'\');mainCalendarToggleById(\''+id+'\')">取消</span>\n' +
        '                <span class="dialog_btn_main" onclick="mainCalendarToggleById(\''+id+'\')">确定</span>\n' +
        '            </div>');
}

function mainCalendarBackToday(id) {
    var myDate = new Date();
    initMainCalendarById(id, myDate.getFullYear(), myDate.getMonth() + 1, myDate.getDate(), myDate.getDay());
}

function mainCalendarGetPreMonth(id) {
    var selected_span = $('#'+id+' .main_calendar_select_body .main_calendar_select_header .main_calendar_select_header_body .main_calendar_select_header_body_title');
    var to_y = selected_span.attr('y') - 0;
    var to_m = selected_span.attr('m') - 1;
    var to_d = selected_span.attr('d') - 0;
    var to_w = selected_span.attr('w') - 0;
    if(to_m < 1){
        to_m = 12;
        to_y -= 1;
    }
    //distance
    var days = [31, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31, 31];
    if((to_y[0]+to_y[1]+to_y[2]+to_y[3]) % 4 == 0){
        days[2] = 29;
    }
    var distance = days[to_m];
    console.log(distance);
    while(distance > 7){
        distance -= 7;
    }
    console.log(distance);
    while(distance > 0){
        distance--;
        to_w--;
        if(to_w == 0) to_w = 7;
    }
    initMainCalendarById(id, to_y, to_m, to_d, to_w);
}

function mainCalendarGetNextMonth(id) {
    var selected_span = $('#'+id+' .main_calendar_select_body .main_calendar_select_header .main_calendar_select_header_body .main_calendar_select_header_body_title');
    var to_y = selected_span.attr('y') - 0;
    var to_m = selected_span.attr('m') - 0 + 1;
    var to_d = selected_span.attr('d') - 0;
    var to_w = selected_span.attr('w') - 0;
    if(to_m > 12){
        to_m = 1;
        to_y += 1;
    }
    //distance
    var days = [31, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31, 31];
    if((to_y[0]+to_y[1]+to_y[2]+to_y[3]) % 4 == 0){
        days[2] = 29;
    }
    var distance = days[to_m - 1];
    console.log(distance);
    while(distance > 7){
        distance -= 7;
    }
    console.log(distance);
    while(distance > 0){
        distance--;
        to_w++;
        if(to_w == 8) to_w = 1;
    }
    initMainCalendarById(id, to_y, to_m, to_d, to_w);
}

function onSelectMainCalendarDate(id, obj) {
    var cal_val = $('#'+id+' .main_select_placeholder');
    var selected_span = $('#'+id+' .main_calendar_select_body .main_calendar_select_header .main_calendar_select_header_body .main_calendar_select_header_body_title');
    var y = $(obj).attr('y');
    var m = $(obj).attr('m');
    var d = $(obj).attr('d');
    var w = $(obj).attr('w');
    var show_m = m > 9 ? m : '0' + m;
    var show_d = d > 9 ? d : '0' + d;
    selected_span.attr('y', y);
    selected_span.attr('m', m);
    selected_span.attr('d', d);
    selected_span.attr('w', w);
    selected_span.text(y+'年'+show_m+'月'+show_d+'日');
    cal_val.text(y+'-'+show_m+'-'+show_d);
    clearMainCalendarSelected(id);
    $(obj).addClass('main_calendar_selected');
}

function clearMainCalendarSelected(id) {
    $('#'+id+' .main_calendar_select_body .main_calendar_select_week span').each(function (index, elem) {
        $(elem).removeClass('main_calendar_selected');
    });
}

function getMainCalendarSelectedById(id) {
    return $('#'+id+' .main_select_placeholder').text();
}

/**
 * 隐式搜索框
 */
function mainSearchShowById(id, w, search_fn) {
    var body = $('#'+id);
    var img = $('#'+id+' img');
    var input = $('#'+id+' input');
    body.attr('d', 'true');
    body.stop();
    body.animate({width:w+'px'}, 200);
    input.show();
    input.unbind('keyup');
    input.bind('keyup', function(e) {
        if (e.keyCode == "13") {
            //回车执行查询
            search_fn();
        }
    });
}

function mainSearchHideById(id) {
    var body = $('#'+id);
    var img = $('#'+id+' img');
    var input = $('#'+id+' input');
    if(input.val() == ''){
        body.attr('d', 'false');
        body.stop();
        input.unbind('keyup');
        input.hide();
        body.animate({width:'50px'}, 200);
    }
}

function mainSearchForceHideById(id) {
    var body = $('#'+id);
    var img = $('#'+id+' img');
    var input = $('#'+id+' input');
    input.val('');
    body.attr('d', 'false');
    body.stop();
    input.unbind('keyup');
    input.hide();
    body.animate({width:'50px'}, 200);
}

function getMainSearchKeyWordById(id) {
    return $('#'+id+' input').val();
}

function getMainSearchIsOpenById(id) {
    var body = $('#'+id);
    return body.attr('d');
}


/**
 * 分页
 * @param id            组件id
 * @param n_pages       总页数
 * @param cur           当前页数
 * @param visible_pages 分页导航显示的可见页数
 * @param p_fn          换页函数
 */
function initMainPagingById(id, n_pages, cur, visible_pages, p_fn){
    n_pages = Number(n_pages);
    cur = Number(cur);
    visible_pages = Number(visible_pages);
    var mid_min_ind = Math.ceil(visible_pages / 2);
    var pre = mid_min_ind - 1;
    var tale = visible_pages - mid_min_ind;
    var mid_max_ind = n_pages - tale;
    var body = $('#'+id);
    var html = '';
    var a = {"mid_min_ind":mid_min_ind,"pre":pre,"tale":tale,"mid_max_ind":mid_max_ind};
    console.log(a);
    if(cur <= mid_min_ind){
        for(var i = 1; i <= visible_pages && i <= n_pages; i++){
            if(i == cur){
                html += '<span class="main_paging_page main_paging_selected" p="'+i+'">'+i+'</span>';
            }else{
                html += '<span class="main_paging_page" p="'+i+'">'+i+'</span>';
            }
        }
        if(n_pages > visible_pages){
            html += '<span class="main_paging_tale" p="'+n_pages+'">...'+n_pages+'</span>';
        }
    }else if(cur > mid_min_ind && cur < mid_max_ind){
        html += '<span class="main_paging_head" p="1">1...</span>';
        var start = cur - pre;
        for(var i = start < 1 ? 1 : start; i <= cur + tale && i < n_pages; i++){
            if(i == cur){
                html += '<span class="main_paging_page main_paging_selected" p="'+i+'">'+i+'</span>';
            }else{
                html += '<span class="main_paging_page" p="'+i+'">'+i+'</span>';
            }
        }
        html += '<span class="main_paging_tale" p="'+n_pages+'">...'+n_pages+'</span>';
    }else{
        var start = n_pages - visible_pages;
        start = start < 0 ? 0 : start;
        console.log(start);
        for(var i = n_pages, j = 0; j < visible_pages && i > start; i--){
            if(i == cur){
                html = '<span class="main_paging_page main_paging_selected" p="'+i+'">'+i+'</span>' + html;
            }else{
                html = '<span class="main_paging_page" p="'+i+'">'+i+'</span>' + html;
            }
        }
        if(n_pages > visible_pages){
            html = '<span class="main_paging_head" p="1">1...</span>' + html;
        }
    }
    if(cur != 1){
        html = '<span class="main_paging_pre" p="'+(cur-1)+'">上一页</span>' + html;
    }
    if(cur != n_pages){
        html += '<span class="main_paging_next" p="'+(cur-0+1)+'">下一页</span>';
    }
    body.html(html);
    // bind event
    var page_btn = $('#'+id+' .main_paging_page');
    var pre_btn = $('#'+id+' .main_paging_pre');
    var next_btn = $('#'+id+' .main_paging_next');
    var head_btn = $('#'+id+' .main_paging_head');
    var tale_btn = $('#'+id+' .main_paging_tale');
    page_btn.each(function (index, elem){
        $(elem).unbind('click');
        $(elem).click(function (){
            var page = Number($(this).attr('p'));
            initMainPagingById(id, n_pages, page, visible_pages, p_fn);
            if(p_fn != undefined){
                p_fn(page);
            }
        });
    });
    pre_btn.unbind('click');
    pre_btn.click(function () {
        var page = Number($(this).attr('p'));
        page = page <= 0 ? 1 : page;
        initMainPagingById(id, n_pages, page, visible_pages, p_fn);
        if(p_fn != undefined){
            p_fn(page);
        }
    });
    next_btn.unbind('click');
    next_btn.click(function () {
        var page = Number($(this).attr('p'));
        page = page > n_pages ? n_pages : page;
        initMainPagingById(id, n_pages, page, visible_pages, p_fn);
        if(p_fn != undefined){
            p_fn(page);
        }
    });
    head_btn.unbind('click');
    head_btn.click(function () {
        initMainPagingById(id, n_pages, 1, visible_pages, p_fn);
        if(p_fn != undefined){
            p_fn(1);
        }
    });
    tale_btn.unbind('click');
    tale_btn.click(function () {
        initMainPagingById(id, n_pages, n_pages, visible_pages, p_fn);
        if(p_fn != undefined){
            p_fn(n_pages);
        }
    });
}