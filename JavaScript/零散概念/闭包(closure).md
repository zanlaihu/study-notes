简单说，被包在另一个函数内的函数就是闭包(closure)。

闭包可以在一个内层函数中访问到外层函数的作用域。在 JavaScript 中，每当创建一个函数，闭包就会在函数创建的同时被创建出来。

```js
function init() {
  let name = "Mozilla"; // name 是一个被 init 创建的局部变量
  function displayName() {
    // displayName() 是内部函数，一个闭包
    console.log(name); // 使用了父函数中声明的变量
  }
  displayName();
}

init();
```

init()内创建了局部变量name和displayName()。

displayName()就是一个闭包，且只在init()函数内可用。displayName()可以访问到外部函数init()的变量。

即，嵌套函数可以访问声明于它们外部作用域的变量。

# 闭包维持对它的词法环境的引用

词法：词法作用域根据源代码中声明变量的位置来确定该变量在何处可用。

```js
function makeFunc() {
  let name = "Mozilla";
  function displayName() {
    console.log(name);
  }
  return displayName;
}

let myFunc = makeFunc();
myFunc();
```

因为myFunc()是执行makeFunc()时创建的displayName()函数的引用。displayName()维持一个对它的词法环境（name存在其中）的引用。因此，调用myFunc()时，name仍然可用。

未完：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Closures