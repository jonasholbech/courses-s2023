const data = [1, 2, 3, 4];

data.forEach((item) => {
  //do stuff
  console.log(item);
});

const newData = data.map((item) => {
  //return stuff
  return item + 1;
});
//newData: [2,3,4,5]
