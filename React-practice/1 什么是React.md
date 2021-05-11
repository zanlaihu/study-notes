# React

React 是一个用于构建用户界面的 JavaScript 库。

React 具有渐进式适配的特性，可以根据需求按需引入。

# 在网站中添加 React

## 直接添加

第一步:

1. 添加一个 DOM 容器到 HTML。

2. 在\</body>结束标签之前，添加三个\<script>外部链接。前两个加载 React，第三个加载组件代码。

```html
  <!-- ... 其它 HTML ... -->

  <!-- 添加一个DOM容器 -->
  <div id="like_button_container"></div>


  <!-- 部署时，将 "development.js" 替换为 "production.min.js"。-->
  <script src="https://unpkg.com/react@17/umd/react.development.js" crossorigin></script>
  <script src="https://unpkg.com/react-dom@17/umd/react-dom.development.js" crossorigin></script>
  <script src="like_button.js"></script>
</body>
```

> crossorigin 是跨域属性。添加后若设置空值，将不会通过 cookies，客户端 SSL 证书或 HTTP 认证交换用户凭据。具体参考：https://developer.mozilla.org/zh-CN/docs/Web/HTML/Attributes/crossorigin

第二步：

创建 like_button.js：

```js
// 严格模式
"use strict";

const e = React.createElement;

class LikeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { liked: false };
  }

  render() {
    if (this.state.liked) {
      return "You liked this.";
    }

    return e(
      "button",
      { onClick: () => this.setState({ liked: true }) },
      "Like"
    );
  }
}

// 找到
const domContainer = document.querySelector("#like_button_container");
ReactDOM.render(e(LikeButton), domContainer);
```

然后双击打开 example.html。第一次加载会有点慢。

# 代码压缩

## 方案一：

使用 production.min.js 结尾的外部链接。

```html
<script
  src="https://unpkg.com/react@16/umd/react.production.min.js"
  crossorigin
></script>
<script
  src="https://unpkg.com/react-dom@16/umd/react-dom.production.min.js"
  crossorigin
></script>
```

## 方案二：

使用 terser 压缩 JavaScript 文件。参考：https://gist.github.com/gaearon/42a2ffa41b8319948f9be4076286e1f3

# JSX

```js
const e = React.createElement;

// 显示一个 "Like" <button>
return e("button", { onClick: () => this.setState({ liked: true }) }, "Like");
```

替换成：

```js
return <button onClick={() => this.setState({ liked: true })}>Like</button>;
```

两种代码是等价的。

# 引入 JSX

## 方案一：通过外部文件

```js
<script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
```

之后，如果想要在 HTML 内使用 script 标签添加 JSX，需要添加 type="text/babel" 属性。

比如：

```html
<script type="text/babel">
  // JSX
</script>
```

但因为速度慢，不适用于生产环境。

## 方案二：JSX 预处理器

需要先安装 JSX 预处理器：

1. 已安装 node.js
2. 在项目文件夹下运行

```java
npm init -y // 如果失败，这是修复方法
```

```
npm install babel-cli@6 babel-preset-react-app@3
```

> 这里的 npm 只是用来安装 JSX 预处理器。安装好以后的环境，被称为生产就绪(production-ready)的 JSX 配置环境。

### 运行 JSX 预处理器

创建名为 src 的文件夹并执行

```
npx babel --watch src --out-dir . --presets react-app/prod
```

> npx 不是拼写错误 —— 它是 npm 5.2+ 附带的 package 运行工具。

它会启动一个对 JSX 的自动监听器。
监听器一直运行，类似 Angular 在启动项目后持续运行的机制。如果此时 JSX 的 JavaScript 文件，监听器会根据它创建一个处理过的原生 JavaScript 文件。如果对 JSX 的 JS 文件进行编辑，转换也会自动重新执行，类似 Angular 的热启动机制。

# 和 angular 的对比

1. 使用 react 不需要像 angular 那样 npm start，直接打开静态 HTML 就可以。
2. 运行 JSX 预处理器的命令后，则和 npm start 有些异曲同工。JSX 预处理器对 react 运行并不是必要的，但在生产环境中可以提升网站速度。
