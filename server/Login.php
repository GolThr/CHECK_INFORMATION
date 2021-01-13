<?php
include("dbconfig.php");

$account = $_POST["account"];
$pwd = $_POST["password"];

//flag -> 0:wrong pwd, 1:successful, -1:wrong query

for($i = 0; $i < 1; $i++){
    if($i == 0){
        $sql="SELECT * FROM s_userinfo WHERE email='$account'";
    }else{
        $sql="SELECT * FROM s_userinfo WHERE phone_number='$account'";
    }
    $obj=mysqli_query($link,$sql);
    if($obj){
        $arr=mysqli_fetch_array($obj,MYSQLI_ASSOC);
        if($arr){
            if($pwd == $arr['pwd']){
                $jsonStr = array('flag'=>'1', 'uuid'=>$arr['uuid'] ,'user_name'=>$arr['user_name'], 'email'=>$arr['email'], 'phone_number'=>$arr['phone_number'], 'gender'=>$arr['gender'], 'avatar'=>$arr['avatar'], 'reg_time'=>$arr['reg_time']);
                break;
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

echo json_encode($jsonStr);