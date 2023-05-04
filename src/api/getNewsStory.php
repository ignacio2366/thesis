<?php

include('./connection.php');

// Get The Saved News in Database

if ($_SERVER['REQUEST_METHOD']) {

    $cite = $_POST['cite'];

    $sql = "SELECT `id`, `headline`, `content`, `category`, `datestart`, `contenttag`, `status`, `remark`, `action`, `author`, `authorId`, `source`, `image`, `sentimentrate`, `sentiment`, `oversentiment`, `plagiarismrate`, `CiteName`, `dateapproved`, `url` FROM `newmodule` WHERE headline = '$cite' AND status = 'Approved';";
    $result = mysqli_query($con, $sql);

    while ($row = mysqli_fetch_array($result)) {
        $return_array[] = array(
            'id' =>  $row['id'],
            'headline' =>  $row['headline'],
            'content' => $row['content'],
            'category' => $row['category'],
            'contenttag' => $row['contenttag'],
            'author' => $row['author'],
            'source' => $row['source'],
            'image' => $row['image'],
            'sentiment' => $row['sentiment'],
            'date' => $row['dateapproved'],
            'oversentiment' => $row['oversentiment'],
            'url' => $row['url'],
            'message' => "success",
        );
    }
    if (empty($return_array)) {

        echo json_encode(array('message' => null));
    } else {
        echo json_encode($return_array);
    }
}
