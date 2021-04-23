# 创建对象

虽然使用 Object 构造函数或对象字面量可以方便地创建对象，但这些方式也有明显不足：创建具
有同样接口的多个对象需要重复编写很多代码。

ECMAScript 6 开始正式支持类和继承。ES6 的类旨在完全涵盖之前规范设计的基于原型的继承模
式。不过，无论从哪方面看，ES6 的类都仅仅是封装了 ES5.1 构造函数加原型继承的语法糖而已。

# 工厂模式

工厂模式是一种众所周知的设计模式，广泛应用于软件工程领域，用于抽象创建特定对象的过程。

下面的例子展示了一种按照特定接口创建对象的方式：

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
let person1 = createPerson("Nicholas", 29, "Software Engineer");
let person2 = createPerson("Greg", 27, "Doctor");
```

这里，函数 createPerson()接收 3 个参数，根据这几个参数构建了一个包含 Person 信息的对象。可以用不同的参数多次调用这个函数，每次都会返回包含 3 个属性和 1 个方法的对象。这种工厂模式虽然可以解决创建多个类似对象的问题，但没有解决对象标识问题（即新创建的对象是什么类型）。

# 构造函数模式

ECMAScript 中的构造函数是用于创建特定类型对象的。像 Object 和 Array 这样的原生构造函数，运行时可以直接在执行环境中使用。也可以自定义构造函数，以函数的形式为
自己的对象类型定义属性和方法。

前面的例子使用构造函数模式可以这样写：

```javascript
function Person(name, age, job) {
  this.name = name;
  this.age = age;
  this.job = job;
  this.sayName = function () {
    console.log(this.name);
  };
}
let person1 = new Person("Nicholas", 29, "Software Engineer");
let person2 = new Person("Greg", 27, "Doctor");
```

在这个例子中，Person()构造函数代替了 createPerson()工厂函数。实际上，Person()内部的代码跟 createPerson()基本是一样的，只是有如下区别:

1. 没有显式地创建对象。
2. 属性和方法直接赋值给了 this。
3. 没有 return。

另外，要注意函数名 Person 的首字母大写了。按照惯例，构造函数名称的首字母都是要大写的，非构造函数则以小写字母开头。这是从面向对象编程语言那里借鉴的，有助于在 ECMAScript 中区分构造函数和普通函数。毕竟 ECMAScript 的构造函数就是能创建对象的函数。

在使用它构造出函数的过程中，还使用了 new 这个操作符。使用它时会有如下步骤：

1. 在内存中创建一个新对象。
2. 这个新对象内部的[[Prototype]]特性被赋值为构造函数的 prototype 属性。
3. 构造函数内部的 this 被赋值为这个新对象（即 this 指向新对象）。
4. 执行构造函数内部的代码（给新对象添加属性）。
5. 返回该对象。

我们使用构造函数创建的 person1 和 person2 都是 Person 的实例。这两个对象都有一个 constructor 属性指向 Person，如下所示：

```javascript
console.log(person1.constructor == Person); // true
console.log(person2.constructor == Person); // true
```

constructor 用于标识对象类型。因为所有自定义对象都继承自 Object，所以 person1 和 person2 都是 Object 的实例，同时也是 Person 的实例。所以使用 instanceof 就可以得到下面这样的结果：

```javascript
console.log(person1 instanceof Object); // true
console.log(person1 instanceof Person); // true
console.log(person2 instanceof Object); // true
console.log(person2 instanceof Person); // true
```

定义自定义构造函数可以确保实例被标识为特定类型，相比于工厂模式，这是一个很大的好处。

构造函数还有一种写法，赋值给变量的函数表达式也可以表示构造函数：

```javascript
let Person = function (name, age, job) {
  this.name = name;
  this.age = age;
  this.job = job;
  this.sayName = function () {
    console.log(this.name);
  };
};
```

在实例化时，如果不想传参数，那么构造函数后面的括号可加可不加。

```javascript
function Person() {
  this.name = "Jake";
  this.sayName = function () {
    console.log(this.name);
  };
}
let person1 = new Person();
let person2 = new Person();
```

## 构造函数也是函数

构造函数与普通函数唯一的区别就是调用方式不同。除此之外，构造函数也是函数。并没有把某个函数定义为构造函数的特殊语法。任何函数只要使用 new 操作符调用就是构造函数，而不使用 new 操作符调用的函数就是普通函数。

比如，前面的例子中定义的 Person()可以像下面这样调用：

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

作为普通函数调用时，结果会将属性和方法添加到 window 对象。

在调用一个函数而没有明确设置 this 值的情况下（即没有作为对象的方法调用，或者没有使用 call()/apply()调用），this 始终指向 Global 对象（在浏览器中就是 window 对象）。因此在上面的调用之后，window 对象上就有了一个 sayName()方法。最后展示的调用方式是通过 call()（或 apply()）调用函数，同时将特定对象指定为作用域。这里的调用将对象 o 指定为 Person()内部的 this 值，因此执行完函数代码后，所有属性和 sayName()方法都会添加到对象 o 上面。

## 构造函数的问题
