<?php
include("dbconfig.php");

$op = $_POST["op"];
$uuid = $_POST["uuid"];
$code = $_POST["code"];

//flag -> 0:wrong, 1:successful
$user_flag = 0;
$alpha_flag = 0;
$jsonStr = array();

if($op == 'bind'){
    //check code
    $sql="SELECT * FROM s_alpha WHERE code='$code'";
    $obj=mysqli_query($link,$sql);
    if($obj){
        if($row = mysqli_fetch_array($obj,MYSQLI_ASSOC)){
            if($row['uuid'] == '0'){
                $sql = "UPDATE s_userinfo SET alpha_code='$code' WHERE uuid='$uuid'";
                $obj = mysqli_query($link, $sql);
                if($obj){
                    $user_flag = 1;
                }

                $used_time = date("Y-m-d H:i:s");

                $sql = "UPDATE s_alpha SET uuid='$uuid',used_time='$used_time' WHERE code='$code'";
                $obj = mysqli_query($link, $sql);
                if($obj){
                    $alpha_flag = 1;
                }

                $sql = "SELECT * FROM s_userinfo WHERE uuid='$uuid'";
                $obj = mysqli_query($link, $sql);
                if($obj){
                    if($row = mysqli_fetch_array($obj,MYSQLI_ASSOC)){
                        $flag = $user_flag && $alpha_flag;
                        $jsonStr = array('flag'=>$flag, 'uuid'=>$row['uuid'], 'user_name'=>$row['user_name'], 'email'=>$row['email'], 'phone_number'=>$row['phone_number'], 'gender'=>$row['gender'], 'avatar'=>$row['avatar'], 'reg_time'=>$row['reg_time'], 'alpha_code'=>$row['alpha_code']);
                    }
                }
            }else{
                $jsonStr = array('flag'=>'0');
            }
        }else{
            $jsonStr = array('flag'=>'0');
        }
    }
}else if($op == 'check'){
    //check code
    $sql="SELECT * FROM s_alpha WHERE uuid='$uuid'";
    $obj=mysqli_query($link,$sql);
    if($obj){
        if($row = mysqli_fetch_array($obj,MYSQLI_ASSOC)){
            $jsonStr = array('flag'=>'1');
        }else{
            $jsonStr = array('flag'=>'0');
        }
    }

}

echo json_encode($jsonStr);
