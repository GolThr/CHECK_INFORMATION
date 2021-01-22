<?php
include("dbconfig.php");
include("getUuid.php");

$sha_id = $_POST["s"];
$type = $_POST["op"]; //check: check link, verify: verify link pwd, query: query user info
$data = $_POST["data"];
$dbt_name = '';
$tbl_id = '';
$sha_pwd = '';
$sha_vercol_json = '';

//flag -> 0:wrong, 1:successful
$find_s_flag = 0;
$flags = array("flag" => 0);
$jsonStr = array("flags" => $flags);

//find share
$sql = "SELECT tbl_id,sha_pwd,sha_vercol_json FROM s_shares WHERE sha_id='$sha_id'";
$obj = mysqli_query($link, $sql);
if($obj){
    $row = mysqli_fetch_array($obj,MYSQLI_ASSOC);
    if($row){
        $tbl_id = $row['tbl_id'];
        $sha_pwd = $row['sha_pwd'];
        $sha_vercol_json = $row['sha_vercol_json'];
        $find_s_flag = 1;
    }else{
        $find_s_flag = 0;
    }
}
$sha_vercol = json_decode($sha_vercol_json, $assoc = FALSE);

if($type == 'check'){
    $flags = array("flag" => $find_s_flag, "find_s_flag" => $find_s_flag);
    $jsonStr = array("flags" => $flags);
}else if($type == 'verify'){
    $check_pwd_flag = 0;
    if($data == $sha_pwd){
        $check_pwd_flag = 1;
    }
    $flag = $find_s_flag && $check_pwd_flag;
    $flags = array("flag" => $flag, "find_s_flag" => $find_s_flag, "check_pwd_flag" => $check_pwd_flag);
    $jsonStr = array("flags" => $flags, "vercol" => $sha_vercol);
}else if($type == 'query'){


    $flag = $find_s_flag;
    $flags = array("flag" => $flag);
    $jsonStr = array("flags" => $flags, "vercol" => $sha_vercol);
}

echo json_encode($jsonStr);
