<?php

include('./connection.php');


if ($_SERVER['REQUEST_METHOD']) {

    $search = $_GET['search'];

    if ($search != 'all') {
        $sql = "SELECT `id`, `headline`, `content`, `category`, `datestart`, `contenttag`, `status`, `remark`, `action`, `author`, `source`, `image`, `sentimentrate`, `sentiment`, `oversentiment`, `plagiarismrate`, `plagiarismsite`, `dateapproved` FROM `newmodule` where `headline` LIKE '%$search%' ORDER BY id  DESC";
        $result = mysqli_query($con, $sql);

        if (mysqli_num_rows($result) == 0) {
            $return_array[] = array("message" => null);
        } else {
            while ($row = mysqli_fetch_array($result)) {
                $return_array[] = array(
                    'id' =>  $row['id'],
                    'headline' => $row['headline'],
                    'category' =>  $row['category'],
                    'datestart' => $row['datestart'],
                    'content' => $row['content'],
                    'contenttag' => $row['contenttag'],
                    'status' => $row['status'],
                    'remark' => $row['remark'],
                    'action' => $row['action'],
                    'author' => $row['author'],
                    'source' => $row['source'],
                    'image' => $row['image'],
                    'sentimentrate' => $row['sentimentrate'],
                    'sentiment' => $row['sentiment'],
                    'oversentiment' => $row['oversentiment'],
                    'plagiarismrate' => $row['plagiarismrate'],
                    'plagiarismsite' => $row['plagiarismsite'],
                    'dateapproved' => $row['dateapproved'],
                    'message' => "success",
                );
            }
        }

        echo json_encode($return_array);
    } else {

        $return_array[] = array("message" => null);
        echo json_encode($return_array);
    }
}