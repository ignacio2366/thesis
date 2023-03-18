<?php


include('./connection.php');

// Add News in News Module from Drafted Cite

$cite = mysqli_real_escape_string($con, $_POST['cite']);


if ($_SERVER['REQUEST_METHOD']) {

    $addnews = "INSERT INTO `newmodule`(`headline`,`status`,`source`,`CiteName`) VALUES ('$cite','draft','sources','$cite');";
    mysqli_query($con, $addnews);

    $return_array[] = array(
        'message' => 'success',
    );
    echo json_encode($return_array);
}
