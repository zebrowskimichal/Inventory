<?php
    include 'conn.php';
     //get and decode JSON input
    header("Content-Type: application/json");
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);
    $username = $data['username'];
    $password = $data['password'];
    //Script logins user to page
    $query = "SELECT * FROM users where username = ' ".$username." ' AND password = ' ".$password." ';";
    $result = mysqli_query($conn, $query);
    $row = mysqli_fetch_array($result, MYSQLI_ASSOC);  
    $count = mysqli_num_rows($result);  
    //check if user credentials are correct
    if($count == 1){  
        //create a session
        $_SESSION['username'] = $username;
        $_SESSION['password'] = $password;
        echo "Login succesful";
    }else{  
        echo "Login failed!";
    }

?>