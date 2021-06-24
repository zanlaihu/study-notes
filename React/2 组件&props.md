组件可以将 UI 拆分成独立可复用的代码片段。
# 函数组件
JavaScript 函数定义组件：
```jsx
function Welcome(props) {
  return <h1>Hello, {(props, name)}</h1>;
}
```
这个组件接收props并返回一个React元素。
# class组件

## props 的只读性

必须保证入参 props 不被修改。像下面这个纯函数一样：

```jsx
function sum(a, b) {
  return a + b;
}
```

这个不是纯函数：

```jsx
function withdraw(accoumt, amount) {
  account.total = account.total - amount;
}
```



## 渲染函数组件

```jsx
function Welcome(props){
    // 属性和子组件会被放在一个对象（props）里传递。
    return <h1>Hello,{props.name}</h1>;
}

// React元素可以是自定义组件：<Welcome>
const element = <Welcome name="Sara">;

ReactDOM.render(
    element,
    document.getElementById('root)
)
```

上面创建的 props：

```jsx
props = {
  name: "Sara",
};
```

最后画面显示 Hello, Sata

自定义组件必须大写字母开头，比如上面的 Welcome。不然会被 React 误认为是原生 DOM 标签。

## 组合函数组件

```jsx
function Welcome(props){
    return <h1>Hello, {props.name}</h1>;
}

function App(){
    return {
        <div>
            <Welcome name="Klaus">
            <Welcome name="Max">
            <Welcome name="Caroline">
        </div>
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
```

## 提取函数组件

```jsx
function Comment(props) {
  return (
    <div className="Comment">
      <div className="UserInfo">
        <img
          className="Avatar"
          src={props.author.avatarUrl}
          alt={props.author.name}
        />
        <div className="UserInfo-name">{props.author.name}</div>
      </div>
      <div className="Comment-text">{props.text}</div>
      <div className="Comment-date">{formatDate(props.date)}</div>
    </div>
  );
}
```

这样一个复杂 Comment 组件可以提取成：

```jsx
function Avatar(props) {
  return (
    <img className="Avatar" src={props.user.avatarUrl} alt={props.user.name} />
  );
}

function UserInfo(props) {
  return (
    <div className="UserInfo">
      <Avatar user={props.user} />
      <div className="UserInfo-name">{props.user.name}</div>
    </div>
  );
}

function Comment(props) {
  return (
    <div className="Comment">
      <UserInfo user={props.author} />
      <div className="Comment-text">{props.text}</div>
      <div className="Comment-date">{formatDate(props.date)}</div>
    </div>
  );
}
```

# class 组件

class 组件：

```jsx
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```
