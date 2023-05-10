<?php

include('./connection.php');

if ($_SERVER['REQUEST_METHOD']) {
    $sql  = "SELECT `no`, `plagiarism`, `positive`, `negative`,`word` FROM `setting` WHERE 1";
    $result = mysqli_query($con, $sql);

    $return_array = array();
    while ($row = mysqli_fetch_array($result)) {
        $return_array = array(
            'plagiarism' => $row['plagiarism'],
            'positive' => $row['positive'],
            'negative' => $row['negative'],
            'word' => $row['word'],
            'message' => 'success'
        );
    }

    if (empty($return_array)) {
        echo json_encode(array('message' => null));
    } else {
        echo json_encode($return_array);
    }
}
