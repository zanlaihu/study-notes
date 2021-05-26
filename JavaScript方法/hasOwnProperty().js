// 是否有某个属性或方法
function Person() {
    this.name = 'foo'
}
Person.prototype.sex = 'male';

person1 = new Person();

console.log(person1.hasOwnProperty('name')) // true
console.log(person1.hasOwnProperty('sayGoodBy')) // false


