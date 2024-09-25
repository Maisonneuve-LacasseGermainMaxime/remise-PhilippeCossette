class Newsletter {
  constructor(containerHTML, popupName) {
    this.containerHTML = containerHTML;
    this.popupName = popupName;

    if (localStorage.getItem(this.popupName) == "true") {
      this.containerHTML.classList.add("noDisplay");
    } else {
      setTimeout(this.showPopup.bind(this), 5000);
    }

    this.containerHTML.addEventListener("click", this.closePopup.bind(this));
  }

  //function shows popup if localstorage isnt true
  showPopup() {
    let opened = localStorage.getItem(this.popupName);
    if (opened == "false" || opened == null) {
      this.containerHTML.classList.remove("animationHide");

      this.containerHTML.addEventListener(
        "transitionend",
        function () {
          this.containerHTML.classList.remove("noDisplay");
        }.bind(this)
      );

      localStorage.setItem(this.popupName, "true");
    }
  }

  //function that closes the popup when clicking
  closePopup(event) {
    let target = event.target;

    let exitButton = target.closest("[data-button='exit']");

    if (exitButton != null) {
      this.containerHTML.classList.remove("withOpacity");
      this.containerHTML.classList.add("animationHide");

      this.containerHTML.addEventListener(
        "transitionend",
        function () {
          this.containerHTML.classList.add("noDisplay");
          this.containerHTML.classList.remove("animationHide");
        }.bind(this)
      );
    }
  }
}

export default Newsletter;
