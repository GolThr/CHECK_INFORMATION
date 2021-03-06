<?php
include("dbconfig.php");

$uuid = $_POST["uuid"];
//$uuid = 'ee248a63-62e2-3398-8c3d-be2a746c0aa6';

//flag -> 0:wrong, 1:successful
$find_flag = 0;
$cnt_all_flag = 0;
$cnt_checked_flag = 0;
$cnt_viewed_flag = 0;

//find table
$sql = "SELECT tbl_name,dbt_name,ischecking FROM s_tables WHERE uuid='$uuid'";
$obj = mysqli_query($link, $sql);
$i = 0;
$res = array();
if($obj){
    while($row = mysqli_fetch_array($obj,MYSQLI_ASSOC)){
        $tmp = array();
        $tmp["tbl_name"] = $row["tbl_name"];
        $dbt_name = $row['dbt_name'];
        $tmp["ischecking"] = $row["ischecking"];
        $find_flag = 1;
        //cnt all
        $sql = "SELECT COUNT(*) AS cnt FROM `$dbt_name`";
        $cnt_res = mysqli_query($link, $sql);
        if($cnt_res){
            $cnt_row = mysqli_fetch_array($cnt_res,MYSQLI_ASSOC);
            if($cnt_row){
                $tmp["n_all"] = $cnt_row["cnt"];
                $cnt_all_flag = 1;
            }else{
                $tmp["n_all"] = '0';
            }
        }
        //cnt checked
        $sql = "SELECT COUNT(*) AS cnt FROM `$dbt_name` WHERE ischecked='1'";
        $cnt_res = mysqli_query($link, $sql);
        if($cnt_res){
            $cnt_row = mysqli_fetch_array($cnt_res,MYSQLI_ASSOC);
            if($cnt_row){
                $tmp["n_checked"] = $cnt_row["cnt"];
                $cnt_checked_flag = 1;
            }else{
                $tmp["n_checked"] = '0';
            }
        }
        //cnt viewed
        $sql = "SELECT COUNT(*) AS cnt FROM `$dbt_name` WHERE isviewed='1'";
        $cnt_res = mysqli_query($link, $sql);
        if($cnt_res){
            $cnt_row = mysqli_fetch_array($cnt_res,MYSQLI_ASSOC);
            if($cnt_row){
                $tmp["n_viewed"] = $cnt_row["cnt"];
                $cnt_viewed_flag = 1;
            }else{
                $tmp["n_viewed"] = '0';
            }
        }
        $res[$i++] = $tmp;
    }
}

$n_notice = 0;
$n_messages = 0;

$cnt_notice_flag = 0;
$cnt_message_flag = 0;
//cnt notice
$sql = "SELECT COUNT(*) AS cnt FROM s_notice";
$cnt_res = mysqli_query($link, $sql);
if($cnt_res){
    $cnt_row = mysqli_fetch_array($cnt_res,MYSQLI_ASSOC);
    if($cnt_row){
        $n_notice = $cnt_row["cnt"];
        $cnt_notice_flag = 1;
    }else{
        $n_notice = 0;
    }
}
//cnt messages
$sql = "SELECT COUNT(*) AS cnt FROM s_messages WHERE uuid='$uuid'";
$cnt_res = mysqli_query($link, $sql);
if($cnt_res){
    $cnt_row = mysqli_fetch_array($cnt_res,MYSQLI_ASSOC);
    if($cnt_row){
        $n_messages = $cnt_row["cnt"];
        $cnt_message_flag = 1;
    }else{
        $n_messages = 0;
    }
}

$flag = $find_flag && $cnt_all_flag && $cnt_checked_flag && $cnt_notice_flag && $cnt_message_flag;
$flags = array("flag" => $flag, "find_flag" => $find_flag, "cnt_all_flag" => $cnt_all_flag, "cnt_checked_flag" => $cnt_checked_flag, "cnt_notice_flag" => $cnt_notice_flag, "cnt_message_flag" => $cnt_message_flag);
$jsonStr = array("flags" => $flags, "tbl_list" => $res, "n_notice" => $n_notice, "n_messages" => $n_messages);
echo json_encode($jsonStr);
