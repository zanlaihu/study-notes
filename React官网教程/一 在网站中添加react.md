# 第一次学习 react

开始学习 react 了。毕竟打了保票的。

参考官方教程 https://react.docschina.org 进行了如下的学习。

## 例子

总而言之，官方用一个例子来演示了 react 的操作。

example.html

```html
<div id="like_button_container"></div>

<!-- 注意: 部署时，将 "development.js" 替换为 "production.min.js"。-->
<script
  src="https://unpkg.com/react@16/umd/react.development.js"
  crossorigin
></script>
<script
  src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"
  crossorigin
></script>

<!-- 加载我们的 React 组件。-->
<script src="like_button.js"></script>
```

like_button.js

```js
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

const domContainer = document.querySelector("#like_button_container");
ReactDOM.render(e(LikeButton), domContainer);
```

然后双击打开 example.html，就像打开静态网站一样。就可以正常运行了。第一次加载会有点慢。

> 关于 JS 文件里的一些写法，还是第一次见。希望后面会有详细解释。
## 代码压缩

直接部署上面的代码速度太慢。所以官方给了压缩方案。

### 第一步：

部署网站的时候把之前引入的

```html
<script
  src="https://unpkg.com/react@16/umd/react.development.js"
  crossorigin
></script>
<script
  src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"
  crossorigin
></script>
```

改成

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
自动下载了 node 包。出现了熟悉的npm，很像 angular 工程下的 npm install。


## JSX
早有耳闻的JSX出现了。
它的作用就是可以把之前在button_like.js里写的：
```js
const e = React.createElement;

// 显示一个 "Like" <button>
return e(
  'button',
  { onClick: () => this.setState({ liked: true }) },
  'Like'
);
```
替换成：
```js
return (
  <button onClick={() => this.setState({ liked: true })}>
    Like
  </button>
);
```
目测作用是让代码更短。
官方说法，这两种方法完全等价。


## JSX引入方法
### 第一种是通过引入外部文件
<!-- ```js
<script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
``` -->
然后在\<script> 标签内使用 JSX，方法是在为其添加 type="text/babel" 属性。

但是这种方法适合前期学习，不适用生产环境。因为太慢了。

### 设置一个JSX预处理器。
1. 需要先安装node.js
2. 在项目文件夹下运行
```
npm init -y
```
3. 
```
npm install babel-cli@6 babel-preset-react-app@3
```
>这里的npm只是用来安装JSX预处理器，它的作用到此为止。之后使用react也不在用到它。的确是很方便。安装好以后的环境，被称为生产就绪(production-ready)的JSX配置环境。

### 运行JSX预处理器
创建名为src的文件夹并执行
```
npx babel --watch src --out-dir . --presets react-app/prod 
```
它会启动一个对JSX的自动监听器。

>npx 不是拼写错误 —— 它是 npm 5.2+ 附带的 package 运行工具。
## 和angular的对比

1. 使用 react 似乎需要像 angular 那样 npm start，直接打开静态 HTML 就可以。
2. 运行JSX预处理器的命令后，则和npm start有些异曲同工。JSX预处理器对react运行并不是必要的，但在生产环境中为了提升网站速度，它是必需的。
2. HTML 可引入多个外部 JS。而 angular 则是在 TS 里引入 HTML，一个页面只有一个 JS。
3. 需要更加扎实的 js 基础。
