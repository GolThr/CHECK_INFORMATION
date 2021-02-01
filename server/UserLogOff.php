<?php
include("dbconfig.php");

/** op
 * get: get user all settings,
 * modify_twice: modify twice verify,
 * modify_loc: modify loc verify
 */

$ver = $_POST["ver"];
$uuid = $_POST["uuid"];
$old_pwd = $_POST["pwd"];

$flag = 0;  // -1: pwd wrong
$jsonStr = array();

$pwd = '';
$sql = "SELECT pwd FROM s_userinfo WHERE uuid='$uuid'";
$obj = mysqli_query($link, $sql);
if($obj){
    if($row = mysqli_fetch_array($obj,MYSQLI_ASSOC)){
        $pwd = $row['pwd'];
    }
}

if($old_pwd == $pwd){
    // del from s_feedbacks
    // del from s_login
    // del from u_messages
}else{
    $flag = -1;
}

$jsonStr['flag'] = $flag;
echo json_encode($jsonStr);
