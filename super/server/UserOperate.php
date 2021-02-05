<?php
include("../../server/dbconfig.php");
include("../../server/getUuid.php");

/** op
 * get: get all notice,
 * search: search users
 *
 ** sort
 * uuid: Sort by uuid,
 * name: Sort by user_name,
 * email: Sort by title,
 * phone: Sort by text,
 * gender: Sort by pub_time,
 * time: Sort by isread
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
    $s = 'reg_time';
    $m = 'DESC';
    if($sort_m == 'asc' || $sort_m == 'ASC'){
        $m = 'ASC';
    }
    if($sort == 'uuid'){
        $s = 'uuid';
    }else if($sort == 'name'){
        $s = 'user_name';
    }else if($sort == 'email'){
        $s = 'email';
    }else if($sort == 'phone'){
        $s = 'phone_number';
    }else if($sort == 'gender'){
        $s = 'gender';
    }else if($sort == 'time'){
        $s = 'reg_time';
    }
    $sql = "SELECT * FROM s_userinfo ORDER BY " . $s . " " . $m;
    $obj = mysqli_query($link, $sql);
    if($obj){
        while($row = mysqli_fetch_array($obj,MYSQLI_ASSOC)){
            $flag = 1;
            $tmp = array();
            $tmp['uuid'] = $row['uuid'];
            $tmp['user_name'] = $row['user_name'];
            $tmp['email'] = $row['email'];
            $tmp['phone_number'] = $row['phone_number'];
            $tmp['gender'] = $row['gender'];
            $tmp['avatar'] = $row['avatar'];
            $tmp['reg_time'] = $row['reg_time'];
            $res[] = $tmp;
        }
    }
    $jsonStr = array("flag" => $flag, 'users' => $res);
}else if($op == "search"){
    $sort = $_POST["sort"];
    $sort_m = $_POST["sort_m"];
    $keywords = $_POST["keywords"];
    $res = array();
    $s = 'reg_time';
    $m = 'DESC';
    if($sort_m == 'asc' || $sort_m == 'ASC'){
        $m = 'ASC';
    }
    if($sort == 'uuid'){
        $s = 'uuid';
    }else if($sort == 'name'){
        $s = 'user_name';
    }else if($sort == 'email'){
        $s = 'email';
    }else if($sort == 'phone'){
        $s = 'phone_number';
    }else if($sort == 'gender'){
        $s = 'gender';
    }else if($sort == 'time'){
        $s = 'reg_time';
    }
    $sql = "SELECT * FROM s_userinfo WHERE uuid LIKE '%$keywords%' 
                                        OR user_name LIKE '%$keywords%' 
                                        OR email LIKE '%$keywords%' 
                                        OR phone_number LIKE '%$keywords%' 
                                        OR reg_time LIKE '%$keywords%'  ORDER BY " . $s . " " . $m;
    $obj = mysqli_query($link, $sql);
    if($obj){
        while($row = mysqli_fetch_array($obj,MYSQLI_ASSOC)){
            $flag = 1;
            $tmp = array();
            $tmp['uuid'] = $row['uuid'];
            $tmp['user_name'] = $row['user_name'];
            $tmp['email'] = $row['email'];
            $tmp['phone_number'] = $row['phone_number'];
            $tmp['gender'] = $row['gender'];
            $tmp['avatar'] = $row['avatar'];
            $tmp['reg_time'] = $row['reg_time'];
            $res[] = $tmp;
        }
    }
    $jsonStr = array("flag" => $flag, 'users' => $res);
}

echo json_encode($jsonStr);
