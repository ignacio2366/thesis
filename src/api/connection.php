<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Header: *');

$ServerName = "localhost";
$ServerName = "localhost";
$UserName = "root";
$password = "";
$DBName = "thesis";

// Global variables
$path = 'C:/xampp/htdocs/thesis/src/profileImage/';
$newsimage = 'C:/xampp/htdocs/thesis/src/newsImage/';


$con = mysqli_connect($ServerName, $UserName, $password, $DBName);

// Check connection
