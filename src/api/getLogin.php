<?php

include_once('./connection.php');

// Login Source Check if Account is existing

if ($_SERVER['REQUEST_METHOD']) {

    $username = $_POST['name'];
    $password = $_POST['password'];

    $count = mysqli_query($con, "SELECT COUNT(userId) from usermodule where userName = '$username' and userPassword = '$password'");
    $response = mysqli_fetch_array($count);

    if ($response['COUNT(userId)'] > 0) {
        $sql = "SELECT `userId`, `userFullname`, `userType`, `userStatus`, `userName`, `userPassword`, `userImage`, `userLogin` FROM `usermodule` WHERE userName = '$username' and userPassword = '$password';";
        $result = mysqli_query($con, $sql);

        while ($row = mysqli_fetch_array($result)) {
            $return_array[] = array(
                'id' =>  $row['userId'],
                'fullname' =>  $row['userFullname'],
                'type' => $row['userType'],
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
