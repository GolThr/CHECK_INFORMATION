<?php
include("dbconfig.php");

$uuid = $_POST["uuid"];
$tbl_name = $_POST["tbl_name"];
$dbt_name = '';
$tbl_colname_json = null;

//flag -> 0:wrong, 1:successful
$find_flag = 0;

//find table id
$sql = "SELECT dbt_name,tbl_colname_json FROM s_tables WHERE uuid='$uuid' AND tbl_name='$tbl_name'";
$obj = mysqli_query($link, $sql);
if($obj){
    $row = mysqli_fetch_array($obj,MYSQLI_ASSOC);
    if($row){
        $dbt_name = $row['dbt_name'];
        $tbl_colname_json = $row['tbl_colname_json'];
        $find_flag = 1;
    }else{
        $find_flag = 0;
    }
}
$head = json_decode($tbl_colname_json, $assoc = FALSE);

$option_col = array();
foreach ($head as $col){
    if($col != "id" && $col != "ischecked" && $col != "isviewed" && $col != "checked_time"){
        array_push($option_col, $col);
    }
}

$flags = array("find_flag" => $find_flag);
$jsonStr = array("flags" => $flags, "head" => $option_col);
echo json_encode($jsonStr);
