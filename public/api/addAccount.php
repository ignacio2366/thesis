<?php

include('./connection.php');

// Add User Account

if ($_SERVER['REQUEST_METHOD']) {


    $name = $_POST['name'];
    $username = $_POST['username'];
    $type = $_POST['type'];
    $role = $_POST['role'];
    $image = $_FILES['image'];
    $imageName = $image['name'];
    $imageType = $image['type'];
    $imageTempName = $image['tmp_name'];
    $imageError = $image['error'];
    $imageSize = $image['size'];
    $target = $path . basename($imageName);

    if (ftp_put($ftp_conn, $ftp_profileImage . $image['name'], $imageTempName, FTP_BINARY)) {
        $count = mysqli_query($con, "SELECT COUNT(userFullname) from usermodule where userFullname = '$name'");
        $response = mysqli_fetch_array($count);
        if ((int)$response['COUNT(userFullname)'] == 0) {

            $getquery = "select userId from usermodule order by userId DESC LIMIT 1;";
            $last = mysqli_query($con, $getquery);


            while ($row = mysqli_fetch_array($last)) {
                $password = $row['userId'] + 1;
            }

            $sql = "INSERT INTO `usermodule`(`userFullname`, `userType`, `userStatus`, `userName`, `userPassword`, `userImage`,`userRole`) VALUES ('$name','$type','Active','$username','pdm$password','$target', '$role')";
            $result = mysqli_query($con, $sql);

            $return_array[] = array(
                'message' => 'success',
            );
            echo json_encode($return_array);
        } else {
            $error[] = array(
                'message' => "existing",
            );

            echo json_encode($error);
        }
    } else {
        $error[] = array(
            'message' => "error uploading file",
        );
    }
}
