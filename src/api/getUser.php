<?php

include('./connection.php');

// Get User Account admin module

if ($_SERVER['REQUEST_METHOD']) {
    $status = $_POST['status'];
    $sql = "SELECT `userId`, `userFullname`, `userType`, `userStatus`, `userName`, `userPassword`, `userImage`, `userLogin`, `userRole` FROM `usermodule` WHERE userStatus = '$status';";
    $result = mysqli_query($con, $sql);

    while ($row = mysqli_fetch_array($result)) {
        $return_array[] = array(
            'id' =>  $row['userId'],
            'fullname' =>  $row['userFullname'],
            'type' => $row['userType'],
            'status' => $row['userStatus'],
            'username' => $row['userName'],
            'role' => $row['userRole'],
            'image' => $row['userImage'],
            'message' => "success",
        );
    }

    if (empty($return_array)) {
        echo json_encode(array('message' => null));
    } else {
        echo json_encode($return_array);
    }
}
