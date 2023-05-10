<?php

include('./connection.php');


if ($_SERVER['REQUEST_METHOD']) {

    $filter = $_GET['filter'];
    $name = $_GET['name'];

    if ($filter != 'all') {
        $sql = "SELECT `id`, `headline`, `content`, `category`, `datestart`, `contenttag`, `status`, `remark`, `action`, `author`, `source`, `image`, `sentimentrate`, `sentiment`, `oversentiment`, `plagiarismrate`, `CiteName`, `dateapproved` FROM `newmodule` where `status` = '$filter' AND author = '$name' AND `status` <> 'draft' ORDER BY id  DESC";
        $result = mysqli_query($con, $sql);


        while ($row = mysqli_fetch_array($result)) {
            $return_array[] = array(
                'id' =>  $row['id'],
                'headline' =>  iconv('UTF-8', 'UTF-8//IGNORE', $row['headline']),
                'category' =>   iconv('UTF-8', 'UTF-8//IGNORE', $row['category']),
                'datestart' =>  iconv('UTF-8', 'UTF-8//IGNORE', $row['datestart']),
                'content' =>  iconv('UTF-8', 'UTF-8//IGNORE', $row['content']),
                'contenttag' =>  iconv('UTF-8', 'UTF-8//IGNORE', $row['contenttag']),
                'status' =>  iconv('UTF-8', 'UTF-8//IGNORE', $row['status']),
                'remark' =>  iconv('UTF-8', 'UTF-8//IGNORE', $row['remark']),
                'action' =>  iconv('UTF-8', 'UTF-8//IGNORE', $row['action']),
                'author' =>  iconv('UTF-8', 'UTF-8//IGNORE', $row['author']),
                'source' =>  iconv('UTF-8', 'UTF-8//IGNORE', $row['source']),
                'image' =>  iconv('UTF-8', 'UTF-8//IGNORE', $row['image']),
                'sentimentrate' =>  iconv('UTF-8', 'UTF-8//IGNORE', $row['sentimentrate']),
                'sentiment' =>  iconv('UTF-8', 'UTF-8//IGNORE', $row['sentiment']),
                'oversentiment' =>  iconv('UTF-8', 'UTF-8//IGNORE', $row['oversentiment']),
                'plagiarismrate' =>  iconv('UTF-8', 'UTF-8//IGNORE', $row['plagiarismrate']),
                'CiteName' =>  iconv('UTF-8', 'UTF-8//IGNORE', $row['CiteName']),
                'dateapproved' =>  iconv('UTF-8', 'UTF-8//IGNORE', $row['dateapproved']),
                'message' => "success",
            );
        }
        if (empty($return_array)) {
            echo json_encode($return_array[] = array('message' => null));
        } else {
            echo json_encode($return_array);
        }
    } else {
        $sql = "SELECT `id`, `headline`, `content`, `category`, `datestart`, `contenttag`, `status`, `remark`, `action`, `author`, `source`, `image`, `sentimentrate`, `sentiment`, `oversentiment`, `plagiarismrate`, `CiteName`, `dateapproved` FROM `newmodule` where author='$name' AND `status` <> 'draft' ORDER BY `id` DESC";
        $result = mysqli_query($con, $sql);


        while ($row = mysqli_fetch_array($result)) {
            $return_array[] = array(
                'id' =>  $row['id'],
                'headline' =>  iconv('UTF-8', 'UTF-8//IGNORE', $row['headline']),
                'category' =>   iconv('UTF-8', 'UTF-8//IGNORE', $row['category']),
                'datestart' =>  iconv('UTF-8', 'UTF-8//IGNORE', $row['datestart']),
                'content' =>  iconv('UTF-8', 'UTF-8//IGNORE', $row['content']),
                'contenttag' =>  iconv('UTF-8', 'UTF-8//IGNORE', $row['contenttag']),
                'status' =>  iconv('UTF-8', 'UTF-8//IGNORE', $row['status']),
                'remark' =>  iconv('UTF-8', 'UTF-8//IGNORE', $row['remark']),
                'action' =>  iconv('UTF-8', 'UTF-8//IGNORE', $row['action']),
                'author' =>  iconv('UTF-8', 'UTF-8//IGNORE', $row['author']),
                'source' =>  iconv('UTF-8', 'UTF-8//IGNORE', $row['source']),
                'image' =>  iconv('UTF-8', 'UTF-8//IGNORE', $row['image']),
                'sentimentrate' =>  iconv('UTF-8', 'UTF-8//IGNORE', $row['sentimentrate']),
                'sentiment' =>  iconv('UTF-8', 'UTF-8//IGNORE', $row['sentiment']),
                'oversentiment' =>  iconv('UTF-8', 'UTF-8//IGNORE', $row['oversentiment']),
                'plagiarismrate' =>  iconv('UTF-8', 'UTF-8//IGNORE', $row['plagiarismrate']),
                'CiteName' =>  iconv('UTF-8', 'UTF-8//IGNORE', $row['CiteName']),
                'dateapproved' =>  iconv('UTF-8', 'UTF-8//IGNORE', $row['dateapproved']),
            );
        }
        if (empty($return_array)) {
            echo json_encode($return_array[] = array('message' => null));
        } else {
            echo json_encode($return_array);
        }
    }
}
