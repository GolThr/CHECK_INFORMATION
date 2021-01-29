<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'D:/xampp/php/vendor/phpmailer/phpmailer/src/Exception.php';
require 'D:/xampp/php/vendor/phpmailer/phpmailer/src/PHPMailer.php';
require 'D:/xampp/php/vendor/phpmailer/phpmailer/src/SMTP.php';
$type = $_POST["type"]; //verify, email, phone, bind_email, bind_phone

function sendEmail($to, $subject, $message, $altMessage){
    $mail = new PHPMailer(true);                              // Passing `true` enables exceptions
    try {
        //服务器配置
        $mail->CharSet ="UTF-8";                     //设定邮件编码
        $mail->SMTPDebug = 0;                        // 调试模式输出
        $mail->isSMTP();                             // 使用SMTP
        $mail->Host = 'smtp.163.com';                // SMTP服务器
        $mail->SMTPAuth = true;                      // 允许 SMTP 认证
        $mail->Username = 'golthr@163.com';                // SMTP 用户名  即邮箱的用户名
        $mail->Password = '';             // SMTP 密码  部分邮箱是授权码(例如163邮箱)
        $mail->Port = 25;                            // 服务器端口 25 或者465 具体要看邮箱服务器支持

        $mail->setFrom('golthr@163.com', '查客账号中心');  //发件人
        $mail->addAddress($to);  // 收件人

        //发送附件
        // $mail->addAttachment('../xy.zip');         // 添加附件
        // $mail->addAttachment('../thumb-1.jpg', 'new.jpg');    // 发送附件并且重命名

        //Content
        $mail->isHTML(true);                                  // 是否以HTML文档格式发送  发送后客户端可直接显示对应HTML内容
        $mail->Subject = $subject;
        $mail->Body    = $message;
        $mail->AltBody = $altMessage;

        $mail->send();
        return 1;   //邮件发送成功
    } catch (Exception $e) {
        return 0;   //邮件发送失败
    }
}

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
            <span class="email_text">欢迎注册查客账号！您的验证码为：</span>
            <span class="email_verify_code">'.$verify_code.'</span>
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
    $subject = '查客账号中心';
    $message = $text;
    $flag = sendEmail($to,$subject,$message,$alt_message);
    $jsonStr = array("flag" => $flag);
    if ($flag){
        // 存储 session 数据
        $_SESSION['verify_code'] = $verify_code;
        $jsonStr["verify_code"] = $verify_code;
    }
    echo json_encode($jsonStr);
}else if($type == 'phone'){
    $to = $_POST["phone"];

}else if($type == 'bind_email'){

}else if($type == 'bind_phone'){

}else if($type == 'verify'){
    $verify_code_input = $_POST["email"];
    // 检索 session 数据
    $verify_code_session = $_SESSION['verify_code'];
    $jsonStr["flag"] = 0;
    if($verify_code_input == $verify_code_session){
        $jsonStr["flag"] = 1;
    }
    echo json_encode($jsonStr);
}
