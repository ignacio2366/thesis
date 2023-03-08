<?php

include('./connection.php');

// Add User Account

if ($_SERVER['REQUEST_METHOD']) {

    $headline = $_POST['headline'];
    $category = $_POST['category'];
    $content = $_POST['content'];
    $contenttag = $_POST['contenttag'];
    $datestart = $_POST['datestart'];
    $status = $_POST['status'];
    $action = $_POST['action'];
    $author = $_POST['author'];
    $source = $_POST['source'];
    $sentimentrate = $_POST['sentimentrate'];
    $sentiment = $_POST['sentiment'];
    $oversentimentrate = $_POST['oversentimentrate'];
    $plagiarismrate = $_POST['plagiarismrate'];
    $plagiarism = $_POST['plagiarism'];
    //    $plagiarismsite =  $_POST['plagiarismsite'];

    $image = $_FILES['image'];
    $imageName = $image['name'];
    $imageType = $image['type'];
    $imageTempName = $image['tmp_name'];
    $imageError = $image['error'];
    $imageSize = $image['size'];
    $target = $newsimage . basename($imageName);

    if (move_uploaded_file($imageTempName, $target)) {

        // use the correct variable names in the SQL query
        $sql  = "INSERT INTO `newmodule`(`headline`, `content`, `category`, `datestart`, `contenttag`, `status`,`action`, `author`, `source`, `image`, `sentimentrate`, `sentiment`, `oversentiment`, `plagiarismrate`)VALUES ('$headline','$content','$category','$datestart','$contenttag','$status ','$action','$author','$source','$target','$sentimentrate','$sentiment','$oversentimentrate','$plagiarismrate')";
        $result = mysqli_query($con, $sql);

        $return_array[] = array(
            'message' => 'success',
        );
        echo json_encode($return_array);
    }
}
