<?php

include('./connection.php');

// Add User Account

if ($_SERVER['REQUEST_METHOD']) {
    $cite = $_POST['cite'];
  //  $category = $_POST['category'];

    $sql = "Update newmodule set visitor = visitor +1 WHERE headline = '$cite'";
    $result = mysqli_query($con, $sql);

    $current_date = new DateTime("now", new DateTimeZone('Asia/Manila'));
    $formatted_date = $current_date->format('D, M j, Y, g:i A');

    $timestamp = strtotime($formatted_date);
    $month = date('F', $timestamp);
    $day = date('j', $timestamp);
    $year = date('Y', $timestamp);
    $time = date('g:i A', $timestamp);

    $visitor = "INSERT INTO `visitor`(`citeName`, `month`, `day`, `year`, `time`, `datetime`) VALUES ('$cite','$month','$day','$year','$time','$formatted_date')";
    mysqli_query($con, $visitor);

    $return_array[] = array(
        'message' => 'success',
    );

    echo json_encode($return_array);
}
