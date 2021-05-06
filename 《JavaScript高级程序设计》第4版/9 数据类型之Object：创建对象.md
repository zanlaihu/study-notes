---
theme: smartblue
---

# 对象

ECMAScript 中的对象是一组数据和功能的无序集合。它没有特定顺序。可以把 ECMAScript 的对象想象成一张散列表，内容就是一组名/值对，值可以是数据或者函数。

ECMAScript 中的 Object 是派生其他对象的基类。派生出的对象具有 Object 类型的所有属性和方法。

每个 Object 实例都有如下属性和方法：

1. constructor: 用于创建当前对象的函数。在前面的例子中，这个属性的值就是 Object()函数。

2. hasOwnProperty(propertyName):用于判断当前对象实例（不是原型）上是否存在给定的属性。要检查的属性名必须是字符串（如 0.hasOwnProperty("name")）或符号。

3. isPrototypeOf(object): 用于判断当前对象是否是另一个对象的原型。

4. propertyIsEnumerable(propertyName): 用于判断给定的属性是否可以使用 for-in 语句枚举。与 hasOwnProperty()一样，属性名必须是字符串。

5. toLocaleString(): 返回对象的字符串表示，该字符串反映对象所在的本地化执行环境。

6. toString(): 返回对象的字符串表示。

7. valueOf(): 返回对象对应的字符串、数值或布尔值。通常与 toString()的返回值相同。

# 创建对象

## new 操作符创建。

```javascript
let person = new Object();
person.name = "Klaus";
person.sayName = function () {
  console.log(this.name);
};
```

在没有参数的情况下，也可以省略括号：

```javascript
let person = new Object(); // 合法，但不推荐
```

## {}也可以创建对象：

```javascript
let person = {};
```

## 使用“对象字面量”创建对象

对象字面量是更加流行的用来创建对象的方式。前面的例子可以改成：

```javascript
let person = {
  name: "Klaus",
  sayName() {
    console.log(this.name);
  },
};
```

# 工厂模式

虽然使用对象字面量可以方便地创建对象，但它不能重复创建具有同样接口的多个对象。

工厂模式是一种设计模式，用于抽象创建特定对象。

按照特定接口创建对象：

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

这个函数可以多次调用。这种工厂模式虽然可以解决创建多个类似对象的问题，但没有解决对象标识问题（即新创建的对象是什么类型）。

# 构造函数模式

构造函数用于创建特定类型对象。像 Object 和 Array 这样的原生构造函数，运行时可以直接在执行环境中使用。也可以自定义构造函数，以函数的形式为对象定义属性和方法。

构造函数的函数声明形式：

```javascript
function Person(name, age, job) {
  this.name = name;
  this.age = age;
  this.job = job;
  this.sayName = function () {
    console.log(this.name);
  };
}

let person = new Person("Nicholas", 29, "Software Engineer");
```

构造函数本身作为函数，写成赋值给变量的函数表达式也可以：

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
```

在这个例子中，Person()构造函数代替了 createPerson()工厂函数。他们有如下区别:

1. 没有显式地创建对象。
2. 属性和方法直接赋值给了 this。
3. 没有 return。

按照惯例，构造函数名称的首字母要大写，非构造函数则以小写字母开头。这有助于区分构造函数和普通函数。

在构造过程中，还使用了 new 这个操作符。发生了如下步骤：

1. 在内存中创建一个新对象。
2. 这个新对象内部的[[Prototype]]特性被赋值为构造函数的 prototype 属性。
3. 构造函数内部的 this 被赋值为这个新对象（即 this 指向新对象）。
4. 执行构造函数内部的代码，给新对象添加属性。
5. 返回该对象。

使用构造函数创建的对象都是 Person 的实例。他们都有一个 constructor 属性指向 Person，如下所示：

```javascript
console.log(person.constructor == Person); // true
```

> constructor 用于标识对象类型。（解决了工厂模式的问题）

因为所有自定义对象都继承自 Object，所以 person 也是 Object 的实例 。

使用 instanceof 可以得到这样的结果：

```javascript
console.log(person1 instanceof Object); // true
console.log(person1 instanceof Person); // true
```

在实例化时，如果不想传参数，那么构造函数后面的括号可不加。

```javascript
function Person() {
  this.name = "Jake";
  this.sayName = function () {
    console.log(this.name);
  };
}
let person1 = new Person();
```

## 构造函数也是函数

构造函数与普通函数唯一的区别是调用方式不同。除此之外，构造函数也是函数，并没有把某个函数定义为构造函数的特殊语法。任何函数只要使用 new 操作符调用就是构造函数，而不使用 new 操作符调用的函数就是普通函数。

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

构造函数定义的方法会在每个实例上都创建一遍。使用上面 Person()构造函数创建的实例都有 sayname()方法，但是不同实例的 sayname()方法并不是同一个。

因为构造函数实际上是这样：

```javascript
function Person(name, age, job) {
  this.name = name;
  this.sayName = new Function("console.log(this.name)");
}
```

所以每个实例都有自己的 Function 实例。如果用 Person()构造函数创建实例 person1 和 person2,那么这两个 sayName 是不全等的：

```javascript
console.log(person1.sayName == person2.sayName); // false
```

我们不需要定义两个不同的 Function 实例。

因为 this 对象可以把函数与对象的绑定推迟到运行时，可以把函数定义转移到构造函数外部：

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

但是如果需要多个方法，就要在全局作用域定义多个函数。这会导致代码不能很好地聚集在一起。这个新问题可以用原型模式解决。

# 原型模式

每个函数都会创建一个 prototype 属性，这个属性是一个对象，包含应该由特定引用类型的实例共享的属性和方法。这个对象就是通过调用构造函数创建的对象的原型。

使用原型对象的好处是，在它上面定义的属性和方法可以被对象实例共享。在构造函数中赋值给对象实例的值，可以直接赋值给它们的原型。
