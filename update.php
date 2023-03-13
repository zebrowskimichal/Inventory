<?php
    include 'conn.php';
    //get and decode JSON input
    header("Content-Type: application/json");
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);
    //Make query
    if($data["type"] == 'item'){
        $query = "UPDATE `products` SET `name`='".$data["name"]."',`barcode`='".$data["barcode"]."',`category`='".$data["category"]."',`storage`='".$data["storage"]."' WHERE id = ".$data["id"].";";
    }
    if($data["type"] == 'category'){
        $query = "UPDATE `categories` SET `name`='".$data["name"]."' WHERE id = ".$data["id"].";";
    }
    if($data["type"] == 'storage'){
        $query = "UPDATE `storages` SET `name`='".$data["name"]."' WHERE id = ".$data["id"].";";
    }
    //execute mySQL query
    if ($conn->query($query) === true) {
        echo "".$data["type"]." has been updated.";
    } else {
        echo "Error: " . $query . "<br>" . $conn->error;
    }    
?>