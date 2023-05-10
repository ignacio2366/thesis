<?php

include('./connection.php');

// EDIT User Account

if ($_SERVER['REQUEST_METHOD']) {
    $id = $_POST['id'];
    $name =  $_POST['name'];
    $category = $_POST['category'];

    $count =  mysqli_query($con, "select COUNT(catNo) from categorymodule WHERE catName = '$name';");
    $response = mysqli_fetch_array($count);

    if ((int)$response['COUNT(catNo)'] == 0) {
        $news = "UPDATE `newmodule` SET `category` ='$name' WHERE `category` = '$category'";
        $updatenew = mysqli_query($con, $news);
        if (!$updatenew) {
            die('Error: ' . mysqli_error($con));
        }

        $sql = "UPDATE `categorymodule` SET `catName`='$name' WHERE `catNo` = $id";
        $result = mysqli_query($con, $sql);
        if (!$result) {
            die('Error: ' . mysqli_error($con));
        }

        $return_array[] = array(
            'name' => $id,
            'old' => $updatenew,
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
