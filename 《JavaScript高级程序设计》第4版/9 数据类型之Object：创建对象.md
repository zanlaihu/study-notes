---
theme: smartblue
---

# 对象

ECMAScript 中的对象是一组数据和功能的无序集合。它没有特定顺序。可以把 ECMAScript 的对象想象成一张散列表，内容就是一组名/值对，值可以是数据或者函数。

# 创建对象

## new 操作符创建。

```javascript
let person = new Object();
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

# Object

ECMAScript 中的 Object 是派生其他对象的基类。派生出的对象具有 Object 类型的所有属性和方法。

每个 Object 实例都有如下属性和方法：

1. constructor: 用于创建当前对象的函数。在前面的例子中，这个属性的值就是 Object()函数。

2. hasOwnProperty(propertyName):用于判断当前对象实例（不是原型）上是否存在给定的属性。要检查的属性名必须是字符串（如 0.hasOwnProperty("name")）或符号。

3. isPrototypeOf(object): 用于判断当前对象是否是另一个对象的原型。

4. propertyIsEnumerable(propertyName): 用于判断给定的属性是否可以使用 for-in 语句枚举。与 hasOwnProperty()一样，属性名必须是字符串。

5. toLocaleString(): 返回对象的字符串表示，该字符串反映对象所在的本地化执行环境。

6. toString(): 返回对象的字符串表示。

7. valueOf(): 返回对象对应的字符串、数值或布尔值。通常与 toString()的返回值相同。
