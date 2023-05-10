<?php

include('./connection.php');

// Get The Sources list date from DraftModl
if ($_SERVER['REQUEST_METHOD']) {
    $cite = $_POST['cite'];

    $sql = "SELECT `draft_NO`, `Cite`, `authorId`, `Rights`, `Url`, `Headline`, `Author`, `Summary` FROM `draftedmodule` WHERE Cite = '$cite' ";
    $result = mysqli_query($con, $sql);

    $return_array = array(); // initialize the array

    while ($row = mysqli_fetch_array($result)) {
        $return_array[] = array(
            'no' =>  $row['draft_NO'],
            'name' =>  iconv('UTF-8', 'UTF-8//IGNORE', $row['Cite']),
            'rights' => iconv('UTF-8', 'UTF-8//IGNORE', $row['Rights']),
            'headline' => iconv('UTF-8', 'UTF-8//IGNORE', $row['Headline']),
            'author' => iconv('UTF-8', 'UTF-8//IGNORE', $row['Author']),
            'summary' => iconv('UTF-8', 'UTF-8//IGNORE', $row['Summary']),
            'url' => iconv('UTF-8', 'UTF-8//IGNORE', $row['Url']),
            'message' => "success",
        );
    }

    if (empty($return_array)) {

        echo json_encode(array('message' => null));
    } else {
        echo json_encode($return_array);
    }
}
