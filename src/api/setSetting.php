<?php

include('./connection.php');
if ($_SERVER['REQUEST_METHOD']) {

    $plagiarism = $_POST['plagiarism'];
    $positive = $_POST['positive'];
    $negative = $_POST['negative'];
    $word = $_POST['word'];
    $sql = "UPDATE `setting` SET `plagiarism`= $plagiarism,`positive`= $positive,`negative`= $negative, `word`=$word WHERE 1";
    $result = mysqli_query($con, $sql);
    $return_array = array(
        'message' => "success",
    );
    echo json_encode($return_array);
}
