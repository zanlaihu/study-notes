React 是用于构建用户界面的 JavaScript 库， 起源于 Facebook 的内部项目，因为该公司对市场上所有 JavaScript MVC 框架，都不满意，就决定自己写一套，用来架设 Instagram 的网站。做出来以后，发现这套东西很好用，就在 2013 年 5 月开源了。它具有渐进适配的特性，可以按需引入。

一个完整的 React 工具链包含：

1. package 管理器：yarn 或 npm
2. 打包器：webpack 或 parcel
3. 编译器：Babel，能让新版 JavaScript 在旧版浏览器运行

使用 Create React App 创建 React 应用。因为它不会处理后端逻辑或操纵数据库，所以可以配合任何后端。其内部使用 Babel 和 webpack。

```
npx create-react-app my-app

cd my-app

npm start
```

React 默认端口是 3000，与 Angular 的 4200 不同。启动后具有热启动机制。

开发好后，执行 npm run build 会在 build 文件夹内生成应用的最优版本。

# 一个例子

```js
ReactDOM.render(<h1>Hello, world!</h1>, document.getElementById("root"));
```

在页面上展示一个 “Hello, world!”

# JSX

JSX 是 JavaScript 的语法扩展，与原生 JavaScript 等价。JSX 可以生成 React 元素。

React 没有数据绑定，它通过使用 JSX 将 UI 和逻辑一起存放到组件中，让代码在视觉上更清晰，实现[关注点分离](https://zh.wikipedia.org/wiki/关注点分离)。

可以往 JSX 嵌入表达式，与 Angular 的单向数据绑定异曲同工：

```javascript
const name = "Klaus";
const element = <h1>Hello, {name}</h1>;
```

{}内可以放置任何 JavaScript 表达式，比如：2 + 2，user.firstName 或 formatName(user)。

因为 JSX 也是表达式，所以可以直接在语法中使用：

```jsx
function getGreeting(user) {
  if (user) {
    return <h1>Hello, {formatName(user)}!</h1>;
  }
  return <h1>Hello, Stranger.</h1>;
}
```

通过引号或{}给属性赋值。引号和大括号不能同时使用。

```jsx
const element = <div tabIndex="0"></div>;
const element = <img src={user.url}></img>;
```

因为 JSX 语法上更接近 JavaScript 而不是 HTML，所以 React DOM 使用驼峰式命名来定义属性，比如 tabindex 变成 tabIndex、class 变成 className。

加入一个标签内没有内容，可以用/>来闭合标签。

一个 JSX 标签内能够包含多个子元素：

```js
const element = (
  <div>
    <h1>Hello!</h1>
    <h2>Good to see you here.</h2>
  </div>
);
```

## JSX 引入图片

不能直接给 src 属性赋值。需要使用使用 import。

```jsx
import imgUrl from "./img/react-init.png";
<img src={imgUrl} alt=""></img>;
```

## JSX 可以防止注入攻击

可以安全地在 JSX 中插入用户输入内容，因为 React DOM 在渲染所有输入内容之前，默认会进行转义。它确保应用中不会注入并非自己明确编写的内容。所有内容在渲染之前都被转换成了字符串。这样可以有效地防止 [XSS（cross-site-scripting, 跨站脚本）攻击](https://zh.wikipedia.org/wiki/跨網站指令碼)。：

```jsx
const title = response.Input;
const element = <h1>{title}</h1>;
```

# React 元素

Babel 会把 JSX 转译成一个名为 React.createElement() 函数调用。

以下两种代码完全等效：

```jsx
const element = {
  <h1 className="greeting">
    Hello, world!
  </h1>
};
```

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

# 元素渲染

React 元素是构成 React 应用的最小砖块。

React 元素是创建开销极小的普通对象，与浏览器的 DOM 元素不同。React DOM 负责更新 DOM 来与 React 元素保持一致。

根 DOM 节点:

```html
<div id="root"></div>
```

该节点的内容都由 React DOM 管理。React 通过将 React 元素渲染到根 DOM 节点来更新 UI。仅使用 React 构建的应用一般只有一个根 DOM 节点。如果成型的网站引入 React，可能包含多个。

类似 Angular 的：\<app-root>\</app-root>

使用 ReactDOM.render()方法可以将 React 元素渲染到根 DOM 节点。

```jsx
const element = <h1>Hello, world!</h1>;
ReactDOM.render(element, document.getElementById("root"));
```

## 更新已渲染的元素

React 元素是不可变对象。一旦创建就无法更改子元素或属性。所以只能创建一个新元素来替代，从而达到更新的目的。

考虑一个计时器例子:

```js
function tick() {
  const element = (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
    </div>
  );
  ReactDOM.render(element, document.getElementById("root"));
}

setInterval(tick, 1000);
```

虽然每次都把全部元素塞入 ReactDOM 让其再次渲染，但 React 会将元素与之前的状态进行对比，从而只更新需要更新的地方。所以这个例子里只有\<h2>标签被不断更新。
