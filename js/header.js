document.writeln('<div class="main_head">\n' +
    '            <span class="head_title main_title">管理信息</span>\n' +
    '            <div class="head_right">\n' +
    '                <span class="user_name">Manager</span>\n' +
    '                <img class="user_avatar" src="images/head_default.png" alt="avatar">\n' +
    '            </div>\n' +
    '        </div>');


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