<?php

include('./connection.php');

if ($_SERVER['REQUEST_METHOD']) {
    $id = $_POST['id'];
    $sql  = "SELECT newmodule.id, newmodule.CiteName, newmodule.Headline ,newmodule.datestart, COUNT(draftedmodule.Cite) AS count 
    FROM newmodule
    LEFT JOIN draftedmodule ON newmodule.CiteName = draftedmodule.Cite 
    WHERE newmodule.authorId = '$id' AND newmodule.action = 'draft'
    GROUP BY newmodule.id, newmodule.CiteName, newmodule.datestart;";
    $result = mysqli_query($con, $sql);

    $return_array = array();
    while ($row = mysqli_fetch_array($result)) {
        $return_array[] = array(
            'id' => $row['id'],
            'title' => iconv('UTF-8', 'UTF-8//IGNORE', $row['CiteName']),
            'headline' => iconv('UTF-8', 'UTF-8//IGNORE', $row['Headline']),
            'datestart' => iconv('UTF-8', 'UTF-8//IGNORE', $row['datestart']),
            'count' => iconv('UTF-8', 'UTF-8//IGNORE', $row['count']),
            'message' => 'success'
        );
    }

    if (empty($return_array)) {
        echo json_encode(array('message' => null));
    } else {
        echo json_encode($return_array);
    }
}
