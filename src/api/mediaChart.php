<?php

include('./connection.php');

if ($_SERVER['REQUEST_METHOD']) {

    $month = $_POST['month'];
    $monthly = substr($month, 0, 3);

    $data = "SELECT 
    COUNT(CASE WHEN newmodule.status = 'Approved' AND newmodule.dateapproved LIKE '%$monthly%' AND newmodule.sentiment ='positive' THEN newmodule.id END) AS positve,
    COUNT(CASE WHEN newmodule.status = 'Approved' AND newmodule.dateapproved LIKE '%$monthly%' AND newmodule.sentiment ='negative' THEN newmodule.id END) AS negative,
    COUNT(CASE WHEN newmodule.status = 'Approved' AND newmodule.dateapproved LIKE '%$monthly%' AND newmodule.sentiment ='neutral' THEN newmodule.id END) AS neutral
    FROM newmodule;";

    $result = mysqli_query($con, $data);

    while ($row = mysqli_fetch_array($result)) {
        $return_array = array(
            'positve' =>  $row['positve'],
            'negative' => $row['negative'],
            'neutral' => $row['neutral'],
            'month' => $monthly,
            'message' => "success",
        );
    }

    if (empty($return_array)) {
        echo json_encode(array('message' => null));
    } else {
        echo json_encode($return_array);
    }
}
