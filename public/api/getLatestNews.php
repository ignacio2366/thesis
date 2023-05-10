<?php

include('./connection.php');



// Get the latest news

if ($_SERVER['REQUEST_METHOD']) {

    $sql = "SELECT `id`, `headline`, `content`, `category`, `datestart`, `contenttag`, `status`, `remark`, `action`, `author`, `authorId`, `source`, `image`, `sentimentrate`, `sentiment`,`oversentiment`, `plagiarismrate`, `CiteName`, `dateapproved` FROM `newmodule` WHERE `status` = 'Approved' ORDER BY  id DESC limit 20 ;";

    $result = mysqli_query($con, $sql);

    $data = array();

    while ($row = mysqli_fetch_assoc($result)) {

        $data[] = array_map('utf8_encode', $row); // Encode non-UTF-8 strings

    }

    $serialized_data = serialize($data);

    $json = json_encode(unserialize($serialized_data));



    if ($json === false) {

        echo json_encode(array('message' => 'Error encoding data: ' . json_last_error_msg()));
    } else {

        echo $json;
    }



    mysqli_close($con);
}
