<?php

include('./connection.php');

// Add User Account

if ($_SERVER['REQUEST_METHOD']) {
    $id = $_POST['id'];
    $status = $_POST['status'];

    $sql = "UPDATE `categorymodule` SET `catStatus`='$status' WHERE catNo = '$id' ;";
    $result = mysqli_query($con, $sql);

    $return_array[] = array(
        'name' => $id,
        'message' => 'success',
    );

    echo json_encode($return_array);
}
