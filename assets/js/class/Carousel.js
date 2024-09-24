class Carousel {
  constructor(imageTab, containerHTML) {
    this.imageTab = imageTab;
    this.containerHTML = containerHTML;

    this.mainImg = this.containerHTML.querySelector("[data-image='main']");

    this.position = 0;

    this.containerHTML.addEventListener("click", this.onClick.bind(this));

    this.displayImage(this.position);

    this.interval = setInterval(this.nextImage.bind(this), 5000);
    this.midToLeft = this.midToLeft.bind(this);
    this.rightToMid = this.rightToMid.bind(this);
    this.midToRight = this.midToRight.bind(this);
    this.leftToMid = this.leftToMid.bind(this);
  }

  displayImage(mainPosition) {
    this.mainImg.src = this.imageTab[mainPosition];
  }

  nextImage() {
    this.mainImg.removeEventListener("animationend", this.midToLeft);
    this.mainImg.removeEventListener("animationend", this.rightToMid);
    this.mainImg.removeEventListener("animationend", this.midToRight);
    this.mainImg.removeEventListener("animationend", this.leftToMid);

    this.position++;
    if (this.position >= this.imageTab.length) {
      this.position = 0;
    }
    this.mainImg.addEventListener("animationend", this.midToLeft);

    this.mainImg.classList.add("slide-mid-to-left");
  }

  midToLeft(event) {
    this.mainImg.removeEventListener("animationend", this.midToLeft);
    this.mainImg.classList.remove("slide-mid-to-left");
    this.mainImg.addEventListener("animationend", this.rightToMid);
    this.displayImage(this.position);
    this.mainImg.classList.add("slide-right-to-mid");
  }

  rightToMid(event) {
    this.mainImg.removeEventListener("animationend", this.rightToMid);
    this.mainImg.addEventListener("animationend", this.midToLeft);
    this.mainImg.classList.remove("slide-right-to-mid");
  }

  previousImage() {
    this.mainImg.removeEventListener("animationend", this.midToLeft);
    this.mainImg.removeEventListener("animationend", this.rightToMid);
    this.mainImg.removeEventListener("animationend", this.midToRight);
    this.mainImg.removeEventListener("animationend", this.leftToMid);

    this.position--;

    if (this.position < 0) {
      this.position = this.imageTab.length - 1;
    }

    this.mainImg.addEventListener("animationend", this.midToRight);

    this.mainImg.classList.add("slide-mid-to-right");
  }

  midToRight(event) {
    this.mainImg.removeEventListener("animationend", this.midToRight);
    this.mainImg.classList.remove("slide-mid-to-right");
    this.mainImg.addEventListener("animationend", this.leftToMid);
    this.displayImage(this.position);
    this.mainImg.classList.add("slide-left-to-mid");
  }

  leftToMid(event) {
    this.mainImg.removeEventListener("animationend", this.leftToMid);
    this.mainImg.addEventListener("animationend", this.midToRight);
    this.mainImg.classList.remove("slide-left-to-mid");
  }

  onClick(event) {
    let target = event.target;
    let button = target.closest("[data-direction]");
    console.log("test");

    if (button != null) {
      clearInterval(this.interval);
      let direction = button.dataset.direction;
      if (direction == 1) {
        this.nextImage();
      } else if (direction == -1) {
        this.previousImage();
      }
      this.interval = setInterval(this.nextImage.bind(this), 5000);
    }
  }
}

export default Carousel;
