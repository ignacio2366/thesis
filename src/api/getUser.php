<?php

include('./connection.php');

// Get User Account admin module

if ($_SERVER['REQUEST_METHOD']) {

    $sql = "SELECT `userId`, `userFullname`, `userType`, `userStatus`, `userName`, `userPassword`, `userImage`, `userLogin` FROM `usermodule` WHERE  userStatus = 'active';";
    $result = mysqli_query($con, $sql);

    while ($row = mysqli_fetch_array($result)) {
        $return_array[] = array(
            'id' =>  $row['userId'],
            'fullname' =>  $row['userFullname'],
            'type' => $row['userType'],
            'status' => $row['userStatus'],
            'username' => $row['userName'],
            'image' => $row['userImage'],
            'message' => "success",
        );
    }
    echo json_encode($return_array);
}
