---
theme: hydrogen
---

# 变量声明

ECMAScript 中的变量是松散类型，即变量可以保存任何类型的数据。每个变量只是一个用于保存值的命名占位符。

> 严格模式下，不能定义名为 eval 和 arguments 的变量。

# var

可以保存任何类型的值。

ECMAScript 实现变量初始化，因此可以同时定义变量并设置它的值。

```javascript
var message = "hi";
```

定义好之后，不仅可以改变值，还可以改变类型。这样虽然合法，但不推荐，也很少看到程序员会这样做。

```javascript
var message = "hi";
message = 100;
```

> 不初始化的情况下，变量会保存一个特殊值 undefined。

### 可以一次声明多个变量：

因为 ECMAScript 是松散类型的，所以使用不同数据类型初始化也可以用一条语句。

```javascript
var message = "hi",
  found = "false",
  age = 29;
```

### var 可以重复声明：

```javascript
var age = 16;
var age = 26;
var age = 36;
```

### var 声明作用域

使用 var 声明的变量会成为包含它的函数的局部变量。比如，在一个函数内部 var 一个变量，这个变量将在函数退出时被销毁。

```javascript
function test() {
  var message = "hi";
}
test();
console.log(message);
```

因为 message 在函数调用完后已经被销毁，所以上面的代码在试图打印的时候就会报错。这种时候可以省略 var，将其声明为全局变量。

```javascript
function test() {
  message = "hi";
}
test();
console.log(message);
```

> 要慎用这种方法。在严格模式下，会抛出 referenceError。并且也会让人困惑是故意而为之，还是不小心写错了。

### var 变量声明提升机制（hoist）

```javascript
console.log(age);
var age = 26;
function test() {
  console.log(age);
  var age = 30;
}
```

像这样的代码是不会报错的，并不是解析器没有按顺序。而是 var 声明会被提升到顶部，变成

```javascript
var age;
console.log(age);
age = 26;
function test() {
  var age;
  console.log(age);
  var age = 30;
}
```

# let

let 声明的是块作用域，而 var 声明的是函数作用域。这是他们两个最明显的区别。

```javascript
if (true) {
  var name = "Matt";
  console.log(name); // Matt
}
console.log(name); // Matt
```

```javascript
if (true) {
  let name = "Matt";
  console.log(name); // Matt
}
console.log(name); // undefined
```

用 let 声明的变量只能在 if 块内使用。它的作用域范围比 var 小，所以自然也不能在函数外被使用。

### let 不允许重复声明，这个特性被称为声明屏蔽：

```javascript
let age;
let age;
```

会报 SyntaxError，标识符已经声明过了。

而正因为 let 声明的作用域在块内，所以下面这样嵌套使用相同的标识符是合法的。

```javascript
let age = 30;
if (true) {
  let age = 26;
}
```

### let 没有变量声明提升，只有暂时性死区

在 let 声明之前的执行瞬间被称为暂时性死区(temporal dead zone)，会抛出 ReferenceError。

### let 全局声明的变量不会成为 window 对象的属性

这与 var 不同：

```javascript
var name = "Matt";
console.log(window.name); // Matt

let age = 26;
console.log(window.age); // undefined
```

### let 不能用条件声明

```javascript
if (typeof name === "undefined") {
  let name;
}
```

像这样有条件的情况下声明的 let 变量依旧只能在块内使用，不能在有条件的情况下声明出全局的 let 变量。

> 不能使用条件声明其实是一件好事，因为条件声明是一种反模式。它让程序更难理解和维护。本来也有更好的方式去代替它。

### for 循环中的 let

使用 var 声明的迭代变量会渗透到循环体外部：

```javascript
for (var i = 0; i < 5; i++) {
  // 循环逻辑
}
console.log(i); // 5
```

但是使用 let 就不会有这个问题：

```javascript
for (let i = 0; i < 5; i++) {
  // 循环逻辑
}
console.log(i); // ReferenceError: i没有定义
```

使用 var 的时候还会有一个问题，还经常被拿来当面试题：

```javascript
for (var i = 0; i < 5; i++) {
  setTimeout(() => console.log(i), 0);
}
```

预想的是输出：0 1 2 3 4

但实际输出的却是：5 5 5 5 5

之所以这样是因为:首先 setTimeout 是一个超时逻辑，它会在循环退出后再开始执行，而循环退出时，迭代变量保存的是导致循环退出的值：5。所有的 i 都是同一个变量，因而输出的都是同一个最终值。
对此其实有一个解决方法是使用立即执行的函数表达式（IIFE）来捕获每次迭代时 i 的值。

```javascript
for (var i = 0; i < 5; i++) {
  (function (i) {
    setTimeout(() => console.log(i), 0);
  })(i);
}
```

或使用 let 声明迭代变量。这样 JavaScript 会在后台为每个迭代循环声明一个新的迭代变量。所以它会有 5 个 i，值分别是 0、1、2、3、4，每个 setTimeout 引用的都是不同的变量实例。

```javascript
for (let i = 0; i < 5; i++) {
  setTimeout(() => console.log(i), 0);
}
```

这种每次迭代声明一个独立变量实例的行为适用于所有风格的 for 循环，包括 for-in 和 for-of 循环。

# const

const 与 let 基本相同，唯一重要区别是它声明变量时必须同时初始化变量，且声明后的值不能再修改。

const 也不允许重复声明。

const 声明的作用域也是块。

但是 const 只限制它指向的变量。也就是说，如果 const 声明了一个对象，那么修改对象内的属性是合法的。

const 一般不用来声明迭代变量，因为它不会被修改。但是在 for-in 和 for-of 中却是有意义的：

```javascript
for (const i = 0; i < 5; i++) {} // TypeError: 给常量赋值

let i = 0;
for (const j = 0; i < 5; i++) {
  console.log(j);
}
// 0 0 0 0 0

for (const key in { a: 1, b: 2 }) {
  console.log(key);
}
// a b

for (const value of [1, 2, 3, 4, 5]) {
  console.log(value);
}
// 1 2 3 4 5
```
