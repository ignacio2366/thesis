<?php

include('./connection.php');

// Most Engage Headline

if ($_SERVER['REQUEST_METHOD']) {
    $month = $_POST['month'];
    $monthly = substr($month, 0, 3);

    $sql = "SELECT id,headline, category, author,dateapproved as date, visitor, url FROM newmodule WHERE dateapproved LIKE '%$monthly%' and visitor <> 0 ORDER By visitor DESC;";
    $result = mysqli_query($con, $sql);

    while ($row = mysqli_fetch_array($result)) {
        $return_array[] = array(
            'id' => iconv('UTF-8', 'UTF-8//IGNORE', $row['id']),
            'headline' => iconv('UTF-8', 'UTF-8//IGNORE', $row['headline']),
            'date' => iconv('UTF-8', 'UTF-8//IGNORE', $row['date']),
            'category' => iconv('UTF-8', 'UTF-8//IGNORE', $row['headline']),
            'author' => iconv('UTF-8', 'UTF-8//IGNORE', $row['author']),
            'url' => iconv('UTF-8', 'UTF-8//IGNORE', $row['url']),
            'visitor' => iconv('UTF-8', 'UTF-8//IGNORE', $row['visitor']),
            'message' => "success",
        );
    }

    if (empty($return_array)) {
        echo json_encode(array('message' => null));
    } else {
        echo json_encode($return_array);
    }
}
