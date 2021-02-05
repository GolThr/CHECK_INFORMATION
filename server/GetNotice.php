<?php
include("dbconfig.php");

$type = $_POST["type"];     //type: all, effect

if($type == 'all'){
    // get all notice
    $res = array();
    $i = 0;
    $flag = 0;
    $sql = "SELECT notice_id,notice_type,notice_text,summary,pub_time,end_time FROM s_notice ORDER BY pub_time DESC";
    $obj = mysqli_query($link, $sql);
    if($obj){
        while($row = mysqli_fetch_array($obj,MYSQLI_ASSOC)){
            $tmp = array();
            $tmp["notice_id"] = $row["notice_id"];
            $tmp["notice_type"] = $row["notice_type"];
            $tmp["notice_text"] = $row["notice_text"];
            $tmp["summary"] = $row["summary"];
            $tmp["pub_time"] = $row["pub_time"];
            $tmp["end_time"] = $row["end_time"];
            $flag = 1;
            $res[$i++] = $tmp;
        }
    }
    $jsonStr = array("flag" => $flag, "notices" => $res);
    echo json_encode($jsonStr);
    return;
}else if ($type == 'effect'){
    // get current effective notice
    $today = date("Y-m-d H:i:s");
    $res = array();
    $i = 0;
    $flag = 0;
    $sql = "SELECT notice_id,notice_type,notice_text,summary,pub_time,end_time FROM s_notice";
    $obj = mysqli_query($link, $sql);
    if($obj){
        while($row = mysqli_fetch_array($obj,MYSQLI_ASSOC)){
            if(substr($row["end_time"],0,19) >= $today){
                $tmp = array();
                $tmp["notice_id"] = $row["notice_id"];
                $tmp["notice_type"] = $row["notice_type"];
                $tmp["notice_text"] = $row["notice_text"];
                $tmp["summary"] = $row["summary"];
                $tmp["pub_time"] = $row["pub_time"];
                $tmp["end_time"] = $row["end_time"];
                $flag = 1;
                $res[$i++] = $tmp;
            }
        }
    }
    $jsonStr = array("flag" => $flag, "notices" => $res);
    echo json_encode($jsonStr);
    return;
}else if ($type == 'cnt'){
    $n_notice = 0;
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
    return;
}

$jsonStr = array("flag" => "0");
echo json_encode($jsonStr);
