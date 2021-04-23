let example = {};

Object.defineProperty(example, "name", {
  value: "Klaus",
});

Object.defineProperties(example, {
  getValue: {
    get() {
      return this.value;
    },
  },
  year: {
    value: "200",
  },
  getYear: {
    get() {
      return this.year;
    },
  },
});

console.log(example); // {}

console.log(example.getValue); // undefined
console.log(example.getYear); // 200
