<?php
include("dbconfig.php");
include("getUuid.php");

function updateLoginInfo($link, $log_id, $uuid, $ip, $loc, $method, $platform){
    // 检查登录记录，最多记录10条信息
    $res = array();
    $sql = "SELECT * FROM s_login WHERE uuid='$uuid' ORDER BY time DESC";
    $obj=mysqli_query($link,$sql);
    if($obj) {
        while($row = mysqli_fetch_array($obj, MYSQLI_ASSOC)) {
            $tmp = array();
            $tmp['log_id'] = $row['log_id'];
            $tmp['uuid'] = $row['uuid'];
            $tmp['ip'] = $row['ip'];
            $tmp['loc'] = $row['loc'];
            $tmp['method'] = $row['method'];
            $tmp['platform'] = $row['platform'];
            $tmp['time'] = $row['time'];
            $res[] = $tmp;
        }
    }
    $res_len = count($res);
    // 取上次登录记录，并与当前记录作对比
    if($res_len > 0){
        $security = 0;
        $last_ip = $res[0]['ip'];
        $last_loc = $res[0]['loc'];
        if($last_ip == $ip && $last_loc == $loc){
            $security = 1;
        }
        if($res_len >= 10){
            // 删除多余的记录，仅保留9条记录
            for($i = 9; $i < $res_len; $i++){
                $del_log_id = $res[$i]['log_id'];
                $sql = "DELETE FROM s_login WHERE log_id='$del_log_id'";
                mysqli_query($link,$sql);
            }
        }
    }else{
        $security = 1;
    }
    // 添加最新一条记录
    $sql = "INSERT INTO s_login (log_id,uuid,ip,loc,method,platform) VALUES ('$log_id','$uuid','$ip','$loc','$method','$platform')";
    mysqli_query($link, $sql);
    return $security;
}

$action = $_POST["action"];
$account = $_POST["account"];
$pwd = $_POST["password"];
$ip = $_POST["ip"];
$loc = $_POST["loc"];

$jsonStr = array();
if($action == 'login'){
    //flag -> 0:wrong pwd, 1:successful, -1:wrong query, 2:need verify twice, 3:need verify location
    //security -> 0: danger, 1: safe
    $method = '';
    for($i = 0; $i < 1; $i++){
        if($i == 0){
            $sql="SELECT * FROM s_userinfo WHERE email='$account'";
            $method = '邮箱';
        }else{
            $sql="SELECT * FROM s_userinfo WHERE phone_number='$account'";
            $method = '手机';
        }
        $obj=mysqli_query($link,$sql);
        if($obj){
            $arr=mysqli_fetch_array($obj,MYSQLI_ASSOC);
            if($arr){
                if($pwd == $arr['pwd']){
                    // check user settings
                    $uuid = $arr['uuid'];
                    $twice_verify = '';
                    $loc_verify = '';
                    $sql_check="SELECT twice_verify,loc_verify FROM s_settings WHERE uuid='$uuid'";
                    $obj1=mysqli_query($link,$sql_check);
                    if($obj1){
                        if($row=mysqli_fetch_array($obj1,MYSQLI_ASSOC)){
                            $twice_verify = $row['twice_verify'];
                            $loc_verify = $row['loc_verify'];
                        }
                    }
                    $login_ip = '';
                    $login_loc = '';
                    $sql_check = "SELECT * FROM s_login WHERE uuid='$uuid' ORDER BY time DESC";
                    $obj1=mysqli_query($link,$sql_check);
                    if($obj1) {
                        if($row = mysqli_fetch_array($obj1, MYSQLI_ASSOC)) {
                            $login_ip = $row['ip'];
                            $login_loc = $row['loc'];
                        }
                    }
                    if($twice_verify == 'on'){
                        $jsonStr = array('flag'=>'2', 'email'=>$arr['email'], 'phone_number'=>$arr['phone_number']);
                    }else if($loc_verify == 'on'){
                        if($ip == $login_ip && $loc == $login_loc){
                            $security = updateLoginInfo($link, getNewUniqid(), $uuid, $ip, $loc, $method, '网页端');
                            $jsonStr = array('flag'=>'1', 'security' => $security, 'uuid'=>$uuid, 'user_name'=>$arr['user_name'], 'email'=>$arr['email'], 'phone_number'=>$arr['phone_number'], 'gender'=>$arr['gender'], 'avatar'=>$arr['avatar'], 'reg_time'=>$arr['reg_time'], 'alpha_code'=>$arr['alpha_code']);
                        }else{
                            $jsonStr = array('flag'=>'3', 'email'=>$arr['email'], 'phone_number'=>$arr['phone_number']);
                        }
                    }else{
                        // off off
                        $security = updateLoginInfo($link, getNewUniqid(), $uuid, $ip, $loc, $method, '网页端');
                        $jsonStr = array('flag'=>'1', 'security' => $security, 'uuid'=>$uuid, 'user_name'=>$arr['user_name'], 'email'=>$arr['email'], 'phone_number'=>$arr['phone_number'], 'gender'=>$arr['gender'], 'avatar'=>$arr['avatar'], 'reg_time'=>$arr['reg_time'], 'alpha_code'=>$arr['alpha_code']);
                    }
                }else{
                    $jsonStr = array('flag'=>'0');
                }
            }else{
                $jsonStr = array('flag'=>'-1');
            }
        }else{
            $jsonStr = array('flag'=>'-1');
        }
    }
}else if($action == 'get'){
    $verify_code_input = strtoupper($_POST["code_input"]);
    $cur_time = time();
    $flag = 0;
    session_start();
    // 检索 session 数据
    $verify_code_session = $_SESSION['verify_code'];
    $verify_time_session = $_SESSION['verify_time'];

    if($cur_time - $verify_time_session < 60){
        if($verify_code_input == $verify_code_session){
            $flag = 1;
        }
    }

    if($flag = 1){
        $flag = 0;
        //flag -> 0:wrong pwd, 1:successful, -1:wrong query
        //security -> 0: danger, 1: safe
        $method = '';
        for($i = 0; $i < 1; $i++){
            if($i == 0){
                $sql="SELECT * FROM s_userinfo WHERE email='$account'";
                $method = '邮箱';
            }else{
                $sql="SELECT * FROM s_userinfo WHERE phone_number='$account'";
                $method = '手机';
            }
            $obj=mysqli_query($link,$sql);
            if($obj){
                $arr=mysqli_fetch_array($obj,MYSQLI_ASSOC);
                if($arr){
                    if($pwd == $arr['pwd']){
                        $uuid = $arr['uuid'];
                        $security = updateLoginInfo($link, getNewUniqid(), $uuid, $ip, $loc, $method, '网页端');
                        $jsonStr = array('flag'=>'1', 'security' => $security, 'uuid'=>$uuid, 'user_name'=>$arr['user_name'], 'email'=>$arr['email'], 'phone_number'=>$arr['phone_number'], 'gender'=>$arr['gender'], 'avatar'=>$arr['avatar'], 'reg_time'=>$arr['reg_time']);
                    }else{
                        $jsonStr = array('flag'=>'0');
                    }
                }else{
                    $jsonStr = array('flag'=>'-1');
                }
            }else{
                $jsonStr = array('flag'=>'-1');
            }
        }
    }
}

echo json_encode($jsonStr);