const birds = animals.filter((oneAnimal) => {
  if (oneAnimal.type === "Bird") {
    return true;
  } else {
    return false;
  }
});
