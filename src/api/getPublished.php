<?php

include('./connection.php');

// Get User Account admin module

if ($_SERVER['REQUEST_METHOD']) {

    $name = $_POST['name'];

    $sql = "SELECT `id`, `headline`, `content`, `category`, `datestart`, `contenttag`, `status`, `remark`, `action`, `author`, `source`, `image`, `sentimentrate`, `sentiment`, `oversentiment`, `plagiarismrate`, `plagiarismsite`, `dateapproved` FROM `newmodule` WHERE author = `$name`";
    $result = mysqli_query($con, $sql);

    while ($row = mysqli_fetch_array($result)) {
        $return_array[] = array(
            'id' =>  $row['id'],
            'category' =>  $row['category'],
            'headline' => $row['headline'],
            'datestart' => $row['datestart'],
            'content' => $row['content'],
            'contenttag' => $row['contenttag'],
            'status' => $row['status'],
            'remark' => $row['remark'],
            'action' => $row['action'],
            'message' => "success",
        );
    }
    echo json_encode($return_array);
}
