<?php
include("dbconfig.php");
include("common.php");

$uuid = $_POST["uuid"];
$tbl_name = $_POST["tbl_name"];
$s_pwd = $_POST["s_pwd"];
$ver_col = $_POST["ver_col"];
$tbl_id = '';
$dbt_name = '';
$ischecking = 0;
$sha_vercol_json = json_encode($ver_col,JSON_UNESCAPED_UNICODE);

//flag -> 0:wrong, 1:successful
$find_flag = 0;
$check_flag = 1;
$pwd_flag = 0;

if(isRightShareCode($s_pwd)){
    //find table id
    $sql = "SELECT tbl_id,dbt_name,ischecking FROM s_tables WHERE uuid='$uuid' AND tbl_name='$tbl_name'";
    $obj = mysqli_query($link, $sql);
    if($obj){
        $row = mysqli_fetch_array($obj,MYSQLI_ASSOC);
        if($row){
            $tbl_id = $row['tbl_id'];
            $dbt_name = $row['dbt_name'];
            $ischecking = $row['ischecking'];
            $find_flag = 1;
        }else{
            $find_flag = 0;
        }
    }

//check ver col is unique
//SQL: SELECT * FROM (SELECT `id` , COUNT( * ) AS c FROM `t_297c6d22-8a44-64e3-a0d2-0aa10e85588b` GROUP BY `user_id`,`name`)t WHERE c>1
    $sql = "SELECT * FROM (SELECT `id` , COUNT( * ) AS c FROM `$dbt_name` GROUP BY ";
    $i = 0;
    foreach ($ver_col as $col){
        if($i++ != 0){
            $sql = $sql . ", ";
        }
        $sql = $sql . "`$col`";
    }
    $sql = $sql . ")t WHERE c>1";
    $obj = mysqli_query($link, $sql);
    if($obj){
        if($row = mysqli_fetch_array($obj,MYSQLI_ASSOC)){
            $check_flag = 0;
        }
    }

    $flag = $find_flag && $check_flag && !$ischecking;
    $flags = array("flag" => $flag, "find_flag" => $find_flag, "check_flag" => $check_flag, "ischecking" => $ischecking);
    $jsonStr = array("flags" => $flags);
    echo json_encode($jsonStr);
    // check_flag == 1 is right
}else{
    $flags = array("flag" => "0");
    $jsonStr = array("flags" => $flags);
    echo json_encode($jsonStr);
}
