//function that fetches stats data from stats.php script
let statsJSON;
function shops() {
    fetch("php/stats.php")
        .then(function (response) {
            if (response.status >= 200 && response.status < 300) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(function (stats) {
            statsJSON = stats;
            load();
        });
        
}
//function that shows stats data to the user
function load(){
    totalElements.innerHTML += statsJSON[0].numberOfProducts;
    totalStorages.innerHTML += statsJSON[1].totalStorages;
    totalCategories.innerHTML += statsJSON[2].totalCategories;
}