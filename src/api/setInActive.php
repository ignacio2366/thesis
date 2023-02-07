<?php
include('./connection.php');

// Set Inactive Account

if ($_SERVER['REQUEST_METHOD']) {

    $id = $_POST['id'];
    $sql = "UPDATE `usermodule` SET `userStatus`='InActive' WHERE userId = '$id' ";
    $result = mysqli_query($con, $sql);

    $return_array[] = array(
        'id' => $id,
        'message' => 'success',
    );
}
