<?php

include('./connection.php');

// Get The Sources list date from DraftModl
if ($_SERVER['REQUEST_METHOD'] === 'POST') { // check if it's a POST request
    $cite = $_POST['cite'];
    $authorId = $_POST['id'];

    $sql = "SELECT `draft_NO`, `Cite`, `authorId`, `Rights`, `Url`, `Headline`, `Date`, `Author`, `Summary` FROM `draftedmodule` WHERE Cite = '$cite' AND authorId = '$authorId'";
    $result = mysqli_query($con, $sql);

    $return_array = array(); // initialize the array

    while ($row = mysqli_fetch_array($result)) {
        $return_array[] = array(
            'no' =>  $row['draft_NO'],
            'name' =>  $row['Cite'],
            'rights' => $row['Rights'],
            'headline' => $row['Headline'],
            'author' => $row['Author'],
            'summary' => $row['Summary'],
            'url' => $row['Url'],
            'message' => "success",
        );
    }

    if (empty($return_array)) {

        echo json_encode(array('message' => null));
    } else {
        echo json_encode($return_array);
    }
}
