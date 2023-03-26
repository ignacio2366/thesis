<?php
include('./connection.php');

// Add News in News Module from Drafted Cite

if ($_SERVER['REQUEST_METHOD']) {
    $cite = mysqli_real_escape_string($con, $_POST['cite']);
    $id = $_POST['id'];
    $date = new DateTime("now", new DateTimeZone('Asia/Manila'));
    $formatted_date = $date->format('D, M j, Y, g:i A');

    $count = mysqli_query($con, "SELECT COUNT(CiteName) from newmodule WHERE CiteName = '$cite' AND authorId = '$id'");
    $response = mysqli_fetch_array($count);

    if ((int)$response['COUNT(CiteName)'] == 0) {
        $addnews = "INSERT INTO `newmodule`(`headline`,`status`,`action`,`source`,`CiteName`, `authorId`, `datestart`) VALUES ('$cite','draft','draft','sources','$cite','$id','$formatted_date');";
        mysqli_query($con, $addnews);

        $return_array[] = array(
            'message' => 'success',
        );
        echo json_encode($return_array);
    } else {
        $error[] = array(
            'message' => "existing",
        );

        echo json_encode($error);
    }
}
