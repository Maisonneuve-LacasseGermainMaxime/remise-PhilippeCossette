let sections = document.querySelectorAll("section");
let zone = null;

export function init() {
  const options = {
    root: zone,
    rootMargin: "0px",
    threshold: 0.5,
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
      element.classList.remove("noOpacity");
      element.classList.add("withOpacity");
    } else {
      element.classList.remove("withOpacity");
      element.classList.add("noOpacity");
    }
  });
}
