<?php
include("../../server/dbconfig.php");
include("../../server/getUuid.php");

/** op
 * get: get all notice,
 * view: get one notice by notice_id,
 * del: delete one notice by notice_id,
 * pub: publish notice,
 * check_u: check uuid if it is right
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
    $uuid = $_POST["uuid"];
    $title = $_POST["title"];
    $text = $_POST["text"];
    $msg_id = getNewUuid();
    $err_code = '000';

    if($uuid == ''){
        $err_code = '801';
    }else if($title == ''){
        $err_code = '802';
    }else if($text == ''){
        $err_code = '803';
    }else{
        $sql = "INSERT INTO s_messages (uuid,msg_id,msg_title,msg_text,isread,read_time) VALUES ('$uuid','$msg_id','$title','$text','0','0-0-0')";
        $obj = mysqli_query($link, $sql);
        if($obj){
            $flag = 1;
        }
    }

    $jsonStr = array("flag" => $flag, "err_code" => $err_code);
}else if($op == "check_u"){
    $u = $_POST["u"];
    $uuid = '';
    $user_name = '';

    $sql = "SELECT user_name,uuid FROM s_userinfo WHERE uuid='$u'";
    $obj = mysqli_query($link, $sql);
    if($obj){
        if($row = mysqli_fetch_array($obj,MYSQLI_ASSOC)){
            $flag = 1;
            $uuid = $row['uuid'];
            $user_name = $row['user_name'];
        }
    }

    $jsonStr = array("flag" => $flag, "uuid" => $uuid, "user_name" => $user_name);
}

echo json_encode($jsonStr);
