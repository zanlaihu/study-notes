## 回调函数简称回调（CallBack）。

当一个函数 A 被作为一个实参传入另一个函数 B，并在 B 内部被调用，那么函数 A 就是回调函数。

下面的greeting就是回调函数。

```jsx
function greeting(name) {
  alert("Hello " + name);
}

function processUserInput(callback) {
  var name = "请输入你的名字。";
  callback(name);
}

processUserInput(greeting);
// Hello 请输入你的名字。
```

以上范例为同步回调，立即执行。但是回调函数经常被用于继续执行一个异步完成后的操作，即异步回调。
