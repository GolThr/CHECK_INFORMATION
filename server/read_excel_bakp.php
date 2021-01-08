<?php
$file = $_FILES['file']['tmp_name'];
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
$data = array();
$i = 0;

foreach ($sheet->getRowIterator() as $row) {
    $tmp = array();
    $i++;
    foreach ($row->getCellIterator() as $cell) {
        $tmp[] = $cell->getFormattedValue();
    }
    if($i == 1){
        $res['head'] = $tmp;
    }else{
        $data[$i - 1] = $tmp;
    }
}
$res['data'] = $data;

echo json_encode($res);