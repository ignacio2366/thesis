<?php

include('./connection.php');

// Get The Saved News in Database

if ($_SERVER['REQUEST_METHOD']) {

    $cite = $_POST['cite'];
    $authorId = $_POST['id'];

    $sql = "SELECT `id`, `headline`, `content`, `category`, `datestart`, `contenttag`, `status`, `remark`, `action`, `author`, `authorId`, `source`, `image`, `sentimentrate`, `sentiment`, `oversentiment`, `plagiarismrate`, `CiteName`, `dateapproved` FROM `newmodule` WHERE CiteName = '$cite' AND authorId = '$authorId';";
    $result = mysqli_query($con, $sql);

    while ($row = mysqli_fetch_array($result)) {
        $return_array[] = array(
            'id' =>  $row['id'],
            'headline' =>  $row['headline'],
            'content' => $row['content'],
            'category' => $row['category'],
            'contenttag' => $row['contenttag'],
            'image' => $row['image'],
            'message' => "success",
        );
    }
    echo json_encode($return_array);
}
