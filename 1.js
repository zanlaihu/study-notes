function makeFunc() {
  let name = "Mozilla";
  function displayName() {
    console.log(name);
  }
  return displayName;
}

let myFunc = makeFunc();
myFunc();
