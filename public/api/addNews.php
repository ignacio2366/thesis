<?php

include('./connection.php');

// Add User Account

if ($_SERVER['REQUEST_METHOD']) {

    $headline =  mysqli_real_escape_string($con, $_POST['headline']);
    $category = $_POST['category'];
    $content =  mysqli_real_escape_string($con, $_POST['content']);
    $contenttag =  mysqli_real_escape_string($con, $_POST['contenttag']);
    $datestart = $_POST['datestart'];
    $status = $_POST['status'];
    $action = $_POST['action'];
    $author = $_POST['author'];
    $authorId = $_POST['authorId'];
    $source = $_POST['source'];
    $sentimentrate = $_POST['sentimentrate'];
    $sentiment = $_POST['sentiment'];
    $oversentimentrate = $_POST['oversentimentrate'];
    $plagiarismrate = $_POST['plagiarismrate'];
    $plagiarism = $_POST['plagiarism'];
    //    $plagiarismsite =  $_POST['plagiarismsite'];

    if (isset($_FILES['image']) && $_FILES['image']['size'] > 0) {
        $image = $_FILES['image'];
        $imageName = $image['name'];
        $imageType = $image['type'];
        $imageTempName = $image['tmp_name'];
        $imageError = $image['error'];
        $imageSize = $image['size'];
        $target = $newsimage . basename($imageName);

        if (ftp_put($ftp_conn, $ftp_newsImage . $image['name'], $imageTempName, FTP_BINARY)) {
            
            $sql  = "INSERT INTO `newmodule`(`headline`, `content`, `category`, `datestart`, `contenttag`, `status`,`action`, `author`,`authorId` ,`source`, `image`, `sentimentrate`, `sentiment`, `oversentiment`, `plagiarismrate`,`CiteName`,`url`)VALUES ('$headline','$content','$category','$datestart','$contenttag','$status ','$action','$author', '$authorId' ,'$source','$target','$sentimentrate','$sentiment','$oversentimentrate','$plagiarismrate','$headline','$url $headline')";
            $result = mysqli_query($con, $sql);
            $return_array[] = array(
                'message' => 'success',
            );
            echo json_encode($return_array);
        }
        else{
            $return_array[] = array(
                'message' => 'error failed to upload image',
            );
            echo json_encode($return_array);
        }
    } else {
        $sql  = "INSERT INTO `newmodule`(`headline`, `content`, `category`, `datestart`, `contenttag`, `status`,`action`, `author`,`authorId` ,`source`, `sentimentrate`, `sentiment`, `oversentiment`, `plagiarismrate`,`CiteName`)VALUES ('$headline','$content','$category','$datestart','$contenttag','$status ','$action','$author', '$authorId' ,'$source','$sentimentrate','$sentiment','$oversentimentrate','$plagiarismrate','$headline')";
        $result = mysqli_query($con, $sql);
        $return_array[] = array(
            'message' => 'success',
        );
        echo json_encode($return_array);
    }
}
