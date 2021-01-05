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

foreach ($sheet->getRowIterator() as $row) {
    $tmp = array();
    foreach ($row->getCellIterator() as $cell) {
        $tmp[] = $cell->getFormattedValue();
    }
    $res[$row->getRowIndex()] = $tmp;
}

echo json_encode($res);