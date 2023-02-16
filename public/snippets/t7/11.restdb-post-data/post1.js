fetch("someurl", {
  method: "post",
})
  .then((res) => res.json())
  .then((data) => console.log(data));
