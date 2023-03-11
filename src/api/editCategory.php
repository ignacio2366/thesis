<?php

include('./connection.php');

// EDIT User Account

if ($_SERVER['REQUEST_METHOD']) {
    $id = $_POST['id'];
    $name =  $_POST['name'];

    $count =  mysqli_query($con, "select COUNT(catNo) from categorymodule WHERE catName = '$name';");
    $response = mysqli_fetch_array($count);

    if ((int)$response['COUNT(catNo)'] == 0) {
        $sql = " UPDATE `categorymodule` SET `catName`='$name' WHERE catNo = $id";
        $result = mysqli_query($con, $sql);

        $news = "UPDATE `newmodule` SET `category`='$name'";
        $updatenew = mysqli_query($con, $news);

        $return_array[] = array(
            'name' => $id,
            'image' => $name,
            'message' => "success",
        );
        echo json_encode($return_array);
    } else {
        $error[] = array(
            'message' => "existing",
            'count' => (int)$response['COUNT(catNo)'],
        );

        echo json_encode($error);
    }
}
