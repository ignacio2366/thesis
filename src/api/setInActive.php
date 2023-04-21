<?php
include('./connection.php');

// Set Inactive Account

if ($_SERVER['REQUEST_METHOD']) {

    $id = $_POST['id'];
    $status = $_POST['status'];
    
    $sql = "UPDATE `usermodule` SET `userStatus`='$status' WHERE userId = '$id' ";
    $result = mysqli_query($con, $sql);

    $return_array[] = array(
        'id' => $id,
        'message' => 'success',
    );
}
