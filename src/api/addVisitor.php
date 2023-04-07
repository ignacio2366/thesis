<?php

include('./connection.php');

// Add User Account

if ($_SERVER['REQUEST_METHOD']) {
    $cite = $_POST['cite'];

    $sql = "Update newmodule set visitor = visitor +1 WHERE headline = '$cite'";
    $result = mysqli_query($con, $sql);

    $return_array[] = array(
        'message' => 'success',
    );

    echo json_encode($return_array);
}
