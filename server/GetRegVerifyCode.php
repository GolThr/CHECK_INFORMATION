<?php
include("dbconfig.php");
include("sendEmail.php");

$type = $_POST["type"]; //verify, email, phone, bind_email, bind_phone, get_email_code, get_phone_code

function getVerCode(){
    $tmp = ['0','1','2','3','4','5','6','7','8','9','0','1','2','3','4','5','6','7','8','9'];
    $code = "";
    for($i = 0; $i < 6; $i++){
        $code = $code . $tmp[rand(0, 19)];
    }
    return $code;
}

$verify_code = getVerCode();
$text = '<style type="text/css">
    .email_send_body{
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-top: 20px;
    }
    .email_body{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 800px;
        border-radius: 10px;
        box-shadow: 2px 2px 5px 5px #F2F2F2;
    }
    .email_header{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        border-radius: 10px 10px 0 0;
        width: 100%;
        height: 100px;
        background: #458CFE;
    }
    .email_logo{
        width: auto;
        height: 40px;
        margin-left: 50px;
    }
    .email_content{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 700px;
        margin-top: 30px;
    }
    .email_title{
        font-size: 16px;
        color: #000;
        font-weight: bold;
        width: 100%;
        text-align: left;
    }
    .email_text{
        font-size: 16px;
        color: #000;
        width: 100%;
        text-align: left;
        margin-top: 10px;
    }
    .email_verify_code{
        font-size: 40px;
        color: #458CFE;
        width: 100%;
        text-align: center;
        margin: 20px;
    }
    .email_footer{
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        justify-content: center;
        width: 700px;
        margin-bottom: 50px;
    }
    .email_footer .email_text{
        text-align: right;
    }
</style>
<div class="email_send_body">
    <div class="email_body">
        <div class="email_header">
            <img class="email_logo" src="https://golthr.gitee.io/outer/check_logo.png"/>
        </div>
        <div class="email_content">
            <span class="email_title">尊敬的用户，您好！</span>
            <span class="email_text">欢迎注册使用查客账号！您的验证码为：</span>
            <span class="email_verify_code">'.$verify_code.'</span>
            <span class="email_text">验证码在1分钟内有效，请及时使用。</span>
        </div>
        <div class="email_footer">
            <span class="email_text">查客账号中心</span>
            <span class="email_text">'.date("Y年m月d日").'</span>
        </div>
    </div>
</div>';
$alt_message = '[查客账号中心] 尊敬的用户，您好！欢迎注册查客账号！您的验证码为：【'.$verify_code.'】';

session_start();
if($type == 'email'){
    $to = $_POST["email"];
    $flag = 0;  // 0: error, 1: success, -1: duplicate
    // check email
    $sql = "SELECT COUNT(*) AS cnt FROM s_userinfo WHERE email='$to'";
    $obj = mysqli_query($link, $sql);
    if($obj){
        $cnt_row = mysqli_fetch_array($obj,MYSQLI_ASSOC);
        if($cnt_row){
            if($cnt_row["cnt"] != 1){
                $flag = 1;
            }else{
                $flag = -1;
            }
        }
    }
    if($flag == 1){
        // send email
        $subject = '查客账号中心';
        $message = $text;
        $flag = sendEmail($to,$subject,$message,$alt_message);
        if ($flag){
            // 存储 session 数据
            $_SESSION['verify_code'] = $verify_code;
            $_SESSION['verify_time'] = time();
        }
    }
    $jsonStr = array("flag" => $flag);
    echo json_encode($jsonStr);
}else if($type == 'phone'){
    $to = $_POST["phone"];

}else if($type == 'bind_email'){

}else if($type == 'bind_phone'){

}else if($type == 'verify'){
    $verify_code_input = strtoupper($_POST["code_input"]);
    $cur_time = time();
    // 检索 session 数据
    $verify_code_session = $_SESSION['verify_code'];
    $verify_time_session = $_SESSION['verify_time'];

    $jsonStr["flag"] = 0;
    if($cur_time - $verify_time_session < 60){
        if($verify_code_input == $verify_code_session){
            $jsonStr["flag"] = 1;
        }
    }
    echo json_encode($jsonStr);
}else if($type == 'get_email_code'){
    $to = $_POST["email"];
    $flag = 0;  // 0: error, 1: success
    // check email
    $sql = "SELECT COUNT(*) AS cnt FROM s_userinfo WHERE email='$to'";
    $obj = mysqli_query($link, $sql);
    if($obj){
        $cnt_row = mysqli_fetch_array($obj,MYSQLI_ASSOC);
        if($cnt_row){
            if($cnt_row["cnt"] == 1){
                $flag = 1;
            }
        }
    }
    if($flag == 1){
        // send email
        $subject = '查客账号中心';
        $message = $text;
        $flag = sendEmail($to,$subject,$message,$alt_message);
        if ($flag){
            // 存储 session 数据
            $_SESSION['verify_code'] = $verify_code;
            $_SESSION['verify_time'] = time();
        }
    }
    $jsonStr = array("flag" => $flag);
    echo json_encode($jsonStr);
}else if($type == 'get_phone_code'){

}
