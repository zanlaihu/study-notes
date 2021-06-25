之前通过定时调用 ReactDOM.render()方法来更新元素。

现在来封装Clock组件，为它设置自己的计时器并每秒更新一次：

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
  ReactDOM.render(<Clock date={new Date()} />, 
  document.getElementById("root"));
}

setInterval(tick, 1000);
```

接下来需要添加state来让组件自我更新。为了使用state，需要将函数组件转换成class组件。
1. 创建一个同名的ES6 class，继承React.Component。
2. 添加一个空的render()方法。
3. 将函数体移动到render()方法内。
4. 在render()方法中使用this.props替换props。
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
  ReactDOM.render(<Clock date={new Date()} />, 
  document.getElementById("root"));
}
```
现在Clock是一个class组件。每次组件更新时render方法都会被调用，但只要在相同的DOM节点中渲染<Clock />，就仅有一个Clock组件的class实例被创建使用。

然后添加局部state
1. 将this.props.date替换成this.state.date
2. 添加一个构造函数，在里面为this.state赋初值
3. 使用构造函数将props传递给父类的构造函数
4. 移除<Clock />元素内的date属性，在构造函数中为this.state赋值新建日期
```js
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
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

ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```

## 添加生命周期方法
当Clock组件第一次被渲染到DOM中时，在React中称为挂载（mount）。

当Clock组件被删除时，在React中称为卸载。

我们需要在挂载时，为Clock添加一个计时器。在卸载时，清除计时器。

componentDidMount()会在组件已经被渲染到DOM后运行，所以在这里设置计时器最合适。

componentWillUnmount()会在组件即将被销毁前执行，所以在这里清除计时器。

最后实现tick()方法，在里面使用this.setState()来更新state。

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
>注意这里的this.state变量名是固定的，不能像之前函数组件更改入参“props”那样把this.state更改成this.XXX其他名字。

这里的调用顺序是这样的：
1. <Clock />被传给ReactDOM.render的时候，React会调用Clock的构造函数来初始化this.state。因为我们赋予一个时间对象，所以this.state初期值是当前的时间，但不会改变。
2. React调用Clock的render方法，更新DOM来进行Clock渲染的输出。
3. 当Clock被渲染到DOM后，componentDidMount()方法被调用，初始化一个计时器。这个计时器每秒调用一次tick()方法，tick()每次被调用都使用this.setState()方法给state赋上新的时间。
4. setState()被调用后，React会得知state已经改变，然后重新调用render()再次渲染。
5. 当Clock被移除时，componentWillUnmount()方法被调用，清除计时器。

# 正确使用state

