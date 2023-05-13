<?php

include('./connection.php');

// Edit User Account

if ($_SERVER['REQUEST_METHOD']) {

    $id = $_POST['id'];
    $name = $_POST['name'];
    $username = $_POST['username'];
    $type = $_POST['type'];
    $role = $_POST['role'];

    if (!isset($_FILES['image'])) {
        $_FILES['image'] = null;
    }

    if ($_FILES['image']) {
        $image = $_FILES['image'];

        $imageName = $image['name'];
        $imageType = $image['type'];
        $imageTempName = $image['tmp_name'];
        $imageError = $image['error'];
        $imageSize = $image['size'];
        $target = $path . basename($imageName);

        if (ftp_put($ftp_conn, $ftp_path . $image['name'], $imageTempName, FTP_BINARY)) {
            $sql = "UPDATE `usermodule` SET `userFullname`='$name',`userType`='$type',`userName`='$username',`userImage`='$target',`userRole`='$role' WHERE userId = '$id';";
            $result = mysqli_query($con, $sql);


            $return_array[] = array(
                'name' => "with picture",
                'image' => $image,
                'message' => true,
            );
            echo json_encode($return_array);
            ftp_close($ftp_conn);
        }
    } else {
        $sql = "UPDATE `usermodule` SET `userFullname`='$name',`userType`='$type',`userName`='$username',`userRole`='$role' WHERE `userId` = '$id'";
        $result = mysqli_query($con, $sql);

        $return_array[] = array(
            'name' => "no picture",
            'message' => true,
        );
        echo json_encode($return_array);
    }
}
