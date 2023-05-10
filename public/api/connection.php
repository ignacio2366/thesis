<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Header: *');
header('Content-Type: application/json');

$ServerName = "cpl27";
$UserName = "news5892";
$password = "Markangelo001!";
$DBName = "news5892_thesis";

// Global variables
$path = 'https://newsnlp.online/profileImage/';
$newsimage = 'https://newsnlp.online/newsImage/';
$url = "newsnlp.online/story/";

$con = mysqli_connect($ServerName, $UserName, $password, $DBName);

if (!$con) {
    die("Connection failed: " . mysqli_connect_error());
}
