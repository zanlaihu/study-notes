HTML DOM 使 JavaScript 有能力对 HTML 事件做出反应。

HTML 事件的例子：

- 当用户点击鼠标时
- 当网页已加载时
- 当图像已加载时
- 当鼠标移动到元素上时
- 当输入字段被改变时
- 当提交 HTML 表单时
- 当用户触发按键时

在本例中，当用户在 <h1> 元素上点击时，会改变其内容：

```html
<!DOCTYPE html>
<html>
  <body>
    <h1 onclick="this.innerHTML='Ooops!'">点击文本!</h1>
  </body>
</html>
```

也可以将处理过程函数化：

```html
<!DOCTYPE html>
<html>
  <head>
    <script>
      function changetext(id) {
        id.innerHTML = "Ooops!";
      }
    </script>
  </head>
  <body>
    <h1 onclick="changetext(this)">点击文本!</h1>
  </body>
</html>
```

上面的例子直接给 HTML 添加事件属性。

也可以使用 JavaScript 来向 HTML 分配事件：

```html
<button onclick="displayDate()">点这里</button>
```

```js
<script>
  document.getElementById("myBtn").onclick=function(){displayDate()};
</script>
```

上面两个例子等价。

# onload 和 onunload 事件

onload 和 onunload 事件会在用户进入或离开页面时被触发。

onload 事件可用于检测访问者的浏览器类型和浏览器版本，并基于这些信息来加载网页的正确版本。

下面的例子使用 onload 来检查 cookie 是否可用：

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>菜鸟教程(runoob.com)</title>
  </head>
  <body onload="checkCookies()">
    <script>
      function checkCookies() {
        if (navigator.cookieEnabled == true) {
          alert("Cookies 可用");
        } else {
          alert("Cookies 不可用");
        }
      }
    </script>
    <p>弹窗-提示浏览器 cookie 是否可用。</p>
  </body>
</html>
```

# onchange 事件

当值发生改变时触发。在失去焦点之后检查值是否改变。

使用 onchange 来改变值：

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>菜鸟教程(runoob.com)</title>
  </head>
  <head>
    <script>
      function myFunction() {
        var x = document.getElementById("fname");
        x.value = x.value.toUpperCase();
      }
    </script>
  </head>
  <body>
    输入你的名字: <input type="text" id="fname" onchange="myFunction()" />
    <p>当你离开输入框后，函数将被触发，将小写字母转为大写字母。</p>
  </body>
</html>
```

# onmouseover 和 onmouseout 事件

onmouseover 和 onmouseout 事件可用于在用户的鼠标移至 HTML 元素上方和不在上方时触发函数。

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>菜鸟教程(runoob.com)</title>
  </head>
  <body>
    <div
      onmouseover="mOver(this)"
      onmouseout="mOut(this)"
      style="background-color:#D94A38;width:120px;height:20px;padding:40px;"
    >
      Mouse Over Me
    </div>
    <script>
      function mOver(obj) {
        obj.innerHTML = "Thank You";
      }
      function mOut(obj) {
        obj.innerHTML = "Mouse Over Me";
      }
    </script>
  </body>
</html>
```
onmouseover 和 CSS的hover不一样，不会在鼠标移走后让DOM还原，会永久性改变DOM。

# onmousedown、onmouseup 以及 onclick 事件
当点击鼠标按钮时，会触发 onmousedown 事件，当释放鼠标按钮时，会触发 onmouseup 事件，最后，当完成鼠标点击时，会触发 onclick 事件。

# 事件属性汇总
上面提到的是常用的事件。

https://www.runoob.com/tags/ref-eventattributes.html