async function getData() {
  const response = await fetch("SOME-URL");
  const data = await response.json();
}
