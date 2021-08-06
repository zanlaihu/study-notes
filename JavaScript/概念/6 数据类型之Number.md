---
theme: hydrogen
---

# Number

Number 类型使用 IEEE 754 格式表示整数和浮点数。

### 十进制整数

最基本的是十进制整数。

### 八进制字面量

八进制的第一个数字必须是 0，然后是相应的八进制数字（数值 0-7）。如果数字超出范围，就会将其识别成十进制。

```javascript
let num1 = 070; // 八进制的56
let num2 = 079; // 当成十进制的79
```

八进制字面量在严格模式下无效，会导致 JavaScript 引擎报错。

### 十六进制字面量

十六进制的前两位必须是 0x，然后是十六进制数字（数值 0-9 和 A-F）。字母大小写都可。

```javascript
let num = 0xa; // 十六进制的10
```

## 浮点值

定义浮点值必须包含小数点，且小数点后必须有至少一个数字。

```javascript
let num = 1.1;
let num2 = 0.1; // 有效，但不推荐
```

存储浮点值使用的内存空间是整数值的两倍，所以 ECMAScript 总是想把值转换为整数。

在小数点后没有数字或只有 0 的情况下，数值就会变成整数。

### 浮点值科学计数法

对于非常大或非常小的值，浮点值可以用科学计数法表示。

```javascript
let num = 3.125e7; // 31250000
```

用大写或小写的 e，加上一个数值（比如 7），表示 10 的 7 次方。

10 的负多少次方就加上“-”号：

```javascript
let num = 3125e-3; // 3.125
```

ECMAScript 会默认将小数点后至少 6 个 0 的浮点数转换为科学计数法。（例如，0.000 000 3） 会被转换为 3e-7。

- 浮点精确度为 17 位小数

浮点计算中可能出错

比如 0.1 加 0.2 等于 0.300 000 000 000 000 04 而不是 0.3。

要特别小心这种特殊情况。

> 会出这种问题，是因为 IEEE 754。使用这个格式的语言都会有这个问题。

## Number 值的范围

由于内存的限制，ECMAScript 的数值存在上限和下限。

最小数值保存在 Number.MIN_VALUE，这个值在大多数浏览器中是 5e-324。

最大数值保存在 Number.MAX_VALUE，这个值在大多数浏览器中是 1.797 693 134 862 315 7e+30。

当数值超过范围时，太大的会被转换成一个特殊的 Infinity（无穷值），太小的就是-Infinity（负无穷值）。Infinity 和-Infinity 不能被计算，他们没有可用于计算的数值表示形式。

使用 isFinite()，可以判断一个数是不是无限。

```javascript
let num = Number.MAX_VALUE;
console.log(isFinite(num)); //true
```

用 Number.NEGATIVE_INFINITY 和 Number.POSITIVE_INFINITY 也可以获
取正、负 Infinity。这两个属性包含的值分别就是-Infinity 和 Infinity。

除法中，如果分子是非 0 值，分母是 0 或-0，会返回 Infinity 或-Infinity：

```javascript
console.log(5 / 0); // Infinity
console.log(5 / -0); // -Infinity
```

## NaN

它是一个特殊的 Number，typeof 返回的也是 number。但他表达的意思是“不是数值”。

它出现在本来要返回数值的操作失败了，不抛出错误而返回的值。

比如 0 除任何数都会出错，这样就会返回 NaN。

```javascript
console.log(0 / 0); // NaN
```

在 ECMAScript 中，除了 0 以外，+0 和-0 除任意数也是 NaN。

### NaN 的特性

1. 任何涉及 NaN 的操作，始终返回 NaN。（如 NaN/10）
2. NaN 不等于任何值，包括它自己。

```javascript
console.log(NaN == NaN); // false
```

### isNaN()

isNaN()可以判断参数是否“不是数值”。但存在一个问题，它会把任何类型的数据都先转换成数值（遵照 Number()函数的规则），所以不能转换的也会识别成 NaN，从而返回 true。

```javascript
console.log(isNaN(NaN)); // true
console.log(isNaN(10)); // false，10 是数值
console.log(isNaN("10")); // false，可以转换为数值10
console.log(isNaN("blue")); // true，不可以转换为数值
console.log(isNaN(true)); // false，可以转换为数值1
```

## 数值转换

### Number()

Number()函数首字母 N 必须大写。它首先判断参数类型，针对不同类型基于如下规则进行转换：

1.  undefined：返回 NaN
2.  Null：返回 0
3.  布尔值：true 为 1，false 为 0
4.  数值：直接返回
5.  字符串:

    空字符串（不包含字符）返回 0。

    有效的整数字符，包括带加、减号的情况，转换为十进制数值。

    有效的浮点值格式如"1.1"，转换为相应的浮点值。

    有效的十六进制格式如"0xf"，转换为对应的十进制整数值。

    如果字符串包含除上述情况之外的其他字符，则返回 NaN。

6.  对象：调用 valueOf()方法，并按照上述规则转换返回的值。如果转换结果是 NaN，则调用 toString()方法，再按照转换字符串的规则转换。

```javascript
let num1 = Number("Hello world!"); // NaN
let num2 = Number(""); // 0
let num3 = Number("000011"); // 11
let num4 = Number(true); // 1
```

### parseInt()

parseInt()的规则比较简单：

1. 忽略空格一直到第一个非空格字符。如果不是数值、+、-，则返回 NaN。

2. 遇到特殊字符后停止转换并返回结果。

3. 如果字符串以"0x"开头，解释为十六进制整数。

4. 如果字符串以"0"开头，且紧跟着数值字符，在非严格模式下会被某些实现解释为八进制整数。

```javascript
let num1 = parseInt(""); // NaN
let num2 = parseInt("1234blue"); // 1234
let num3 = parseInt("A"); // NaN
let num4 = parseInt("1.1"); // 1
let num5 = parseInt("0xA"); // 10，解释为十六进制整数
let num6 = parseInt(22.5); // 22
let num7 = parseInt("70"); // 70，解释为十进制值
let num8 = parseInt("0xf"); // 15，解释为十六进制整数
let num9 = parseInt(true); //NaN，不能识别布尔值
```

所以它只能得到整数，可以用它取整。

为了防止混淆，parseInt()还可以传入第二个参数，用于指定底数。最后得到的都是十进制数。

```javascript
let num1 = parseInt("0xAF", 16); // 175
let num2 = parseInt("AF", 16); // 175 ，传入底数就可以省略0x
let num3 = parseInt("AF"); // NaN，不传那肯定要报错

let num4 = parseInt("10", 2); // 2，按二进制解析
let num5 = parseInt("10", 8); // 8，按八进制解析
let num6 = parseInt("10", 10); // 10，按十进制解析
let num7 = parseInt("10", 16); // 16，按十六进制解析
```

推荐始终传入第二个参数

### parseFloat()

parseFloat()也从头开始检测，并在检测到无效字符后停止。

但是它允许小数点出现一次。也就是它可以返回浮点数。并且它只解析十进制数。所以十六进制因为 0 开头，始终得到 0。它也没有第二个参数。

```javascript
let num1 = parseFloat("1234blue"); // 1234，按整数解析
let num2 = parseFloat("0xA"); // 0
let num3 = parseFloat("a"); //NaN
let num4 = parseFloat("22.5"); // 22.5
let num5 = parseFloat("22.34.5"); // 22.34
let num6 = parseFloat("0908.5"); // 908.5
let num7 = parseFloat("3.125e7"); // 31250000
let num8 = parseInt(true); //NaN，不能识别布尔值
```
