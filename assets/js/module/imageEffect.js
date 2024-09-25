let sections = document.querySelectorAll("[data-animate]");
let zone = null;

export function init() {
  const options = {
    root: zone,
    rootMargin: "0px",
    threshold: 0.4,
  };

  let observer = new IntersectionObserver(onIntersection, options);

  //Add Observer on each sections
  sections.forEach(function (section) {
    observer.observe(section);
  });
}

function onIntersection(entries) {
  entries.forEach(function (entry) {
    let element = entry.target;
    let intersect = entry.isIntersecting;
    //if intersercting manage class for animation
    if (intersect == true) {
      element.classList.remove("hideImageAnimation");
      element.classList.add("showImageAnimation");
    } else {
      element.classList.remove("showImageAnimation");
      element.classList.add("hideImageAnimation");
    }
  });
}
