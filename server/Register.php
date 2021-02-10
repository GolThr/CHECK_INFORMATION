<?php
include("dbconfig.php");
include("getUuid.php");
include("common.php");

$type = $_POST["type"]; //type: email, phone
$acc = $_POST["acc"];
$pwd = $_POST["pwd"];

//gender: 0f, 1m, 2none
$gender = 2;
$uuid = getNewUuid();
$avatar = 'avatar/head_default.png';

$flag = 0;

if($type == "email"){
    $email = $_POST["email"];
    if($acc == '' || isValidLength($acc, 1, 20) || isValidReg($acc)){
        $flag = 2;
    }else if($pwd == '' || !checkPasswordStrength($pwd) || isValidLength($pwd, 6, 20)){
        $flag = 3;
    }else if($email == '' || !isEmailStr($email)){
        $flag = 4;
    }else{
        $phone = 'none';
        //register by email
        $sql = "INSERT INTO s_userinfo (uuid,user_name,email,phone_number,pwd,gender,avatar) VALUES ('$uuid','$acc','$email','$phone','$pwd','$gender','$avatar')";
        $obj = mysqli_query($link, $sql);
        if($obj){
            $flag = 1;
        }
    }
}else if($type == "phone"){
    $phone = $_POST["phone"];
    $email = 'none';
    //register by phone
    $sql = "INSERT INTO s_userinfo (uuid,user_name,email,phone_number,pwd,gender,avatar) VALUES ('$uuid','$acc','$email','$phone','$pwd','$gender','$avatar')";
    $obj = mysqli_query($link, $sql);
    if($obj){
        $flag = 1;
    }
}

if($flag == 1){
    // send message
    $msg_id = getNewUuid();
    $title = '欢迎使用查客核对平台';
    $text = "欢迎使用查客核对平台";
    $sql = "INSERT INTO s_messages (uuid,msg_id,msg_title,msg_text,isread) VALUES ('$uuid','$msg_id','$title','$text','0')";
    $obj = mysqli_query($link, $sql);
}

$jsonStr = array("flag" => $flag);
echo json_encode($jsonStr);