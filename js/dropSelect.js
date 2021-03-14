/**
 * 单选列表
 * @param id
 */
function mainSelectListToggleById(id, onse_fn) {
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
                if(onse_fn != undefined){
                    onse_fn();
                }
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

function setMainSelectListSelectedById(id, text) {
    $('#'+id+' .main_select_default').text(text);
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