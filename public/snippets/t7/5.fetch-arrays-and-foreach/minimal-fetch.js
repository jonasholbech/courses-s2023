async function getData() {
  const response = await fetch("SOME-API-ENDPOINT");
  const data = await response.json();
  dataReceived(data);
}

function dataReceived(myData) {
  //We have the data
  console.log(myData);
}
getData();
