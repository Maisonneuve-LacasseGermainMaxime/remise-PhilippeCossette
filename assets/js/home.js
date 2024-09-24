import { init as initNavigation } from "./navigation.js";
import { init as initTheme } from "./module/darkmode.js";
//Global Variables

// Database
const tabProducts = [
  {
    id: "1",
    name: "ASRock",
    price: 899,
    gb: "24",
    type: "RX 7900 XTX",
  },
  {
    id: "2",
    name: "ASUS",
    price: 1299,
    gb: "12",
    type: "Geforce RTX 4070",
  },
  {
    id: "3",
    name: "GIGABYTE",
    price: 399,
    gb: "6",
    type: "Geforce GTX 1060",
  },
  {
    id: "4",
    name: "ZOTAC",
    price: 1900,
    gb: "16",
    type: "Geforce RTX 4080",
  },
  {
    id: "5",
    name: "MSI",
    price: 2100,
    gb: "24",
    type: "Geforce RTX 4080",
  },
  {
    id: "6",
    name: "EVGA",
    price: 999,
    gb: "6",
    type: "Geforce RTX 3090",
  },
];

// Select the right section
let getElementGrid = document.querySelector(".product-grid");
let getElementDetails = document.querySelector(".product-details");

// Initialize filter variable for sorting
let filter = "";

// Select Button to filter by Name (A-Z)
let filterByName = document.querySelector(".byName");

// Add Evenlistener and Call doFilter Function with the "name" filter
filterByName.addEventListener("click", function () {
  filter = "name";
  doFilter(tabProducts, filter);
});

// Select Button to filter by PriceLow (0-1)
let filterByPriceLow = document.querySelector(".byPriceLow");

// Add Evenlistener and Call doFilter Function with the "priceLow" filter
filterByPriceLow.addEventListener("click", function () {
  filter = "priceLow";
  doFilter(tabProducts, filter);
});

// Select Button to filter by PriceHigh (1-0)
let filterByPriceHigh = document.querySelector(".byPriceHigh");

// Add Evenlistener and Call doFilter Function with the "priceHigh" filter
filterByPriceHigh.addEventListener("click", function () {
  filter = "priceHigh";
  doFilter(tabProducts, filter);
});

// Function

// Function to call all function needed on load
function init() {
  // Calling displayGrid Function
  displayGrid(tabProducts);
  // Calling displayRandomItem function
  displayRandomItem(tabProducts);

  initNavigation();
  initTheme();
}

function redirectToForm() {
  location.href = "form.html";
  console.log("sss");
}

// Create the src of each image
function createLink(name) {
  let link = `assets/img/${name}.png`;
  return link;
}

// Display the product Grid
function displayGrid(tab) {
  for (let i = 0; i < tab.length; i++) {
    getElementGrid.insertAdjacentHTML(
      "beforeend",
      `
            <div class="item">
                <img src="${createLink(tab[i].name)}" alt="${
        tab[i].name
      }-graphic-card">
                <div>
                <h2>${tab[i].name}</h2>
                <h2>${tab[i].price}$</h2>
                </div>
            </div>`
    );
    // Adding EventListener to all element
    getElementGrid.lastElementChild.addEventListener("click", function () {
      let items = document.querySelectorAll(".item");
      displayDetails(tab[i]);
      // Adding class "Clicked" if clicked
      items.forEach((itm) => itm.classList.remove("clicked"));
      items[i].classList.add("clicked");
    });
  }
}

// Display the product detail
function displayDetails(tab) {
  // Calling Function emptySection
  emptySection(getElementDetails);
  getElementDetails.insertAdjacentHTML(
    "beforeend",
    `
        <div class="detail-item">
            <h2>Selected Item</h2>
            <img src="${createLink(tab.name)}" alt="">
            <div>
            <h2>${tab.name}</h2>
            <h3>${tab.type}</h3>
            <h3>${tab.gb}GB</h3>
            <h3>${tab.price}$</h3>
            <button class="button">Buy Now</button>
            </div>
        </div>
        `
  );
  let buyNowDetails = document.querySelectorAll(".button");

  buyNowDetails.forEach(function (button) {
    button.addEventListener("click", redirectToForm);
  });
}

// Display a random product detail
function displayRandomItem(tab) {
  // Creating random number (index)
  let randomIndex = Math.floor(Math.random() * tab.length);
  getElementDetails.insertAdjacentHTML(
    "beforeend",
    `
        <div class="detail-item">
            <h2>Item of the day</h2>
            <img src="${createLink(tab[randomIndex].name)}" alt="">
            <div>
            <h2>${tab[randomIndex].name}</h2>
            <h3>${tab[randomIndex].gb}GB</h3>
            <h3>${tab[randomIndex].type}</h3>
            <h3>${tab[randomIndex].price}$</h3>
            <button class="button">Buy Now</button>
            </div>
        </div>
        `
  );
  let buyNowRandom = document.querySelectorAll(".button");

  buyNowRandom.forEach(function (button) {
    button.addEventListener("click", redirectToForm);
  });
}

// Filter Product Grid
function doFilter(tab, filter) {
  let newTab = [...tab];
  // Filter By Name (A-Z)
  if (filter == "name") {
    newTab.sort(function (a, b) {
      if (a.name < b.name) {
        return -1;
      } else if (a.name > b.name) {
        return 1;
      } else {
        return 0;
      }
    });
  }
  // Filter By Price Low (0-100)
  else if (filter == "priceLow") {
    newTab.sort(function (a, b) {
      if (a.price < b.price) {
        return -1;
      } else if (a.price > b.price) {
        return 1;
      } else {
        return 0;
      }
    });
  }
  // Filter By Price High (100-0)
  else {
    newTab.sort(function (a, b) {
      if (a.price > b.price) {
        return -1;
      } else if (a.price < b.price) {
        return 1;
      } else {
        return 0;
      }
    });
  }
  emptySection(getElementGrid);
  displayGrid(newTab);
}

// Empty a section given
function emptySection(section) {
  section.innerHTML = "";
}

// Execution

//Calling Function init
init();
