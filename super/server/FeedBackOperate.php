<?php
include("../../server/dbconfig.php");
include("../../server/getUuid.php");
include("../../server/ERROR_CODE.php");

/** op
 * get: get all feedback,
 * finish: finish feedback,
 * search: search feedbacks
 *
 ** sort
 * name: Sort by user_name,
 * uuid: Sort by uuid,
 * type: Sort by type,
 * content: Sort by content,
 * time: Sort by time,
 * solved: Sort by solved,
 * sol_time: Sort by sol_time
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
    $s = 'time';
    $m = 'DESC';
    if($sort_m == 'asc' || $sort_m == 'ASC'){
        $m = 'ASC';
    }
    if($sort == 'name'){
        $s = "u.user_name";
    }else if($sort == 'uuid'){
        $s = "f.uuid";
    }else if($sort == 'type'){
        $s = "f.type";
    }else if($sort == 'content'){
        $s = "f.content ";
    }else if($sort == 'time'){
        $s = "f.time";
    }else if($sort == 'solved'){
        $s = "f.solved";
    }else if($sort == 'sol_time'){
        $s = "f.sol_time";
    }
    $sql = "SELECT * FROM s_feedbacks f INNER JOIN s_userinfo u ON f.uuid=u.uuid ORDER BY " . $s . " " . $m;
    $obj = mysqli_query($link, $sql);
    if($obj){
        while($row = mysqli_fetch_array($obj,MYSQLI_ASSOC)){
            $flag = 1;
            $pic_json = '';
            $tmp = array();
            $tmp['uuid'] = $row['uuid'];
            $tmp['user_name'] = $row['user_name'];
            $tmp['id'] = $row['id'];
            $tmp['type'] = $row['type'];
            $tmp['content'] = $row['content'];
            $tmp['pic_json'] = json_decode($row['pic_json'], $assoc = FALSE);
            $tmp['time'] = $row['time'];
            $tmp['solved'] = $row['solved'];
            $tmp['sol_time'] = $row['sol_time'];
            $tmp['sol_words'] = $row['sol_words'];
            $res[] = $tmp;
        }
    }
    $jsonStr = array("flag" => $flag, 'feedbacks' => $res);
}else if($op == "finish"){
    $id = $_POST["id"];
    $sol_words = $_POST["sol_words"];
    $uuid = '';
    $type = '';
    $today = date("Y-m-d H:i:s");

    // find uuid
    $sql = "SELECT uuid,type FROM s_feedbacks WHERE id='$id'";
    $obj = mysqli_query($link, $sql);
    if($obj){
        if($row = mysqli_fetch_array($obj,MYSQLI_ASSOC)){
            $uuid = $row['uuid'];
            $type = $row['type'];
        }
    }
    $type = $type == 'bug' ? 'bug反馈' : '意见建议';
    // leave words
    $sql = "UPDATE s_feedbacks SET solved='1',sol_words='$sol_words',sol_time='$today' WHERE id='$id'";
    $obj = mysqli_query($link, $sql);
    if($obj){
        $flag = 1;
    }
    // send message
    $msg_id = getNewUuid();
    $title = '反馈通知';
    $text = '您关于' . $type . '的反馈得到解决啦，快去看看吧！ 留言：' . $sol_words;
    $sql = "INSERT INTO s_messages (uuid,msg_id,msg_title,msg_text,isread) VALUES ('$uuid','$msg_id','$title','$text','0')";
    $obj = mysqli_query($link, $sql);
    if($obj){
        $flag = 1;
    }

    $jsonStr = array("flag" => $flag);
}else if($op == "search"){
    $sort = $_POST["sort"];
    $sort_m = $_POST["sort_m"];
    $keywords = $_POST["keywords"];
    $res = array();
    $s = 'time';
    $m = 'DESC';
    if($sort_m == 'asc' || $sort_m == 'ASC'){
        $m = 'ASC';
    }
    if($sort == 'name'){
        $s = "u.user_name";
    }else if($sort == 'uuid'){
        $s = "f.uuid";
    }else if($sort == 'type'){
        $s = "f.type";
    }else if($sort == 'content'){
        $s = "f.content ";
    }else if($sort == 'time'){
        $s = "f.time";
    }else if($sort == 'solved'){
        $s = "f.solved";
    }else if($sort == 'sol_time'){
        $s = "f.sol_time";
    }
    $sql = "SELECT * FROM s_feedbacks f INNER JOIN s_userinfo u ON f.uuid=u.uuid 
                                        WHERE f.uuid LIKE '%$keywords%' 
                                        OR u.user_name LIKE '%$keywords%' 
                                        OR f.content LIKE '%$keywords%' ORDER BY " . $s . " " . $m;
    $obj = mysqli_query($link, $sql);
    if($obj){
        while($row = mysqli_fetch_array($obj,MYSQLI_ASSOC)){
            $flag = 1;
            $pic_json = '';
            $tmp = array();
            $tmp['uuid'] = $row['uuid'];
            $tmp['user_name'] = $row['user_name'];
            $tmp['id'] = $row['id'];
            $tmp['type'] = $row['type'];
            $tmp['content'] = $row['content'];
            $tmp['pic_json'] = json_decode($row['pic_json'], $assoc = FALSE);
            $tmp['time'] = $row['time'];
            $tmp['solved'] = $row['solved'];
            $tmp['sol_time'] = $row['sol_time'];
            $tmp['sol_words'] = $row['sol_words'];
            $res[] = $tmp;
        }
    }
    $jsonStr = array("flag" => $flag, 'feedbacks' => $res);
}

echo json_encode($jsonStr);
