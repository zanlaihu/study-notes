function Person(){};

console.log(typeof Person.prototype); // object
console.log(Person.prototype); // Person {}

console.log(Person.prototype.constructor === Person); // true

// 正常的原型链都会终止于Object的原型对象
// Object原型的原型是null
console.log(Person.prototype.__proto__ === Object.prototype);
console.log(Person.prototype.__proto__.constructor === Object);
console.log(Person.prototype.__proto__.__proto__ === null);

console.log(Object.prototype);
// {
// constructor: f Object(),
// toString: ...
// hasOwnProperty: ...
// isPrototypeOf: ...
// ...
// }




