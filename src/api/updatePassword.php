<?php

include('./connection.php');

if ($_SERVER['REQUEST_METHOD']) {
    $id = $_POST['id'];
    $password = $_POST['password'];

    $sql  = "UPDATE `usermodule` SET `userPassword`='$password' WHERE `userId` = '$id'";
    $result = mysqli_query($con, $sql);

    $return_array[] = array(
        'id' => $id,
        'message' => 'success',
    );
}
