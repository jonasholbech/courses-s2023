//remove iframnes from pdf's (they break decktape)
Reveal.addEventListener("ready", () => {
  if (window.location.search.match(/decktape/gi)) {
    Reveal.getSlides().forEach((slide) => {
      slide.classList.forEach((className) => {
        if (className === "no-print") {
          function cleanupSlideForPrint() {
            //slide.remove();
            const iframe = slide.querySelector("iframe");
            if (iframe) {
              const p = document.createElement("p");
              const a = document.createElement("a");
              a.href = iframe.src;
              a.textContent = "Link (content removed from PDF)";
              p.appendChild(a);
              slide.replaceChild(p, iframe);
            } else {
              slide.remove();
            }
          }
          cleanupSlideForPrint();
        }
      });
    });
  }
});

//add some animation classes to svg elements in .explanation
Reveal.addEventListener("fragmentshown", function (event) {
  // event.fragment = the fragment DOM element

  if (!event.fragment.dataset.animation) {
    return;
  }
  if (event.fragment.nodeName === "g") {
    [...event.fragment.children].forEach((e) => {
      e.classList.add(event.fragment.dataset.animation);
    });
  } else {
    event.fragment.classList.add(event.fragment.dataset.animation);
  }
});

//external links open in a new windows
(function () {
  const links = document.querySelectorAll("a");
  links.forEach((link) => {
    link.getAttribute("href") &&
      link.hostname !== location.hostname &&
      (link.target = "_blank");
  });
})();

import rough from "roughjs";
Reveal.on("slidechanged", (event) => {
  const svg = event.currentSlide.querySelector("[data-is-rough]");
  if (svg) {
    const steps = JSON.parse(svg.dataset.isRough);
    const rc = rough.svg(svg);
    steps.forEach((step) => {
      let node;
      switch (step.type) {
        case "rectangle":
          node = rc.rectangle(
            step.x,
            step.y,
            step.width,
            step.height,
            step.options
          );
          break;
        case "line":
          node = rc.line(step.x1, step.y1, step.x2, step.y2, step.options);
          break;
        case "text":
          node = document.createElementNS("http://www.w3.org/2000/svg", "text");
          node.textContent = step.text;
          node.style.stroke = "white";
          node.style.fill = "white";
          node.setAttribute("x", step.x);
          node.setAttribute("y", step.y);
          break;
      }

      svg.appendChild(node);
    });
  }
});
