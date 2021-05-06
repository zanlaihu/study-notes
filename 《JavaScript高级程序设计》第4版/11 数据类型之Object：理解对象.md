# 合并对象

合并（merge）对象，就是把源对象所有的本地属性一起复制到目标对象上。这种操作有时也被称为“混入”（mixin）。

## Object.assign()

这个方法接收一个目标对象和一个或多个源对象作为参数。每个源对象中可枚举（Object.propertyIsEnumerable()返回 true）和自有（Object.hasOwnProperty()返回 true）属性复制到目标对象。以字符串和符号为键的属性会被复制。每个符合条件的属性，这个方法会使用源对象上的[[Get]]取得属性的值，然后使用目标对象上的[[Set]]设置属性的值。

```javascript
let dest = {};
let src = {
  id: "src",
};

let result = Object.assign(dest, src);

console.log(dest); //{ id: 'src' }

// 虽然合并后值相同，但两个对象不等价
console.log(dest !== src); // true

// 但是result被认为和dest等价
console.log(result === dest); //true
```

面对多个源对象：

```javascript
let dest = {};
let result = Object.assign(dest, { a: "apple" }, { b: "pear" });
console.log(result); // { a: 'apple', b: 'pear' }
```

对于获取函数与设置函数进行合并时就会发生问题：

```javascript
let dest = {
  year_: 0,
  set setYear(val) {
    this.year_ = val;
  },
  get gettingYear() {
    return this.year_;
  },
};

let src = {
  year_: 0,
  get getYear() {
    return this.year_;
  },
};

Object.assign(dest, src);
console.log(dest); // { year_: 0, setYear: [Setter], gettingYear: [Getter], getYear: 0 }
console.log(dest.getYear); // 0

dest.setYear = 2000;
console.log(dest); // { year_: 2000, setYear: [Setter], gettingYear: [Getter], getYear: 0 }
console.log(dest.getYear); // 0
console.log(dest.gettingYear); // 2000
```

合并进去的访问器属性 getYear，只能获取 src 内部的 year\_。即使合并到 dest 后成为 dest 的属性，对于 dest 中的 year\_的数值变化，并不敏感。

## 覆盖属性

相同名称的属性在合并时，会被后来居上的覆盖。

```javascript
dest = { id: "dest" };
result = Object.assign(
  dest,
  { id: "src1", a: "foo" },
  { id: "src2", b: "bar" }
);
// Object.assign 会覆盖重复的属性
console.log(result); // { id: src2, a: foo, b: bar }

// 可以通过目标对象上的设置函数观察到覆盖的过程：
dest = {
  set id(x) {
    console.log(x);
  },
};
Object.assign(dest, { id: "first" }, { id: "second" }, { id: "third" });
// first
// second
// third
```

这里其实也出现了设置函数这个特性的另一个使用办法，用来监听属性的变化。

## 对象合并其实是一个浅复制

```javascript
dest = {};
src = { a: {} };
Object.assign(dest, src);
// 浅复制意味着只会复制对象的引用
console.log(dest); // { a :{} }
console.log(dest.a === src.a); // true
```

这或许可以解答之前我遇到的问题。

## 合并时出错怎么办

如果赋值期间出错，则操作会中止并退出，同时抛出错误。Object.assign()没有“回滚”之前
赋值的概念，因此它是一个尽力而为、可能只会完成部分复制的方法。

```javascript
let dest, src, result;
/**
 * 错误处理
 */
dest = {};
src = {
  a: "foo",
  get b() {
    // Object.assign()在调用这个获取函数时会抛出错误
    throw new Error();
  },
  c: "bar",
};
try {
  Object.assign(dest, src);
} catch (e) {}
// Object.assign()没办法回滚已经完成的修改
// 因此在抛出错误之前，目标对象上已经完成的修改会继续存在：
console.log(dest); // { a: foo }
```

# 对象标识及相等判定

在 ECMAScript 6 之前，有些特殊情况即使是===操作符也无能为力：

```javascript
// 这些是===符合预期的情况
console.log(true === 1); // false
console.log({} === {}); // false
console.log("2" === 2); // false
// 这些情况在不同JavaScript 引擎中表现不同，但仍被认为相等
console.log(+0 === -0); // true
console.log(+0 === 0); // true
console.log(-0 === 0); // true
// 要确定NaN 的相等性，必须使用极为讨厌的isNaN()
console.log(NaN === NaN); // false
console.log(isNaN(NaN)); // true
```

为改善这类情况，ECMAScript 6 规范新增了 Object.is()，这个方法与===很像，但同时也考虑
到了上述边界情形。这个方法必须接收两个参数：

```javascript
console.log(Object.is(true, 1)); // false
console.log(Object.is({}, {})); // false
console.log(Object.is("2", 2)); // false
// 正确的0、-0、+0 相等/不等判定
console.log(Object.is(+0, -0)); // false
console.log(Object.is(+0, 0)); // true
console.log(Object.is(-0, 0)); // false
// 正确的NaN 相等判定
console.log(Object.is(NaN, NaN)); // true
```

要检查超过两个值，递归地利用相等性传递即可：

```javascript
function recursivelyCheckEqual(x, ...rest) {
  return (
    Object.is(x, rest[0]) && (rest.length < 2 || recursivelyCheckEqual(...rest))
  );
}
```
# 增强的对象语法

## 属性值简写

在给对象添加变量的时候，开发者经常会发现属性名和变量名是一样的。例如：

```javascript
let name = "Matt";
let person = {
  name: name,
};
console.log(person); // { name: 'Matt' }
```

为此，简写属性名语法出现了。简写属性名只要使用变量名（不用再写冒号）就会自动被解释为同
名的属性键。如果没有找到同名变量，则会抛出 ReferenceError。
以下代码和之前的代码是等价的：

```javascript
let name = "Matt";
let person = {
  name,
};
console.log(person); // { name: 'Matt' }
```

## 可计算属性

在引入可计算属性之前，如果想使用变量的值作为属性，那么必须先声明对象，然后使用中括号语 法来添加属性。换句话说，不能在对象字面量中直接动态命名属性。比如:

```javascript
const nameKey = "name";
const ageKey = "age";
const jobKey = "job";

let person = {};
person[nameKey] = "Matt";
person[ageKey] = 27;
person[jobKey] = "Software engineer";
console.log(person); // { name: 'Matt', age: 27, job: 'Software engineer' }
```

有了可计算属性，就可以在对象字面量中完成动态属性赋值。中括号包围的对象属性键告诉运行时 将其作为 JavaScript 表达式而不是字符串来求值:

```javascript
const nameKey = "name";
const ageKey = "age";
const jobKey = "job";
let person = {
  [nameKey]: "Matt",
  [ageKey]: 27,
  [jobKey]: "Software engineer",
};
console.log(person); // { name: 'Matt', age: 27, job: 'Software engineer' }
```

可计算属性本身还可以是复杂的表达式，因为被当作 JavaScript 表达式求值。在实例化时再求值：

```javascript
const nameKey = 'name';
const ageKey = 'age';
const jobKey = 'job';
let uniqueToken = 0;
function getUniqueKey(key) {
  return `${key}_${uniqueToken++}`;
}
let person = {
  [getUniqueKey(nameKey)]: 'Matt', 9 [getUniqueKey(ageKey)]: 27,
  [getUniqueKey(jobKey)]: 'Software engineer'
};
console.log(person); // { name_0: 'Matt', age_1: 27, job_2: 'Software engineer' }
```

> 可计算属性表达式中抛出任何错误都会中断对象创建。如果计算属性的表达式有副作用，那就要小心了，因为如果表达式抛出错误，那么之前完成的计算是不能回滚的。

## 简写方法名

一般情况下，给对象添加一个方法需要这样做：

```javascript
let person = {
  sayName: function (name) {
    consolo.log(name);
  },
};
```

而其实现在使用的都是简写的写法，可以变成：

```javascript
let person = {
  sayName(name) {
    console.log(name);
  },
};
```

简写方法名对获取函数和设置函数也是适用的。

```javascript
let person = {
  name_: "",
  get name() {
    return this.name_;
  },
  set name(name) {
    this.name_ = name;
  },
  sayName() {
    console.log(`My name is ${this.name_}`);
  },
};
person.name = "Matt";
person.sayName(); // My name is Matt
```

简写方法名与可计算属性键相互兼容：

```javascript
const methodKey = "sayName";
let person = {
  [methodKey](name) {
    console.log(`My name is ${name}`);
  },
};
person.sayName("Matt"); // My name is Matt
```

# 对象解构

对象解构语法，可以在一条语句中使用嵌套数据实现一个或多个赋值操作。也就是使用与对象匹配的解构来实现对象属性赋值。

首先不适用对象解构：

```javascript
let person = {
  name: "Matt",
  age: 27,
};

let personName = person.name,
  personAge = person.age;
```

从而将 person 中的 name 和 age 分别赋值给 personName 和 personAge。

使用对象解构的话，我们可以：

```javascript
let person = {
  name: "Matt",
  age: 27,
};

let { name: personName, age: personAge } = person;
```

如果想直接命名和对象内属性一样名字的变量名，甚至可以省略成：

```javascript
let person = {
  name: "Matt",
  age: 27,
};

let { name, age } = person;
console.log(name); // Matt
console.log(job); // undefined
```

也可以在解构的过程中添加自定义值：

```javascript
let person = {
  name: "Matt",
  age: 27,
};
let { name, job = "Software engineer" } = person;
console.log(name); // Matt
console.log(job); // Software engineer
```

> 下面这块内容有点奇怪
> 解构在内部使用函数 ToObject()（不能在运行时环境中直接访问）把源数据结构转换为对象。这意味着在对象解构的上下文中，原始值会被当成对象。这也意味着（根据 ToObject()的定义），null 和 undefined 不能被解构，否则会抛出错误。

```javascript
let { length } = "foobar";
console.log(length); // 6
let { constructor: c } = 4;
console.log(c === Number); // true
let { _ } = null; // TypeError
let { _ } = undefined; // TypeError
```

前两个例子其实我没有太看懂，书里也没说清楚。总之记住 null 和 undefined 不能被解构就行了。

解构并不要求变量必须在解构表达式中声明。不过，如果是给事先声明的变量赋值，则赋值表达式必须包含在一对括号中：

```javascript
let personName, personAge;
let person = {
  name: "Matt",
  age: 27,
};
({ name: personName, age: personAge } = person);
```

## 嵌套解构

解构对于引用嵌套的属性或赋值目标没有限制。为此，可以通过解构来复制对象属性：

```javascript
let person = {
  name: "Matt",
  age: 27,
  job: {
    title: "Software engineer",
  },
};
let personCopy = {};
({ name: personCopy.name, age: personCopy.age, job: personCopy.job } = person);
// 因为一个对象的引用被赋值给personCopy，所以修改
// person.job 对象的属性也会影响personCopy
```

> 下面的赋值感觉过于花哨，也许有些前端面试官比较有个人特色会问一下。但我感觉有点舍近求远没必要。

解构赋值可以使用嵌套结构，以匹配嵌套的属性：

```javascript
let person = {
  name: "Matt",
  age: 27,
  job: {
    title: "Software engineer",
  },
};
// 声明title 变量并将person.job.title 的值赋给它
let {
  job: { title },
} = person;
console.log(title); // Software engineer
```

在外层属性没有定义的情况下不能使用嵌套解构。无论源对象还是目标对象都一样：

```javascript
let person = {
  job: {
    title: "Software engineer",
  },
};
let personCopy = {};
// foo 在源对象上是undefined
({
  foo: { bar: personCopy.bar },
} = person);
// TypeError: Cannot destructure property 'bar' of 'undefined' or 'null'.
// job 在目标对象上是undefined
({
  job: { title: personCopy.job.title },
} = person);
// TypeError: Cannot set property 'title' of undefined
```

## 部分解构

需要注意的是，涉及多个属性的解构赋值是一个输出无关的顺序化操作。如果一个解构表达式涉及多个赋值，开始的赋值成功而后面的赋值出错，则整个解构赋值只会完成一部分：

```javascript
let person = {
  name: "Matt",
  age: 27,
};
let personName, personBar, personAge;
try {
  // person.foo 是undefined，因此会抛出错误
  ({
    name: personName,
    foo: { bar: personBar },
    age: personAge,
  } = person);
} catch (e) {}
console.log(personName, personBar, personAge);
// Matt, undefined, undefined
```

## 参数上下文匹配

在函数参数列表中也可以进行解构赋值。对参数的解构赋值不会影响 arguments 对象，但可以在函数签名中声明在函数体内使用局部变量：

```javascript
let person = {
  name: "Matt",
  age: 27,
};
function printPerson(foo, { name, age }, bar) {
  console.log(arguments);
  console.log(name, age);
}
function printPerson2(foo, { name: personName, age: personAge }, bar) {
  console.log(arguments);
  console.log(personName, personAge);
}
printPerson("1st", person, "2nd");
// ['1st', { name: 'Matt', age: 27 }, '2nd']
// 'Matt', 27
printPerson2("1st", person, "2nd");
// ['1st', { name: 'Matt', age: 27 }, '2nd']
// 'Matt', 27
```
