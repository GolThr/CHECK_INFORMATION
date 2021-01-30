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