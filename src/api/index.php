<?php
/**
 * @Author: Marte
 * @Date:   2018-04-06 13:56:15
 * @Last Modified by:   Marte
 * @Last Modified time: 2018-04-06 15:15:42
 */

    require('connect.php');

    $sql  = "select * from idx_goods";

    // 可以用fetch_all(MYSQLI_ASSOC)方法获取到数据库的全部数据然后返回给前端
    $res = $conn->query($sql)->fetch_all(MYSQLI_ASSOC);

    echo (json_encode($res,JSON_UNESCAPED_UNICODE));

?>