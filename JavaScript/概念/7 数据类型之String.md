---
theme: hydrogen
---

# String

字符串表示零或多个 16 位 Unicode 字符序列。

可以用双引号、单引号、反引号标识，在某些语言中，使用不同的引号有不同的效果。但是对 ECMAScript 来说，都是一样的：

```javascript
let name1 = "Mike";
let name2 = "Mike";
let name3 = `Mike`;
```

字符串一旦创建就不可修改，这里的不可修改并不是说不能拼接：

```javascript
let lang = "Java";
lang = lang + "Script";
```

而是这个过程在内存中，首先会创建一个新的 10 字符空间容纳“JavaScript”，然后销毁目前的“Java”和“Script”，然后将值“JavaScript”给 lang。所以早期拼接字符串非常慢。现在的浏览器都有针对性地解决了这个问题。

# 字符字面量——可以被识别的特殊字符

| 字面量 | 含义                                                                                             |
| ------ | ------------------------------------------------------------------------------------------------ |
| \n     | 换行                                                                                             |
| \t     | 制表                                                                                             |
| \b     | 退格                                                                                             |
| \r     | 回车                                                                                             |
| \f     | 换页                                                                                             |
| \\\    | 反斜杠\|                                                                                         |
| \\'    | 单引号标识的字符串内部使用，如'He said, \'hey.\''                                                |
| \\"    | 同上                                                                                             |
| \\`    | 同上                                                                                             |
| \xnn   | 以十六进制编码 nn 表示的字符（其中 n 是十六进制数字 0~F），例如\x41 等于"A"                      |
| \unnnn | 以十六进制编码 nnnn 表示的 Unicode 字符（其中 n 是十六进制数字 0~F），例如\u03a3 等于希腊字符"Σ" |

> 即使转义字符很长，也只算一个字符。
>
> 比如：let text = "This is the letter sigma: \u03a3."; 的长度是 28，即使包含 6 长度的转义序列。

# 模板字面量

模板字面量要使用反引号“`”。

## 按格式读取字符串

模板字面量保留换行字符，会识别跨行的赋值。

```javascript
let myMultiLineString = "first line\nsecond line";
console.log(myMultiLineString);
// first line
// second line"

let myMultiLineTemplateLiteral = `first line
second line`;
console.log(myMultiLineTemplateLiteral);
// first line
// second line

// 两种写法等价
console.log(myMultiLineString === myMultiLinetemplateLiteral); // true
```

使用模板字面量要注意缩进的问题：

```javascript
let myTemplateLiteral = `first line
second line`;
console.log(myTemplateLiteral.length);
// output：47。因为第一行换行符之后有25 个空格符

let secondTemplateLiteral = `
first line
second line`;
console.log(secondTemplateLiteral[0] === "\n");
// output：true。因为这个模板字面量以一个换行符开头
```

## 字符串插值

模板字面量支持字符串插值。即可以在一个字符串中再插入其他字符串，也被称为字符串格式化。

使用它需要按照${}的格式，所有插入值都会被 toString()强制转换成字符串。：

```javascript
let value = 5;
let exponent = "second";
let interpolatedTemplateLiteral = `${value} to the ${exponent} power is ${
  value * value
}`;
```

### 可以插入函数

```javascript
function capitalize(word) {
  return `${word[0].toUpperCase()}${word.slice(1)}`;
}
console.log(`${capitalize("hello")}, ${capitalize("world")}!`); // Hello, World!
```

### 可以插入当前值

```javascript
let value = "";
function append() {
  value = `${value}abc`;
  console.log(value);
}
append(); // abc
append(); // abcabc
append(); // abcabcabc
```

## 支持定义标签函数

模板字面量支持定义标签函数（tag function），自定义插值行为。

标签函数
会接收被插值记号分隔后的模板和对每个表达式求值的结果。
标签函数本身是一个常规函数，通过前缀到模板字面量来应用自定义行为，如下例所示。标签函数
接收到的参数依次是原始字符串数组和对每个表达式求值的结果。这个函数的返回值是对模板字面量求
值得到的字符串。

```javascript
let a = 6;
let b = 9;
function simpleTag(strings, aValExpression, bValExpression, sumExpression) {
  console.log(strings);
  console.log(aValExpression);
  console.log(bValExpression);
  console.log(sumExpression);
  return "foobar";
}
let untaggedResult = `${a} + ${b} = ${a + b}`;
let taggedResult = simpleTag`${a} + ${b} = ${a + b}`;
// ["", " + ", " = ", ""]
// 6
// 9
// 15
console.log(untaggedResult); // "6 + 9 = 15"
console.log(taggedResult); // "foobar"
```

因为表达式参数的数量是可变的，所以通常应该使用剩余操作符（rest operator）将它们收集到一个
数组中：

```javascript
let a = 6;
let b = 9;
function simpleTag(strings, ...expressions) {
  console.log(strings);
  for (const expression of expressions) {
    console.log(expression);
  }
  return "foobar";
}
let taggedResult = simpleTag`${a} + ${b} = ${a + b}`;
// ["", " + ", " = ", ""]
// 6
// 9
// 15
console.log(taggedResult); // "foobar"
```

对于有 n 个插值的模板字面量，传给标签函数的表达式参数的个数始终是 n，而传给标签函数的第
一个参数所包含的字符串个数则始终是 n+1。因此，如果你想把这些字符串和对表达式求值的结果拼接
起来作为默认返回的字符串，可以这样做：

```javascript
let a = 6;
let b = 9;
function zipTag(strings, ...expressions) {
  return (
    strings[0] + expressions.map((e, i) => `${e}${strings[i + 1]}`).join("")
  );
}

let taggedResult = zipTag`${a} + ${b} = ${a + b}`;

console.log(taggedResult); // "6 + 9 = 15"
```

## 原始字符串

对于一些特殊值，如果我们不希望他们被识别，可以使用 String.raw。

```javascript
// Unicode 示例
// \u00A9 是版权符号
console.log(`\u00A9`); // ©
console.log(String.raw`\u00A9`); // \u00A9

// 换行符示例
console.log(`first line\nsecond line`);
// first line
// second line
console.log(String.raw`first line\nsecond line`); // "first line\nsecond line"

// 对实际的换行符来说是不行的
// 它们不会被转换成转义序列的形式
console.log(String.raw`first line
second line`);
// first line
// second line
```

也可以通过标签函数的第一个参数，即字符串数组的.raw 属性取得每个字符串的原始内容:

```javascript
function printRaw(strings) {
  for (const string of strings) {
    console.log(string);
  }
  for (const rawString of strings.raw) {
    console.log(rawString);
  }
}
printRaw`\u00A9${"and"}\n`;
// ©
//（换行符）
// \u00A9
// \n
```

# 转换为字符串

## .toString()

null 和 undefined 不能使用这个方法。

```javascript
let age = 11;
let ageAsString = age.toString(); // 字符串"11"
let found = true;
let foundAsString = found.toString(); // 字符串"true"
```

对于数值可以指定转化为几进制：

```javascript
let num = 10;
console.log(num.toString()); // "10"
console.log(num.toString(2)); // "1010"
console.log(num.toString(8)); // "12"
console.log(num.toString(10)); // "10"
console.log(num.toString(16)); // "a"
```

## String()

String()是.toString()的加强版。对于 null 和 undefined，返回“null”和“undefined”。

```javascript
console.log(String(null)); // "null"

let mess;
console.log(String(mess)); // "undefined"

console.log(String(mess1)); //未声明的undefined, 得到ReferenceError
```

# 字符串长度 String.length

# 截取字符串

## String.prototype.slice()

接收两个 index 参数：开始，结束。

如果未传入结束，默认截到末尾。

```js
const str = "The quick brown fox jumps over the lazy dog.";

console.log(str.slice(31));
// expected output: "the lazy dog."

console.log(str.slice(4, 19));
// expected output: "quick brown fox"

console.log(str.slice(-4));
// expected output: "dog."

console.log(str.slice(-9, -5));
// expected output: "lazy"
```

## String.prototype.substring()

和 slice()类似。但是会将负数参数直接识别成 0

## String.prototype.substr()

接收两个参数：开始，返回的字符串个数

第二个参数未传入时，默认截到末尾。第二个参数超过字符串长度时，默认截到末尾。

```js
const str = 'The quick brown fox jumps over the lazy dog.';

console.log(str.substr(0,8);
// output: "The quic"

console.log(str.substr(-5, 8);
// output: " dog."

console.log(str.substr(0,50);
// output: "The quick brown fox jumps over the lazy dog."

console.log(str.substr(4);
// output: "quick brown fox jumps over the lazy dog."
```
