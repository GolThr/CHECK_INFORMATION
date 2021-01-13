<?php
include("dbconfig.php");

$op = $_POST["op"];
$uuid = $_POST["uuid"];
$tbl_name = $_POST["tbl_name"];
$data = $_POST["data"];
$tbl_id = '';
$dbt_name = '';
$tbl_colname_json = null;

//flag -> 0:wrong, 1:successful
$find_flag = 0;
$upd_flag = 0;
$open_flag = 0;
$flag = 0;

//find table id
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

//op
if($op == "add_row"){
    //add row
    $sql = "INSERT INTO `$dbt_name` (`ischecked`) VALUES ('0')";
    $obj = mysqli_query($link, $sql);
    if($obj){
        $flag = 1;
    }
}else if($op == "add_col"){
    //add col
    $sql="ALTER TABLE `$dbt_name` ADD COLUMN `$data` TEXT";
    $obj = mysqli_query($link, $sql);
    if($obj){
        array_push($head, $data);
        $flag = 1;
    }else{
        $flag = 0;
    }
    //register column
    $head_json = json_encode($head, JSON_UNESCAPED_UNICODE);
    $sql = "UPDATE s_tables SET tbl_colname_json='$head_json' WHERE tbl_id='$tbl_id'";
    $obj = mysqli_query($link, $sql);
    if($obj){
        $upd_flag = 1;
    }
}else if($op == "del_row"){
    //del row
    $sql = "DELETE FROM `$dbt_name` WHERE id='$data'";
    $obj = mysqli_query($link, $sql);
    if($obj){
        $flag = 1;
    }
}else if($op == "del_col"){
    //del col
    $colName = $head[$data];
    $sql="ALTER TABLE `$dbt_name` DROP COLUMN `$colName`";
    $obj = mysqli_query($link, $sql);
    if($obj){
        array_splice($head, $data, 1);
        $flag = 1;
    }else{
        $flag = 0;
    }
    //register column
    $head_json = json_encode($head, JSON_UNESCAPED_UNICODE);
    $sql = "UPDATE s_tables SET tbl_colname_json='$head_json' WHERE tbl_id='$tbl_id'";
    $obj = mysqli_query($link, $sql);
    if($obj){
        $upd_flag = 1;
    }
}else if($op == "mod_data"){
    //modified data
    $colName = $head[$data["col"]];
    $text = $data["text"];
    $row = $data["row"];
    $sql = "UPDATE `$dbt_name` SET `$colName`='$text' WHERE id='$row'";
    $obj = mysqli_query($link, $sql);
    if($obj){
        $flag = 1;
    }
}

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

$flags = array("find_flag" => $find_flag, "open_flag" => $open_flag, "upd_flag" => $upd_flag, "flag" => $flag);
$jsonStr = array("flags" => $flags, "head" => $head, "data" => $res);
echo json_encode($jsonStr);
