# 根DOM节点
```html
<div id='root'></div>
```

类似Angular中的：
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