<?php
include("dbconfig.php");
include("getUuid.php");
include("ERROR_CODE.php");

/** op
 * get: get all feedback,
 * del: delete feedback by id,
 * pub: publish feedback
 */

$op = $_POST["op"];
$uuid = $_POST["uuid"];

$flag = 0;
$jsonStr = array();
if($op == "get"){
    $res = array();
    $sql = "SELECT * FROM s_feedbacks WHERE uuid='$uuid' ORDER BY time DESC";
    $obj = mysqli_query($link, $sql);
    if($obj){
        while($row = mysqli_fetch_array($obj,MYSQLI_ASSOC)){
            $flag = 1;
            $pic_json = '';
            $tmp = array();
            $tmp['id'] = $row['id'];
            $tmp['type'] = $row['type'];
            $tmp['content'] = $row['content'];
            $tmp['pic_json'] = json_decode($row['pic_json'], $assoc = FALSE);
            $tmp['time'] = $row['time'];
            $tmp['solved'] = $row['solved'];
            $tmp['sol_time'] = $row['sol_time'];
            $tmp['sol_words'] = $row['sol_words'];
            $res[] = $tmp;
        }
    }
    $jsonStr = array("flag" => $flag, 'feedbacks' => $res);
}else if($op == "del"){

}else if($op == "pub"){
    $type = $_POST["type"];
    $text = $_POST["text"];
    $n_pics = (int)$_POST["n_picArray"];

    $id = getNewUuid();
    $pics_str = array();
    $err_code = '000';

    if($uuid == ''){
        $err_code = '801';
    }else if($type == ''){
        $err_code = '802';
    }else if($text == ''){
        $err_code = '803';
    }else if($n_pics > 5){
        $err_code = '704';  // too many files
    }else{
        for($i = 0; $i < $n_pics; $i++){
            $pic_item = $_FILES['pic'.$i];
            if($pic_item["size"] > 5242880){
                $err_code = '702';
            }else if($pic_item["type"] != "image/jpeg" && $pic_item["type"] != "image/png"){
                $err_code = '703';
            }else{
                $cur_time = getNewUniqid();
                $file_type = '';
                if($pic_item["type"] != "image/jpeg"){
                    $file_type = '.jpg';
                }else{
                    $file_type = '.png';
                }
                //临时文件的路径: $arr["tmp_name"]
                //上传的文件存放的位置
                //避免文件重复:
                //1.加时间戳.time()加用户名.$uid或者加.date('YmdHis')
                //2.类似网盘，使用文件夹来防止重复
                $filename_json = "feedback/" . $uuid . '_' . $cur_time . $file_type;
                $filename = "../" . $filename_json;
                if (file_exists($filename)) {
                    $err_code = '701';
                    //chmod($filename,0777);
                } else {
                    if(file_exists($filename))
                        //中文名的文件出现问题，所以需要转换编码格式
                        $filename = iconv("UTF-8", "gb2312", $filename);
                    //移动临时文件到上传的文件存放的位置（核心代码）
                    //括号里：1.临时文件的路径, 2.存放的路径
                    move_uploaded_file($pic_item["tmp_name"], $filename);
                    $pics_str[] = $filename_json;
                }
            }
        }
        $pic_json = json_encode($pics_str, JSON_UNESCAPED_UNICODE);
        $sql = "INSERT INTO s_feedbacks (id,uuid,type,content,pic_json,solved) VALUES ('$id','$uuid','$type','$text','$pic_json','0')";
        $obj = mysqli_query($link, $sql);
        if($obj){
            $flag = 1;
        }
    }

    $jsonStr = array("err_code" => $err_code, "err_text" => ERR_TEXT($err_code));
}

echo json_encode($jsonStr);
