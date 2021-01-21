// Global variables:
const searchBar = document.querySelector(".search-container");
const gallery = document.getElementById("gallery");
const users = [];

// Helper functions:
function closeModalWindow() {
    const modalWindow = document.querySelector(".modal-container");
    modalWindow.remove();
}

function addSearchBar() {
    searchBar.insertAdjacentHTML("afterbegin", `
        <form action="#" method="get">
            <input type="search" id="search-input" class="search-input" placeholder="Search...">
            <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
        </form>
    `)
}

// Fetch users:
fetch("https://randomuser.me/api/?results=12&inc=name,location,email,picture,cell,dob")
    .then(response => response.json())
    .then(json => json.results.map(user => {
        users.push(user);

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
    const card = e.target.closest(".card");
    const cards = Array.prototype.slice.call(document.querySelectorAll(".card"));
    const index = cards.indexOf(card);
    const selectedUser = users[index];

    const dob = selectedUser.dob.date;
    const year = dob.slice(0, 4);
    const month = dob.slice(5, 7);
    const day = dob.slice(8, 10);

    const cell = selectedUser.cell;
    const formattedCell = cell.replace(/\D/g, "").replace(/^(\d{3})(\d{3})(\d+)$/g, '($1) $2-$3');

    if(card) {
        gallery.insertAdjacentHTML("afterend", `
            <div class="modal-container">
                <div class="modal">
                    <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                    <div class="modal-info-container">
                        <img class="modal-img" src="${selectedUser.picture.medium}" alt="profile picture">
                        <h3 id="name" class="modal-name cap">name${selectedUser.name.first}</h3>
                        <p class="modal-text">${selectedUser.email}</p>
                        <p class="modal-text cap">${selectedUser.location.city}</p>
                        <hr>
                        <p class="modal-text">${formattedCell}</p>
                        <p class="modal-text">${selectedUser.location.street.numer} ${selectedUser.location.street.name}, ${selectedUser.location.city}, ${selectedUser.location.postcode}</p>
                        <p class="modal-text">Birthday: ${month}/${day}/${year}</p>
                    </div>
                </div>
    
                <div class="modal-btn-container">
                    <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                    <button type="button" id="modal-next" class="modal-next btn">Next</button>
                </div>
            </div>
        `)

        document.getElementById("modal-close-btn").addEventListener("click", closeModalWindow);
    }
});