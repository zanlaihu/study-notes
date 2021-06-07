# React

React 是用于构建界面的 JavaScript 库。它具有渐进适配的特性，可以按需引入。

## React 工具链

一个完整的 React 工具链包含：

1. package 管理器：yarn 或 npm
2. 打包器：webpack 或 parcel
3. 编译器：Babel，能让新版 JavaScript 在旧版浏览器运行

## 创建 React 应用(Create React App)

Create React App 类似 Angular CLi，是一个脚手架。

Create React App 不会处理后端逻辑或操纵数据库，所以可以配合任何后端。其内部使用 Babel 和 webpack。

```
npx create-react-app my-app

cd my-app

npm start
```

<img src="pic/react-start.png" width="700px">

React 默认端口是 3000，与 Angular 的 4200 不同。

代码被修改后会自动重新编译，和 Angular 一样。但是 Angular 会自动刷新网站，React 则不会。（暂不明白为什么）

开发好后，执行 npm run build 会在 build 文件夹内生成应用的最优版本。



## 元素渲染

React 元素是创建开销极小的对象，与浏览器的 DOM 元素不同。

React DOM 负责更新 DOM 来与 React 元素保持一致。

### 根 DOM 节点

```html
<div id="root"></div>
```

该节点的内容都由 React DOM 管理。

类似 Angular 中的：

```html
<app-root></app-root>
```

仅使用 React 构建的应用一般只有一个根 DOM 节点。如果成型的网站引入React，可能包含多个。

通过 ReactDOM.render()，将 React 元素渲染到根 DOM 节点。

```jsx
const element = <h1>Hello, world!</h1>;
ReactDOM.render(element, document.getElementById("root"));
```
