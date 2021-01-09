<?php
include("dbconfig.php");

$uuid = $_POST["uuid"];
$tbl_name = $_POST["tbl_name"];
$tbl_id = '';
$dbt_name = '';

//flag -> 0:wrong, 1:successful
$find_flag = 0;
$del_tbl_flag = 0;
$del_reg_flag = 0;

//find table id
$sql = "SELECT dbt_name,tbl_id FROM s_tables WHERE uuid='$uuid' AND tbl_name='$tbl_name'";
$obj = mysqli_query($link, $sql);
if($obj){
    $row = mysqli_fetch_array($obj,MYSQLI_ASSOC);
    if($row){
        $tbl_id = $row['tbl_id'];
        $dbt_name = $row['dbt_name'];
        $find_flag = 1;
    }else{
        $find_flag = 0;
    }
}

//del table
$sql = "DROP TABLE `$dbt_name`";
$obj = mysqli_query($link, $sql);
if($obj){
    $del_tbl_flag = 1;
}

//del table reg
$sql = "DELETE FROM s_tables WHERE tbl_id='$tbl_id'";
$obj = mysqli_query($link, $sql);
if($obj){
    $del_reg_flag = 1;
}

$jsonStr = array("find_flag" => $find_flag, "del_tbl_flag" => $del_tbl_flag, "del_reg_flag" => $del_reg_flag);
echo json_encode($jsonStr);
