<?php
include("dbconfig.php");
include("getUuid.php");

$uuid = $_POST["uuid"];
$tbl_name = $_POST["tbl_name"];
$data = $_POST["data"];

//flag -> 0:wrong, 1:successful
$find_flag = 0;
$reg_flag = 0;
$crt_flag = 0;
$ins_flag = 0;
$trg_flag = 0;

$tbl_id = getNewUuid();
$dbt_name = 't_' . $tbl_id;
$tbl_colname_json = json_encode($data[0]);

//register table
$sql="INSERT INTO s_tables (uuid,tbl_id,tbl_name,tbl_colname_json,dbt_name,ischecking) VALUES ('$uuid','$tbl_id','$tbl_name','$tbl_colname_json','$dbt_name','0')";
$obj=mysqli_query($link,$sql);
if($obj){
    $reg_flag = 0;
}

echo $sql;
echo"\r\n";

//create table
$sql="CREATE TABLE `$dbt_name`(`id` INT UNSIGNED AUTO_INCREMENT";
$sql_insert="INSERT INTO `$dbt_name` (`id`";
foreach ($data[0] as $h){
    if($h != "id"){
        $sql = $sql . ",`$h` TEXT";
        $sql_insert = $sql_insert . ",`$h`";
    }
}
$sql = $sql . ",PRIMARY KEY (`id`))ENGINE=InnoDB DEFAULT CHARSET=utf8;";
$obj = mysqli_query($link,$sql);
if($obj){
    $crt_flag = 0;
}

echo $sql;
echo"\r\n";

//insert data
$i = 0;
foreach ($data as $row){
    if($i++ == 0) continue;
    $j = 0;
    $sql_insert_run = $sql_insert . ") VALUES (";
    foreach ($row as $col){
        if($j++ == 0){
            $sql_insert_run = $sql_insert_run . "'$col'";
        }else{
            $sql_insert_run = $sql_insert_run . ",'$col'";
        }
    }
    $sql_insert_run = $sql_insert_run . ")";
    //insert
    $obj = mysqli_query($link,$sql_insert_run);
    if($obj){
        $ins_flag = 1;
    }
    echo $sql_insert_run;
    echo"\r\n";
}

//add trigger
$sql = "CREATE TRIGGER `$tbl_id` BEFORE UPDATE ON `$dbt_name` FOR EACH ROW set new.checked_time=now();";
$obj = mysqli_query($link,$sql);
if($obj){
    $trg_flag = 1;
}

echo $sql;
echo"\r\n";

$jsonStr = array("reg_flag" => $reg_flag, "crt_flag" => $crt_flag, "ins_flag" => $ins_flag, "trg_flag" => $trg_flag);
echo json_encode($jsonStr);
