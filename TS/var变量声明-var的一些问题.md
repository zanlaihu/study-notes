例子

```ts
for (var i = 0; i < 10; i++) {
  setTimeout(function () {
    console.log(i);
  }, 100 * i);
}
```

输出结果居然是：

```
10
10
10
10
10
10
10
10
10
10
```

让我们花点时间思考一下这是为什么。 setTimeout 在若干毫秒后执行一个函数，并且是在 for 循环结束后。 for 循环结束后，i 的值为 10。 所以当函数被调用的时候，它会打印出 10！

一个通常的解决方法是使用立即执行的函数表达式（IIFE）来捕获每次迭代时 i 的值：

```ts
for (var i = 0; i < 10; i++) {
  // capture the current state of 'i'
  // by invoking a function with its current value
  (function (i) {
    setTimeout(function () {
      console.log(i);
    }, 100 * i);
  })(i);
}
```

参数 i 会覆盖 for 循环里的 i。
