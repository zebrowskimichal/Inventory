function logIn(){
    var usernameForm = username.value;
    var passwordForm = password.value;
    fetch("php/login.php", {
        method: 'POST',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        body: JSON.stringify({
            username:usernameForm,
            password:passwordForm,
        }),
      })
    .then(function (response) {
        if (response.status >= 200 && response.status < 300) {
            return response.text();
        }
        throw new Error(response.statusText);
    })
    .then(function (response) {
            loginStatus.innerHTML = response;
    });
}
