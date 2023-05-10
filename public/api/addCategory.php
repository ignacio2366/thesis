<?php

include('./connection.php');

// Add User Account

if ($_SERVER['REQUEST_METHOD']) {
    $name = $_POST['name'];
    $count = mysqli_query($con, "select COUNT(catNo) from categorymodule WHERE catName = '$name';");
    $response = mysqli_fetch_array($count);
    if ((int)$response['COUNT(catNo)'] == 0) {
        $sql = "INSERT INTO `categorymodule`(`catName`,`catStatus`) VALUES ('$name','Active')";
        $result = mysqli_query($con, $sql);

        $return_array[] = array(
            'name' => $name,
            'message' => 'success',
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
