<?php
include("dbconfig.php");

/** type
 * all: all login logs
 * less: return n logs
 */
$type = $_POST["type"];
$uuid = $_POST["uuid"];

$flag = 0;
$jsonStr = array();

if($type == 'all'){
    $res = array();
    $sql = "SELECT * FROM s_login WHERE uuid='$uuid' ORDER BY time DESC";
    $obj=mysqli_query($link,$sql);
    if($obj) {
        while($row = mysqli_fetch_array($obj, MYSQLI_ASSOC)) {
            $flag = 1;
            $tmp = array();
            $tmp['log_id'] = $row['log_id'];
            $tmp['uuid'] = $row['uuid'];
            $tmp['ip'] = $row['ip'];
            $tmp['loc'] = $row['loc'];
            $tmp['method'] = $row['method'];
            $tmp['platform'] = $row['platform'];
            $tmp['time'] = $row['time'];
            $res[] = $tmp;
        }
        $jsonStr['logs'] = $res;
    }
}else if($type == 'less'){
    $n = (int)$_POST["n"];
    $res = array();
    $i = 0;
    $sql = "SELECT * FROM s_login WHERE uuid='$uuid' ORDER BY time DESC";
    $obj=mysqli_query($link,$sql);
    if($obj) {
        while($row = mysqli_fetch_array($obj, MYSQLI_ASSOC)) {
            $flag = 1;
            if($i++ < $n){
                $tmp = array();
                $tmp['log_id'] = $row['log_id'];
                $tmp['uuid'] = $row['uuid'];
                $tmp['ip'] = $row['ip'];
                $tmp['loc'] = $row['loc'];
                $tmp['method'] = $row['method'];
                $tmp['platform'] = $row['platform'];
                $tmp['time'] = $row['time'];
                $res[] = $tmp;
            }
        }
        $jsonStr['logs'] = $res;
    }
}

$jsonStr['flag'] = $flag;
echo json_encode($jsonStr);
