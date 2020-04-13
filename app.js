const main = document.querySelector("#main");
const addUserBtn = document.querySelector("#add-user");
const doubleBtn = document.querySelector("#double");
const showMilBtn = document.querySelector("#show-millionaires");
const sortBtn = document.querySelector("#sort");
const calculateWealthBtn = document.querySelector("#calculate-wealth");
7;

let data = [];

getRandomUser();
getRandomUser();
getRandomUser();

// Fetch some random users and add their wealth
async function getRandomUser() {
  const res = await fetch("https://randomuser.me/api/");
  const data = await res.json();

  const user = data.results[0];

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000),
  };

  addData(newUser);
}

// Add new obj to data array
function addData(obj) {
  data.push(obj);

  updateDOM();
}

// Update the DOM
function updateDOM(providedData = data) {
  // Clear the main div
  main.innerHTML = "<h2><strong>Person</strong> Wealth</h2>";
  providedData.forEach((item) => {
    const element = document.createElement("div");
    element.classList.add("person");
    element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(
      item.money
    )}`;
    main.appendChild(element);
  });
}

// Format number as money
function formatMoney(number) {
  return "£" + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}

// Double the money
function doubleMoney() {
  data = data.map((user) => {
    return { ...user, money: user.money * 2 };
  });

  updateDOM();
}

// Show only Millionaires
function showMil() {
  data = data.filter((user) => user.money > 1000000);

  updateDOM();
}

// Sort by richest
function sortRich() {
  data.sort((a, b) => b.money - a.money);

  updateDOM();
}

// Calculate the total wealth
function calculateWealth() {
  updateDOM();
  const wealth = data.reduce((acc, user) => acc + user.money, 0);

  const wealthElement = document.createElement("div");
  wealthElement.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(
    wealth
  )}</strong></h3>`;

  main.appendChild(wealthElement);
}

// EVENT LISTNERS
addUserBtn.addEventListener("click", getRandomUser);
doubleBtn.addEventListener("click", doubleMoney);
showMilBtn.addEventListener("click", showMil);
sortBtn.addEventListener("click", sortRich);
calculateWealthBtn.addEventListener("click", calculateWealth);
