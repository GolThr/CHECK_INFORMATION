<?php
include("dbconfig.php");

/** op
 * email: reset user pwd by email,
 * phone: reset user pwd by phone
 */

$op = $_POST["op"];

$flag = 0;

if($op == "email"){
    $u_email = $_POST["email"];
    $new_pwd = $_POST["pwd"];

    $sql = "UPDATE s_userinfo SET pwd='$new_pwd' WHERE email='$u_email'";
    $obj = mysqli_query($link, $sql);
    if($obj){
        $flag = 1;
    }
}else if($op == "phone"){

}

$jsonStr = array("flag" => $flag);
echo json_encode($jsonStr);
