async function getData() {
  const response = await fetch("SOME-API-ENDPOINT").catch((e) => {
    //Woops, something went wrong
    throw new Error(e);
  });
  if (response.ok) {
    const data = await response.json();
    dataReceived(data);
  }
}

function dataReceived(myData) {
  //We have the data
  console.log(myData);
}
getData();
