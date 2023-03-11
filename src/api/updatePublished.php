<?php

include('./connection.php');
if ($_SERVER['REQUEST_METHOD']) {

    $id = $_POST['id'];
    $remark = $_POST['remark'];
    $action = $_POST['action'];
    $date = $_POST['date'];



    $sql = " UPDATE `newmodule` SET  `remark` = '$remark',`action` ='$action',`dateapproved` = '$date', `status` = '$action' WHERE `id` = '$id'";
    $result = mysqli_query($con, $sql);


    $return_array[] = array(
        'name' => $id,
        'date' => $date,
        'message' => "success",
    );
    echo json_encode($return_array);
}
