<?php
include("dbconfig.php");

$uuid = $_POST["uuid"];
$tbl_name = $_POST["tbl_name"];
$tbl_id = '';

//flag -> 0:wrong, 1:successful
$find_flag = 0;
$cac_flag = 0;
$del_flag = 0;

//find table id
$sql = "SELECT tbl_id,dbt_name FROM s_tables WHERE uuid='$uuid' AND tbl_name='$tbl_name'";
$obj = mysqli_query($link, $sql);
if($obj){
    $row = mysqli_fetch_array($obj,MYSQLI_ASSOC);
    if($row){
        $tbl_id = $row['tbl_id'];
        $find_flag = 1;
    }else{
        $find_flag = 0;
    }
}

//cancel share
$sql = "UPDATE s_tables SET ischecking='0' WHERE tbl_id='$tbl_id'";
$obj = mysqli_query($link, $sql);
if($obj){
    $cac_flag = 1;
}

//del share
$sql = "DELETE FROM s_shares WHERE tbl_id='$tbl_id'";
$obj = mysqli_query($link, $sql);
if($obj){
    $del_flag = 1;
}

$flag = $find_flag && $cac_flag && $del_flag;
$flags = array("flag" => $flag, "find_flag" => $find_flag, "cac_flag" => $cac_flag, "del_flag" => $del_flag);
$jsonStr = array("flags" => $flags);
echo json_encode($jsonStr);
// add_flag == 1 is success
