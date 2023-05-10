<?php

include('./connection.php');
if ($_SERVER['REQUEST_METHOD']) {

    $id = $_POST['id'];

    $sql = "UPDATE `usermodule` SET `userPassword`='pdm$id' WHERE `userId` = '$id'";
    $result = mysqli_query($con, $sql);


    $return_array[] = array(
        'name' => $id,
        'message' => "success",
    );
    echo json_encode($return_array);
}
