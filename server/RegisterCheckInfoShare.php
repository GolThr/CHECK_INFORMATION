<?php
include("dbconfig.php");
include("getUuid.php");

$uuid = $_POST["uuid"];
$tbl_name = $_POST["tbl_name"];
$s_pwd = $_POST["s_pwd"];
$ver_col = $_POST["ver_col"];
$tbl_id = '';
$dbt_name = '';
$sha_vercol_json = json_encode($ver_col,JSON_UNESCAPED_UNICODE);

//flag -> 0:wrong, 1:successful
$find_flag = 0;
$reg_flag = 0;
$add_flag = 0;

//find table id
$sql = "SELECT tbl_id,dbt_name FROM s_tables WHERE uuid='$uuid' AND tbl_name='$tbl_name'";
$obj = mysqli_query($link, $sql);
if($obj){
    $row = mysqli_fetch_array($obj,MYSQLI_ASSOC);
    if($row){
        $tbl_id = $row['tbl_id'];
        $dbt_name = $row['dbt_name'];
        $find_flag = 1;
    }else{
        $find_flag = 0;
    }
}

//register share
$sql = "UPDATE s_tables SET ischecking='1' WHERE tbl_id='$tbl_id'";
$obj = mysqli_query($link, $sql);
if($obj){
    $reg_flag = 1;
}

//add share
$share_id = getNewUniqid();
$sql = "INSERT INTO s_shares (`sha_id`,`tbl_id`,`sha_pwd`,`sha_vercol_json`) VALUES ('$share_id','$tbl_id','$s_pwd','$sha_vercol_json')";
$obj = mysqli_query($link, $sql);
if($obj){
    $add_flag = 1;
}

$flag = $find_flag && $reg_flag && $add_flag;
$flags = array("flag" => $flag, "find_flag" => $find_flag, "reg_flag" => $reg_flag, "add_flag" => $add_flag);
$jsonStr = array("flags" => $flags, "share_id" => $share_id);
echo json_encode($jsonStr);
// add_flag == 1 is success
