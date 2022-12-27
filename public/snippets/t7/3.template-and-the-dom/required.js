const myEl = document.querySelector("main");
const myNewEl = document.createElement("section");

myNewEl.textContent = "noget text";
myEl.innerHTML = "<p>noget HTML</p>";

myEl.appendChild(myNewEl);

myEl.classList.add("en-css-class");
myEl.classList.remove("en-css-class");
myEl.classList.toggle("en-css-class");

if (myEl.classList.contains("en-css-class")) {
  console.log("gør noget");
}
