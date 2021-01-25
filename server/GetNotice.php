<?php
include("dbconfig.php");

$type = $_POST["type"];     //type: all, effect, cnt

if($type == 'all'){
    // get all notice
    $res = array();
    $i = 0;
    $flag = 0;
    $sql = "SELECT notice_id,notice_title,notice_text,pub_time,end_time FROM s_notice";
    $obj = mysqli_query($link, $sql);
    if($obj){
        while($row = mysqli_fetch_array($obj,MYSQLI_ASSOC)){
            $tmp = array();
            $tmp["notice_id"] = $row["notice_id"];
            $tmp["notice_title"] = $row["notice_title"];
            $tmp["notice_text"] = $row["notice_text"];
            $tmp["pub_time"] = $row["pub_time"];
            $tmp["end_time"] = $row["end_time"];
            $flag = 1;
            $res[$i++] = $tmp;
        }
    }
    $jsonStr = array("flag" => $flag, "res" => $res);
    echo json_encode($jsonStr);
    return;
}else if ($type == 'effect'){
    // get current effective notice
    $notice_id = '';
    $notice_title = '';
    $notice_text = '';
    $pub_time = '';
    $end_time = '';
    $get_flag = 0;
    $sql = "SELECT notice_id,notice_title,notice_text,pub_time,end_time FROM s_notice";
    $cnt_res = mysqli_query($link, $sql);
    if($cnt_res){
        $cnt_row = mysqli_fetch_array($cnt_res,MYSQLI_ASSOC);
        if($cnt_row){
            $notice_id = $cnt_row["notice_id"];
            $notice_title = $cnt_row["notice_title"];
            $notice_text = $cnt_row["notice_text"];
            $pub_time = $cnt_row["pub_time"];
            $end_time = $cnt_row["end_time"];
            $get_flag = 1;
        }
    }
    return;
}else if ($type == 'cnt'){
    $cnt = 0;
    $cnt_notice_flag = 0;
    $sql = "SELECT COUNT(*) AS cnt FROM s_notice";
    $cnt_res = mysqli_query($link, $sql);
    if($cnt_res){
        $cnt_row = mysqli_fetch_array($cnt_res,MYSQLI_ASSOC);
        if($cnt_row){
            $cnt = $cnt_row["cnt"];
            $cnt_notice_flag = 1;
        }else{
            $cnt = '0';
        }
    }
    return;
}

$jsonStr = array("flag" => "0");
echo json_encode($jsonStr);
