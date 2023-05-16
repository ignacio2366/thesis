<?php

include('./connection.php');

if ($_SERVER['REQUEST_METHOD']) {
    $id = $_POST['id'];
    $sql  = "SELECT `userId`, `userFullname`, `userType`, `userStatus`, `userName`, `userPassword`, `userImage`, `userLogin`, `userRole` FROM `usermodule` WHERE userId = '$id';";
    $result = mysqli_query($con, $sql);

    $return_array = array();
    while ($row = mysqli_fetch_array($result)) {
        $return_array = array(
            'id' => iconv('UTF-8', 'UTF-8//IGNORE', $row['userId']),
            'name' => iconv('UTF-8', 'UTF-8//IGNORE', $row['userFullname']),
            'type' => iconv('UTF-8', 'UTF-8//IGNORE', $row['userType']),
            'status' => iconv('UTF-8', 'UTF-8//IGNORE', $row['userStatus']),
            'username' => iconv('UTF-8', 'UTF-8//IGNORE', $row['userName']),
            'role' => iconv('UTF-8', 'UTF-8//IGNORE', $row['userRole']),
            'password' => iconv('UTF-8', 'UTF-8//IGNORE', $row['userImage']),
            'image' => iconv('UTF-8', 'UTF-8//IGNORE', $row['userRole']),
            'message' => 'success'
        );
    }

    if (empty($return_array)) {
        echo json_encode(array('message' => null));
    } else {
        echo json_encode($return_array);
    }
}
