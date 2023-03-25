<?php
    include 'conn.php';
    $username = $_GET['login'];
    $password = $_GET['password'];
    //Script logins user to page
    $query = "SELECT * FROM users where username = ".$username." AND password = ".$password.";";
    $result = mysqli_query($conn, $query);
    $row = mysqli_fetch_array($result, MYSQLI_ASSOC);  
    $count = mysqli_num_rows($result);  

    if($count == 1){  
        $_SESSION['username'] = $username;
        $_SESSION['password'] = $password;
        echo "Login succesfull!";
    }else{  
        echo "Login failed!";
    }

?>