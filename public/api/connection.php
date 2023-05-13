<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Header: *');
header('Content-Type: application/json');

$ServerName = "cpl27";
$UserName = "news5892";
$password = "Markangelo001!";
$DBName = "news5892_thesis";

// Global variables
$path = 'newsnlp.online/profileImage/';
$newsimage = 'https://newsnlp.online/newsImage/';
$url = "http://newsnlp.site/story/";

$con = mysqli_connect($ServerName, $UserName, $password, $DBName);



$ftp_server = "212.1.210.51";
$ftp_username = "news5892";
$ftp_password = "Markangelo001!";
$ftp_path = "/public_html/newsImage/";

try {
    // connect and login to FTP server
    $ftp_conn = ftp_connect($ftp_server) or die("Could not connect to $ftp_server");

    $login = ftp_login($ftp_conn, $ftp_username, $ftp_password);

    if (!$login) {
        throw new Exception("Could not login to FTP server.");
        ftp_close($ftp_conn);
    }
} catch (Exception $e) {
    echo "Error: " . $e->getMessage();
}

if (!$con) {
    die("Connection failed: " . mysqli_connect_error());
}
