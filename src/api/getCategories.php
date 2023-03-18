<?php

include('./connection.php');

// Get User Account admin module

if ($_SERVER['REQUEST_METHOD']) {

    $sql = "SELECT `catNo`, `catName`, `catStatus` FROM `categorymodule` WHERE catStatus = 'Active';";
    $result = mysqli_query($con, $sql);

    while ($row = mysqli_fetch_array($result)) {
        $return_array[] = array(
            'no' =>  $row['catNo'],
            'name' =>  $row['catName'],
            'status' => $row['catStatus'],
            'message' => "success",
        );
    }
    echo json_encode($return_array);
}
