<?php
include("dbconfig.php");

$type = $_POST["type"];     //type: get, read
$uuid = $_POST["uuid"];

if($type == 'get'){
    // get all notice
    $flag = 0;
    $res = array();
    $sql = "SELECT * FROM s_messages WHERE uuid='$uuid' ORDER BY pub_time DESC";
    $obj = mysqli_query($link, $sql);
    if($obj){
        while($row = mysqli_fetch_array($obj,MYSQLI_ASSOC)){
            $flag = 1;
            $tmp = array();
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
    echo json_encode($jsonStr);
    return;
}else if ($type == 'read'){
    $msg_id = $_POST["msg_id"];
    $today = date("Y-m-d H:i:s");

    $flag = 0;
    $isread = 0;
    $sql = "SELECT isread FROM s_messages WHERE uuid='$uuid' AND msg_id='$msg_id'";
    $obj = mysqli_query($link, $sql);
    if($obj){
        if($row = mysqli_fetch_array($obj,MYSQLI_ASSOC)){
            if($row['isread'] == '0'){
                $isread = 1;
            }
        }
    }
    if($isread == 1){
        $sql = "UPDATE s_messages SET isread='1',read_time='$today' WHERE uuid='$uuid' AND msg_id='$msg_id'";
        $obj = mysqli_query($link, $sql);
        if($obj){
            $flag = 1;
        }
    }
    $jsonStr = array("flag" => $flag);
    echo json_encode($jsonStr);
    return;
}

$jsonStr = array("flag" => "0");
echo json_encode($jsonStr);
