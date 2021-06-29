# Symbol

Symbol（符号）是 ECMAScript6 新增的数据类型。typeof 返回 symbol。

符号实例是唯一、不可变的。它的用途是确保对象属性使用唯一标识符，不会发生属性冲突的危险。

符号用来创建唯一记号，进而用作非字符串形式的对象属性。

符号没有字面量语法，这也是它发挥作用的关键。只要创建 Symbol()实例，并将其用作对象的新属性，就可以保证它不会覆盖已有的对象属性，无论是符号还是字符串属性。

## 创建普通符号

创建符号的方法需要用到 Symbol()函数。
创建普通符号：

```javascript
let sym = Symbol();
```

符号实例是唯一的，独立创建出来的他们是不一样的：

```javascript
let genericSymbol = Symbol();
let otherGenericSymbol = Symbol();

console.log(genericSymbol); // Symbol()
console.log(otherGenericSymbol); // Symbol()
console.log(genericSymbol == otherGenericSymbol); // false
```

还可以传入一个字符串参数作为对符号的描述（description）。将来可以通过这个字符串来调试代码。

```javascript
let fooSymbol = Symbol("foo");
```

但是，这个字符串参数与符号定义或标识完全无关:

```javascript
let fooSymbol = Symbol("foo");
let otherFooSymbol = Symbol("foo");

console.log(fooSymbol); // Symbol(foo);
console.log(otherFooSymbol); // Symbol(foo);
console.log(fooSymbol == otherFooSymbol); // false
```

## 创建全局符号

全局函数需要用 Symbol.for()。

```javascript
let sym = Symbol.for("apple");
```

想要共享和重用符号实例，就可以向上面这样用一个字符串作为键，在全局符号注册表中创建并重用符号。

这样得到的两个符号是等价的：

```javascript
let fooGlobalSymbol = Symbol.for("foo"); // 创建新符号
let otherFooGlobalSymbol = Symbol.for("foo"); // 重用已有符号

console.log(fooGlobalSymbol === otherFooGlobalSymbol); // true
```

Symbol.for()对每个字符串键都执行幂等操作。在调用时，它会检查全局注册表，若不存在，就会生成一个新符号实例并添加到注册表中。如果存在，就会返回该符号实例。

### 必须使用 Symbol.for()去创建和获取，不然向下面这样就会报错：

```javascript
let localSymbol = Symbol("foo");
let globalSymbol = Symbol.for("foo");
console.log(localSymbol); // Symbol(foo)
console.log(globalSymbol); // Symbol(foo)
console.log(localSymbol === globalSymbol); // false
```

## Symbol()函数不能和 new 关键字一起作为构造函数使用。

这样做是为了避免创建符号包装对象。Boolean、String 和 Number，都支持构造函数且可用于初始化包含原始值的包装对象。

```javascript
let myBoolean = new Boolean();
console.log(typeof myBoolean); // "obecjt"

let myString = new String();
console.log(typeof myString); // "object"

let myNumber = new Number();
console.log(typeof myNumber); // "object"

let mySymbol = new Symbol(); // TypeError: Symbol is not a constructor
```

如果确实想使用符号包装对象，可以借用 Object()函数：

```javascript
let mySymbol = Symbol();
let myWrappedSymbol = Object(mySymbol);
console.log(typeof myWrappedSymbol); // object
```

# 符号的用处

## 作为对象的属性使用

凡是可以使用字符串或数值作为属性的地方，都可以使用符号。比如，对象字面量属性和 Object.defineProperty()/Object.defineProperties()定义的属性。

对象字面量只能在计算属性语法中使用符号作为属性。

```javascript
let s1 = Symbol("foo");
let o = {
  [s1]: "foo val",
};

console.log(o); // { [Symbol(foo)]: 'foo val' }
```

> 关于符号，还有更多的内容，但是我在这里先不继续介绍。因为相关的内容需要后期的知识进行支持，不然很难理解。并且符号真的是一个很陌生，面试也几乎不会被问到的问题。等有空了，再来好好了解它吧！
