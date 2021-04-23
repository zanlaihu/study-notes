getElementsByTagName() 方法返回 HTMLCollection 对象。
下面的代码选取文档中的所有 <p> 元素：
```js
var x = document.getElementsByTagName("p");
```
如需访问第二个 <p> 元素，您可以这样写：
```js
y = x[1];
```