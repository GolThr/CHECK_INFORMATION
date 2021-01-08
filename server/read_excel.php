<?php
include("dbconfig.php");
include("getUuid.php");

$file = $_FILES['file']['tmp_name'];
$uuid = $_POST["uuid"];
$tbl_name = $_POST["tbl_name"];

echo $uuid;
echo $tbl_name;

/*
# 载入composer自动加载文件
require 'D:\xampp\php\vendor/autoload.php';

$reader = new \PhpOffice\PhpSpreadsheet\Reader\Xlsx();

try {
    $spreadsheet = $reader->load($_FILES['file']['tmp_name']);
} catch (\PhpOffice\PhpSpreadsheet\Reader\Exception $e) {
    die($e->getMessage());
}

$sheet = $spreadsheet->getActiveSheet();
$res = array();

$i = 0;
foreach ($sheet->getRowIterator() as $row) {
    $tmp = array();
    foreach ($row->getCellIterator() as $cell) {
        $tmp[] = $cell->getFormattedValue();
    }
    if($i == 0){
        array_unshift($tmp, 'id', 'ischecked', 'isviewed', 'checked_time');
    }else{
        array_unshift($tmp, $i, '0', '0', '0');
    }
    $res[$i] = $tmp;
    $i++;
}




echo json_encode($res);

 */