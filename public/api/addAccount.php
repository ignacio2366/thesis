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

    if (move_uploaded_file($imageTempName, $target)) {


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
                'name' => $name,
                'username' => $username,
                'file' => $target,
                'type' => basename($imageName),
                'message' => 'success',
            );
            echo json_encode($return_array);
        } else {
            $error[] = array(
                'message' => "existing",
                'count' => (int)$response['COUNT(userFullname)'],
            );

            echo json_encode($error);
        }
    }
}
