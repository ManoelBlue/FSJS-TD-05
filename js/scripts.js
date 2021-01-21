// Global variables:
const gallery = document.getElementById("gallery");

// Fetch users:
fetch("https://randomuser.me/api/?results=12&inc=name,location,email,picture")
    .then(response => response.json())
    .then(json => json.results.map(user => {
        console.log(user);
        gallery.insertAdjacentHTML("beforeend", `
        <div class="card">
            <div class="card-img-container">
                <img class="card-img" src="${user.picture.medium}" alt="profile picture">
            </div>
            <div class="card-info-container">
                <h3 id="name" class="card-name cap">${user.name.first} ${user.name.last}</h3>
                <p class="card-text">${user.email}</p>
                <p class="card-text cap">${user.location.city}, ${user.location.state}</p>
            </div>
        </div>
        `)
    }))
    .catch(error => console.error(error))