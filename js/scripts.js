// Global variables:
const searchBar = document.querySelector(".search-container");
const gallery = document.getElementById("gallery");
const users = [];
let isFiltered = false;
let filteredUsers;

// Helper functions:
function addUser(user) {
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
};

// Search Bar funtions:
function addSearchBar() {
    searchBar.insertAdjacentHTML("afterbegin", `
        <form action="#" method="get">
            <input type="search" id="search-input" class="search-input" placeholder="Search...">
            <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
        </form>
    `)
};

function filterSearch() {
    const inputValue = document.getElementById("search-input").value.toLowerCase();
    filteredUsers = users.filter(user => {
        const userName = `${user.name.first} ${user.name.last}`.toLowerCase();
        return userName.includes(inputValue);
    });

    gallery.innerHTML = "";
    filteredUsers.forEach(user => addUser(user));
    isFiltered = (filteredUsers.length < users.length) ? true : false;
};

// Modal Window functions:
function removeModalWindow() {
    const modalWindow = document.querySelector(".modal-container");
    modalWindow.remove();
};

function switchInfo(users, index, date, phone) {
    const user = users[index];
    const userInfo = document.querySelector(".modal-info-container");
    const modal = document.querySelector(".modal");

    userInfo.remove();
    modal.insertAdjacentHTML("beforeend", `
        <div class="modal-info-container fadein">
            <img class="modal-img" src="${user.picture.medium}" alt="profile picture">
            <h3 id="name" class="modal-name cap">name${user.name.first}</h3>
            <p class="modal-text">${user.email}</p>
            <p class="modal-text cap">${user.location.city}</p>
            <hr>
            <p class="modal-text">${phone}</p>
            <p class="modal-text">${user.location.street.numer} ${user.location.street.name}, ${user.location.city}, ${user.location.postcode}</p>
            <p class="modal-text">Birthday: ${date}</p>
        </div>
    `);
};

function handleCardBtns(users, index, date, phone) {
    const cards = Array.prototype.slice.call(document.querySelectorAll(".card"));
    const cardsLength = cards.length - 1;
    const prev = document.getElementById("modal-prev");
    const next = document.getElementById("modal-next");
    const closeBtn = document.getElementById("modal-close-btn");

    prev.addEventListener("click", () => {
        let prevIndex = (index === 0) ? cardsLength : index - 1;
        switchInfo(users, prevIndex, date, phone);
        index = prevIndex;
    });
    next.addEventListener("click", () => {
        let nextIndex = (index === cardsLength) ? 0 : index + 1;
        switchInfo(users, nextIndex, date, phone);
        index = nextIndex;
    });

    closeBtn.addEventListener("click", removeModalWindow);
}

function showModalWindow(users, index) {
    const user = users[index];

    const dob = user.dob.date;
    const year = dob.slice(0, 4);
    const month = dob.slice(5, 7);
    const day = dob.slice(8, 10);
    const date = `${month}/${day}/${year}`;

    const cell = user.cell;
    const formattedCell = cell.replace(/\D/g, "").replace(/^(\d{3})(\d{3})(\d+)$/g, '($1) $2-$3');

    gallery.insertAdjacentHTML("afterend", `
        <div class="modal-container">
            <div class="modal">
                <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                <div class="modal-info-container fadein">
                    <img class="modal-img" src="${user.picture.medium}" alt="profile picture">
                    <h3 id="name" class="modal-name cap">name${user.name.first}</h3>
                    <p class="modal-text">${user.email}</p>
                    <p class="modal-text cap">${user.location.city}</p>
                    <hr>
                    <p class="modal-text">${formattedCell}</p>
                    <p class="modal-text">${user.location.street.numer} ${user.location.street.name}, ${user.location.city}, ${user.location.postcode}</p>
                    <p class="modal-text">Birthday: ${date}</p>
                </div>
            </div>

            <div class="modal-btn-container">
                <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                <button type="button" id="modal-next" class="modal-next btn">Next</button>
            </div>
        </div>
    `)

    handleCardBtns(users, index, date, formattedCell);
};

// Fetch users:
fetch("https://randomuser.me/api/?results=12&inc=name,location,email,picture,cell,dob&nat=gb,us")
    .then(response => response.json())
    .then(json => json.results.forEach(user => {
        users.push(user);
        addUser(user);
    }))
    .catch(error => console.error(error));

// Pop up modal window on a click:
gallery.addEventListener("click", (e) => {
    const card = e.target.closest(".card");
    const cards = Array.prototype.slice.call(document.querySelectorAll(".card"));
    const index = cards.indexOf(card);
    const selectedUsers = isFiltered ? filteredUsers : users;

    showModalWindow(selectedUsers, index);
});

// Call functions:
addSearchBar();

// Handle search fomr submission :
if(document.getElementsByTagName("form")) {
    const form = document.getElementsByTagName("form")[0];
    form.addEventListener("submit", filterSearch);
}