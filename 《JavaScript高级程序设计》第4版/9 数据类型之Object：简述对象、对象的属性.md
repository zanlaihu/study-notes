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

ECMAScript 中的 Object 是派生其他对象的基类。派生出的对象具有 Object 类型的所有属性和方法。

每个 Object 实例都有如下属性和方法：

1. constructor: 用于创建当前对象的函数。在前面的例子中，这个属性的值就是 Object()函数。

2. hasOwnProperty(propertyName):用于判断当前对象实例（不是原型）上是否存在给定的属性。要检查的属性名必须是字符串（如 0.hasOwnProperty("name")）或符号。

3. isPrototypeOf(object): 用于判断当前对象是否是另一个对象的原型。

4. propertyIsEnumerable(propertyName): 用于判断给定的属性是否可以使用 for-in 语句枚举。与 hasOwnProperty()一样，属性名必须是字符串。

5. toLocaleString(): 返回对象的字符串表示，该字符串反映对象所在的本地化执行环境。

6. toString(): 返回对象的字符串表示。

7. valueOf(): 返回对象对应的字符串、数值或布尔值。通常与 toString()的返回值相同。

# 添加属性和方法

```javascript
let person = new Object();

person.name = "Klaus";
person.sayName = function () {
  console.log(this.name);
};
```

这个例子创建名为 person 的对象，并给他赋予了一个属性 name 和一个方法 sayname()。sayname()会显示 this.name 的值，这个属性会被解析为 person.name。

> 这里红宝书认为 sayname()是一个方法，而不是一个属性。因为它是和 name 分开说的。所以后面对属性的说明，应该也是不包括 sayname()在内。

# 对象字面量

对象字面量是更加流行的用来创建对象的方式。前面的例子可以改成：

```javascript
let person = {
  name: "Klaus",
  sayName() {
    console.log(this.name);
  },
};
```

# 属性的类型

属性有两种： 数据属性和访问器属性。

ECMA-262 使用一些内部特性来描述属性。开发者不能在 JavaScript 中直接访问这些特性。规范用[[]]将特性标识为内部特性，比如[[Enumerable]]。

## 数据属性

数据属性包含一个保存数据值的位置。值会从这个位置读取，也会写入到这个位置。

数据属性有 4 个特性：

1. [[Configurable]]: 表示属性是否可以通过 delete 删除并重新定义，是否可以修改它的特性，是否可以把它改为访问器属性。默认情况为 true。
2. [[Enumerable]]: 表示属性是否可以通过 for-in 循环返回。默认情况为 true。
3. [[Writable]]: 表示属性的值是否可以被修改。默认情况为 true。
4. [[Value]]: 包含属性实际的值。就是前面提到读取和写入属性值的位置。默认值是 undefined。

像前面例子那样将属性显式地添加到对象之后，[[Configurable]]、[[Enumerable]]、[[Writable]]就会被设置为 true，[[value]]就是设置的值。比如之前的 name 属性，它的[[value]]就是“Klaus”。

### Object.defineProperty()

要添加非默认特性的数据属性，必须使用 Object.defineProperty()方法。

Object.defineProperty()方法接收三个参数： 要添加属性的对象、属性名、描述符对象。描述符对象上的属性可以包含：configurable、enumerable、writable、value，用来设置值。它可以用来添加新属性，也可以用来修改原有属性。

```javascript
let person = {};

Object.defineProperty{person, "name", {
  writable: false,
  value: "Klaus"
}};

person.name = "Mike" // 尝试修改
console.log(person.name) // Klaus，值不会被修改
```

因为 name 属性的 writable 设置为 false 所以不可修改，并且在严格模式尝试修改一个不可修改的值，还会抛出错误。

[[configurable]]更加特别。一旦设置为不可配置，甚至不能使用 Object.defineProperty()方法再对其进行修改。

```javascript
let person = {};

Object.defineProperty(person, "name", {
  configurable: false,
  value: "Klaus",
});

// 试图修改已经是false的configurable
Object.defineProperty(person, "name", {
  configurable: true,
  value: "Klaus",
});
// TypeError: Cannot redefine property: name
```

## 访问器属性

访问器属性不包含数据值。他们包含一个获取 getter 函数和设置 setter 函数。

在读取访问器属性时，会调用获取函数，这个函数会返回一个有效的值。再写入访问器属性时，会调用设置函数，并传入新值。

访问器属性有四个特性：

1. [[Configurable]]: 表示属性是否被 delete 并重新定义，是否可以修改它的特性，是否可以改为数据属性。默认为 true。
2. [[Enumerable]]: 表示属性是否可以通过 for-in 循环返回。默认情况为 true。
3. [[Get]]: 获取函数，读取属性时调用。默认为 undefined。
4. [[Set]]: 设置函数，写入属性时调用。默认为 undefined。

### 必须使用 Object.defineProperty()。

访问器属性和数据属性不同，不能直接定义。

> 然而这句话似乎是说错了。因为在后面的内容出现直接定义访问器属性：
>
> ```javascript
> let dest = {
>   year_: 0,
>   set setYear(val) {
>     this.year_ = val;
>   },
>   get gettingYear() {
>     return this.year_;
>   },
> };
> // 而且这样定义的访问器属性，是可以看到的。
> console.log(dest);
> //{ year_: 0, setYear: [Setter], >gettingYear: [Getter] }
> ```

### set()

添加具有 set()特性的访问器属性：

```javascript
let person = {
  age: 25,
  older: 0,
};

Object.defineProperty(person, "changeAge", {
  set(newValue) {
    if (newValue > 28) {
      this.age = newValue;
      this.older = this.age - 25;
    }
  },
});

person.changeAge = "29";
console.log(person.older);
```

这里定义了一个 changeAge 属性，并给它赋予了设置函数。接收到的值就是 changeAge，根据写好的逻辑它会改变 age 的值，而当 age 改变时，older 也会根据一定规则改变。这是访问器属性的典型使用场景。

### get()

添加具有 get()特性的访问器属性：

```javascript
let person = {
  age_: 25,
};

Object.defineProperty(person, "getAge", {
  get() {
    return this.age;
  },
});

console.log(person.getAge);
```

age\_中的下划线表示这个属性不被外部访问。有的时候一些属性不想被外部访问，我们可以添加带有获取函数的属性来得到它。

# 对象的属性的方法

## Object.defineProperties()

Object.defineProperties()方法可以一次性定义多个属性。

它接收两个参数：对象、一个或多个描述符对象。

```javascript
let book = {};

Object.defineProperties(book, {
  year_: {
    value: 2017,
  },
  edition: {
    value: 1,
  },
  year: {
    get() {
      return this.year_;
    },
    set(newValue) {
      if (newValue > 2017) {
        this.year_ = newValue;
        this.edition += newValue - 2017;
      }
    },
  },
});
```

> 注意！！！用这个方法定义的数据属性，其 configurable、enumerable 和 writable 特性值默认情况下都是 false，比如 year 的 configurable、enumerable、writable 就会默认为 false，这个直接定义属性后特性默认为 true 不一样。

## Object.defineProperty()和 Object.defineProperties()的一些问题

看下面的例子：

```javascript
let example = {};

Object.defineProperty(example, "name", {
  value: "Klaus",
});

Object.defineProperties(example, {
  getValue: {
    get() {
      return this.value;
    },
  },
  year: {
    value: "200",
  },
  getYear: {
    get() {
      return this.year;
    },
  },
});

console.log(example); // {}

console.log(example.getValue); // undefined
console.log(example.getYear); // 200
```

虽然已经使用 Object.defineProperty()和 Object.defineProperties()为 example 添加了那么多属性，但是 console 的结果还是“{}”一个空对象。并且后面添加的访问器 getValue()无法获取到之前添加的属性 value 的值。

## Object.getOwnPropertyDescriptor()

Object.getOwnPropertyDescriptor()方法可以取得指定属性的属性描述符。

Object.getOwnPropertyDescriptor()方法接收两个参数：属性所在的对象、属性名。返回值是一个对象，访问器属性包含 configurable、enumerable、get、set，数据属性包含 configurable、enumerable、writable、value。

```javascript
let book = {};
Object.defineProperties(book, {
  year_: {
    value: 2017,
  },
  edition: {
    value: 1,
  },
  year: {
    get() {
      return this.year_;
    },
    set() {
      if (newValue > 2017) {
        this.year_ = newValue;
        this.edition += newValue - 2017;
      }
    },
  },
});

let descriptor = Object.getOwnPropertyDescriptor(book, "year_");
console.log(descriptor.configurable); // false
console.log(descriptor.enumerable); // false
console.log(descriptor.writable); // false
console.log(descriptor.value); // 2017
console.log(typeof descriptor.get); // "undefined"
let descriptor2 = Object.getOwnPropertyDescriptor(book, "year");
console.log(descriptor2.configurable); // false
console.log(descriptor2.enumerable); // false
console.log(descriptor2.writable); // undefined
console.log(descriptor2.value); // undefined
console.log(typeof descriptor2.get); // "function"
```
