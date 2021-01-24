<?php
include("dbconfig.php");
include("getUuid.php");

$sha_id = $_POST["s"];
$type = $_POST["op"]; //check: check link, verify: verify link pwd, query: query user info
$data = $_POST["data"];
$tbl_id = '';
$sha_pwd = '';
$sha_vercol_json = '';

//flag -> 0:wrong, 1:successful
$find_s_flag = 0;
$flags = array("flag" => 0);
$jsonStr = array("flags" => $flags);

//find share
$sql = "SELECT tbl_id,sha_pwd,sha_vercol_json FROM s_shares WHERE sha_id='$sha_id'";
$obj = mysqli_query($link, $sql);
if($obj){
    $row = mysqli_fetch_array($obj,MYSQLI_ASSOC);
    if($row){
        $tbl_id = $row['tbl_id'];
        $sha_pwd = $row['sha_pwd'];
        $sha_vercol_json = $row['sha_vercol_json'];
        $find_s_flag = 1;
    }else{
        $find_s_flag = 0;
    }
}
$sha_vercol = json_decode($sha_vercol_json, $assoc = FALSE);

if($type == 'check'){
    //find user info
    $tbl_name = '';
    $user_name = '';
    $avatar = '';
    $find_usr_flag = 0;
    $sql = "SELECT user_name,avatar,tbl_name FROM s_tables tb INNER JOIN s_userinfo ur ON tb.uuid=ur.uuid WHERE tbl_id='$tbl_id'";
    $obj = mysqli_query($link, $sql);
    if($obj){
        $row = mysqli_fetch_array($obj,MYSQLI_ASSOC);
        if($row){
            $tbl_name = $row['tbl_name'];
            $user_name = $row['user_name'];
            $avatar = $row['avatar'];
            $find_usr_flag = 1;
        }else{
            $find_usr_flag = 0;
        }
    }
    $flag = $find_s_flag && $find_usr_flag;
    $flags = array("flag" => $flag, "find_s_flag" =>$find_s_flag, "find_usr_flag" => $find_usr_flag);
    $jsonStr = array("flags" => $flags, "tbl_name" => $tbl_name, "user_name" => $user_name, "avatar" => $avatar);
}else if($type == 'verify'){
    $check_pwd_flag = 0;
    if($data == $sha_pwd){
        $check_pwd_flag = 1;
    }
    $flag = $find_s_flag && $check_pwd_flag;
    $flags = array("flag" => $flag, "find_s_flag" => $find_s_flag, "check_pwd_flag" => $check_pwd_flag);
    $jsonStr = array("flags" => $flags, "vercol" => $sha_vercol);
}else if($type == 'query'){
    //find dbt_name
    $dbt_name = '';
    $tbl_colname_json = null;
    $find_dbt_flag = 0;
    $query_flag = 0;
    $sql = "SELECT dbt_name,tbl_colname_json FROM s_tables WHERE tbl_id='$tbl_id'";
    $obj = mysqli_query($link, $sql);
    if($obj){
        $row = mysqli_fetch_array($obj,MYSQLI_ASSOC);
        if($row){
            $dbt_name = $row['dbt_name'];
            $tbl_colname_json = $row['tbl_colname_json'];
            $find_dbt_flag = 1;
        }else{
            $find_dbt_flag = 0;
        }
    }
    $head = json_decode($tbl_colname_json, $assoc = FALSE);
    //query info
    $res = array();
    $query_head = array();
    $n_vercol = count($sha_vercol);
    $sql = "SELECT * FROM `$dbt_name` WHERE ";
    $sql_set_viewed = "UPDATE `$dbt_name` SET isviewed='1' WHERE ";
    for($i = 0; $i < $n_vercol; $i++){
        if($i != 0){
            $sql = $sql . " AND ";
            $sql_set_viewed = $sql_set_viewed . " AND ";
        }
        $sql = $sql . "$sha_vercol[$i]='$data[$i]'";
        $sql_set_viewed = $sql_set_viewed . "$sha_vercol[$i]='$data[$i]'";
    }
    $obj = mysqli_query($link, $sql);
    if($obj){
        $row = mysqli_fetch_array($obj,MYSQLI_ASSOC);
        if($row){
            foreach ($head as $colName){
                if($colName == 'id' || $colName == 'ischecked' || $colName == 'isviewed' || $colName == 'checked_time'){
                    continue;
                }
                $query_head[] = $colName;
                $res[] = $row[$colName];
            }
            //set viewed
            $obj_v = mysqli_query($link, $sql_set_viewed);
            $query_flag = 1;
        }else{
            $query_flag = 0;
        }
    }

    $flag = $find_s_flag && $find_dbt_flag && $query_flag;
    $flags = array("flag" => $flag, "find_s_flag" => $find_s_flag, "find_dbt_flag" => $find_dbt_flag, "query_flag" => $query_flag);
    $jsonStr = array("flags" => $flags, "vercol" => $sha_vercol, "head" => $query_head, "data" => $res);
}

echo json_encode($jsonStr);
