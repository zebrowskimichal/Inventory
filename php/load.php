<?php
    include 'conn.php';
    $type = $_GET['type'];
    $data = array();
    //Make query
    if($type == 'item'){
        $query = "SELECT id, name, barcode, category, storage FROM products;";
    }
    if($type == 'category'){
        $query = "SELECT id, name FROM `categories`";
    }
    if($type == 'storage'){
        $query = "SELECT id, name FROM `storages`";
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