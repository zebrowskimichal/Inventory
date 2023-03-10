<?php
    include 'conn.php';
    $stats = array();
    //Get Total Elements-number of products from db
        $question = mysqli_query($conn, "SELECT COUNT(id) AS numberOfProducts FROM products;");
        //$stats += 'numberOfProducts' = mysqli_fetch_row($question);
        $stats[] = array("numberOfProducts"=>mysqli_fetch_row($question)[0]);

    //Get total-storages numbers
        $question = mysqli_query($conn, "SELECT COUNT(id) AS numberOfStorages FROM storages;");
        $stats[] = array("totalStorages"=>mysqli_fetch_row($question)[0]);
    
    //Get total-categories number
        $question = mysqli_query($conn, "SELECT COUNT(id) AS numberOfCategories FROM categories;");
        $stats[] = array("totalCategories"=>mysqli_fetch_row($question)[0]);

/*
    //total-max-elements number
        $question = mysqli_query($conn, "SELECT COUNT(productId) AS numberOfProducts FROM products;");
        $numberOfProducts = array();
        while($answer = mysqli_fetch_assoc($question)){
            $numberOfProducts[] = $answer;
        }
        $numberOfProductsJSON =  json_encode($numberOfProducts);
echo $numberOfCategoriesJSON;
echo $numberOfProductsJSON;
echo $numberOfStoragesJSON;*/
        $statsJSON = json_encode($stats);
        echo $statsJSON;
?>