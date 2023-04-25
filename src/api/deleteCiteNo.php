<?php
include('./connection.php');

// Add News in News Module from Drafted Cite No

if ($_SERVER['REQUEST_METHOD']) {

    $no =  $_POST['no'];
    $id = $_POST['id'];

    $delete = "DELETE FROM draftedmodule WHERE draftedmodule.draft_NO = '$no' AND draftedmodule.authorId = '$id';";
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
