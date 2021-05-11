const arr1 = ["a", "b", "c"];
for (let i in arr1) {
  console.log(i); // 0, 1, 2
}

const arr2 = ["a", "b", "c"];
for (let i of arr2) {
  console.log(i); // a, b, c
}
