<?php
    include 'conn.php';
    $type = $_GET['type'];
    $id = $_GET['id'];
    $data = array();
    //Make query
    if($type == 'item'){
        $query = "SELECT id, name, barcode, category, storage FROM products WHERE id = ".$id.";";
    }
    if($type == 'category'){
        $query = "SELECT id, name FROM `categories` WHERE id = ".$id.";";
    }
    if($type == 'storage'){
        $query = "SELECT id, name FROM `storages` WHERE id = ".$id.";";
    }
    //Get data from database
    $result = mysqli_query($conn, $query);
    if ($result->num_rows > 0) {
        while($answer = mysqli_fetch_assoc($result)){
            $data[] = $answer;
        }
    }
    echo json_encode($data);
?>