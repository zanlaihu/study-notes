# JSX

JSX 是 JavaScript 的语法扩展，与原生 JavaScript 等价。

## 为什么使用 JSX？

React 没有数据绑定。它将 UI 和逻辑一起存放到组件，让代码在视觉上更清晰，实现[关注点分离](https://zh.wikipedia.org/wiki/关注点分离)。

## 往 JSX 嵌入表达式

与 Angular 的单向数据绑定异曲同工：

```javascript
const name = "Klaus";
const element = <h1>Hello, {name}</h1>;
```

Angular 的单向数据绑定:

```typescript
// typescript
public name: string = 'Klaus';
```

```html
<!-- HTML -->
<h1>Hello, {{ name }}</h1>
```

React 的{}可以放置任何 JavaScript 表达式，比如：2 + 2，user.firstName 或 formatName(user)。

## JSX 也是表达式

因为是表达式，所以可以在语法中使用：

```jsx
function getGreeting(user) {
  if (user) {
    return <h1>Hello, {formatName(user)}!</h1>;
  }
  return <h1>Hello, Stranger.</h1>;
}
```

## JSX 属性驼峰式命名命名

```jsx
const element = <div tabIndex="0"></div>;
const element = <img src={user.url}></img>;
```

JSX 本质上并不是 HTML，内部的属性使用驼峰式命名，比如 HTML 的 tabindex，在这里是 tabIndex。

## JSX 引入图片

不能直接在 src 内添加 url。并且图片还不能放在 src 外面。

```jsx
import imgUrl from "./img/react-init.png";

<img src={imgUrl} alt=""></img>;
```

## JSX 可以防止注入攻击

可以安全地在 JSX 中插入用户输入内容：

```jsx
const title = response.Input;
const element = <h1>{title}</h1>;
```

因为React DOM 在渲染所有输入内容之前，默认会进行转义。它确保应用中不会注入并非自己明确编写的内容。所有内容在渲染之前都被转换成了字符串。这样可以有效地防止 [XSS（cross-site-scripting, 跨站脚本）攻击](https://zh.wikipedia.org/wiki/跨網站指令碼)。

# React元素

不管是 JSX：

```jsx
const element = {
  <h1 className="greeting">
    Hello, world!
  </h1>
};
```

还是 JavaScript 写的 React：

```jsx
const element = React.createElement(
  "h1",
  { className: "greeting" },
  "Hello, world!"
);
```

实际上是创建了这样一个对象（这是简化后的结构）：

```jsx
const element = {
  type: "h1",
  props: {
    className: "greeting",
    children: "Hello, world!",
  },
};
```

这些对象被称为 React 元素，React 通过读取这些对象来构建 DOM 并保持随时更新。