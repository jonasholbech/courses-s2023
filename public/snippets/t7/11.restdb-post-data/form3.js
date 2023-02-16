const form = document.querySelector("form");
form.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
  console.log("form submitted");
  event.preventDefault();
  const name = form.elements.name.value;
}
