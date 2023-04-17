<?php

include('./connection.php');

// Get User Account admin module

if ($_SERVER['REQUEST_METHOD']) {

    $sql = "SELECT categorymodule.catNo, categorymodule.catName, categorymodule.catStatus, SUM(newmodule.visitor) as visitor,COUNT(newmodule.id) AS count
    FROM categorymodule
    LEFT JOIN newmodule ON categorymodule.catName = newmodule.category AND newmodule.status = 'Approved'
    WHERE categorymodule.catStatus = 'Active'
    GROUP BY categorymodule.catName;";
    $result = mysqli_query($con, $sql);

    while ($row = mysqli_fetch_array($result)) {
        $return_array[] = array(
            'no' =>  $row['catNo'],
            'name' =>  $row['catName'],
            'count' => $row['count'],
            'status' => $row['catStatus'],
            'visitor' => $row['visitor'],
            'message' => "success",
        );
    }
    echo json_encode($return_array);
}
