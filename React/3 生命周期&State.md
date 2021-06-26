之前通过定时调用 ReactDOM.render()方法来更新元素。

现在来封装 Clock 组件，为它设置自己的计时器并每秒更新一次：

先封装外观：

```jsx
function Clock(props) {
  return (
    <div>
      <h1>Hello,world!</h1>
      <h1>It is {props.date.toLocaleTimeString()}.</h1>
    </div>
  );
}

function tick() {
  ReactDOM.render(<Clock date={new Date()} />, document.getElementById("root"));
}

setInterval(tick, 1000);
```

接下来需要添加 state 来让组件自我更新。为了使用 state，需要将函数组件转换成 class 组件。

1. 创建一个同名的 ES6 class，继承 React.Component。
2. 添加一个空的 render()方法。
3. 将函数体移动到 render()方法内。
4. 在 render()方法中使用 this.props 替换 props。
5. 删除剩余的空函数声明。

```jsx
class Clock extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello,world!</h1>
        <h1>It is {this.props.date.toLocaleTimeString()}.</h1>
      </div>
    );
  }
}

function tick() {
  ReactDOM.render(<Clock date={new Date()} />, document.getElementById("root"));
}
```

现在 Clock 是一个 class 组件。每次组件更新时 render 方法都会被调用，但只要在相同的 DOM 节点中渲染<Clock />，就仅有一个 Clock 组件的 class 实例被创建使用。

然后添加局部 state

1. 将 this.props.date 替换成 this.state.date
2. 添加一个构造函数，在里面为 this.state 赋初值
3. 使用构造函数将 props 传递给父类的构造函数
4. 移除<Clock />元素内的 date 属性，在构造函数中为 this.state 赋值新建日期

```js
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date() };
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

ReactDOM.render(<Clock />, document.getElementById("root"));
```

## 添加生命周期方法

当 Clock 组件第一次被渲染到 DOM 中时，在 React 中称为挂载（mount）。

当 Clock 组件被删除时，在 React 中称为卸载。

我们需要在挂载时，为 Clock 添加一个计时器。在卸载时，清除计时器。

componentDidMount()会在组件已经被渲染到 DOM 后运行，所以在这里设置计时器最合适。

componentWillUnmount()会在组件即将被销毁前执行，所以在这里清除计时器。

最后实现 tick()方法，在里面使用 this.setState()来更新 state。

```jsx
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date() };
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date(),
    });
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

ReactDOM.render(<Clock />, document.getElementById("root"));
```

> 注意这里的 this.state 变量名是固定的，不能像之前函数组件更改入参“props”那样把 this.state 更改成 this.XXX 其他名字。

这里的调用顺序是这样的：

1. <Clock />被传给 ReactDOM.render 的时候，React 会调用 Clock 的构造函数来初始化 this.state。因为我们赋予一个时间对象，所以 this.state 初期值是当前的时间，但不会改变。
2. React 调用 Clock 的 render 方法，更新 DOM 来进行 Clock 渲染的输出。
3. 当 Clock 被渲染到 DOM 后，componentDidMount()方法被调用，初始化一个计时器。这个计时器每秒调用一次 tick()方法，tick()每次被调用都使用 this.setState()方法给 state 赋上新的时间。
4. setState()被调用后，React 会得知 state 已经改变，然后重新调用 render()再次渲染。
5. 当 Clock 被移除时，componentWillUnmount()方法被调用，清除计时器。

# 正确使用 state

1. 不能直接修改 state

```js
this.state.comment = 'Hello'; // 错误！
this.setState({comment: 'Hello'})； // correct
```

构造函数是唯一可以直接赋值的地方。

2. state 的更新可能是异步
   处于性能考虑，React 可能会把多个 setState()调用合并成一个调用。

因为 this.props 和 this.state 可能会异步更新，所以不能依赖他们的值来更新下一个状态：

```js
this.setState({
  counter: this.state.counter + this.porps.increment,
});
// 可能会无法更新state
```

要解决这个问题，可以让 setState()接收一个函数而不是对象。这个函数用上一个 state 和此次更新被应用时的 props 作为参数：

```js
this.setState((state, props) => ({
  counter: state.counter + props.increment,
}));
```

3. state 的更新会被合并
   调用 setState()时，React 会把提供的对象合并到当前的 state。

比如 state 包含几个独立变量：

```js
constructor(props){
  super(props);
  this.state = {
    posts: [],
    comments: []
  };
}

// 然后分别调用setState()来更新
componentDidMount(){
  fetchPosts().then(response => {
    this.setState({
      posts: response.posts
    });
  });

  fetchComments().then(response => {
    this.setState){
      comments: response.comments
    }
  })
}
```

这里的合并是浅合并，所以 this.setState){comments: response.comments}并不会影响到 this.state.posts，但是替换了 this.state.comments。实现了增量更新的效果。

# 数据是向下流动的

不管是父组件还是子组件都无法知道某个组件是有状态还是无状态。state 是局部的，或者说封装的。除了拥有并设置了他的组件，其他组件都无法访问。

组件可以把它的 state 作为 props 传递到子组件中：

```js
function FormattedDate(props) {
  return <h2>It is {props.date.toLocaleTimeString()}.</h2>;
}

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date() };
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date(),
    });
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <FormattedDate date={this.state.date} />
      </div>
    );
  }
}

ReactDOM.render(<Clock />, document.getElementById("root"));
```

这叫自上而下的、单向的数据流。任何 state 只属于特定的组件，从该 state 派生的数据或 UI 只能影响树中低于它的组件。

将组件构成的树想像成瀑布，每个组件的 state 就像在那一处增加了额外的水源，只能向下流动。（有空的话画幅画）

每个组件都是真正独立。如果一次渲染三个 Clock 组件，它们会单独设置自己的计时器：

```js
function App() {
  return (
    <div>
      <Clock />
      <Clock />
      <Clock />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
```
