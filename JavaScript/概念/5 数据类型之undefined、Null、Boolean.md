---
theme: hydrogen
---

# 数据类型

JavaScript 数据类型有 7 种。

6 种简单类型：Undefined、Null、Boolean、Number、String、Symbol

1 种复杂类型：Object

BigInt 和 function 比较有争议，有些地方会把它们当作新的数据类型，也有些地方认为它们只是特殊的对象。

# typeof 操作符

typeof 操作符可以返回变量的数据类型。它能够返回 7 种：

- "undefined"表示 undefined；
- "boolean"表示 boolean；
- "string"表示 string；
- "number"表示 number；
- "symbol"表示 symbol；
- "object"表示值 object 或 null；
- "function"表示值为函数；

null 被识别为 object 是因为它被认为是一个空对象。

# Undefined

Undefined 类型只有一个值，就是特殊值 undefined。增加它的目的是正式明确 Null 和未初始化变量的区别。

当 var 或 let 声明变量却没有给初始值，它的值就是 undefined。

```javascript
let message;
console.log(message); // undefined
```

没初始化的变量也会返回 undefined。

```javascript
// age 没有被声明
console.log(age); // 也是undefined，只是会报错
```

但两个 undefined 是不一样的。

用它作为判断条件时的情况：

```javascript
let message;

if (message) {
  // 这个快不会执行
}

if (!message) {
  // 这个快会执行
}

// 没有声明age
if (age) {
  // 直接报错
}
```

# Null

这个词是发音是[nʌl]。

null 类型只有一个值 null，表示空对象指针。

声明一个变量的时候最好进行初始化。如果实在不知道一开始应该赋什么值，null 会是很好的选择。

### ECMA-262 认为 null 和 defined 表面上相等

因为 undefined 由 null 派生而来。所以用==会返回 true。

```javascript
console.log(null == undefined); // true
```

### Null 是假值

所以作为判断条件和 undefined 一样。

```javascript
let message = null;

if (message) {
  // 不会执行
}
if (!message) {
  // 会执行
}
```

# Boolean

Boolean(布尔值)有两个字面值：true 和 false。这两个布尔值不同于数字，true 不等于 1，false 不等于 0.

true 和 false 必须是小写。True 和 False 是另外两个标识符。

所有 ECMAScript 的值都有布尔值的等价形式。使用 Boolean()可以转变。

```javascript
let messageBoolean = Boolean("How are you!");
```

不同类型值转变成布尔值的规则：
|数据类型|转换为 true|转换为 false|
|--|--|--|
|String|非空字符串|空字符串|
|Number|非零数值（包括无穷值）|0、NaN|
|Object|任意对象|null|
|Undefined|N/A（不存在）|undefined|

当我们使用 if (message) 判断时，判断条件 message 会被转换成对应的布尔值。所以记住这张表很重要。
