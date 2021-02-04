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
 * uuid: Sort by uuid,
 * name: Sort by user_name,
 * title: Sort by title,
 * text: Sort by text,
 * pub: Sort by pub_time,
 * read: Sort by isread
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
    if($sort == 'uuid'){
        $s = "uuid";
    }else if($sort == 'name'){
        $s = "user_name";
    }else if($sort == 'title'){
        $s = "msg_title";
    }else if($sort == 'text'){
        $s = "msg_text";
    }else if($sort == 'pub'){
        $s = "pub_time";
    }else if($sort == 'read'){
        $s = "isread";
    }
    $sql = "SELECT * FROM s_messages m INNER JOIN s_userinfo u ON m.uuid=u.uuid ORDER BY m." . $s . " " . $m;
    $obj = mysqli_query($link, $sql);
    if($obj){
        while($row = mysqli_fetch_array($obj,MYSQLI_ASSOC)){
            $flag = 1;
            $tmp = array();
            $tmp['uuid'] = $row['uuid'];
            $tmp['user_name'] = $row['user_name'];
            $tmp['msg_id'] = $row['msg_id'];
            $tmp['msg_title'] = $row['msg_title'];
            $tmp['msg_text'] = $row['msg_text'];
            $tmp['pub_time'] = $row['pub_time'];
            $tmp['isread'] = $row['isread'];
            $tmp['read_time'] = $row['read_time'];
            $res[] = $tmp;
        }
    }
    $jsonStr = array("flag" => $flag, 'messages' => $res);
}else if($op == "view"){
    $msg_id = $_POST["msg_id"];

    $res = array();
    $sql = "SELECT * FROM s_messages m INNER JOIN s_userinfo u ON m.uuid=u.uuid WHERE m.msg_id='$msg_id'";
    $obj = mysqli_query($link, $sql);
    if($obj){
        if($row = mysqli_fetch_array($obj,MYSQLI_ASSOC)){
            $flag = 1;
            $res['uuid'] = $row['uuid'];
            $res['user_name'] = $row['user_name'];
            $res['msg_id'] = $row['msg_id'];
            $res['msg_title'] = $row['msg_title'];
            $res['msg_text'] = $row['msg_text'];
            $res['pub_time'] = $row['pub_time'];
            $res['isread'] = $row['isread'];
            $res['read_time'] = $row['read_time'];
        }
    }
    $jsonStr = array("flag" => $flag, 'notice' => $res);
}else if($op == "del"){
    $msg_id = $_POST["msg_id"];

    $sql = "DELETE FROM s_messages WHERE msg_id='$msg_id'";
    $obj = mysqli_query($link, $sql);
    if($obj){
        $flag = 1;
    }
    $jsonStr = array("flag" => $flag);
}else if($op == "pub"){
//    $notice_type = $_POST["notice_type"];
//    $summary = $_POST["summary"];
//    $notice_text = $_POST["notice_text"];
//    $end_time = $_POST["end_time"];
//    $notice_id = getNewUuid();
//
//    $today = date("Y-m-d");
//
//    $err_code = '000';
//    if($summary == ''){
//        $err_code = '801';
//    }else if($notice_text == ''){
//        $err_code = '802';
//    }else if($end_time < $today || $end_time == '请选择日期'){
//        $err_code = '803';
//    }else{
//        $sql = "INSERT INTO s_notice (notice_id,notice_type,summary,notice_text,end_time) VALUES ('$notice_id','$notice_type','$summary','$notice_text','$end_time')";
//        $obj = mysqli_query($link, $sql);
//        if($obj){
//            $flag = 1;
//        }
//    }
//
//    $jsonStr = array("flag" => $flag, "err_code" => $err_code);
}

echo json_encode($jsonStr);
