<?php

include('./connection.php');

// Get User Account admin module

if ($_SERVER['REQUEST_METHOD']) {

    $sql = "SELECT `catNo`, `catName`, `catStatus` FROM `categorymodule` WHERE catStatus = 'Active';";
    $result = mysqli_query($con, $sql);
    $data = array();

    while ($row = mysqli_fetch_array($result)) {
        $data[] = array(
            'no' =>  $row['catNo'],
            'name' =>  $row['catName'],
            'status' => $row['catStatus'],
            'message' => "success",
        );
    }
    $serialized_data = serialize($data);

    $json = json_encode(unserialize($serialized_data));

    if ($json === false) {

        echo json_encode(array('message' => 'Error encoding data: ' . json_last_error_msg()));
    } else {
        echo $json;
    }
    mysqli_close($con);
}
