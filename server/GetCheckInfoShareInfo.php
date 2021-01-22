<?php
include("dbconfig.php");

$uuid = $_POST["uuid"];
$tbl_name = $_POST["tbl_name"];
$tbl_id = '';
$ischecking = 0;

//flag -> 0:wrong, 1:successful
$find_tbl_flag = 0;
$find_s_flag = 0;

//find table id
$sql = "SELECT tbl_id,ischecking FROM s_tables WHERE uuid='$uuid' AND tbl_name='$tbl_name'";
$obj = mysqli_query($link, $sql);
if($obj){
    $row = mysqli_fetch_array($obj,MYSQLI_ASSOC);
    if($row){
        $tbl_id = $row['tbl_id'];
        $ischecking = $row['ischecking'];
        $find_tbl_flag = 1;
    }else{
        $find_tbl_flag = 0;
    }
}

$sha_id = '';
$sha_pwd = '';
$sha_vercol_json = '';
//find share
$sql = "SELECT sha_id,sha_pwd,sha_vercol_json FROM s_shares WHERE tbl_id='$tbl_id'";
$obj = mysqli_query($link, $sql);
if($obj){
    $row = mysqli_fetch_array($obj,MYSQLI_ASSOC);
    if($row){
        $sha_id = $row['sha_id'];
        $sha_pwd = $row['sha_pwd'];
        $sha_vercol_json = $row['sha_vercol_json'];
        $find_s_flag = 1;
    }else{
        $find_s_flag = 0;
    }
}
$sha_vercol = json_decode($sha_vercol_json, $assoc = FALSE);

$flag = $find_tbl_flag && $find_s_flag;
$flags = array("flag" => $flag, "find_tbl_flag" => $find_tbl_flag, "find_s_flag" => $find_s_flag);
$jsonStr = array("flags" => $flags, "share_id" => $sha_id, "share_pwd" => $sha_pwd, "share_vercol" => $sha_vercol);
echo json_encode($jsonStr);
// add_flag == 1 is success
