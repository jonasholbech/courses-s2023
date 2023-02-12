fetch("someurl", {
  method: "get",
  headers: {
    "x-apikey": "your-cors-api-key",
  },
})
  .then((e) => e.json())
  .then(doSomething);
