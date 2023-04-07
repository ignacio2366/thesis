<?php

include('./connection.php');

// Get the latest news

if ($_SERVER['REQUEST_METHOD']) {

    $sql = "SELECT DISTINCT `id`, `headline`, `content`, `category`, `datestart`, `contenttag`, `status`, `remark`, `action`, `author`, `authorId`, `source`, `image`, `sentimentrate`, `sentiment`, 
    `oversentiment`, `plagiarismrate`, `CiteName`, `dateapproved` FROM `newmodule` WHERE `status` = 'Approved' ORDER BY  id DESC;";
    $result = mysqli_query($con, $sql);

    while ($row = mysqli_fetch_array($result)) {
        $return_array[] = array(
            'id' =>  $row['id'],
            'headline' =>  $row['headline'],
            'content' => $row['content'],
            'category' => $row['category'],
            'contenttag' => $row['contenttag'],
            'image' => $row['image'],
            'date'  => $row['dateapproved'],
            'source' => $row['source'],
            'author' => $row['author'],
            'sentiment' => $row['sentiment'],
            'message' => 'success',
        );
    }

    if (empty($return_array)) {
        echo json_encode(array('message' => null));
    } else {
        echo json_encode($return_array);
    }
}
