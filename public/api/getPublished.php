<?php

include('./connection.php');
if ($_SERVER['REQUEST_METHOD']) {

    $filter = $_GET['filter'];

    if ($filter != 'all') {
        $sql = "SELECT `id`, `headline`, `content`, `category`, `datestart`, `contenttag`, `status`, `remark`, `action`, `author`, `authorId`, `source`, `image`, `sentimentrate`, `sentiment`, `oversentiment`, `plagiarismrate`, `CiteName`, `dateapproved`, `visitor`, `url`, `Admin` FROM `newmodule` where `status` = '$filter' ORDER BY id  DESC";
        $result = mysqli_query($con, $sql);

        if (mysqli_num_rows($result) == 0) {
            $return_array[] = array("message" => null);
        } else {
            while ($row = mysqli_fetch_array($result)) {
                $return_array[] = array(
                    'id' =>  $row['id'],
                    'headline' => iconv('UTF-8', 'UTF-8//IGNORE', $row['headline']),
                    'category' =>  iconv('UTF-8', 'UTF-8//IGNORE', $row['category']),
                    'datestart' => iconv('UTF-8', 'UTF-8//IGNORE', $row['datestart']),
                    'content' => iconv('UTF-8', 'UTF-8//IGNORE', $row['content']),
                    'contenttag' => iconv('UTF-8', 'UTF-8//IGNORE', $row['contenttag']),
                    'status' => iconv('UTF-8', 'UTF-8//IGNORE', $row['status']),
                    'remark' => iconv('UTF-8', 'UTF-8//IGNORE', $row['remark']),
                    'action' => iconv('UTF-8', 'UTF-8//IGNORE', $row['action']),
                    'author' => iconv('UTF-8', 'UTF-8//IGNORE', $row['author']),
                    'source' => iconv('UTF-8', 'UTF-8//IGNORE', $row['source']),
                    'image' => iconv('UTF-8', 'UTF-8//IGNORE', $row['image']),
                    'sentimentrate' => iconv('UTF-8', 'UTF-8//IGNORE', $row['sentimentrate']),
                    'sentiment' => iconv('UTF-8', 'UTF-8//IGNORE', $row['sentiment']),
                    'oversentiment' => iconv('UTF-8', 'UTF-8//IGNORE', $row['oversentiment']),
                    'plagiarismrate' => iconv('UTF-8', 'UTF-8//IGNORE', $row['plagiarismrate']),
                    'CiteName' => iconv('UTF-8', 'UTF-8//IGNORE', $row['CiteName']),
                    'dateapproved' => iconv('UTF-8', 'UTF-8//IGNORE', $row['dateapproved']),
                    'url' => iconv('UTF-8', 'UTF-8//IGNORE', $row['url']),
                    'Admin' => iconv('UTF-8', 'UTF-8//IGNORE', $row['Admin']),
                    'message' => "success",
                );
            }
        }

        echo json_encode($return_array);
    } else {
        $sql = "SELECT `id`, `headline`, `content`, `category`, `datestart`, `contenttag`, `status`, `remark`, `action`, `author`, `authorId`, `source`, `image`, `sentimentrate`, `sentiment`, `oversentiment`, `plagiarismrate`, `CiteName`, `dateapproved`, `visitor`, `url`, `Admin` FROM `newmodule` where `action` != 'draft' ORDER BY id DESC";
        $result = mysqli_query($con, $sql);

        if (mysqli_num_rows($result) == 0) {
            $return_array[] = array("message" => null);
        } else {
            while ($row = mysqli_fetch_array($result)) {
                $return_array[] = array(
                    'id' =>  $row['id'],
                    'headline' => iconv('UTF-8', 'UTF-8//IGNORE', $row['headline']),
                    'category' =>  iconv('UTF-8', 'UTF-8//IGNORE', $row['category']),
                    'datestart' => iconv('UTF-8', 'UTF-8//IGNORE', $row['datestart']),
                    'content' => iconv('UTF-8', 'UTF-8//IGNORE', $row['content']),
                    'contenttag' => iconv('UTF-8', 'UTF-8//IGNORE', $row['contenttag']),
                    'status' => iconv('UTF-8', 'UTF-8//IGNORE', $row['status']),
                    'remark' => iconv('UTF-8', 'UTF-8//IGNORE', $row['remark']),
                    'action' => iconv('UTF-8', 'UTF-8//IGNORE', $row['action']),
                    'author' => iconv('UTF-8', 'UTF-8//IGNORE', $row['author']),
                    'source' => iconv('UTF-8', 'UTF-8//IGNORE', $row['source']),
                    'image' => iconv('UTF-8', 'UTF-8//IGNORE', $row['image']),
                    'sentimentrate' => iconv('UTF-8', 'UTF-8//IGNORE', $row['sentimentrate']),
                    'sentiment' => iconv('UTF-8', 'UTF-8//IGNORE', $row['sentiment']),
                    'oversentiment' => iconv('UTF-8', 'UTF-8//IGNORE', $row['oversentiment']),
                    'plagiarismrate' => iconv('UTF-8', 'UTF-8//IGNORE', $row['plagiarismrate']),
                    'CiteName' => iconv('UTF-8', 'UTF-8//IGNORE', $row['CiteName']),
                    'dateapproved' => iconv('UTF-8', 'UTF-8//IGNORE', $row['dateapproved']),
                    'url' => iconv('UTF-8', 'UTF-8//IGNORE', $row['url']),
                    'Admin' => iconv('UTF-8', 'UTF-8//IGNORE', $row['Admin']),
                    'message' => "success",
                );
            }
        }

        echo json_encode($return_array);
    }
}
