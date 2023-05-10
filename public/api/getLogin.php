<?php

include_once('./connection.php');

// Login Source Check if Account is existing

if ($_SERVER['REQUEST_METHOD']) {

    $username = $_POST['name'];
    $password = $_POST['password'];
    $count = mysqli_query($con, "SELECT COUNT(userId) from usermodule where userName = '$username' and userPassword = '$password'");
    $response = mysqli_fetch_array($count);
    if ($response['COUNT(userId)'] > 0) {
        $sql = "SELECT `userId`, `userFullname`, `userType`, `userStatus`, `userImage` FROM `usermodule` WHERE userName = '$username' and userPassword = '$password';";
        $result = mysqli_query($con, $sql);
        while ($row = mysqli_fetch_array($result)) {
            $return_array[] = array(
                'id' => iconv('UTF-8', 'UTF-8//IGNORE', $row['userId']),
                'fullname' => iconv('UTF-8', 'UTF-8//IGNORE', $row['userFullname']),
                'type' => iconv('UTF-8', 'UTF-8//IGNORE', $row['userType']),
                'status' => iconv('UTF-8', 'UTF-8//IGNORE', $row['userStatus']),
                'image' => iconv('UTF-8', 'UTF-8//IGNORE', $row['userImage']),
                'message' => "success",
            );
        }
        echo json_encode($return_array);
    } else {
        $error[] = array(
            'message' => "error",
        );

        echo json_encode($error);
    }
}
