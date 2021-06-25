/**
 * 判断A是否在B的原型链上，返回布尔值。
 */

function Car(make, model, year) {
  this.make = make;
  this.model = model;
  this.year = year;
}

const benz = new Car("Honda", "Accord", 1998);

console.log(benz instanceof Car);
// output: true

console.log(benz instanceof Object);
// output: true
