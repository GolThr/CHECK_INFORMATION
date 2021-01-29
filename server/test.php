<?php
function getVerCode(){
    $tmp = ['0','1','2','3','4','5','6','7','8','9','0','1','2','3','4','5','6','7','8','9'];
    $code = "";
    for($i = 0; $i < 6; $i++){
        $code = $code . $tmp[rand(0, 19)];
    }
    return $code;
}

$type = $_POST["type"]; //email, verify

$verify_code = getVerCode();
session_start();

if($type == 'email'){
    // 存储 session 数据
    $_SESSION['verify_code'] = $verify_code;
    $jsonStr["verify_code"] = $verify_code;
    echo json_encode($jsonStr);
}else if($type == 'verify'){
    // 检索 session 数据
    $abc = $_SESSION['verify_code'];
    $jsonStr["verify_code"] = $abc;
    echo json_encode($jsonStr);
}
