<?php
    include ("hidden.php");
    $mysqli = new mysqli($host, $user, $passwd, $dbname);
    $mysqli -> query("set names utf8");
    $sql = "SELECT `id_kraju`, `id_nominal`, `nazwa_nominalu`, `nr_kat`, `id_material`, `rok` FROM Dane INNER JOIN Flagi INNER JOIN Materialy ON Flagi.id_flagi = Dane.id_kraju AND Materialy.id_materialu = Dane.id_material";
    $result = $mysqli -> query($sql);
    $all = $result -> fetch_all();
    echo json_encode($all);
?>