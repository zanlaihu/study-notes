# 期约

Promise 是一个 ECMAScript 提供的类，目的是更加优雅地书写复杂的异步任务。

Promise 对象用于表示一个异步操作的最终完成（或失败）及其结果值。

Promise 可以通过 new 操作符实例化。

Promise 构造函数只有一个参数，是一个执行器函数（executor）。创建新期约必须传入执行器函数作为参数，不然会抛出 SyntaxError。

所以至少也要传入一个空函数：

```javascript
let p = new Promise(() => {});
```

执行器函数在构造之后会被异步运行，称为起始函数。起始函数包含两个参数 resolve 和 reject。

resolve 和 reject 都是函数，调用 resolve 代表一切正常，调用 reject 代表出现异常。

```js
new Promise(function (resolve, reject) {
  var a = 0;
  var b = 1;
  if (b == 0) reject("Divide zero");
  else resolve(a / b);
})
  .then(function (value) {
    console.log("a / b = " + value);
  })
  .catch(function (err) {
    console.log(err);
  })
  .finally(function () {
    console.log("End");
  });
// output:
// a / b = 0
// End
```

## 期约状态

期约具有 3 种状态：

1. 待定（pending）

2. 兑现（fulfilled，也叫解决：resolved）

3. 拒绝（rejected）

待定（pending）是期约的最初状态。待定状态可以落定成兑现或拒绝，落定后不可逆。待定也可以一直保持待定。

promise 的状态私有，不能被 JavaScript 监测到。
