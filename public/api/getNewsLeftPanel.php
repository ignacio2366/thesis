<?php

include('./connection.php');

// Get User Account admin module

if ($_SERVER['REQUEST_METHOD']) {

    $sql = "SELECT c.catName, n.headline
    FROM categorymodule c
    LEFT JOIN (
        SELECT category, MAX(dateapproved) AS max_datestart
        FROM newmodule
        WHERE status = 'Approved'
        GROUP BY category
    ) m ON c.catName = m.category
    LEFT JOIN (
        SELECT category, MAX(id) AS max_id
        FROM newmodule
        WHERE status = 'Approved'
        GROUP BY category
    ) i ON i.category = m.category
    LEFT JOIN newmodule n ON n.category = i.category AND n.id = i.max_id
    WHERE c.catStatus = 'Active';";
    $result = mysqli_query($con, $sql);
    $data = array();

    while ($row = mysqli_fetch_array($result)) {
        $return_array[] = array(
            'category' =>  $row['catName'],
            'headline' =>  $row['headline'],
            'message' => "success",
        );
    }
    $serialized_data = serialize($return_array);
    $json = json_encode(unserialize($serialized_data));

    if ($json === false) {

        echo json_encode(array('message' => 'Error encoding data: ' . json_last_error_msg()));
    } else {
        echo $json;
    }
    mysqli_close($con);
}
