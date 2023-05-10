<?php

include('./connection.php');

// Get User Account admin module

if ($_SERVER['REQUEST_METHOD']) {
    $month = $_POST['month'];
    $monthly = substr($month, 0, 3);

    $sql = "SELECT name,comment,sentiment,newsCite as headline, date FROM `commentmodule` WHERE date LIKE '%$monthly%' ORDER BY sentiment DESC";
    $result = mysqli_query($con, $sql);

    while ($row = mysqli_fetch_array($result)) {
        $return_array[] = array(
            'name' =>  $row['name'],
            'comment' =>  $row['comment'],
            'sentiment' => $row['sentiment'],
            'headline' => $row['headline'],
            'date' => $row['date'],
            'message' => "success",
        );
    }
    if (empty($return_array)) {
        echo json_encode(array('message' => null));
    } else {
        echo json_encode($return_array);
    }}
