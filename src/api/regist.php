<?php 

    require('connect.php');

    $user = isset($_GET['phone']) ? $_GET['phone'] : null;
    $type = isset($_GET['type']) ? $_GET['type'] : null;

    $username = isset($_GET['user']) ? $_GET['user'] : null;
    $pass = isset($_GET['pass']) ? $_GET['pass'] : null;


    if($type == 'check'){
        $sql  = "select * from user where username = $user";
        $res = $conn->query($sql)->fetch_all(MYSQLI_ASSOC);

        if(count($res) == 0){
            echo 'success';
        }else{
            echo 'fail';
        }

    }else if($type == 'add'){
        $pass = md5($pass);
        $sql  = "insert into user(username,pass) values('$username','$pass')";
        $res = $conn->query($sql);
        if($res){
            echo 'success';
        }else{
            echo 'fail';
        }
    }else if($type == 'login'){

        $pass = md5($pass);
        $sql  = "select * from user where username = '$username' and pass = '$pass'";
        $res = $conn->query($sql)->fetch_all(MYSQLI_ASSOC);

        if(count($res) > 0){
            echo 'success';
        }else{
            echo 'fail';
        }
    }


 ?>