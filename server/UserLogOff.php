<?php
include("dbconfig.php");
include("getUuid.php");

/** op
 * logoff: get user all settings,
 * advise: modify twice verify
 */

$op = $_POST["op"];
$ver = $_POST["ver"];

$flag = 0;
$jsonStr = array();

if($op == 'logoff'){
    $uuid = $_POST["uuid"];
    $old_pwd = $_POST["pwd"];

    $pwd = '';
    $sql = "SELECT pwd FROM s_userinfo WHERE uuid='$uuid'";
    $obj = mysqli_query($link, $sql);
    if($obj){
        if($row = mysqli_fetch_array($obj,MYSQLI_ASSOC)){
            $pwd = $row['pwd'];
        }
    }

    if($old_pwd == $pwd){
        // move s_feedbacks to d_advise
        $flag_mf2a = 0;
        $sql = "SELECT * FROM s_feedbacks WHERE uuid='$uuid'";
        $obj = mysqli_query($link, $sql);
        if($obj){
            while($row = mysqli_fetch_array($obj,MYSQLI_ASSOC)){
                $id = $row['id'];
                $uuid = $row['uuid'];
                $type = $row['type'];
                $content = $row['content'];
                $pic_json = $row['pic_json'];
                $time = $row['time'];
                $solved = $row['solved'];
                $sol_time = $row['sol_time'];
                $sol_words = $row['sol_words'];

                $sql_m = "INSERT INTO d_advises (id,uuid,type,content,pic_json,time,solved,sol_time,sol_words) VALUES ('$id','$uuid','$type','$content','$pic_json','$time','$solved','$sol_time','$sol_words')";
                $obj_m = mysqli_query($link, $sql_m);
                if($obj_m){
                    $flag_mf2a = 1;
                }
            }
        }

        // del from s_feedbacks
        $flag_df = 0;
        $sql = "DELETE FROM s_feedbacks WHERE uuid='$uuid'";
        $obj = mysqli_query($link, $sql);
        if($obj){
            $flag_df = 1;
        }

        // del from s_login
        $flag_dl = 0;
        $sql = "DELETE FROM s_login WHERE uuid='$uuid'";
        $obj = mysqli_query($link, $sql);
        if($obj){
            $flag_dl = 1;
        }

        // del from s_messages
        $flag_dm = 0;
        $sql = "DELETE FROM s_messages WHERE uuid='$uuid'";
        $obj = mysqli_query($link, $sql);
        if($obj){
            $flag_dm = 1;
        }

        // move s_userinfo to d_users
        $flag_mu2u = 0;
        $sql = "SELECT uuid,user_name,email,phone_number,gender,avatar,reg_time FROM s_userinfo WHERE uuid='$uuid'";
        $obj = mysqli_query($link, $sql);
        if($obj){
            if($row = mysqli_fetch_array($obj,MYSQLI_ASSOC)){
                $id = getNewUuid();
                $uuid = $row['uuid'];
                $user_name = $row['user_name'];
                $email = $row['email'];
                $avatar = $row['avatar'];
                $gender = $row['gender'];
                $phone_number = $row['phone_number'];
                $reg_time= $row['reg_time'];

                $sql_m = "INSERT INTO d_users (id,uuid,user_name,email,gender,avatar,phone_number,reg_time) VALUES ('$id','$uuid','$user_name','$email','$gender','$avatar','$phone_number','$reg_time')";
                $obj_m = mysqli_query($link, $sql_m);
                if($obj){
                    $flag_mu2u = 1;
                }
            }
        }

        // del from s_userinfo
        $flag_du = 1;
        $sql = "DELETE FROM s_userinfo WHERE uuid='$uuid'";
        $obj = mysqli_query($link, $sql);
        if($obj){
            $flag_du = 1;
        }
        $tmp = array();
        $flag = $flag_mf2a && $flag_df && $flag_dl && $flag_dm && $flag_mu2u && $flag_du;
        $tmp['flag_mf2a'] = $flag_mf2a;
        $tmp['flag_df'] = $flag_df;
        $tmp['flag_dl'] = $flag_dl;
        $tmp['flag_dm'] = $flag_dm;
        $tmp['flag_mu2u'] = $flag_mu2u;
        $tmp['flag_du'] = $flag_du;
        $jsonStr['flags'] = $tmp;
    }else{
        $flag = -1;
    }
}else if($op == 'advise'){
    $uuid = $_POST['uuid'];
    $content = $_POST['content'];

    $id = getNewUuid();
    $type = 'advise';
    $pic_json = '[]';
    $time = date("Y-m-d H:i:s");
    $solved = '0';
    $sql = "INSERT INTO d_advises (id,uuid,type,content,pic_json,time,solved) VALUES ('$id','$uuid','$type','$content','$pic_json','$time','$solved')";
    $obj = mysqli_query($link, $sql);
    if($obj){
        $flag = 1;
    }
}


$jsonStr['flag'] = $flag;
echo json_encode($jsonStr);
