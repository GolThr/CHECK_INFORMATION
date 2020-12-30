document.writeln("<div class=\"header_main\">\n" +
    "        <div class=\"header_top_content\">\n" +
    "            <img class=\"logo_main\" src=\"images/logo_white.png\" onclick=\"location.href='home.html'\"/>\n" +
    "            <div class=\"header_right\">\n" +
    "\n" +
    "                <div class=\"header_right_location\" onmouseover=\"showChangeCityDialog();\" onmouseleave=\"hideChangeCityDialog();\">\n" +
    "                    <img src=\"images/ic_location.png\" onclick=\"\" style=\"width: 20px;height: 20px;margin-left: 10px;\"/>\n" +
    "                    <span class=\"change_city\">济南市</span>\n" +
    "                    <div class=\"header_change_city_float\" style=\"display: none;\">\n" +
    "                        <ul>\n" +
    "                            <li id=\"jinan\" onclick=\"onLocationClicked(this)\">济南市</li>\n" +
    "                            <li id=\"rizhao\" onclick=\"onLocationClicked(this)\">日照市</li>\n" +
    "                            <li id=\"qingdao\" onclick=\"onLocationClicked(this)\">青岛市</li>\n" +
    "                            <li id=\"weihai\" onclick=\"onLocationClicked(this)\">威海市</li>\n" +
    "                            <li id=\"liaocheng\" onclick=\"onLocationClicked(this)\">聊城市</li>\n" +
    "                        </ul>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"no_login_body\">\n" +
    "                    <span class=\"go_login\" onclick=\"location.href='login.html'\">登录</span>\n" +
    "                    <span class=\"go_register\" onclick=\"location.href='register.html'\">注册</span>\n" +
    "                </div>\n" +
    "                <div class=\"user_body\" style=\"display: none;\">\n" +
    "                    <img class=\"user_head\" src=\"images/ic_head_default.png\" style=\"border-radius: 50%;width: 30px;height: 30px;\"/>\n" +
    "                    <span class=\"user_name\">心志愿</span>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"header_bottom_content\" style=\"position: relative\">\n" +
    "            <ol>\n" +
    "                <li class=\"index_page\" onclick=\"location.href='home.html'\">首页</li>\n" +
    "                <li class=\"activity_page\" onmouseover=\"showNavActivityDialog();\" onmouseleave=\"hideNavActivityDialog();\" onclick=\"location.href='activity.php'\">活动</li>\n" +
    "                <li class=\"group_page\" onmouseover=\"showNavGroupDialog();\" onmouseleave=\"hideNavGroupDialog();\" onclick=\"location.href='group.html'\">社区</li>\n" +
    "                <li class=\"news_page\" onmouseover=\"showNavNewsDialog();\" onmouseleave=\"hideNavNewsDialog();\" onclick=\"location.href='news.php'\">资讯</li>\n" +
    "                <li class=\"organization_page\" onclick=\"location.href='organization.html'\">组织团体</li>\n" +
    "                <li class=\"help_page\" onclick=\"location.href='help.html'\">帮助中心</li>\n" +
    "            </ol>\n" +
    "            <div class=\"header_nav_activity\" style=\"display: none;\" onmouseover=\"showNavActivityDialog();\" onmouseleave=\"hideNavActivityDialog();\">\n" +
    "                <ul>\n" +
    "                    <li id=\"header_1_1\" onclick=\"location.href='activity.php?type=生态保护'\">生态保护</li>\n" +
    "                    <li id=\"header_1_2\" onclick=\"location.href='activity.php?type=文化/艺术'\">文化/艺术</li>\n" +
    "                    <li id=\"header_1_3\" onclick=\"location.href='activity.php?type=动物保护'\">动物保护</li>\n" +
    "                    <li id=\"header_1_4\" onclick=\"location.href='activity.php?type=儿童关怀'\">儿童关怀</li>\n" +
    "                    <li id=\"header_1_5\" onclick=\"location.href='activity.php?type=支教助学'\">支教助学</li>\n" +
    "                    <li id=\"header_1_6\" onclick=\"location.href='activity.php?type=扶老助残'\">扶老助残</li>\n" +
    "                    <li id=\"header_1_7\" onclick=\"location.href='activity.php?type=其它'\">其它</li>\n" +
    "                </ul>\n" +
    "            </div>\n" +
    "            <div class=\"header_nav_group\" style=\"display: none;\" onmouseover=\"showNavGroupDialog();\" onmouseleave=\"hideNavGroupDialog();\">\n" +
    "                <ul>\n" +
    "                    <li id=\"header_2_1\" onclick=\"location.href='group.html?type=生态保护'\">生态保护</li>\n" +
    "                    <li id=\"header_2_2\" onclick=\"location.href='group.html?type=文化/艺术'\">文化/艺术</li>\n" +
    "                    <li id=\"header_2_3\" onclick=\"location.href='group.html?type=动物保护'\">动物保护</li>\n" +
    "                    <li id=\"header_2_4\" onclick=\"location.href='group.html?type=儿童关怀'\">儿童关怀</li>\n" +
    "                    <li id=\"header_2_5\" onclick=\"location.href='group.html?type=支教助学'\">支教助学</li>\n" +
    "                    <li id=\"header_2_6\" onclick=\"location.href='group.html?type=扶老助残'\">扶老助残</li>\n" +
    "                    <li id=\"header_2_7\" onclick=\"location.href='group.html?type=其它'\">其它</li>\n" +
    "                </ul>\n" +
    "            </div>\n" +
    "            <div class=\"header_nav_news\" style=\"display: none;\" onmouseover=\"showNavNewsDialog();\" onmouseleave=\"hideNavNewsDialog();\">\n" +
    "                <ul>\n" +
    "                    <li id=\"header_3_1\">视频</li>\n" +
    "                    <li id=\"header_3_2\">新闻</li>\n" +
    "                </ul>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"header_fixed\" style=\"display: none\"></div>");



$(document).ready(function () {
    var topH=$(".header_top_content").height();//获取头部高度，top指导航栏上面的部分
    var navbg=$(".header_main");//获取导航栏对象
    var headerTop = $(".header_top_content");
    var headerFixed = $(".header_fixed");
    $(window).scroll(function () {
        if($(window).scrollTop()>topH){//对比滚动的距离与导航栏上面部分的高度大小来动态添加css样式
            navbg.addClass("scrollNav");//对导航栏添加样式
            headerTop.hide();
            headerFixed.show();
        }else{
            navbg.removeClass("scrollNav")//去掉导航栏添加的样式
            headerTop.show();
            headerFixed.hide();
        }
    });
});

function showChangeCityDialog() {
    $(".header_change_city_float").stop();
    $(".header_right_location").addClass("header_right_item_hover");
    $(".header_change_city_float").slideDown(500);
}

function hideChangeCityDialog(){
    $(".header_change_city_float").stop();
    $(".header_right_location").removeClass("header_right_item_hover");
    $(".header_change_city_float").slideUp(500);
}

function showNavActivityDialog() {
    $(".header_nav_activity").stop();
    $(".activity_page").addClass("header_right_item_hover");
    $(".header_nav_activity").slideDown(500);
}

function hideNavActivityDialog() {
    $(".header_nav_activity").stop();
    $(".activity_page").removeClass("header_right_item_hover");
    $(".header_nav_activity").slideUp(500);
}

function showNavGroupDialog() {
    $(".header_nav_group").stop();
    $(".group_page").addClass("header_right_item_hover");
    $(".header_nav_group").slideDown(500);
}

function hideNavGroupDialog() {
    $(".header_nav_group").stop();
    $(".group_page").removeClass("header_right_item_hover");
    $(".header_nav_group").slideUp(500);
}

function showNavNewsDialog() {
    $(".header_nav_news").stop();
    $(".news_page").addClass("header_right_item_hover");
    $(".header_nav_news").slideDown(500);
}

function hideNavNewsDialog() {
    $(".header_nav_news").stop();
    $(".news_page").removeClass("header_right_item_hover");
    $(".header_nav_news").slideUp(500);
}

var user_info;
function initUser() {
    user_info = JSON.parse(localStorage.getItem("user_info"));
    console.log(user_info);
    if(user_info == null || user_info.a != "1"){
        $(".no_login_body").show();
        $(".user_body").hide();
    }else{
        if(user_info.b == '1'){
            $(".no_login_body").hide();
            $(".user_body").show();
            $(".user_head").attr("src", 'picture/'+user_info.user_avatar);
            $(".user_name").text(user_info.nickname);
            $(".change_city").text(user_info.city);
        }else {
            $(".no_login_body").hide();
            $(".user_body").show();
            $(".user_head").attr("src", 'picture/'+user_info.org_avatar);
            $(".user_name").text(user_info.org_name);
        }
    }
}

$(".user_body").click(function (e) {
    if(user_info.b == '1'){
        location.href = 'mine.html';
    }else {
        location.href = 'mine_organization.html';
    }
});

var currentLocation = '济南';
function onLocationClicked(obj) {
    $('.change_city').text($(obj).html());
    currentLocation = $(obj).html().substring(0,2);
    $(".header_change_city_float").hide();
    getActivity(currentLocation);
}