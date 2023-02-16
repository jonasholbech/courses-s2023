const data = {
  name: "Jonas",
  email: "jofh@kea.dk",
  age: 44,
};

fetch("someurl", {
  method: "post",
  headers: {
    "Content-Type": "application/json",
    "x-apikey": "your-cors-api-key",
  },
  body: JSON.stringify(data),
})
  .then((res) => res.json())
  .then((data) => console.log(data));
