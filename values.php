<?php
    include ("hidden.php");
    $mysqli = new mysqli($host, $user, $passwd, $dbname);
    $mysqli -> query("set names utf8");
    $data = json_decode(file_get_contents("php://input"), true);
    $sql = "SELECT `id_kraju`, `id_nominal`, `nazwa_nominalu`, `nr_kat`, `id_material`, `rok` FROM Dane INNER JOIN Flagi INNER JOIN Materialy ON Flagi.id_flagi = Dane.id_kraju AND Materialy.id_materialu = Dane.id_material WHERE Dane.id_nominal = ?";
    $stnt = $mysqli -> prepare($sql);
    $stnt -> bind_param("s", $data['id']);
    echo $data['id'];
    $stnt -> execute();
    $result = $stnt-> get_result();
    echo json_encode($result);
?>