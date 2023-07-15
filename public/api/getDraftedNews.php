<?php

include('./connection.php');

// Get The Saved News in Database

if ($_SERVER['REQUEST_METHOD']) {

    $cite = mysqli_real_escape_string($con, $_POST['cite']);
    
    $authorId = $_POST['id'];

    $sql = "SELECT `id`, `headline`, `content`, `category`, `contenttag`, `image`, `CiteName`, `dateapproved` FROM `newmodule` WHERE CiteName = '$cite' OR Headline = '$cite' AND authorId = '$authorId';";
    $result = mysqli_query($con, $sql);

    while ($row = mysqli_fetch_array($result)) {
        $return_array[] = array(
            'id' =>  iconv('UTF-8', 'UTF-8//IGNORE', $row['id']),
            'headline' => iconv('UTF-8', 'UTF-8//IGNORE', $row['headline']),
            'content' => iconv('UTF-8', 'UTF-8//IGNORE', $row['content']),
            'category' => iconv('UTF-8', 'UTF-8//IGNORE', $row['category']),
            'contenttag' => iconv('UTF-8', 'UTF-8//IGNORE', $row['contenttag']),
            'image' => iconv('UTF-8', 'UTF-8//IGNORE', $row['image']),
            'message' => "success",
        );
    }
    if (empty($return_array)) {
        echo json_encode($return_array[] = array('message' => null));
    } else {
        echo json_encode($return_array);
    }
}
