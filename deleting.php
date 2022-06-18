<?php
    include ("hidden.php");
    $mysqli = new mysqli($host, $user, $passwd, $dbname);
    $mysqli -> query("set names utf8");
    $data = json_decode(file_get_contents("php://input"), true);
    $sql = "DELETE FROM `Dane` WHERE Dane.id_nominal = ?";
    $stnt = $mysqli -> prepare($sql);
    $stnt -> bind_param("s", $data['id']);
    $stnt -> execute();
    $result = $mysqli -> query($sql);
    $all = $result -> fetch_all();
    echo json_encode($all);
?>