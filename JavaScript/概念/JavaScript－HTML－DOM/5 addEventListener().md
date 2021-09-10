# addEventListener()方法

    element.addEventListener(event, function, useCapture);

第一个参数是事件的类型 (如 "click" 或 "mousedown").

第二个参数是事件触发后调用的函数。

第三个参数是个布尔值用于描述事件是冒泡还是捕获。该参数是可选的。

addEventListener() 方法用于向指定元素添加事件句柄。

addEventListener() 方法添加的事件句柄不会覆盖已存在的事件句柄。

你可以向一个元素添加多个事件句柄。

你可以向同个元素添加多个同类型的事件句柄，如：两个 "click" 事件。

你可以向任何 DOM 对象添加事件监听，不仅仅是 HTML 元素。如： window 对象。

addEventListener() 方法可以更简单的控制事件（冒泡与捕获）。

当你使用 addEventListener() 方法时, JavaScript 从 HTML 标记中分离开来，可读性更强， 在没有控制 HTML 标记时也可以添加事件监听。

你可以使用 removeEventListener() 方法来移除事件的监听。

点击按钮时触发监听事件:

```html
<html>
  <body>
    <p>该实例使用 addEventListener() 方法在按钮中添加点击事件。</p>
    <button id="myBtn">点我</button>
    <p id="demo"></p>
    <script>
      document.getElementById("myBtn").addEventListener("click", displayDate);
      function displayDate() {
        document.getElementById("demo").innerHTML = Date();
      }
    </script>
  </body>
</html>
```

# 向同一个元素中添加多个事件句柄

addEventListener() 方法允许向同一个元素添加多个相同或不同类型的事件，且不会覆盖已存在的事件：

```js
element.addEventListener("mouseover", myFunction);
element.addEventListener("click", mySecondFunction);
element.addEventListener("mouseout", myThirdFunction);
```

# 向 Window 对象添加事件句柄

重置窗口大小时添加事件监听

```js
window.addEventListener("resize", function () {
  document.getElementById("demo").innerHTML = sometext;
});
```

# 传递参数

使用"匿名函数"调用带参数的函数

```html
<p>实例演示了在使用 addEventListener() 方法时如何传递参数。</p>
<p>点击按钮执行计算。</p>
<button id="myBtn">点我</button>
<p id="demo"></p>
<script>
  var p1 = 5;
  var p2 = 7;
  document.getElementById("myBtn").addEventListener("click", function () {
    myFunction(p1, p2);
  });
  function myFunction(a, b) {
    var result = a * b;
    document.getElementById("demo").innerHTML = result;
  }
</script>
```

# 事件冒泡或事件捕获

事件传递有两种方式：冒泡与捕获。

在 冒泡 中，内部元素的事件会先被触发，然后再触发外部元素。

在 捕获 中，外部元素的事件会先被触发，然后才会触发内部元素的事件。

addEventListener() 方法可以指定 "useCapture" 参数来设置传递类型。

默认值为 false, 即冒泡传递，当值为 true 时, 事件使用捕获传递。

```js
document.getElementById("myDiv").addEventListener("click", myFunction, true);
```

# removeEventListener()方法

```
element.removeEventListener("mousemove", myFunction);
```

需要同时提供事件"mousemove"和方法"myFunction"。
