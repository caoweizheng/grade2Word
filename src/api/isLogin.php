<?php 
    
    require('connect.php');

    $type = isset($_GET['type']) ? $_GET['type'] : null;
    $status = isset($_GET['status']) ? $_GET['status'] : null;
    $user = isset($_GET['user']) ? $_GET['user'] : null;

    if($type == 'get'){
        $sql  = "select * from isLogin";
        $res = $conn->query($sql)->fetch_all(MYSQLI_ASSOC);
        echo (json_encode($res,JSON_UNESCAPED_UNICODE));
    }else if($type == 'set'){
        $sql  = "update isLogin set isLogin = $status , user = '$user'";
        $conn->query($sql);
    }

 ?>