let sections = document.querySelectorAll("section");
let zone = null;

console.log(sections);

export function init() {
  const options = {
    root: zone,
    rootMargin: "0px",
    threshold: 0.5,
  };

  let observer = new IntersectionObserver(onIntersection, options);

  sections.forEach(function (section) {
    observer.observe(section);
  });
}

function onIntersection(entries) {
  entries.forEach(function (entry) {
    let element = entry.target;
    let intersect = entry.isIntersecting;

    if (intersect == true) {
      element.classList.remove("noOpacity");
      element.classList.add("withOpacity");
    } else {
      element.classList.remove("withOpacity");
      element.classList.add("noOpacity");
    }
  });
}
