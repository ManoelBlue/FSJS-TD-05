// Fetch users:
fetch("https://randomuser.me/api/?results=12&inc=name,location,email,picture")
    .then(response => response.json())
    .then(json => console.log(json))
    .catch(error => console.error(error))