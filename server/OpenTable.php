<?php
include("dbconfig.php");

$uuid = $_POST["uuid"];
$tbl_name = $_POST["tbl_name"];
$dbt_name = '';
$tbl_colname_json = null;

//flag -> 0:wrong, 1:successful
$find_flag = 0;
$open_flag = 0;

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

//fetch table data
$res = array();
$i = 0;
$sql = "SELECT * FROM `$dbt_name`";
$obj = mysqli_query($link, $sql);
if($obj){
    while($row = mysqli_fetch_array($obj,MYSQLI_ASSOC)){
        $tmp = array();
        foreach ($head as $colName){
            $tmp[] = $row[$colName];
        }
        $res[$i++] = $tmp;
    }
}

$flags = array("find_flag" => $find_flag, "open_flag" => $open_flag, "head" => $head);
$jsonStr = array("flags" => $flags, "head" => $head, "data" => $res);
echo json_encode($jsonStr);
