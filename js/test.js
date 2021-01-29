function getPosition() {
    if(navigator.geolocation){
        //navigator.geolocation.getCurrentPosition这个方法里面有三个参数
        //这个会在界面拉出一个消息框，让用户确认是否允许获取位置,不过pc端我试了都是err，
        //参1，成功后执行的函数
        //参2，失败时执行的函数
        //参3，选项配置，下面是在6000毫秒内结束请求
        navigator.geolocation.getCurrentPosition(
            function (position) {
                var latitude = position.coords.latitude;
                var longitude = position.coords.longitude;
                console.log("Latitude : " + latitude + " Longitude: " + longitude);
                console.log(position)
            },
            function (err) {
                console.log("您的浏览器不支持此项技术")
            },
            {timeout : 6000}
        )
    }
}

function AMapGetPosition(){
    var mapObj = new AMap.Map('iCenter');
    mapObj.plugin('AMap.Geolocation', function() {
        var geolocation = new AMap.Geolocation({
            // 是否使用高精度定位，默认：true
            enableHighAccuracy: true,
            // 设置定位超时时间，默认：无穷大
            timeout: 10000,
            // 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
            buttonOffset: new AMap.Pixel(10, 20),
            //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
            zoomToAccuracy: true,
            //  定位按钮的排放位置,  RB表示右下
            buttonPosition: 'RB'
        })

        geolocation.getCurrentPosition()
        AMap.event.addListener(geolocation, 'complete', onComplete)
        AMap.event.addListener(geolocation, 'error', onError)

        function onComplete (data) {
            // data是具体的定位信息
            console.log(data);
        }

        function onError (data) {
            // 定位出错
        }
    })
}


function getEmailVerify(){
    //ajax去服务器端校验
    var data= {"type":"email"};
    console.log(data);
    console.log("TestAjax1");
    $.ajax({
        url: "server/test.php", //后台请求数据
        dataType: "json",
        data:data,
        type: "POST",
        success: function (msg) {
            console.log(msg);
        },
        error: function (msg) {
            console.log("error!");
            console.log(msg);
            alert("请求失败，请重试");
        }
    });
}

function emailVerify(obj){
    var reg_email = $.trim($('#reg_email').val());
    //ajax去服务器端校验
    var data= {"type":"verify","email":reg_email};
    console.log(data);
    console.log("TestAjax2");
    $.ajax({
        url: "server/test.php", //后台请求数据
        dataType: "json",
        data:data,
        type: "POST",
        success: function (msg) {
            console.log(msg);
        },
        error: function (msg) {
            console.log("error!");
            console.log(msg);
            alert("请求失败，请重试");
        }
    });
}