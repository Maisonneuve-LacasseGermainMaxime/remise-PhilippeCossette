let body = document.querySelector("body");

let buttonDark = document.querySelector("[data-mode='dark']");
let buttonLight = document.querySelector("[data-mode='light']");

buttonLight.addEventListener("click", lightTheme);
buttonDark.addEventListener("click", darkTheme);

// change to light color
function lightTheme() {
  localStorage.setItem("theme", buttonLight.dataset.mode);
  body.dataset.theme = buttonLight.dataset.mode;

  buttonDark.classList.add("showHiddenButton");

  buttonDark.addEventListener("animationend", function () {
    buttonLight.classList.add("hideButton");
    buttonDark.classList.remove("hideButton");
    buttonDark.classList.remove("showHiddenButton");
  });
}

// change to dark color
function darkTheme() {
  localStorage.setItem("theme", buttonDark.dataset.mode);
  body.dataset.theme = buttonDark.dataset.mode;

  buttonLight.classList.add("showHiddenButton");

  buttonLight.addEventListener("animationend", function () {
    buttonDark.classList.add("hideButton");
    buttonLight.classList.remove("hideButton");
    buttonLight.classList.remove("showHiddenButton");
  });
}

// function checked if localstorage true or false
function checkLocalStorage() {
  if (localStorage.getItem("theme") == "light") {
    lightTheme();
  } else if (localStorage.getItem("theme") == "dark") {
    darkTheme();
  }
}

export function init() {
  checkLocalStorage();
}
