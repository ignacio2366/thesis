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
    LEFT JOIN newmodule n ON n.category = m.category AND n.dateapproved = m.max_datestart
    WHERE c.catStatus = 'Active'
    ;";
    $result = mysqli_query($con, $sql);

    while ($row = mysqli_fetch_array($result)) {
        $return_array[] = array(
            'category' =>  $row['catName'],
            'headline' =>  $row['headline'],
            'message' => "success",
        );
    }
    echo json_encode($return_array);
}
