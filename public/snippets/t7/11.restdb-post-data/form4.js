const form = document.querySelector("form");
form.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
  console.log("form submitted");
  event.preventDefault();
  const userName = form.elements.name.value;
  const userEmail = form.elements.email.value;
  const myData = {
    name: userName,
    email: userEmail,
  };
  //and then we're ready to send it
}
