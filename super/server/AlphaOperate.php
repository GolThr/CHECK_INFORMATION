<?php
include("../../server/dbconfig.php");

/** op
 * get: get all codes,
 * search: search codes,
 * add: add an alpha code,
 * del: delete an alpha code
 *
 ** sort
 * code: Sort by code,
 * uuid: Sort by uuid,
 * add: Sort by add_time,
 * used: Sort by used_time
 *
 ** sort_m
 * desc: Descending sort,
 * asc: Ascending sort
 */

function getAlphaCode(){
    $tmp = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', '0','1', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '2', 'I', 'J', 'K', 'L', 'M','3','4', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r','5', 'N', 'O', 'P', 'Q', 'R','6','7','8', 'S', 'T', 'U', 'V', 'W','9', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
    $code = "";
    for($i = 0; $i < 8; $i++){
        $code = $code . $tmp[rand(0, 61)];
    }
    return $code;
}

$op = $_POST["op"];

$flag = 0;
$jsonStr = array();
if($op == "get"){
    $sort = $_POST["sort"];
    $sort_m = $_POST["sort_m"];
    $res = array();
    $s = 'add_time';
    $m = 'DESC';
    if($sort_m == 'asc' || $sort_m == 'ASC'){
        $m = 'ASC';
    }
    if($sort == 'code'){
        $s = 'code';
    }else if($sort == 'uuid'){
        $s = 'uuid';
    }else if($sort == 'add'){
        $s = 'add_time';
    }else if($sort == 'used'){
        $s = 'used_time';
    }
    $sql = "SELECT * FROM s_alpha ORDER BY " . $s . " " . $m;
    $obj = mysqli_query($link, $sql);
    if($obj){
        while($row = mysqli_fetch_array($obj,MYSQLI_ASSOC)){
            $flag = 1;
            $tmp = array();
            $tmp['code'] = $row['code'];
            $tmp['uuid'] = $row['uuid'];
            $tmp['add_time'] = $row['add_time'];
            $tmp['used_time'] = $row['used_time'];
            $res[] = $tmp;
        }
    }
    $jsonStr = array("flag" => $flag, 'alpha_codes' => $res);
}else if($op == "search"){
    $sort = $_POST["sort"];
    $sort_m = $_POST["sort_m"];
    $keywords = $_POST["keywords"];
    $res = array();
    $s = 'add_time';
    $m = 'DESC';
    if($sort_m == 'asc' || $sort_m == 'ASC'){
        $m = 'ASC';
    }
    if($sort == 'code'){
        $s = 'code';
    }else if($sort == 'uuid'){
        $s = 'uuid';
    }else if($sort == 'add'){
        $s = 'add_time';
    }else if($sort == 'used'){
        $s = 'used_time';
    }
    $sql = "SELECT * FROM s_alpha WHERE code LIKE '%$keywords%' 
                                        OR uuid LIKE '%$keywords%' 
                                        OR add_time LIKE '%$keywords%' 
                                        OR used_time LIKE '%$keywords%'  ORDER BY " . $s . " " . $m;
    $obj = mysqli_query($link, $sql);
    if($obj){
        while($row = mysqli_fetch_array($obj,MYSQLI_ASSOC)){
            $flag = 1;
            $tmp = array();
            $tmp['code'] = $row['code'];
            $tmp['uuid'] = $row['uuid'];
            $tmp['add_time'] = $row['add_time'];
            $tmp['used_time'] = $row['used_time'];
            $res[] = $tmp;
        }
    }
    $jsonStr = array("flag" => $flag, 'alpha_codes' => $res);
}else if($op == 'add'){
    $code = getAlphaCode();
    $sql = "INSERT INTO s_alpha (code,uuid) VALUES ('$code','0')";
    $obj = mysqli_query($link, $sql);
    if($obj){
        $flag = 1;
    }
    $jsonStr = array("flag" => $flag);
}else if($op == 'del'){
    $code = $_POST['code'];
    $sql = "DELETE FROM s_alpha WHERE code='$code'";
    $obj = mysqli_query($link, $sql);
    if($obj){
        $flag = 1;
    }
    $jsonStr = array("flag" => $flag);
}

echo json_encode($jsonStr);
