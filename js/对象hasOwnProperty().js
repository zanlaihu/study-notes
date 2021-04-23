// hasOwnProperty()
function foo() {
    this.name = 'foo'
    this.sayHi = function () {
        console.log('Say Hi')
    }
}

foo.prototype.sayGoodBy = function () {
    console.log('Say Good By')
}

let myPro = new foo()
console.log(myPro.name) // foo
console.log(myPro.hasOwnProperty('name')) // true
console.log(myPro.hasOwnProperty('toString')) // false
console.log(myPro.hasOwnProperty('hasOwnProperty')) // fasle
console.log(myPro.hasOwnProperty('sayHi')) // true
console.log(myPro.hasOwnProperty('sayGoodBy')) // false
console.log('sayGoodBy' in myPro) // true



// hasOwnProperty
for (key in person) {
    // 遍历出来的key可以直接放进去
    console.log(person.hasOwnProperty(key));
}

// 针对某个key需要加引号再放进去
console.log(person.hasOwnProperty('firstName'));