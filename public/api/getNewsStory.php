<?php

include('./connection.php');

// Get The Saved News in Database

if ($_SERVER['REQUEST_METHOD']) {

    $cite = $_POST['cite'];

    $sql = "SELECT `id`, `headline`, `content`, `category`, `contenttag`,`author`, `source`, `image`, `CiteName`, `dateapproved`, `url` FROM `newmodule` WHERE headline = '$cite' AND status = 'Approved';";
    $result = mysqli_query($con, $sql);

    while ($row = mysqli_fetch_array($result)) {
        $return_array[] = array(
            'id' =>  $row['id'],
            'headline' =>  iconv('UTF-8', 'UTF-8//IGNORE', $row['headline']),
            'content' => iconv('UTF-8', 'UTF-8//IGNORE', $row['content']),
            'category' => iconv('UTF-8', 'UTF-8//IGNORE', $row['category']),
            'contenttag' => iconv('UTF-8', 'UTF-8//IGNORE', $row['contenttag']),
            'author' => iconv('UTF-8', 'UTF-8//IGNORE', $row['author']),
            'source' => iconv('UTF-8', 'UTF-8//IGNORE', $row['source']),
            'image' => iconv('UTF-8', 'UTF-8//IGNORE', $row['image']),
            'sentiment' => iconv('UTF-8', 'UTF-8//IGNORE', $row['sentiment']),
            'date' => iconv('UTF-8', 'UTF-8//IGNORE', $row['dateapproved']),
            'citename' => iconv('UTF-8', 'UTF-8//IGNORE', $row['CiteName']),
            'url' => iconv('UTF-8', 'UTF-8//IGNORE', $row['url']),
            'message' => "success",
        );
    }
    if (empty($return_array)) {
        echo json_encode(array('message' => null));
    } else {
        echo json_encode($return_array);
    }
}
