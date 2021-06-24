组件可以将 UI 拆分成独立可复用的代码片段。组件接收入参 props 并返回一个 React 元素。

React 元素除了是 DOM 标签，比如\<h1>以外，也可以是用户自定义的组件，比如函数组件、class组件。

## 函数组件

JavaScript 函数定义组件：

```jsx
function Welcome(props) {
  return <h1>Hello, {(props, name)}</h1>;
}

const element = <Welcome name="Sara">
```

自定义组件必须大写字母开头(比如 Welcome)，不然会被 React 误认为是原生 DOM 标签。

当 React 元素为自定义组件时，它会将 JSX 所接收的属性（attributes）和子组件（children）合并成一个 props 对象传递给组件：

```jsx
function Welcome(props){
  return <h1>Hello, {props.name}</h1>
}

const element = <Welcome name="Sara">;

ReactDOM.render(element, document.getElementById('root'));
```

> 入参并不是必须命名成“props”，可以使用任意合法变量名。

多个函数组件可以组合在一起：

```js
function Welcome(p) {
  return <h1>Hello, {p.name}</h1>;
}

function App() {
  return (
    <div>
      <Welcome name="Sara" />
      <Welcome name="Klaus" />
      <Welcome name="Mike" />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
```

可以通过组合形成复杂的结构：

```js
function formatDate(date) {
  return date.toLocaleDateString();
}

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

const comment = {
  date: new Date(),
  text: "I hope you enjoy learning React!",
  author: {
    name: "Hello Kitty",
    avatarUrl: "https://placekitten.com/g/64/64",
  },
};

ReactDOM.render(
  <Comment date={comment.date} text={comment.text} author={comment.author} />,
  document.getElementById("root")
);
```

过于复杂的单个组件难以复用，可以将其拆分：

```js
function formatDate(date) {
  return date.toLocaleDateString();
}

function Avatar(p) {
  return (
    <img className="Avatar" src={p.user.avatarUrl} alt={p.user.name}></img>
  );
}

function UserInfo(p) {
  return (
    <div className="UserInfo">
      <Avatar user={p.user} />
      <div className="UserInfo-name">{p.user.name}</div>
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

const comment = {
  date: new Date(),
  text: "I hope you enjoy learning React!",
  author: {
    name: "Hello Kitty",
    avatarUrl: "https://placekitten.com/g/64/64",
  },
};

ReactDOM.render(
  <Comment date={comment.date} text={comment.text} author={comment.author} />,
  document.getElementById("root")
);
```

## props 的只读性

入参 props 不能被修改。参考下面这个纯函数一样：

```jsx
function sum(a, b) {
  return a + b;
}
```

下面这个则不是纯函数：

```jsx
function withdraw(accoumt, amount) {
  account.total = account.total - amount;
}
```
所有 React 组件都必须像纯函数一样保护它们的 props 不被更改。
# class 组件

class 组件：

```jsx
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```
