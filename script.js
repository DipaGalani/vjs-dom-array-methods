const main = document.getElementById("main");
const addUserBtn = document.getElementById("add-user");
const doubleBtn = document.getElementById("double");
const showMillionairesBtn = document.getElementById("show-millionaires");
const sortBtn = document.getElementById("sort");
const calculateWealthBtn = document.getElementById("calculate-wealth");

let data = [];

// fetch random user and add money
const getRandomUser = async () => {
  const response = await fetch("https://randomuser.me/api");
  const data = await response.json();
  const { first, last } = data.results[0].name;

  const newUser = {
    name: `${first} ${last}`,
    money: Math.floor(Math.random() * 1000000),
  };

  addData(newUser);
};

// double everyone's money
const doubleMoney = () => {
  data = data.map((person) => {
    return {
      ...person,
      money: person.money * 2,
    };
  });
  updateDOM();
};

// sort users by richest
const sortByRichest = () => {
  data.sort((a, b) => b.money - a.money);

  updateDOM();
};

// show only the millionaires
const showMillionaires = () => {
  data = data.filter((person) => person.money > 1000000);

  updateDOM();
};

// calculate everyone's wealth
const calculateWealth = () => {
  const wealth = data.reduce((acc, person) => (acc += person.money), 0);

  const wealthEl = document.createElement("div");
  wealthEl.innerHTML = `<h3>Total Wealth: <strong>$${formatMoney(
    wealth
  )}</strong></h3>`;

  main.appendChild(wealthEl);
};

// Update DOM
function updateDOM(providedData = data) {
  main.innerHTML = "<h2><strong>Person</strong> Wealth</h2>";
  providedData.forEach((person) => {
    const element = document.createElement("div");
    element.classList.add("person");
    element.innerHTML = `<strong>${person.name}</strong> $${formatMoney(
      person.money
    )}`;

    main.appendChild(element);
  });
}

// format number as money
function formatMoney(money) {
  return money.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,"); // 12,345.67
}

// Add new obj to data arr
function addData(obj) {
  data.push(obj);

  updateDOM();
}

getRandomUser();

// Event Listeners
addUserBtn.addEventListener("click", getRandomUser);
doubleBtn.addEventListener("click", doubleMoney);
sortBtn.addEventListener("click", sortByRichest);
showMillionairesBtn.addEventListener("click", showMillionaires);
calculateWealthBtn.addEventListener("click", calculateWealth);
