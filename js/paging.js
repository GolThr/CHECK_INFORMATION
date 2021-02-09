
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