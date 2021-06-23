# 根 DOM 节点

```html
<div id="root"></div>
```

类似 Angular 中的：

```html
<app-root></app-root>
```

# 异曲同工的数据单向绑定：

React：

```javascript
const name = "Klaus";
const element = <h1>Hello, {name}</h1>;
```

Angular:

```html
<h1>Hello, {{ name }}</h1>
```

```typescript
public name: string = 'Klaus';
```

# Angular 适合大型项目

React 只是 DOM 的一个抽象层，本身只涉及 UI 层，如果搭建大型应用，必须搭配一个前端框架。所以 React 单独来说并不是 Web 应用的完整解决方案。有两个方面，它没涉及。

- 代码结构
- 组件之间的通信

对于大型的复杂应用来说，这两方面恰恰是最关键的。因此，只用 React 没法写大型应用。

而 Angular 则实现了这两个功能。
