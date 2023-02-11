<?php

include('./connection.php');

// Add User Account

if ($_SERVER['REQUEST_METHOD']) {
    $id = $_POST['id'];

    $sql = "UPDATE `categorymodule` SET `catStatus`='In Active' WHERE catNo = '$id' ;";
    $result = mysqli_query($con, $sql);

    $return_array[] = array(
        'name' => $id,
        'message' => 'success',
    );

    echo json_encode($return_array);
}
