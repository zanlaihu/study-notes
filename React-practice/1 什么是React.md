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

以便响应速度更加快。

### 第二步

Install Node.js

1. 在项目文件夹下运行： npm init -y（生成了 package.json）
2.

```
npm install terser // 这步很慢
```

3. 压缩 like_botton.js：

```
npx terser -c -m -o like_button.min.js -- like_button.js
```

自动下载了 node 包。出现了熟悉的 npm，很像 angular 工程下的 npm install。

## JSX

早有耳闻的 JSX 出现了。
它的作用就是可以把之前在 button_like.js 里写的：

```js
const e = React.createElement;

// 显示一个 "Like" <button>
return e("button", { onClick: () => this.setState({ liked: true }) }, "Like");
```

替换成：

```js
return <button onClick={() => this.setState({ liked: true })}>Like</button>;
```

目测作用是让代码更短。
官方说法，这两种方法完全等价。

## JSX 引入方法

### 第一种是通过引入外部文件

<!-- ```js
<script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
``` -->

然后在\<script> 标签内使用 JSX，方法是在为其添加 type="text/babel" 属性。

但是这种方法适合前期学习，不适用生产环境。因为太慢了。

### 设置一个 JSX 预处理器。

1. 需要先安装 node.js
2. 在项目文件夹下运行

```
npm init -y
```

3.

```
npm install babel-cli@6 babel-preset-react-app@3
```

> 这里的 npm 只是用来安装 JSX 预处理器，它的作用到此为止。之后使用 react 也不在用到它。的确是很方便。安装好以后的环境，被称为生产就绪(production-ready)的 JSX 配置环境。

### 运行 JSX 预处理器

创建名为 src 的文件夹并执行

```
npx babel --watch src --out-dir . --presets react-app/prod
```

它会启动一个对 JSX 的自动监听器。

> npx 不是拼写错误 —— 它是 npm 5.2+ 附带的 package 运行工具。

## 和 angular 的对比

1. 使用 react 似乎需要像 angular 那样 npm start，直接打开静态 HTML 就可以。
2. 运行 JSX 预处理器的命令后，则和 npm start 有些异曲同工。JSX 预处理器对 react 运行并不是必要的，但在生产环境中为了提升网站速度，它是必需的。
3. HTML 可引入多个外部 JS。而 angular 则是在 TS 里引入 HTML，一个页面只有一个 JS。
4. 需要更加扎实的 js 基础。
