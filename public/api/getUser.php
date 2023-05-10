<?php

include('./connection.php');

// Get User Account admin module

if ($_SERVER['REQUEST_METHOD']) {
    $status = $_POST['status'];
    $sql = "SELECT `userId`, `userFullname`, `userType`, `userStatus`, `userName`, `userImage`, `userLogin`, `userRole` FROM `usermodule` WHERE userStatus = '$status' and userFullname <> 'Administrator';";
    $result = mysqli_query($con, $sql);

    while ($row = mysqli_fetch_array($result)) {
        $return_array[] = array(
            'id' =>  iconv('UTF-8', 'UTF-8//IGNORE', $row['userId']),
            'fullname' => iconv('UTF-8', 'UTF-8//IGNORE', $row['userFullname']),
            'type' => iconv('UTF-8', 'UTF-8//IGNORE', $row['userType']),
            'status' => iconv('UTF-8', 'UTF-8//IGNORE', $row['userStatus']),
            'username' => iconv('UTF-8', 'UTF-8//IGNORE', $row['userName']),
            'role' => iconv('UTF-8', 'UTF-8//IGNORE', $row['userRole']),
            'image' => iconv('UTF-8', 'UTF-8//IGNORE', $row['userImage']),
            'message' => "success",
        );
    }

    if (empty($return_array)) {
        echo json_encode(array('message' => null));
    } else {
        echo json_encode($return_array);
    }
}
