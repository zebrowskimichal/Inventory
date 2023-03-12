<?php
  //get and decode JSON input
  header("Content-Type: application/json");
  $json = file_get_contents('php://input');
  $data = json_decode($json, true);

  // database connection details
  include 'conn.php';
  // check connection
  if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
  }
  //prepare sql syntax
  if($data["type"] == "item"){
    $sql = "INSERT INTO `products`(`name`, `barcode`, `category`, `storage`) VALUES (' ".$data["name"]." ',' ".$data["barcode"]." ', ' ".$data['category']." ', ' ".$data['storage']." ')";
   }
  if($data["type"] == "category"){
    $sql = "INSERT INTO `categories`(`name`) VALUES (' ".$data["name"]." ')";
  }
  if($data["type"] == "storage"){
    $sql = "INSERT INTO `storages`(`name`) VALUES (' ".$data["name"]." ')";
  }
  //execute mySQL query
  if ($conn->query($sql) === true) {
    echo "New record (".$data['name'].") created successfully";
  } else {
    echo "Error: " . $sql . "<br>" . $conn->error;
  }

  $conn->close();
?>
