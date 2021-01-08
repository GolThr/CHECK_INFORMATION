<?php
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

//$data = $_POST["data"];
$data = [
    ['1','2','3'],
    ['d','f','g']
];

require 'D:\xampp\php\vendor/autoload.php';
use PhpOffice\PhpSpreadsheet\IOFactory;
use PhpOffice\PhpSpreadsheet\Spreadsheet;


$spreadsheet = new Spreadsheet();
$worksheet = $spreadsheet->getActiveSheet();

//设置工作表标题名称
$worksheet->setTitle('工作表格1');

$row = 1; //从第二行开始
foreach ($data as $item) {
    $column = 1;
    foreach ($item as $value) {
        $worksheet->setCellValueByColumnAndRow($column, $row, $value);
        $column++;
    }
    $row++;
}

$fileName = '学生信息';
$fileType = 'Xlsx';

//1.下载到服务器
//$writer = IOFactory::createWriter($spreadsheet, 'Xlsx');
//$writer->save($fileName.'.'.$fileType);

//2.输出到浏览器
$writer = IOFactory::createWriter($spreadsheet, 'Xlsx'); //按照指定格式生成Excel文件
excelBrowserExport($fileName, 'Xlsx');
$writer->save('php://output');