import { init as initNavigation } from "./navigation.js";
import { init as initTheme } from "./module/darkmode.js";

/////////////Variable

//Init variable validForm to False for the form validation
let validForm = false;

//Init currentSection variable to 0 for the sections navigation
let currentSection = 0;

// Init all variables for form
const form = document.querySelector(".form");
const input = form.querySelectorAll("[name]");
const section = form.querySelectorAll("section[data-page]");
const sectionResume = form.querySelector(".resume");

const shippingServices = form.querySelectorAll("[type='radio']");
const shippingType = form.querySelector(".shippingType");

const deliveryText = form.querySelector(".delivery");

const inputStore = form.querySelector("[name='storeselected']");
inputStore.disabled = true;

const dateLabel = form.querySelector(".dateLabel");
const dateInput = form.querySelector("[type='date']");
dateInput.min = new Date().toISOString().split("T")[0];
//

// Select all buttons into variable
const buttonsNext = form.querySelectorAll("[data-direction='1']");
const buttonsBack = form.querySelectorAll("[data-direction='-1']");
const buttonSubmit = form.querySelector(".button-submit");
//

//////////// Function

// function to initialize //
function init() {
  form.addEventListener("submit", onSubmit);

  input.forEach(function (element) {
    element.addEventListener("change", onChangeInput);
  });

  buttonsNext.forEach(function (element) {
    element.addEventListener("click", nextSection);
  });

  buttonsBack.forEach(function (element) {
    element.addEventListener("click", previousSection);
  });

  buttonSubmit.addEventListener("click", onSubmit);

  showSection();
  initNavigation();
  initTheme();
}

// Function to validate inputs on change event //
function onChangeInput(event) {
  const trigger = event.currentTarget;
  const type = trigger.type;
  const name = trigger.name;
  const value = trigger.value;
  const checked = trigger.checked;

  trigger.value = trigger.value.trim();

  // Check if input is checkbox //
  if (type == "checkbox") {
    // if input checkbox is checked enable inputStore and change the label
    if (checked == true) {
      inputStore.disabled = false;
      inputStore.required = true;
      dateLabel.textContent = "Pick up Date*";
      shippingType.textContent = "Pickup in Store";

      deliveryText.textContent = "";
      deliveryText.dataset.name = "storeselected";

      // Disable radio input
      shippingServices.forEach(function (radio) {
        radio.disabled = true;
        radio.required = false;
        radio.checked = false;
        radio.nextElementSibling.classList.add("disabledText");
      });
    }
    // if input checkbox is unchecked disable inputStore and change the label
    else {
      inputStore.disabled = true;
      inputStore.required = false;
      inputStore.value = "";
      inputStore.classList.remove("valid");
      dateLabel.textContent = "Shipping Date*";
      shippingType.textContent = "Shipping";

      deliveryText.textContent = "";
      deliveryText.dataset.name = "delivery";

      shippingServices.forEach(function (radio) {
        radio.disabled = false;
        radio.required = true;
        radio.nextElementSibling.classList.remove("disabledText");
      });
    }
  }

  // Format values from input type tel
  if (type == "tel") {
    trigger.value = trigger.value.replace(
      /^\(?([0-9]{3})\)?[.\-\s]?([0-9]{3})[.\-\s]?([0-9]{4})$/,
      "($1)$2-$3"
    );
  }

  // Format values from input named postal
  if (name == "postal") {
    trigger.value = trigger.value
      .replace(/([A-z][0-9][A-z])\s?([0-9][A-z][0-9])/, "$1 $2")
      .toUpperCase();
  }

  //Input Validation //
  const valid = trigger.checkValidity();

  if (value == "") {
    trigger.classList.remove("valid");
    trigger.classList.remove("invalid");
  } else if (valid == false) {
    trigger.classList.add("invalid");
    trigger.classList.remove("valid");
  } else if (valid == true) {
    trigger.classList.add("valid");
    trigger.classList.remove("invalid");
  }

  validateInputs(trigger);
  validateSections(trigger);
}

// Functions to Validate Inputs and remove class "hideElement" if invalid to display an error//
function validateInputs(input) {
  // Display value in resume if validated
  if (input.checkValidity() == true || input.value == "") {
    showResume(input.name, input.value);
  }

  if (
    input.type != "date" &&
    input.type != "checkbox" &&
    input.type != "radio" &&
    input.name != "storeselected"
  ) {
    const validity = input.checkValidity();
    const closestDiv = input.closest("div");
    const errorLog = closestDiv.querySelector(".error");

    // if valid add class hideElement
    if (input.value == "" || validity == true) {
      errorLog.classList.add("hideElement");
    }
    // if invalid remove class hideElement to display error
    else if (validity == false) {
      errorLog.classList.remove("hideElement");
    }
  }
}

// Function that Validates Sections
function validateSections(input) {
  const closestSection = input.closest("section");
  const sectionInputs = closestSection.querySelectorAll("[name]");
  // Array to insert validity state of each inputs
  const validateArray = [];

  sectionInputs.forEach(function (input) {
    const isValid = input.checkValidity();
    validateArray.push(isValid);
  });

  const invalidSection = validateArray.includes(false);
  // if invalidSection is false enable button next
  if (invalidSection == false) {
    closestSection
      .querySelector(".button-next[data-direction='1']")
      .classList.remove("disabled");
  }
  // if invalidSection is true disable button next
  else {
    closestSection
      .querySelector(".button-next[data-direction='1']")
      .classList.add("disabled");
  }
}

// Function to display each section
function showSection() {
  hideAll();
  section[currentSection].classList.remove("hideElement");
}

// Function to hide all sections
function hideAll() {
  section.forEach(function (section) {
    section.classList.add("hideElement");
  });
}

// Function to go to the next section
function nextSection(event) {
  const trigger = event.currentTarget;
  currentSection++;

  if (currentSection < section.length) {
    showSection();
  }
}

// Function to go to the last section
function previousSection(event) {
  const trigger = event.currentSection;
  currentSection--;

  if (currentSection >= 0) {
    showSection();
  }
}

// Function that insert all values if validated into section resume
function showResume(input, value) {
  const resumeInput = sectionResume.querySelector(`[data-name="${input}"]`);

  if (resumeInput !== null) {
    resumeInput.textContent = value;
  }
}

//Function that submits the form if valid
function onSubmit(event) {
  event.preventDefault();

  validForm = form.checkValidity;

  if (validForm) {
    form.submit();
    form.reset();
  }
}

/////////////RUN
init();
