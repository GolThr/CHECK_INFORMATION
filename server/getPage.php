<?php
include("dbconfig.php");


function getPageData($link, $sql, $order_by, $order, $all_n, $per, $page){
    if($all_n <= 0 || $per <= 0 || $page <= 0) return;
    $start = $per * $page - $per;
    $start = $start >= $all_n ? 0 : $start;
    $len = $per * $page > $all_n ? -1 : $per;
    $sql = $sql . " ORDER BY $order_by $order LIMIT $start,$len";
    $obj = mysqli_query($link, $sql);
    return $obj;
}



$dbt_name = '';
$tbl_colname_json = null;
$ischecking = 0;

//find table id
$sql = "SELECT dbt_name,tbl_colname_json,ischecking FROM s_tables WHERE uuid='ee248a63-62e2-3398-8c3d-be2a746c0aa6' AND tbl_name='17计二班里详细资料4.0'";
$obj = mysqli_query($link, $sql);
if($obj){
    $row = mysqli_fetch_array($obj,MYSQLI_ASSOC);
    if($row){
        $dbt_name = $row['dbt_name'];
        $tbl_colname_json = $row['tbl_colname_json'];
        $ischecking = $row['ischecking'];
    }
}
$head = json_decode($tbl_colname_json, $assoc = FALSE);


$res = array();
$i = 0;
$obj = getPageData($link,"SELECT * FROM `t_fa1aafff-e61f-3582-d39e-9f13eccb59d8`",'学号','ASC',58,10,2);
if($obj){
    while($row = mysqli_fetch_array($obj,MYSQLI_ASSOC)){
        $tmp = array();
        foreach ($head as $colName){
            $tmp[] = $row[$colName];
        }
        $res[$i++] = $tmp;
    }
}

$jsonStr = array("data" => $res);
echo json_encode($jsonStr);