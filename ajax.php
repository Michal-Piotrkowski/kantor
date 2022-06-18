<?php
    include("hidden.php"); //require
    $mysqli = new mysqli($host, $user, $passwd, $dbname);
    $mysqli->query("set names utf8");
    mysqli_select_db($mysqli,$dbname);
?>