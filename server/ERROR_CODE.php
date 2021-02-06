<?php

function ERR_TEXT($err_code){
    switch ($err_code){
        case '000':{
            return '成功';
        }
        case '701':{
            return '文件已存在';
        }
        case '702':{
            return '文件过大';
        }
        case '703':{
            return '不支持的文件格式';
        }
        case '704':{
            return '文件数量过多';
        }
    }
}
