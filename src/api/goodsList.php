<?php 

    require('connect.php');

    $type = isset($_GET['type']) ? $_GET['type'] : null;

    $around = isset($_GET['around']) ? $_GET['around'] : null;
    $aroundLt = isset($_GET['aroundLt']) ? $_GET['aroundLt'] : null;
    $aroundGt = isset($_GET['aroundGt']) ? $_GET['aroundGt'] : null;
    $brand = isset($_GET['brand']) ? $_GET['brand'] : null;



    if($type == null || $type == "Synthesis"){
        $sql  = "select * from goodsList";

    }else if($type == "price"){

        $sql  = "select * from goodsList ORDER BY price";

    }else if($type == "volume"){
        $sql  = "select * from goodsList ORDER BY volume desc";

    }else if($type == 'priceSearch'){
        if($aroundLt == 0){

            $sql  = "select * from goodsList where price < $aroundGt";
            
        }else if($aroundGt == 0){

            $sql  = "select * from goodsList where price > $aroundLt";
        }else{

            $sql  = "select * from goodsList where price between $aroundLt AND $aroundGt";
        }

    }else if($type == 'Brands'){
        $sql  = "select * from goodsList where  `desc` like '%$brand%'";
    }




    // 可以用fetch_all(MYSQLI_ASSOC)方法获取到数据库的全部数据然后返回给前端
    
    $res = $conn->query($sql)->fetch_all(MYSQLI_ASSOC);

    echo (json_encode($res,JSON_UNESCAPED_UNICODE));

 ?>