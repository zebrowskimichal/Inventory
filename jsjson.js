function addItem(){
  if(document.getElementById("name").value.length == 0){
    alert("Please insert some value into `name` field!");
  }else{
      //preparing JSON
      var formData = {
        type: "item",
        name: document.getElementById("name").value,
        barcode: document.getElementById("barcode").value,
        category: document.getElementById("category").value,
        storage: document.getElementById("storage").value
      };
      var jsonData = JSON.stringify(formData);
      // code to send the jsonData to a server-side script
      var xmlhttp = new XMLHttpRequest();
      xmlhttp.open("POST","insert.php");
      xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=UTF-8");
      xmlhttp.send(jsonData);
      //Reset form inputs
      document.getElementById("data").reset();
  }
}
function addValue(valueType){
  if(document.getElementById("name").value.length == 0){
    alert("Please insert some value into `Category name` field!");
  }else{
    /*
    if(valueType == "item"){
    var formData = {
        type: "item",
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
    */
      //preparing JSON
      var formData = {
        type: valueType,
        name: document.getElementById("name").value,
      };
      var jsonData = JSON.stringify(formData);
      // code to send the jsonData to a server-side script
      var xmlhttp = new XMLHttpRequest();
      xmlhttp.open("POST","insert.php");
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
function fetchOptionsData(){
  fetch("load.php?type=category")
        .then(function (response) {
            if (response.status >= 200 && response.status < 300) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(function (data) {
          listOptions(data, category);
        });
    fetch("load.php?type=storage")
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
function listOptions(data, id){
  var length = data.length;
    for (var i = 0; i<length; i++){
      var option = document.createElement('option');
      option.value = data[i].name;
      option.innerHTML = data[i].name;
      id.appendChild(option);
  }
}
