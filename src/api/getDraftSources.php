<?php

include('./connection.php');

// Get The Sources list date from DraftModl

if ($_SERVER['REQUEST_METHOD']) {

    $cite = $_POST['cite'];
    $authorId = $_POST['id'];

    $sql = "SELECT `draft_NO`, `Cite`, `authorId`, `Rights`, `Url`, `Headline`, `Date`, `Author`, `Summary` FROM `draftedmodule` WHERE Cite = '$cite' AND authorId = '$authorId'";
    $result = mysqli_query($con, $sql);

    while ($row = mysqli_fetch_array($result)) {
        $return_array[] = array(
            'no' =>  $row['draft_NO'],
            'name' =>  $row['Cite'],
            'rights' => $row['Rights'],
            'headline' => $row['Headline'],
            'author' => $row['Author'],
            'url' => $row['Url'],
            'message' => "success",
        );
    }
    echo json_encode($return_array);
}
