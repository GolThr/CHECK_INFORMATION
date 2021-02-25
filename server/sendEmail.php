<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Windows
require 'D:/xampp/php/vendor/phpmailer/phpmailer/src/Exception.php';
require 'D:/xampp/php/vendor/phpmailer/phpmailer/src/PHPMailer.php';
require 'D:/xampp/php/vendor/phpmailer/phpmailer/src/SMTP.php';
// Linux
//require '/root/vendor/phpmailer/phpmailer/src/Exception.php';
//require '/root/vendor/phpmailer/phpmailer/src/PHPMailer.php';
//require '/root/vendor/phpmailer/phpmailer/src/SMTP.php';

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