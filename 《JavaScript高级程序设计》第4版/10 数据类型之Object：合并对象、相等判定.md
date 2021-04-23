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
