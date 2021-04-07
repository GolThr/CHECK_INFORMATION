<?php
include("server/dbconfig.php");
// Windows
require 'D:\xampp\php\vendor/autoload.php';
// Linux
//require '/root/vendor/autoload.php';
use PhpOffice\PhpSpreadsheet\IOFactory;
use PhpOffice\PhpSpreadsheet\Spreadsheet;

$uuid = $_GET["i"];
$tbl_name = $_GET["name"];
//$uuid = "ee248a63-62e2-3398-8c3d-be2a746c0aa6";
//$tbl_name = "大结局";

//flag -> 0:wrong, 1:successful
$find_flag = 0;

$dbt_name = '';
$tbl_colname_json = null;

//find table
$sql = "SELECT dbt_name,tbl_colname_json FROM s_tables WHERE uuid='$uuid' AND tbl_name='$tbl_name'";
$obj = mysqli_query($link, $sql);
if($obj){
    $row = mysqli_fetch_array($obj,MYSQLI_ASSOC);
    if($row){
        $dbt_name = $row['dbt_name'];
        $tbl_colname_json = $row['tbl_colname_json'];
        $find_flag = 1;
    }else{
        $find_flag = 0;
    }
}
// assoc true as array, false as class object
$head_obj = json_decode($tbl_colname_json, $assoc = TRUE);

//fetch table data
$res = array();
$i = 0;
$sql = "SELECT * FROM `$dbt_name`";
$obj = mysqli_query($link, $sql);
if($obj){
    while($row = mysqli_fetch_array($obj,MYSQLI_ASSOC)){
        $tmp = array();
        foreach ($head_obj as $colName_obj){
            $tmp[] = (string)$row[$colName_obj['colname']];
        }
        $res[$i++] = $tmp;
    }
}

//prepare excel
function excelBrowserExport($fileName, $fileType) {
    //文件名称校验
    if(!$fileName) {
        trigger_error('文件名不能为空', E_USER_ERROR);
    }

    //Excel文件类型校验
    $type = ['Excel2007', 'Xlsx', 'Excel5', 'xls'];
    if(!in_array($fileType, $type)) {
        trigger_error('未知文件类型', E_USER_ERROR);
    }

    if($fileType == 'Excel2007' || $fileType == 'Xlsx') {
        header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        header('Content-Disposition: attachment;filename="'.$fileName.'.xlsx"');
        header('Cache-Control: max-age=0');
    } else { //Excel5
        header('Content-Type: application/vnd.ms-excel');
        header('Content-Disposition: attachment;filename="'.$fileName.'.xls"');
        header('Cache-Control: max-age=0');
    }
}

$spreadsheet = new Spreadsheet();
$worksheet = $spreadsheet->getActiveSheet();

//设置工作表标题名称
$worksheet->setTitle('工作表格1');

//prepare head
$row = 1; //Excel第一行开始
$column = 1;
foreach ($head_obj as $item) {
    $worksheet->setCellValueByColumnAndRow($column, $row, $item['colname']);
    $column++;
}
//prepare data
$row = 2;
foreach ($res as $item) {
    $column = 1;
    foreach ($item as $value) {
        $worksheet->setCellValueByColumnAndRow($column, $row, (string)$value);
        $column++;
    }
    $row++;
}

$fileName = $tbl_name;
$fileType = 'Xlsx';

//1.下载到服务器
//$writer = IOFactory::createWriter($spreadsheet, 'Xlsx');
//$writer->save($fileName.'.'.$fileType);

//2.输出到浏览器
$writer = IOFactory::createWriter($spreadsheet, 'Xlsx'); //按照指定格式生成Excel文件
excelBrowserExport($fileName, 'Xlsx');
$writer->save('php://output');
