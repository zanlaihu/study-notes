# 期约

Promise 对象用于表示一个异步操作的最终完成（或失败）及其结果值。

# 期约基础

Promise 是引用类型，可以通过 new 操作符实例化。创建新期约需要传入执行器（executor）函数作为参数（不然会抛出 SyntaxError）。

下面的例子使用一个空函数对象作为执行器函数。

```javascript
let p = new Promise(() => {});
setTimeout(console.log, 0, p);
// output： Promise <pending>
```

在把一个期约实例传给 console.log()时，控制台输出（因浏览器不同而有差异）表明该实例处于待定（pending）状态。

## 期约状态

期约具有 3 种状态：

1. 待定（pending）

2. 兑现（fulfilled，也叫解决：resolved）

3. 拒绝（rejected）

待定（pending）是期约的最初状态。待定状态可以落定成兑现或拒绝，落定后不可逆。待定也可以一直保持待定。

promise 的状态私有，不能被 JavaScript 监测到。
