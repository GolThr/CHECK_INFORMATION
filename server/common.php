<?php
/**
 * verify strings
 */
function isEmailStr($email) {
    // 对电子邮件的验证
    $myreg = "/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/";
    if (preg_match($myreg, $email)) {
        return true;
    } else {
        return false;
    }
}

function checkPasswordStrength($pwd) {
    // 验证密码
    $hard = "/^(?!bai[a-zA-z]+$)(?!\d+$)(?![!@#$%^&*\.]+$)(?![a-zA-z\d]+$)(?![a-zA-z!@#$%^&*\.]+$)(?![\d!@#$%^&*\.]+$)[a-zA-Z\d!@#$%^&*\.]+$/";
    $middle = "/^(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&*\.]+$)[a-zA-Z\d!@#$%^&*\.]+$/";
    $weak = "/^(?:\d+|[a-zA-Z]+|[!@#$%^&*\.]+)$/";
    if(!preg_match($hard, $pwd) && !!preg_match($middle, $pwd) && !preg_match($weak, $pwd)){
        return false;
    }
    return true;
}

function isRightShareCode($str){
    // 判断是否是分享密码
    $re="/^[0-9a-zA-z]{6}$/";
    if (preg_match($re, $str)) {
        return true;
    }else{
        return false;
    }
}

function isValidReg($str){
    // 判断是否有列表中的危险字符
    $re="/<|>|\[|\]|\{|\}|『|』|※|○|●|◎|§|△|▲|☆|★|◇|◆|□|▼|㊣|﹋|⊕|⊙|〒|ㄅ|ㄆ|ㄇ|ㄈ|ㄉ|ㄊ|ㄋ|ㄌ|ㄍ|ㄎ|ㄏ|ㄐ|ㄑ|ㄒ|ㄓ|ㄔ|ㄕ|ㄖ|ㄗ|ㄘ|ㄙ|ㄚ|ㄛ|ㄜ|ㄝ|ㄞ|ㄟ|ㄢ|ㄣ|ㄤ|ㄥ|ㄦ|ㄧ|ㄨ|ㄩ|■|▄|▆|\*|@|#|\^|\\\/";
    if (preg_match($re, $str)) {
        return true;
    }else{
        return false;
    }
}

function isValidLength($str, $minlen, $maxlen) {
    // 判断字符串是否是规定的长度
    if (strlen($str) >= $minlen && strlen($str) <= $maxlen) {
        return false;
    }
    return true;
}