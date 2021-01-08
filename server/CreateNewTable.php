<?php
include("dbconfig.php");
include("getUuid.php");

/*!!!!!!!!!!!!*
 *!表不允许重名!*
 *!!!!!!!!!!!!*/

$uuid = $_POST["uuid"];
$tbl_name = $_POST["tbl_name"];

//flag -> 0:wrong, 1:successful
$check_name = 0;
$reg_flag = 0;
$crt_flag = 0;
$trg_flag = 0;

$tbl_id = getNewUuid();
$dbt_name = 't_' . $tbl_id;
$tbl_colname_json = '["id","ischecked","isviewed","checked_time"]';

//check name
$sql="SELECT * FROM s_tables WHERE uuid='$uuid' AND tbl_name='$tbl_name'";
$obj=mysqli_query($link,$sql);
$row = mysqli_fetch_array($obj,MYSQLI_ASSOC);
if($row){
    $check_name = 0;
}else{
    $check_name = 1;
    //register table
    $sql="INSERT INTO s_tables (uuid,tbl_id,tbl_name,tbl_colname_json,dbt_name,ischecking) VALUES ('$uuid','$tbl_id','$tbl_name','$tbl_colname_json','$dbt_name','0')";
    $obj=mysqli_query($link,$sql);
    if($obj){
        $reg_flag = 0;
    }

    //create table
    $sql="CREATE TABLE `$dbt_name` (`id` int(12) unsigned NOT NULL AUTO_INCREMENT,`ischecked` int(3) unsigned NOT NULL DEFAULT 0,`isviewed` int(3) unsigned NOT NULL DEFAULT 0,`checked_time` datetime(6) NOT NULL,PRIMARY KEY (`id`)) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;";
    $obj = mysqli_query($link,$sql);
    if($obj){
        $crt_flag = 0;
    }

    //add trigger
    $sql = "CREATE TRIGGER `$tbl_id` BEFORE UPDATE ON `$dbt_name` FOR EACH ROW set new.checked_time=now();";
    $obj = mysqli_query($link,$sql);
    if($obj){
        $trg_flag = 1;
    }
}

$jsonStr = array("check_name" => $check_name, "reg_flag" => $reg_flag, "crt_flag" => $crt_flag, "trg_flag" => $trg_flag);
echo json_encode($jsonStr);
