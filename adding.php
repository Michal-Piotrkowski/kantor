<?php
    include ("hidden.php");
    $mysqli = new mysqli($host, $user, $passwd, $dbname);
    $mysqli -> query("set names utf8");
    $data = json_decode(file_get_contents("php://input"), true);
    $sql = "INSERT INTO `Dane` (`nazwa_nominalu`, `nr_kat`, `rok`, `id_kraju`, `id_material`) VALUES (?,?,?,?,?);";
    $stnt = $mysqli -> prepare($sql);
    $stnt -> bind_param("sssss", $data['currency'], $data['cat'], $data['year'], $data['countries'], $data['metals']);
    $stnt -> execute();
    $result = $mysqli -> query($sql);
    echo json_encode("OK");
?>