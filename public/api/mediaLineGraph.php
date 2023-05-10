<?php

include('./connection.php');

if ($_SERVER['REQUEST_METHOD']) {

    $month = $_POST['month'];

    $linegraph = "SELECT date.day, visitor.month  ,COUNT(visitor.day) as count
    FROM date 
    LEFT JOIN visitor ON date.day = visitor.day AND visitor.month ='$month' 
    GROUP BY date.day;";

    $result = mysqli_query($con, $linegraph);

    while ($row = mysqli_fetch_array($result)) {
        $return_array[] = array(
            'month' => $row['month'],
            'day' => $row['day'],
            'count' => $row['count'],
        );
    }
    if (empty($return_array)) {
        echo json_encode(array('message' => null));
    } else {
        echo json_encode($return_array);
    }
}
