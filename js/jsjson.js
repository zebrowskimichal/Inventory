function addValue(valueType){
  if(document.getElementById("name").value.length == 0){
    alert("Please insert some value into `Category name` field!");
  }else{
    //preparing JSON
    if(valueType == 'item'){
      var formData = {
        type: valueType,
        name: document.getElementById("name").value,
        barcode: document.getElementById("barcode").value,
        category: document.getElementById("category").value,
        storage: document.getElementById("storage").value
      };  
    } else {
      var formData = {
        type: valueType,
        name: document.getElementById("name").value,
      };
    }
      var jsonData = JSON.stringify(formData);
      // code to send the jsonData to a server-side script
      var xmlhttp = new XMLHttpRequest();
      xmlhttp.open("POST","php/insert.php");
      xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=UTF-8");
      xmlhttp.send(jsonData);
      //Reset form inputs
      document.getElementById("data").reset();
      //get the response from the php script
      xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
          let response = xmlhttp.responseText;
          alert(response);
        }
      }
  }
}
//Script that gets data: storages, categories from server
function fetchOptionsData(){
  fetch("php/load.php?type=category")
        .then(function (response) {
            if (response.status >= 200 && response.status < 300) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(function (data) {
          listOptions(data, category);
        });
    fetch("php/load.php?type=storage")
      .then(function (response) {
          if (response.status >= 200 && response.status < 300) {
              return response.json();
          }
          throw new Error(response.statusText);
      })
      .then(function (data) {
          listOptions(data, storage);
      });                   
}
//Script that create <select> options: storages, categories
function listOptions(data, id){
  var length = data.length;
    for (var i = 0; i<length; i++){
      var option = document.createElement('option');
      option.value = data[i].name;
      option.innerHTML = data[i].name;
      id.appendChild(option);
  }
}
//Functions sands data to update.php and updates item
function changeItem(valueType, valueId){
  if(valueType == 'item'){
    var formData = {
      type: valueType,
      id: valueId,
      name: document.getElementById("name").value,
      barcode: document.getElementById("barcode").value,
      category: document.getElementById("category").value,
      storage: document.getElementById("storage").value
    };  
  } else {
    var formData = {
      type: valueType,
      id: valueId,
      name: document.getElementById("name").value,
    };
  }
  var updateData = JSON.stringify(formData);
  // code to send the jsonData to a server-side script
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("POST","php/update.php?");
  xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=UTF-8");
  xmlhttp.send(updateData);
  //get the response from the php script
  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      let response = xmlhttp.responseText;
      alert(response);
      backEdit();
      pageLoad();
    }
  }
}
//function that deletes element
function deleteElement(valueId, valueType){
  if(confirm("Do you really want to delete this " + valueType + " ?")){
    fetch("php/delete.php?type=" + valueType + "&id=" + valueId)
    .then(function (response) {
        if (response.status >= 200 && response.status < 300) {
            return response.text();
        }
        throw new Error(response.statusText);
    })
    .then(function (response) {
      alert(response);
      items.innerHTML = ""
      pageLoad();
    });
  } else {
    alert("nie usuwam!");
  }

}