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
