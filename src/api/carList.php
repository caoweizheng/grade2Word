<?php 

    require('connect.php');

    $type = isset($_GET['type']) ? $_GET['type'] : null;
    $user = isset($_GET['user']) ? $_GET['user'] : null;
    $gid = isset($_GET['gid']) ? $_GET['gid'] : null;
    $imgUrl = isset($_GET['imgUrl']) ? $_GET['imgUrl'] : null;
    $price = isset($_GET['price']) ? $_GET['price'] : null;
    $qty = isset($_GET['qty']) ? $_GET['qty'] : null;
    $special = isset($_GET['special']) ? $_GET['special'] : null;
    $stores = isset($_GET['stores']) ? $_GET['stores'] : null;
    $volume = isset($_GET['volume']) ? $_GET['volume'] : null;
    $desc = isset($_GET['desc']) ? $_GET['desc'] : null;


    // 添加购物车商品
    if($type == 'insert'){
        $sql  = "insert into carList(user,gid,imgUrl,`desc`,price,qty,special,stores,volume) values('$user','$gid','$imgUrl','$desc','$price',$qty,'$special','$stores','$volume')";
        $res = $conn->query($sql);
        echo $res;
    // 修改购物车商品
    }else if($type == 'update'){
        $sql  = "update carList set qty = $qty where gid = '$gid'";
        $res = $conn->query($sql);
        echo $res;
    // 获取购物车商品
    }else if($type == 'get'){
        $sql  = "select * from carList where user = '$user'";
        $res = $conn->query($sql)->fetch_all(MYSQLI_ASSOC);

        echo (json_encode($res,JSON_UNESCAPED_UNICODE));
    // 删除购物车商品
    }else if($type == 'del'){
        $sql  = "delete from carList where gid = '$gid'";
        $res = $conn->query($sql);
        echo $res;
    }
    
 ?>