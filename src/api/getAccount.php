<?php

include('./connection.php');

if ($_SERVER['REQUEST_METHOD']) {
    $id = $_POST['id'];
    $sql  = "SELECT `userId`, `userFullname`, `userType`, `userStatus`, `userName`, `userPassword`, `userImage`, `userLogin`, `userRole` FROM `usermodule` WHERE userId = '$id';";
    $result = mysqli_query($con, $sql);

    $return_array = array();
    while ($row = mysqli_fetch_array($result)) {
        $return_array = array(
            'id' => $row['userId'],
            'name' => $row['userFullname'],
            'type' => $row['userType'],
            'username' => $row['userName'],
            'image' => $row['userImage'],
            'role' => $row['userRole'],
            'password' => $row['userPassword'],
            'message' => 'success'
        );
    }

    if (empty($return_array)) {
        echo json_encode(array('message' => null));
    } else {
        echo json_encode($return_array);
    }
}
