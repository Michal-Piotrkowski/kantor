<?php
    $select = $_GET['select'];
    include ("hidden.php");
    $mysqli = new mysqli($host, $user, $passwd, $dbname);
    $mysqli -> query("set names utf8");
    if($select == "kraj"){
        $sql = "select * from `Flagi`";
    }
    elseif($select == "material"){
        $sql = "select * from `Materialy`";
    }

    $result = $mysqli -> query($sql);
    $all = $result -> fetch_all();
    echo json_encode($all);
?>