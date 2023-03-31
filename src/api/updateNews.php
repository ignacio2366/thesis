<?php

include('./connection.php');

// Update User Account

if ($_SERVER['REQUEST_METHOD']) {

    $id = mysqli_real_escape_string($con, $_POST['id']);
    $headline = mysqli_real_escape_string($con, $_POST['headline']);
    $category = $_POST['category'];
    $content = mysqli_real_escape_string($con, $_POST['content']);
    $contenttag = mysqli_real_escape_string($con, $_POST['contenttag']);
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

    if (isset($_FILES['image']) && $_FILES['image']['size'] > 0) {
        $image = $_FILES['image'];
        $imageName = $image['name'];
        $imageType = $image['type'];
        $imageTempName = $image['tmp_name'];
        $imageError = $image['error'];
        $imageSize = $image['size'];
        $target = $newsimage . basename($imageName);

        if (move_uploaded_file($imageTempName, $target)) {

            $sql = "UPDATE `newmodule` SET `headline`='$headline', `content`='$content', `category`='$category', `datestart`='$datestart', `contenttag`='$contenttag', `status`='$status', `action`='$action', `author`='$author', `authorId`='$authorId', `source`='$source', `image`='$target', `sentimentrate`='$sentimentrate', `sentiment`='$sentiment', `oversentiment`='$oversentimentrate', `plagiarismrate`='$plagiarismrate', `CiteName`='$headline' WHERE `id`='$id'";
            $result = mysqli_query($con, $sql);
            $return_array[] = array(
                'message' => 'success',
            );
            echo json_encode($return_array);
        }
    } else {
        $sql = "UPDATE `newmodule` SET `headline`='$headline', `content`='$content', `category`='$category', `datestart`='$datestart', `contenttag`='$contenttag', `status`='$status', `action`='$action', `author`='$author', `authorId`='$authorId', `source`='$source', `sentimentrate`='$sentimentrate', `sentiment`='$sentiment', `oversentiment`='$oversentimentrate', `plagiarismrate`='$plagiarismrate', `CiteName`='$headline' WHERE `id`='$id'";
        $result = mysqli_query($con, $sql);
        $return_array[] = array(
            'message' => 'success',
        );
        echo json_encode($return_array);
    }
}

?>
