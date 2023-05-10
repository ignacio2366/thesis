<?php
include('./connection.php');

// Add News in News Module from Drafted Cite

if ($_SERVER['REQUEST_METHOD']) {

    $cite =  $_POST['cite'];
    $id = $_POST['id'];

    $sql = "DELETE FROM newmodule where newmodule.CiteName = '$cite' AND newmodule.authorId = '$id';";
    mysqli_query($con, $sql);

    $delete = "DELETE FROM draftedmodule WHERE draftedmodule.Cite = '$cite' AND draftedmodule.authorId = '$id';";
    mysqli_query($con, $delete);

    $return_array[] = array(
        'message' => 'success',
    );
    if ($return_array) {
        echo json_encode($return_array);
    } else {
        $error[] = array(
            'message' => "error",
        );
        echo json_encode($error);
    }
}
