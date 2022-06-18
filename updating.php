<?php
    include ("hidden.php");
    $mysqli = new mysqli($host, $user, $passwd, $dbname);
    $mysqli -> query("set names utf8");
    $data = json_decode(file_get_contents("php://input"), true);
    $sql = "UPDATE `Dane` SET nazwa_nominalu = ? , nr_kat = ?, rok  = ?, id_kraju = ?, id_material = ? WHERE id_nominal = ?";
    $stnt = $mysqli -> prepare($sql);
    $stnt -> bind_param("ssssss", $data['nominal'], $data['cat'], $data['year'], $data['country'], $data['metal'],  $data['id']);
    $stnt -> execute();
    $result = $stnt-> get_result();
?>