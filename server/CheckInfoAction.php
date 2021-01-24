<?php
include("dbconfig.php");
include("getUuid.php");

$sha_id = $_POST["s"];
$type = $_POST["op"]; //save: save info, ok: info right
$tbl_id = '';
$sha_vercol_json = '';

//flag -> 0:wrong, 1:successful
$find_s_flag = 0;
$flags = array("flag" => 0);
$jsonStr = array("flags" => $flags);

//find share
$sql = "SELECT tbl_id,sha_vercol_json FROM s_shares WHERE sha_id='$sha_id'";
$obj = mysqli_query($link, $sql);
if($obj){
    $row = mysqli_fetch_array($obj,MYSQLI_ASSOC);
    if($row){
        $tbl_id = $row['tbl_id'];
        $sha_vercol_json = $row['sha_vercol_json'];
        $find_s_flag = 1;
    }else{
        $find_s_flag = 0;
    }
}
$sha_vercol = json_decode($sha_vercol_json, $assoc = FALSE);

//find dbt_name
$dbt_name = '';
$tbl_colname_json = null;
$find_dbt_flag = 0;
$modify_flag = 0;
$sql = "SELECT dbt_name,tbl_colname_json FROM s_tables WHERE tbl_id='$tbl_id'";
$obj = mysqli_query($link, $sql);
if($obj){
    $row = mysqli_fetch_array($obj,MYSQLI_ASSOC);
    if($row){
        $dbt_name = $row['dbt_name'];
        $tbl_colname_json = $row['tbl_colname_json'];
        $find_dbt_flag = 1;
    }else{
        $find_dbt_flag = 0;
    }
}
$head = json_decode($tbl_colname_json, $assoc = FALSE);

if($type == 'ok'){
    $query_ver = $_POST["query_ver"];
    //modified data
    $res = array();
    $query_head = array();
    $n_vercol = count($sha_vercol);
    $sql = "UPDATE `$dbt_name` SET ischecked='1',isviewed='1'  WHERE ";
    for($i = 0; $i < $n_vercol; $i++){
        if($i != 0){
            $sql = $sql . " AND ";
        }
        $sql = $sql . "$sha_vercol[$i]='$query_ver[$i]'";
    }
    $obj = mysqli_query($link, $sql);
    if($obj){
        $modify_flag = 1;
    }

    $flag = $find_s_flag && $find_dbt_flag && $modify_flag;
    $flags = array("flag" => $flag, "find_s_flag" => $find_s_flag, "find_dbt_flag" => $find_dbt_flag, "modify_flag" => $modify_flag);
    $jsonStr = array("flags" => $flags);
}else if($type == 'save'){
    $query_ver = $_POST["query_ver"];
    $data_col = $_POST["data_col"];
    $data_mod = $_POST["data_mod"];
    //modified data
    $res = array();
    $query_head = array();
    $n_vercol = count($sha_vercol);
    $sql = "UPDATE `$dbt_name` SET ";
    $i = 0;
    foreach($data_col as $item) {
        if($i != 0){
            $sql = $sql . ",";
        }
        $sql = $sql . "$data_col[$i]='$data_mod[$i]'";
        $i++;
    }
    $sql = $sql . " WHERE ";
    for($i = 0; $i < $n_vercol; $i++){
        if($i != 0){
            $sql = $sql . " AND ";
        }
        $sql = $sql . "$sha_vercol[$i]='$query_ver[$i]'";
    }
    $obj = mysqli_query($link, $sql);
    if($obj){
        $modify_flag = 1;
    }

    $flag = $find_s_flag && $find_dbt_flag && $modify_flag;
    $flags = array("flag" => $flag, "find_s_flag" => $find_s_flag, "find_dbt_flag" => $find_dbt_flag, "modify_flag" => $modify_flag);
    $jsonStr = array("flags" => $flags);
}

echo json_encode($jsonStr);
