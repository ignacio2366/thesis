<?php

include('./connection.php');

if ($_SERVER['REQUEST_METHOD']) {

    $name = $_POST['name'];
    $email = $_POST['email'];
    $comment = $_POST['comment'];
    $date = $_POST['date'];
    $newsId = $_POST['newsId'];
    $newsCite = $_POST['newsCite'];
    $sentiment = $_POST['sentiment'];
    $img = $_POST['img'];

    $sql = "INSERT INTO `commentmodule`(`name`, `email`, `comment`, `date`, `newsId`, `newsCite`, `sentiment`, `img`) VALUES ('$name','$email','$comment','$date','$newsId','$newsCite','$sentiment','$img');";
    $result = mysqli_query($con, $sql);

    $return_array[] = array(
        'message' => 'success',
    );
    echo json_encode($return_array);
}
