//Global Variable

// array of all navigation tab/link
const tableauNavigation = [
    {
        link: "Index",
    },
    {
        link: "A propos",
    },
    {
        link: "Contact",
    },
];

// Select the Nav section
let navContainer = document.querySelector("nav")

// Function

// Function to call all function needed on load
function init() {
    importNavigation(tableauNavigation)
}


// This Funtion is displaying the tabs in the navigation. Also add class "current" if needed
function importNavigation(tabNav) {
    for (let i = 0; i < tabNav.length; i++) {
        // This is the link to the documentation of "URL.includes" https://stackoverflow.com/questions/16133491/detect-what-page-you-are-on-javascript
        let link = tabNav[i].link
        link = link.replaceAll(" ", "")
        link = link.toLowerCase()
        link = `${link}.html`
        if (document.URL.includes(tabNav[i].link)) {
            navContainer.insertAdjacentHTML("beforeend", `<a href="${link}" class="current">${tabNav[i].link}</a>`)
        }
        else {
            navContainer.insertAdjacentHTML("beforeend", `<a href="${link}">${tabNav[i].link}</a>`)
        }
    }

}



//Execution

// Execution of function init
init()