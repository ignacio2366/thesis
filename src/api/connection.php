<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Header: *');

$ServerName = "localhost";
$ServerName = "localhost";
$UserName = "root";
$password = "";
$DBName = "thesis";


$con = mysqli_connect($ServerName, $UserName, $password, $DBName);

// Check connection
