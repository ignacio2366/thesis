<?php

include('./connection.php');

// Add User Account

if ($_SERVER['REQUEST_METHOD']) {

    $cite = mysqli_real_escape_string($con, $_POST['cite']);
    $rights = mysqli_real_escape_string($con, $_POST['rights']);
    $url = mysqli_real_escape_string($con, $_POST['url']);
    $headline = mysqli_real_escape_string($con, $_POST['headline']);
    $date = mysqli_real_escape_string($con, $_POST['date']);
    $author = mysqli_real_escape_string($con, $_POST['author']);
    $summary = mysqli_real_escape_string($con, $_POST['summary']);
    $authorId = $_POST['authorId'];

    $sql = "INSERT INTO `draftedmodule` (`Cite`, `Rights`, `Url`, `Headline`, `Date`, `Author`, `Summary`, `authorId`) VALUES ('$cite','$rights','$url','$headline','$date','$author','$summary', '$authorId')";
    $result = mysqli_query($con, $sql);
    $return_array[] = array(
        'message' => 'success',
    );
    echo json_encode($return_array);
}
