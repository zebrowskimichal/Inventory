<?php
    $type = $_POST['type'];
    include 'conn.php';
    if($type == 'item'){
        $name = $_POST['name'];
        $barcode = $_POST['barcode'];
        $query = "INSERT INTO `products`(`name`, `barcode`) VALUES ('".$name."','".$barcode."')";
    }
    if($type == 'category'){
        $name = $_POST['name'];
        $query = "INSERT INTO `products`(`name`) VALUES ('".$name."')";
    }
    if($type == 'storage'){
        $name = $_POST['name'];
        $query = "INSERT INTO `products`(`name`) VALUES ('".$name."')";
    }
    mysqli_query($conn, $query);
    echo "$name";
?>