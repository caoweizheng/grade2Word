<?php

    require('connect.php');

    $sql  = "select * from goodsHistory";

    // 可以用fetch_all(MYSQLI_ASSOC)方法获取到数据库的全部数据然后返回给前端
    $res = $conn->query($sql)->fetch_all(MYSQLI_ASSOC);

    echo (json_encode($res,JSON_UNESCAPED_UNICODE));
?>