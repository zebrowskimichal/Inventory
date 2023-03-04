function load(type){
    fetch("load.php?type=" + type)
        .then(function (response) {
            if (response.status >= 200 && response.status < 300) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(function (data) {
            switch (type){
                case 'item':
                    listItems(data);
                    break;
                case 'storage':
                    listStorages(data);
                    break;
                case 'category':
                    listCategories(data);
                    break;
            }
        });           
}
function listItems(data){
    var items = document.getElementById("items");
    var length = data.length;
    for(var i=0; i<length;i++){
        var box = document.createElement("div");
        box.className = "itemsBox";
        box.innerHTML += "<p class='nameBox'>" + data[i].name + "</p>";
        box.innerHTML += "<p class='barcodeBox'>Barcode: " + data[i].barcode + "</p>";
        box.innerHTML += "<p class='categoryBox'>" + data[i].category + "</p>";
        box.innerHTML += "<p class='storageBox'>" + data[i].storage + "</p>";
        box.innerHTML += "<input type='button' class='buttonBoxEdit' onclick='clickElement(" + data[i].productId + ", `item`)'>";
        items.appendChild(box);
    }
}
function listStorages(data){
    var items = document.getElementById("items");
    var length = data.length;
    for(var i=0; i<length;i++){
        var box = document.createElement("div");
        box.onclick = function() {alert("Alert");};
        box.innerHTML += "<p class='nameBox'>" + data[i].name + "</p>";
        box.className = "itemsBox";
        items.appendChild(box);
    }
}
function listCategories(data){
    var items = document.getElementById("items");
    var length = data.length;
    for(var i=0; i<length;i++){
        var box = document.createElement("div");
        box.onclick = function() {alert("Alert");};
        box.innerHTML += "<p class='nameBox'>" + data[i].name + "</p>";
        box.className = "itemsBox";
        items.appendChild(box);
    }
}
function pageLoad(){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const type = urlParams.get('type');
    load(type);
}
function clickElement(id, type){
    var items = document.getElementById("items");
    fetch("edit.php?type=" + type + "&id=" + id)
        .then(function (response) {
            if (response.status >= 200 && response.status < 300) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(function (data) {
            var box = document.createElement("div");
            box.className = "editBox";
            box.innerHTML += "<input type='text' class='editField' name='name' placeholder='" + data[0].name + "'>";
            box.innerHTML += "<input type='text' class='editField' name='barcode' placeholder='" + data[0].barcode + "'>";
            box.innerHTML += "<input type='text' class='editField' name='storage' placeholder='" + data[0].storage + "'>";
            box.innerHTML += "<input type='text' class='editField' name='category' placeholder='" + data[0].category + "'>";

            items.appendChild(box);
        });        
}