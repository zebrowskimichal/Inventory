<?php
    include 'conn.php';
    $type = $_GET['type'];
    $id = $_GET['id'];
    if($type == "item"){
        $dbName = "products";
    }
    if($type == "category"){
        $dbName = "categories";
    }
    if($type == "storage"){
        $dbName = "storages";
    }
    $query = "DELETE FROM ".$dbName." WHERE id = ".$id."";
    //execute mySQL query
    if ($conn->query($query) === true) {
        echo "Deleted ".$type." with id ".$id." !";
    } else {
        echo "Error: " . $query . "<br>" . $conn->error;
    }      
?>