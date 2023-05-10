<?php

include('./connection.php');

// Get User Account admin module

if ($_SERVER['REQUEST_METHOD']) {
    $category = $_POST['category'];

    $sql = "SELECT `headline`, `content`, `author`, `url` FROM `newmodule` WHERE `category` = '$category' AND `status` = 'Approved' ORDER BY `datestart` DESC LIMIT 3;";
    $result = mysqli_query($con, $sql);

    while ($row = mysqli_fetch_array($result)) {
        $return_array[] = array(
            'headline' =>  iconv('UTF-8', 'UTF-8//IGNORE', $row['headline']),
            'content' =>  iconv('UTF-8', 'UTF-8//IGNORE', $row['content']),
            'author' => iconv('UTF-8', 'UTF-8//IGNORE', $row['author']),
            'url' => iconv('UTF-8', 'UTF-8//IGNORE', $row['url']),
            'message' => "success",
        );
    }
    echo json_encode($return_array);
}
