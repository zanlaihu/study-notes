# callback

Callback 函数在当前动画 100% 完成之后执行。

使用 callback 实例：

```js
$("button").click(function () {
  $("p").hide("slow", function () {
    alert("段落现在被隐藏了");
  });
});
```
