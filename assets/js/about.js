import { init as initNavigation } from "./navigation.js";
import Carousel from "./class/Carousel.js";
import Newsletter from "./class/newsletter.js";
import { init as initTheme } from "./module/darkmode.js";
import { init as initScrollEffect } from "./module/scrollEffect.js";

function init() {
  initNavigation();
  initTheme();
  initScrollEffect();
}

let imgTab = [
  "assets/imageContent/cpu.jpg",
  "assets/imageContent/device.jpg",
  "assets/imageContent/gpu.jpg",
  "assets/imageContent/pc.jpg",
  "assets/imageContent/ssd.jpg",
];
let carouselContainer = document.querySelector(".carousel");

let bannerCarousel = new Carousel(imgTab, carouselContainer);

let popupName = "newsletter";
let newsletter = document.querySelector(".popup_overlay");
let newsPopup = new Newsletter(newsletter, popupName);

init();
