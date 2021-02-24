<?php
include("dbconfig.php");

$uuid = $_POST["uuid"];
$tbl_name = $_POST["tbl_name"];
$orderByInd = $_POST["orderBy"];
$order = $_POST["order"];
$page = (int)$_POST["page"];
$per = (int)$_POST["per"];

$dbt_name = '';
$tbl_colname_json = null;
$ischecking = 0;

//flag -> 0:wrong, 1:successful
$find_flag = 0;
$open_flag = 0;

//find table id
$sql = "SELECT dbt_name,tbl_colname_json,ischecking FROM s_tables WHERE uuid='$uuid' AND tbl_name='$tbl_name'";
$obj = mysqli_query($link, $sql);
if($obj){
    $row = mysqli_fetch_array($obj,MYSQLI_ASSOC);
    if($row){
        $dbt_name = $row['dbt_name'];
        $tbl_colname_json = $row['tbl_colname_json'];
        $ischecking = $row['ischecking'];
        $find_flag = 1;
    }else{
        $find_flag = 0;
    }
}
$head = json_decode($tbl_colname_json, $assoc = FALSE);
$orderBy = $head[$orderByInd];

//cnt
$n_data = 0;
$sql = "SELECT COUNT(*) AS cnt FROM `$dbt_name`";
$obj = mysqli_query($link, $sql);
if($obj){
    if($row = mysqli_fetch_array($obj,MYSQLI_ASSOC)){
        $n_data = (int)$row["cnt"];
    }
}
$n_pages = ceil($n_data / $per);
if($page > $n_pages){
    $page = $n_pages;
}else if($page < 1){
    $page = 1;
}
$p_start = ($page - 1) * $per;

//fetch table data
$res = array();
$i = 0;
$sql = "SELECT * FROM `$dbt_name` ORDER BY " . $orderBy . " " . $order . " LIMIT " . $p_start . "," . $per;
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

$flags = array("find_flag" => $find_flag, "open_flag" => $open_flag, "ischecking" => $ischecking);
$jsonStr = array("flags" => $flags, "head" => $head, "data" => $res, "n_pages" => $n_pages, "cur_page" => $page);
echo json_encode($jsonStr);
