之前通过定时调用 ReactDOM.render()来更新元素。

但其实可以封装Clock组件，为它设置自己的计时器并每秒更新一次：

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
1. 创建一个同名的ES6class，并且继承React.Component。
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
现在Clock是一个class组件。每次组件更新时render方法都会被dialing，但只要在相同的DOM节点中渲染<Clock />，就仅有一个Clock组件的class实例被创建使用。

## 向class组件添加局部state


