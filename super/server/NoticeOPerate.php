<?php
include("../../server/dbconfig.php");
include("dbconfig.php");

/** op
 * get: get all notice,
 * modify_twice: modify twice verify,
 * modify_loc: modify loc verify
 */

$op = $_POST["op"];
$uuid = $_POST["uuid"];

$flag = 0;
$jsonStr = array();
if($op == "get"){
    $res = array();
    $sql = "SELECT * FROM s_settings WHERE uuid='$uuid'";
    $obj = mysqli_query($link, $sql);
    if($obj){
        if($row = mysqli_fetch_array($obj,MYSQLI_ASSOC)){
            $flag = 1;
            $res['twice_verify'] = $row['twice_verify'];
            $res['loc_verify'] = $row['loc_verify'];
        }
    }
    $jsonStr = array("flag" => $flag, 'settings' => $res);
}else if($op == "modify_twice"){
    $new_val = $_POST["new_val"];   // new_val: on, off

    if($new_val == 'on' || $new_val == 'off'){
        $sql = "UPDATE s_settings SET twice_verify='$new_val' WHERE uuid='$uuid'";
        $obj = mysqli_query($link, $sql);
        if($obj){
            $flag = 1;
        }
    }
    $jsonStr = array("flag" => $flag);
}else if($op == "modify_loc"){
    $new_val = $_POST["new_val"];   // new_val: on, off

    if($new_val == 'on' || $new_val == 'off'){
        $sql = "UPDATE s_settings SET loc_verify='$new_val' WHERE uuid='$uuid'";
        $obj = mysqli_query($link, $sql);
        if($obj){
            $flag = 1;
        }
    }
    $jsonStr = array("flag" => $flag);
}

echo json_encode($jsonStr);
