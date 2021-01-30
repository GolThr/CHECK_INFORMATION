<?php
include("dbconfig.php");

/** op
 * info: modify username & gender,
 * avatar: modify user avatar,
 * pwd: modify user password,
 * email: rebind email,
 * phone: rebind phone_number
 */

$op = $_POST["op"];
$uuid = $_POST["uuid"];

$flag = 0;

if($op == "info"){
    $in_username = $_POST["in_username"];
    $in_gender = $_POST["in_gender"];

    $sql = "UPDATE s_userinfo SET user_name='$in_username',gender='$in_gender' WHERE uuid='$uuid'";
    $obj = mysqli_query($link, $sql);
    if($obj){
        $flag = 1;
    }
}else if($op == "avatar"){
    $arr = $_FILES['file'];

    //find old avatar
    $old_avatar = '';
    $sql = "SELECT avatar FROM s_userinfo WHERE uuid='$uuid'";
    $obj = mysqli_query($link, $sql);
    if($obj){
        $row = mysqli_fetch_array($obj,MYSQLI_ASSOC);
        if($row){
            $old_avatar = "../" . $row['avatar'];
        }
    }

    //var_dump($arr);
    //加限制条件
    //1.文件类型
    //2.文件大小
    //3.保存的文件名不重复
    //flag  0: error, 1: success, 2: to big, 3: file type error
    if($arr["size"] > 5242880){
        $flag = 2;
    }else if($arr["type"] != "image/jpeg" && $arr["type"] != "image/png"){
        $flag = 3;
    }else{
        $flag = 1;
        $file_type = '';
        if($arr["type"] != "image/jpeg"){
            $file_type = '.jpg';
        }else{
            $file_type = '.png';
        }
        //临时文件的路径: $arr["tmp_name"]
        //上传的文件存放的位置
        //避免文件重复:
        //1.加时间戳.time()加用户名.$uid或者加.date('YmdHis')
        //2.类似网盘，使用文件夹来防止重复
        $filename = "../avatar/" . $uuid . $file_type;
        $new_avatar = "avatar/" . $uuid . $file_type;
        //保存之前判断该文件是否存在
        if($old_avatar != "../avatar/head_default.png"){
            if(file_exists($old_avatar)){
                unlink($old_avatar);
            }
        }
        if (file_exists($filename)) {
            unlink($filename);
            //chmod($filename,0777);
        } else {
            if(file_exists($filename))
                //中文名的文件出现问题，所以需要转换编码格式
                $filename = iconv("UTF-8", "gb2312", $filename);
            //移动临时文件到上传的文件存放的位置（核心代码）
            //括号里：1.临时文件的路径, 2.存放的路径
            move_uploaded_file($arr["tmp_name"], $filename);
        }
    }

    if($flag == 1){
        //update database
        $sql = "UPDATE s_userinfo SET avatar='$new_avatar' WHERE uuid='$uuid'";
        $obj = mysqli_query($link, $sql);
        if($obj){
            $flag = 1;
        }
    }
}else if($op == "pwd"){

}else if($op == "email"){
    $new_email = $_POST["email"];

    $sql = "UPDATE s_userinfo SET email='$new_email' WHERE uuid='$uuid'";
    $obj = mysqli_query($link, $sql);
    if($obj){
        $flag = 1;
    }
}else if($op == "phone"){

}

$sql = "SELECT * FROM s_userinfo WHERE uuid='$uuid'";
$obj = mysqli_query($link, $sql);
$jsonStr = array();
if($obj){
    $arr = mysqli_fetch_array($obj,MYSQLI_ASSOC);
    if($arr){
        $jsonStr = array("flag" => $flag, 'uuid'=>$arr['uuid'] ,'user_name'=>$arr['user_name'], 'email'=>$arr['email'], 'phone_number'=>$arr['phone_number'], 'gender'=>$arr['gender'], 'avatar'=>$arr['avatar'], 'reg_time'=>$arr['reg_time']);
    }
}
echo json_encode($jsonStr);
