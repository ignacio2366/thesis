<?php

include('./connection.php');

// Get The Sources list date from DraftModl
if ($_SERVER['REQUEST_METHOD']) { // check if it's a POST request
    $cite = $_POST['cite'];
    $authorId = $_POST['id'];

    $sql = "SELECT `draft_NO`, `Cite`, `Rights`, `Url`, `Headline`, `Author`, `Summary` FROM `draftedmodule` WHERE Cite = '$cite' AND authorId = '$authorId'";
    $result = mysqli_query($con, $sql);

    $return_array = array(); // initialize the array

    while ($row = mysqli_fetch_array($result)) {
        $return_array[] = array(
            'no' =>  iconv('UTF-8', 'UTF-8//IGNORE', $row['draft_NO']),
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
        echo json_encode($return_array[] = array("message" => null));
    } else {
        echo json_encode($return_array);
    }
}
