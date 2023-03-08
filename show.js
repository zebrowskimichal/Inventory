//load function fetches data from load.php script and lists all items on site
function load(type){
    fetch("load.php?type=" + type)
        .then(function (response) {
            if (response.status >= 200 && response.status < 300) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(function (data) {
            var length = Object.keys(data[0]).length;
            var dataLength = data.length;
            var items = document.getElementById("items");
            for(var i=0; i<dataLength;i++){
                box = document.createElement("div");
                box.className = "itemsBox";
                for(var x=1; x<length;x++){
                    dataName = Object.keys(data[i])[x];
                    box.innerHTML += "<p class='nameBox'>" + dataName + ": " + data[i][dataName] + "</p>";
                }
                box.innerHTML += "<input type='button' class='buttonBoxEdit' onclick='clickElement(" + data[i].productId + ", `" + type + "`)'>"
                items.appendChild(box);
            }
        });           
}
//pageLoad function- gets type parameter from url and runs load function
function pageLoad(){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const type = urlParams.get('type');
    load(type);
}
function backEdit(){
    document.getElementsByClassName("editBox")[0].remove();
    document.getElementById("items").style.display = "block";
}
//clickElement funciton- allows user to edit items
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
            var editForm = document.createElement("form");
            editForm.id = "editForm";
            var length = Object.keys(data[0]).length;
                for(var x=1; x<length;x++){
                    dataName = Object.keys(data[0])[x];
                    editForm.innerHTML += "<input type='text' required class='editField' placeholder='" + dataName + ": " + data[0][dataName] + "'>";
                }
                editForm.innerHTML += "<input type='button' value='Back' class='EditButton' onclick='backEdit();'>";
                editForm.innerHTML += "<input type='button' value='Change' class='EditButton' onclick='ChangeItem(" + id + ");'>";
            document.getElementsByClassName("container")[0].appendChild(box);
            document.getElementsByClassName("editBox")[0].appendChild(editForm);
            items.style.display = "none";
        });        
}
