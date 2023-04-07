<?php

include('./connection.php');

if ($_SERVER['REQUEST_METHOD']) {

    $cite = $_POST['cite'];


    $sql  = "SELECT `id`, `name`, `email`, `comment`, `date`, `newsId`, `newsCite`, `sentiment`, `img` FROM `commentmodule` WHERE `newsCite` = '$cite' ORDER BY id DESC;
";
    $result = mysqli_query($con, $sql);

    $return_array = array();
    while ($row = mysqli_fetch_array($result)) {
        $return_array[] = array(
            'id' => $row['id'],
            'name' => $row['name'],
            'email' => $row['email'],
            'comment' => $row['comment'],
            'date' => $row['date'],
            'sentiment' => $row['sentiment'],
            'img' => $row['img'],
            'message' => 'success'
        );
    }

    if (empty($return_array)) {
        
        echo json_encode(array('message' => null));
    } else {
        echo json_encode($return_array);
    }
}
