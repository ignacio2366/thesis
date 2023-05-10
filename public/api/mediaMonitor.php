<?php

include('./connection.php');



if ($_SERVER['REQUEST_METHOD']) {

    $month = $_POST['month'];
    $monthly = substr($month, 0, 3);

    $data = "SELECT 
    COUNT(CASE WHEN newmodule.status = 'Approved' AND newmodule.dateapproved LIKE '%$monthly%' THEN newmodule.id END) AS approvedcount,
    COUNT(CASE WHEN newmodule.status = 'For Review' AND newmodule.datestart LIKE '%$monthly%' THEN newmodule.id END) AS reviewcount,
    COUNT(CASE WHEN newmodule.status = 'Approved' THEN newmodule.id END) AS totalnews,
    SUM(CASE WHEN newmodule.status = 'Approved' AND newmodule.dateapproved LIKE '%$monthly%' THEN newmodule.visitor END) AS totalvisited
    FROM newmodule;";

    $result = mysqli_query($con, $data);

    while ($row = mysqli_fetch_array($result)) {
        $return_array = array(
            'approvedcount' =>  $row['approvedcount'],
            'reviewcount' =>  $row['reviewcount'],
            'totalnews' => $row['totalnews'],
            'totalvisited' => $row['totalvisited'],
            'month' => $monthly,
            'message' => "success",
        );
    }
    echo json_encode($return_array);
}
