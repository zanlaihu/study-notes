---
theme: smartblue
---

# 对象

ECMAScript 中的对象是一组数据和功能的无序集合，内容就是键值对，值可以是数据或者函数。

Object 是派生其他对象的基类。派生出的对象具有 Object 的所有属性和方法。

每个 Object 实例都有如下属性和方法：

1. constructor: 用于创建当前对象的函数。在前面的例子中，这个属性的值就是 Object()函数。

2. hasOwnProperty(propertyName):用于判断当前对象实例（不是原型）上是否存在给定的属性。要检查的属性名必须是字符串（如 0.hasOwnProperty("name")）或符号。

3. isPrototypeOf(object): 用于判断当前对象是否是另一个对象的原型。

4. propertyIsEnumerable(propertyName): 用于判断给定的属性是否可以使用 for-in 语句枚举。与 hasOwnProperty()一样，属性名必须是字符串。

5. toLocaleString(): 返回对象的字符串表示，该字符串反映对象所在的本地化执行环境。

6. toString(): 返回对象的字符串表示。

7. valueOf(): 返回对象对应的字符串、数值或布尔值。通常与 toString()的返回值相同。
# 创建对象

## new

```javascript
let person = new Object();
```

在没有参数的情况下也可以省略括号，合法但不推荐：

```javascript
let person = new Object; 
```

## {}

```javascript
let person = {};
```

## 对象字面量

对象字面量是更加流行的用来创建对象和添加属性的方式：

```javascript
let person = {
  name: "Klaus",
  sayName() {
    console.log(this.name);
  },
};
```

# 工厂模式

因为对象字面量不能重复创建具有同样属性的多个对象，所以工厂模式出现了。

工厂模式是一种设计模式，按照特定接口创建对象：

```javascript
function createPerson(name, age, job) {
  let o = new Object();
  o.name = name;
  o.age = age;
  o.job = job;
  o.sayName = function () {
    console.log(this.name);
  };
  return o;
}
let person = createPerson("Nicholas", 29, "Software Engineer");
```

工厂模式虽然可以解决创建多个类似对象的问题，但没有解决对象标识问题（即新创建的对象是什么类型）。

# 构造函数模式

构造函数用于创建特定类型对象。像 Object 和 Array 这样的原生构造函数，运行时可以直接在执行环境中使用。也可以自定义构造函数，以函数的形式为对象定义属性和方法：

```javascript
function Person(name, age, job) {
  this.name = name;
  this.age = age;
  this.job = job;
  this.sayName = function () {
    console.log(this.name);
  };
}

// person对象的类型是Person
let person = new Person("Nicholas", 29, "Software Engineer");
```

构造函数的另一种写法：

```javascript
let Person = function (name, age, job) {
  this.name = name;
  this.age = age;
  this.job = job;
  this.sayName = function () {
    console.log(this.name);
  };
};

let person = new Person("Nicholas", 29, "Software Engineer");
// 在实例化时，如果不想传参数，那么构造函数后面的括号可不加。
let person1 = new Person;
```

构造函数和工厂模式有如下区别:

1. 没有显式地创建对象。
2. 属性和方法直接赋值给了 this。
3. 没有 return。

按照惯例，构造函数名称的首字母要大写，非构造函数则以小写字母开头。这有助于区分构造函数和普通函数。

在构造过程中，使用new 操作符发生了如下步骤：

1. 在内存中创建一个新对象。
2. 这个新对象内部的[[Prototype]]特性被赋值为构造函数的 prototype 属性。
3. 构造函数内部的 this 被赋值为这个新对象（即 this 指向新对象）。
4. 执行构造函数内部的代码，给新对象添加属性。
5. 返回该对象。

使用构造函数创建的对象都是 Person 的实例。他们都有一个 constructor 属性指向 Person：

```javascript
console.log(person.constructor == Person); // true
```

>constructor 用于标识对象类型。

所有自定义对象都继承自 Object，所以 person 也是 Object 的实例：

```javascript
console.log(person1 instanceof Object); // true
console.log(person1 instanceof Person); // true
```

## 构造函数也是函数

构造函数与普通函数唯一的区别是调用方式不同。除此之外，构造函数也是函数，并没有把某个函数定义为构造函数的特殊语法。任何函数只要使用 new 操作符调用就是构造函数，而不使用的就是普通函数。

前面的例子中定义的 Person()可以像下面这样调用：

```javascript
// 作为构造函数
let person = new Person("Nicholas", 29, "Software Engineer");
person.sayName(); // "Nicholas"

// 作为函数调用
Person("Greg", 27, "Doctor"); // 添加到window 对象
window.sayName(); // "Greg"

// 在另一个对象的作用域中调用
let o = new Object();
Person.call(o, "Kristen", 25, "Nurse");
o.sayName(); // "Kristen"
```

作为普通函数调用时，会将属性和方法添加到 window 对象。

在调用一个函数而没有明确设置 this 值的情况下（即没有作为对象的方法调用，或者没有使用 call()/apply()调用），this 始终指向 Global 对象（在浏览器中就是 window 对象）。所以 window 对象上就有了一个 sayName()方法。

最后展示的调用方式是通过 call()（或 apply()）将特定对象指定为作用域。这里的调用将对象 o 指定为 Person()内部的 this 值，因此执行完函数代码后，所有属性和 sayName()方法都会添加到对象 o 上面。

## 构造函数的问题

构造函数定义的方法会在每个实例上都创建一遍。使用上面 Person()构造函数创建的每个实例的 sayname()方法并不是同一个。

因为构造函数实际上是这样：

```javascript
function Person(name, age, job) {
  this.name = name;
  this.sayName = new Function("console.log(this.name)");
}
```

所以 person1 和 person2的sayName是不全等的：

```javascript
console.log(person1.sayName === person2.sayName); // false
```
### 解决方法

把函数定义转移到构造函数外部（this 对象可以把函数与对象的绑定推迟到运行时）：

```javascript
function Person(name, age, job) {
  this.name = name;
  this.sayName = sayName;
}

function sayName() {
  console.log(this.name);
}
```

这里的 sayName()函数是全局作用域上的函数，而 Person 中的 sayName 包含的是指向外部函数的指针。

但是如果需要多个方法，就要在全局作用域定义多个函数。这会导致代码不能很好地聚集在一起。

# 原型模式
原型模式解决了上面的问题。

每个函数都会创建一个 prototype 属性，这个属性是一个对象，包含应该由特定引用类型的实例共享的属性和方法。这个对象就是通过调用构造函数创建的对象的原型。

原型对象上面定义的属性和方法可以被对象实例共享。在构造函数中赋值给对象实例的值，可以直接赋值给它们的原型，而不是在构造函数中赋值给对象实例赋值。

```javascript
function Person() {}

Person.prototype.name = "Klaus";
Person.prototype.sayName = function () {
  console.log(this.name);
};

let person1 = new Person();
```

使用原型模式创建的 person1 和 person2 具有：

```
console.log(person1.sayName == person2.sayName); // true
```

function Person(){} 也可以写成：

```
let Person = function(){}；
```

所有属性和方法都直接添加到 Person 的 prototype 属性上，构造函数体内什么也没有。

### 原型模式和构造函数模式可以配合使用

```javascript
function Person() {
  this.name = "Amy";
}

Person.prototype.sayName = function () {
  console.log(this.name);
};

let person1 = new Person();
person1.sayName(); // Klaus
```

## 理解原型

构造函数具有 prototype 属性，指向原型对象。

原型对象具有 constructor 属性，指回与之关联的构造函数。

比如：Person.prototype.constructor 指向 Person()。

在定义构造函数时，会产生一个原型对象。一开始这个原型对象只有 constructor 属性，其他都继承自 Object。

创建实例时，实例内部的 prototype 指向原型对象。所以，实例和原型之间有直接联系，实例和构造函数没有联系。

```javascript
function Person() {}

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
```

## 原型层级
