<?php

include('./connection.php');

// Search News
if ($_SERVER['REQUEST_METHOD']) {

    $sentiment = $_GET['sentiment'];

    $sql = "SELECT `id`, `headline`, `content`, `category`, `datestart`, `status`, `remark`, `action`, `author`, `source`, `image`, `sentimentrate`, `sentiment`, `oversentiment`, `plagiarismrate`, `CiteName`, `dateapproved` FROM `newmodule` where  `sentiment` = '$sentiment' AND status = 'Approved' ORDER BY id  DESC";
    $result = mysqli_query($con, $sql);


    while ($row = mysqli_fetch_array($result)) {
        $return_array[] = array(
            'id' =>  $row['id'],
            'headline' => iconv('UTF-8', 'UTF-8//IGNORE', $row['headline']),
            'category' =>  iconv('UTF-8', 'UTF-8//IGNORE', $row['category']),
            'content' => iconv('UTF-8', 'UTF-8//IGNORE', $row['content']),
            'author' => iconv('UTF-8', 'UTF-8//IGNORE', $row['author']),
            'image' => iconv('UTF-8', 'UTF-8//IGNORE', $row['image']),
            'CiteName' => iconv('UTF-8', 'UTF-8//IGNORE', $row['CiteName']),
            'dateapproved' => iconv('UTF-8', 'UTF-8//IGNORE', $row['dateapproved']),
            'sentiment' => iconv('UTF-8', 'UTF-8//IGNORE', $row['sentiment']),
            'source' => iconv('UTF-8', 'UTF-8//IGNORE', $row['source']),
            'message' => "success",
        );
    }

    if (empty($return_array)) {
        echo json_encode($return_array[] = array('message' => null));
    } else {
        echo json_encode($return_array);
    }
}
