# JavaScript HTML DOM

使用 JavaScript 来改变 HTML DOM。

# 查找 HTML 元素

有三种办法查找 HTML 元素，都以对象的形式返回 HTML 元素，未找到则返回 null。

## id 查找 HTML 元素

查找 id="intro"的元素：

```js
let x = document.getElementById("intro");
```

## 标签名查找 HTML 元素

查找/<p>元素：

```js
let x = document.getElementByTagName("p");
```

## 类名查找 HTML 元素

查找 class="intro"的元素

```js
let x = document.getElementByClassName("intro");
```

# 改变 HTML 内容

## innerHTML

```js
document.getElementById(id).innerHTML = "new value";
```
