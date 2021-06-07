# 在网站中直接引入 React

除了直接创建 React 应用，也可以在现用网站渐进式引入 React。

在网站的\</body>结束标签之前，添加两个个\<script>外部链接。它们是 CDN 链接。

```html
<body>
  <!-- ... 其它 HTML ... -->
  <script
    src="https://unpkg.com/react@17/umd/react.development.js"
    crossorigin
  ></script>
  <script
    src="https://unpkg.com/react-dom@17/umd/react-dom.development.js"
    crossorigin
  ></script>
</body>
```

> crossorigin 是跨域属性。添加后若设置空值，将不会通过 cookies，客户端 SSL 证书或 HTTP 认证交换用户凭据。具体参考：https://developer.mozilla.org/zh-CN/docs/Web/HTML/Attributes/crossorigin

实际生产环境推荐 production.min.js 结尾的外部链接。

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

直接引入的 react 不需要像 angular 那样 npm start，直接打开静态 HTML 就可以。

# 通过外部链接使用 JSX

```js
<script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
```

HTML 内使用 script 标签添加 type="text/babel" 属性。比如：
[]
```html
<script type="text/babel">
  // JSX
</script>
```

但速度慢，不适用于生产环境。

# JSX 预处理器

1. 已安装 node.js
2. 在项目文件夹下运行 npm init -y // 如果失败，这是修复方法
3. 执行 npm install babel-cli@6 babel-preset-react-app@3
4. 创建名为 src 的文件夹并执行
   npx babel --watch src --out-dir . --presets react-app/prod

它会启动一个对 JSX 的自动监听器，根据 JSX 文件创建一个原生 JavaScript 文件。如果 JSX 被修改，转换会自动重新执行，类似 Angular 的热启动。

> 这里的 npm 只用来安装 JSX 预处理器。安装好以后的环境被称为生产就绪(production-ready)的 JSX 配置环境。
>
> npx 不是拼写错误 —— 它是 npm 5.2+ 附带的 package 运行工具。