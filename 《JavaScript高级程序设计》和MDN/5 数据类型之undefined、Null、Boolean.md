---
theme: smartblue
---

# 数据类型

红宝书将 JavaScript 数据类型归为 7 种。

6 种简单类型：Undefined、Null、Boolean、Number、String、Symbol

1 种复杂类型：Object

> W3C 将数组也作为一个独立的简单类型。数组的 typeof 是 object。

# typeof 操作符

ECMAScript 的类型系统是松散的，所以创造了 typeof 操作符来确定任意变量的数据类型。它能够返回的情况一共 7 种：

 "undefined"表示值未定义；

 "boolean"表示值为布尔值；

 "string"表示值为字符串；

 "number"表示值为数值；

 "symbol"表示值为符号。

 "object"表示值为对象（而不是函数）或 null；

 "function"表示值为函数； （function 一般不认为是一种数据类型。）

null 被识别为 object 是因为它被认为是一个空对象。

# Undefined

Undefined 类型只有一个值，就是特殊值 undefined。

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

但后者使用中是会报错的。
只能说，此 undefined，非彼 undefined。

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
  // 直接报错哦
}
```

建议在声明变量的时候就进行初始化，这样子如果出现 undefined，你就可以确定是没有声明这个变量。

> undefined 在 ECMA-262 第 3 版之前不存在。增加它的目的是正式明确空对象指针（Null）和未初始化变量的区别。

# Null

这个词是发音是[nʌl]，近似中文的“闹”。很多人会念成“难”。

null 类型一样只有一个值 null，它表示一个空对象指针。typeof 会返回 object。

如上所述，声明一个变量的时候最好进行初始化。如果实在不知道一开始应该赋什么值，null 会是很好的选择。

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

true 和 false 必须是小写。True 和 False 又是另外两个标识符，不是布尔值。

所有 ECMAScript 的值都有布尔值的等价形式。使用 Boolean()就可以将他们转变。

```javascript
let messageBoolean = Boolean("How are you!");
```

下面是不同类型值转变成布尔值的规则：
|数据类型|转换为 true|转换为 false|
|--|--|--|
|String|非空字符串|空字符串|
|Number|非零数值（包括无穷值）|0、NaN|
|Object|任意对象|null|
|Undefined|N/A（不存在）|undefined|

当我们使用 if (message) 判断时，判断条件 message 会被转换成对应的布尔值。所以记住这张表很重要。

# 小结

在后面的章节我会继续总结 Number、String、Symbol 和 Object 的知识。
