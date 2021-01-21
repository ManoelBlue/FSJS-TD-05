// Global variables:
const gallery = document.getElementById("gallery");
const users = [];

// Fetch users:
fetch("https://randomuser.me/api/?results=12&inc=name,location,email,picture")
    .then(response => response.json())
    .then(json => json.results.map(user => {
        console.log(user);
        users.push(user);
        console.log(users);

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
    .catch(error => console.error(error));

// Pop up modal window on a click:
gallery.addEventListener("click", (e) => {
    // console.dir(e.target);
    // console.dir(e.target.closest(".card"));

    const card = e.target.closest(".card");
    const cards = Array.prototype.slice.call(document.querySelectorAll(".card"));
    const index = cards.indexOf(card);

    console.log(card);
    console.log(cards);
    console.log(index);

    if(card) {
        gallery.insertAdjacentHTML("afterend", `
            <div class="modal-container">
                <div class="modal">
                    <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                    <div class="modal-info-container">
                        <img class="modal-img" src="${users[index].picture.medium}" alt="profile picture">
                        <h3 id="name" class="modal-name cap">name${users[index].name.first}</h3>
                        <p class="modal-text">${users[index].email}</p>
                        <p class="modal-text cap">${users[index].location.city}</p>
                        <hr>
                        <p class="modal-text">(555) 555-5555</p>
                        <p class="modal-text">123 Portland Ave., Portland, OR 97204</p>
                        <p class="modal-text">Birthday: 10/21/2015</p>
                    </div>
                </div>
    
                <div class="modal-btn-container">
                    <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                    <button type="button" id="modal-next" class="modal-next btn">Next</button>
                </div>
            </div>
        `)
    }

});