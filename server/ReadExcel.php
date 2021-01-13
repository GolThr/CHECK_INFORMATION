<?php
include("dbconfig.php");
include("getUuid.php");

$file = $_FILES['file']['tmp_name'];
$uuid = $_POST["uuid"];
$tbl_name = $_POST["tbl_name"];

# 载入composer自动加载文件
require 'D:\xampp\php\vendor/autoload.php';

$reader = new \PhpOffice\PhpSpreadsheet\Reader\Xlsx();

try {
    $spreadsheet = $reader->load($_FILES['file']['tmp_name']);
} catch (\PhpOffice\PhpSpreadsheet\Reader\Exception $e) {
    die($e->getMessage());
}

$sheet = $spreadsheet->getActiveSheet();
$res = array();

$i = 0;
foreach ($sheet->getRowIterator() as $row) {
    $tmp = array();
    foreach ($row->getCellIterator() as $cell) {
        $tmp[] = $cell->getFormattedValue();
    }
    $res[$i] = $tmp;
    $i++;
}

//////
//flag -> 0:wrong, 1:successful
$find_flag = 0;
$ins_col_flag = 1;
$ins_flag = 0;
$upd_flag = 0;

$tbl_id = '';
$dbt_name = '';
$tbl_colname_json = null;

//find table
$sql = "SELECT tbl_id,dbt_name,tbl_colname_json FROM s_tables WHERE uuid='$uuid' AND tbl_name='$tbl_name'";
$obj = mysqli_query($link, $sql);
if($obj){
    $row = mysqli_fetch_array($obj,MYSQLI_ASSOC);
    if($row){
        $tbl_id = $row['tbl_id'];
        $dbt_name = $row['dbt_name'];
        $tbl_colname_json = $row['tbl_colname_json'];
        $find_flag = 1;
    }else{
        $find_flag = 0;
    }
}
$head = json_decode($tbl_colname_json, $assoc = FALSE);

//insert column
foreach ($res[0] as $h){
    $sql="ALTER TABLE `$dbt_name` ADD COLUMN `$h` TEXT";
    $obj = mysqli_query($link, $sql);
    if($obj){
        array_push($head, $h);
    }else{
        $ins_col_flag = 0;
    }
}

//insert data
$sql = "INSERT INTO `$dbt_name` (";
$i = 0;
foreach ($res[0] as $col_name){
    if($i++ == 0){
        $sql = $sql . "`$col_name`";
    }else{
        $sql = $sql . ",`$col_name`";
    }
}
$sql = $sql . ") VALUES (";
$sql_run = $sql;
$i = 0;
foreach ($res as $row){
    if($i++ == 0) continue;
    $j = 0;
    foreach ($row as $col){
        if($j++ == 0){
            $sql_run = $sql_run . "'$col'";
        }else{
            $sql_run = $sql_run . ",'$col'";
        }
    }
    $sql_run = $sql_run . ")";
    //insert
    $obj = mysqli_query($link,$sql_run);
    if($obj){
        $ins_flag = 1;
    }
    $sql_run = $sql;
}

//register column
$head_json = json_encode($head, JSON_UNESCAPED_UNICODE);
$sql = "UPDATE s_tables SET tbl_colname_json='$head_json' WHERE tbl_id='$tbl_id'";
$obj = mysqli_query($link, $sql);
if($obj){
    $upd_flag = 1;
}

//fetch table data
$res_table = array();
$i = 0;
$sql = "SELECT * FROM `$dbt_name`";
$obj = mysqli_query($link, $sql);
if($obj){
    while($row = mysqli_fetch_array($obj,MYSQLI_ASSOC)){
        $tmp = array();
        foreach ($head as $colName){
            $tmp[] = $row[$colName];
        }
        $res_table[$i++] = $tmp;
    }
}

$flags = array("find_flag" => $find_flag, "ins_col_flag" => $ins_col_flag, "upd_flag" => $upd_flag, "ins_flag" => $ins_flag);
$jsonStr = array("flags" => $flags, "head" => $head, "data" => $res_table);
echo json_encode($jsonStr);
