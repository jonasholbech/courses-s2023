async function getData() {
  const response = await fetch("...");
  const data = await response.json();
  someFunction(data);
}
getData();
