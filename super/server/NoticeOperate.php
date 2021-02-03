<?php
include("../../server/dbconfig.php");
include("../../server/getUuid.php");

/** op
 * get: get all notice,
 * view: get one notice by notice_id,
 * del: delete one notice by notice_id,
 * pub: publish notice
 *
 ** sort
 * type: Sort by type,
 * text: Sort by text,
 * pub: Sort by pub_time,
 * end: Sort by end_time
 *
 ** sort_m
 * desc: Descending sort,
 * asc: Ascending sort
 */

$op = $_POST["op"];

$flag = 0;
$jsonStr = array();
if($op == "get"){
    $sort = $_POST["sort"];
    $sort_m = $_POST["sort_m"];
    $res = array();
    $s = 'pub_time';
    $m = 'DESC';
    if($sort_m == 'asc' || $sort_m == 'ASC'){
        $m = 'ASC';
    }
    if($sort == 'type'){
        $s = "notice_type";
    }else if($sort == 'text'){
        $s = "notice_text";
    }else if($sort == 'pub'){
        $s = "pub_time";
    }else if($sort == 'end'){
        $s = "end_time";
    }
    $sql = "SELECT * FROM s_notice ORDER BY " . $s . " " . $m;
    $obj = mysqli_query($link, $sql);
    if($obj){
        while($row = mysqli_fetch_array($obj,MYSQLI_ASSOC)){
            $flag = 1;
            $tmp = array();
            $tmp['notice_id'] = $row['notice_id'];
            $tmp['notice_type'] = $row['notice_type'];
            $tmp['summary'] = $row['summary'];
            $tmp['notice_text'] = $row['notice_text'];
            $tmp['pub_time'] = $row['pub_time'];
            $tmp['end_time'] = $row['end_time'];
            $res[] = $tmp;
        }
    }
    $jsonStr = array("flag" => $flag, 'notices' => $res);
}else if($op == "view"){
    $notice_id = $_POST["notice_id"];

    $res = array();
    $sql = "SELECT * FROM s_notice WHERE notice_id='$notice_id'";
    $obj = mysqli_query($link, $sql);
    if($obj){
        if($row = mysqli_fetch_array($obj,MYSQLI_ASSOC)){
            $flag = 1;
            $res['notice_type'] = $row['notice_type'];
            $tmp['summary'] = $row['summary'];
            $res['notice_text'] = $row['notice_text'];
            $res['pub_time'] = $row['pub_time'];
            $res['end_time'] = $row['end_time'];
        }
    }
    $jsonStr = array("flag" => $flag, 'notice' => $res);
}else if($op == "del"){
    $notice_id = $_POST["notice_id"];

    $sql = "DELETE FROM s_notice WHERE notice_id='$notice_id'";
    $obj = mysqli_query($link, $sql);
    if($obj){
        $flag = 1;
    }
    $jsonStr = array("flag" => $flag);
}else if($op == "pub"){
    $notice_type = $_POST["notice_type"];
    $summary = $_POST["summary"];
    $notice_text = $_POST["notice_text"];
    $end_time = $_POST["end_time"];
    $notice_id = getNewUuid();

    $today = date("Y-m-d");

    $err_code = '000';
    if($summary == ''){
        $err_code = '801';
    }else if($notice_text == ''){
        $err_code = '802';
    }else if($end_time < $today || $end_time == '请选择日期'){
        $err_code = '803';
    }else{
        $sql = "INSERT INTO s_notice (notice_id,notice_type,summary,notice_text,end_time) VALUES ('$notice_id','$notice_type','$summary','$notice_text','$end_time')";
        $obj = mysqli_query($link, $sql);
        if($obj){
            $flag = 1;
        }
    }

    $jsonStr = array("flag" => $flag, "err_code" => $err_code);
}

echo json_encode($jsonStr);
