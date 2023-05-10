<?php

include('./connection.php');

// Scan the News Headline

if ($_SERVER['REQUEST_METHOD']) {
    $month = $_POST['month'];
    $monthly = substr($month, 0, 3);

    $sql = "SELECT id,headline, category, dateapproved as date, visitor, url FROM newmodule WHERE dateapproved LIKE '%$monthly%' and visitor <> 0 ORDER By visitor DESC;";
    $result = mysqli_query($con, $sql);

    while ($row = mysqli_fetch_array($result)) {
        $return_array[] = array(
            'id' =>  $row['id'],
            'headline' =>  $row['headline'],
            'date' => $row['date'],
            'category' => $row['category'],
            'url' => $row['url'],
            'visitor' => $row['visitor'],
            'message' => 'success',
        );
    }

    if (empty($return_array)) {
        echo json_encode(array('message' => null));
    } else {
        echo json_encode($return_array);
    }
}
