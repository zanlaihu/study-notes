https://www.redux.org.cn/

React 只是 DOM 的一个抽象层，并不是 web 应用的完整解决方案。单独的 React 没有办法写大型应用，有两点它没有涉及：

1. 代码结构
2. 组件之间的通信

对于大型复杂应用来说，这两点至关重要。

为了解决这个问题，2014 年 Facebook 提出了 Flux 架构，2015 年 Redux 问世。

Redux 是 JavaScript 状态容器，提供可预测化的状态管理。Redux 由 Flux 演变而来，避开了 Flux 的复杂性。

# Redux 适用场景

Redux 适合复杂的场景：

- 用户的使用方式复杂
- 不同身份的用户有不同的使用方式
- 多个用户之间可以协作
- 与服务器大量交互，或使用 WebSocket
- View 要从多个来源获取数据

即：多交互、多数据源

从组件角度看：

- 某个组件的状态需要共享
- 某个状态需要在任何地方都可以拿到
- 一个组件需要改变全局状态
- 一个组件需要改变另一个组件的状态

这样的情况使用 Redux 非常适合。

# Redux 设计思想

1. Web 应用是一个状态机，试图与状态一一对应。
2. 所有的状态保存在一个对象里。

# 基本概念和 API

```js
import { createStore } from "redux";
const store = createStore(fn);

const state = store.getState();

const action = {
  type: "Add_TODO",
  payload: "Learn Redux",
};

store.dispatch(action);
```

## Store

用于保存数据的容器。整个应用只有一个 Store。

createStore()用来生成 Store：

createStore()接受另一个函数作为参数，返回新生成的 Store 对象。

## State

Store 对象包含所有数据。如果想得到某个时点的数据，就要对 Store 生成快照。这种时点的数据集合，就叫 State。

当前时刻的 State，可以通过 store.getState()拿到。

Redux 中每个 State 对于一个 View。只要 State 相同，View 就相同。知道其中一个就可以知道另一个。

## Action

Action 可以运送数据到 Store。

Action 是一个对象,type 属性是必须的，表示 Action 的名称。

这个 Action 的名字是 Add_TODO，它携带的信息是'Learn Redux'。

用来生成 Action 的函数叫做 Action Creator，下面的 addTodo 就是一个 Action Creator：

```js
function addTodo(text) {
  return {
    type: "Add_TODO",
    text,
  };
}

const newAction = addTodo("学习redux");
```

## store.dispatch()

将 Action 发送到 Store。

```js
// 直接发送
store.dispatch({
  type: "ADD_TODO",
  payload: "learn",
});

// 发送某个定义好的Action
store.dispatch(action);

// Action Creator形式发送
store.dispatch(addTodo("learn"));
```

# Reducer

Reducer 接受 Action 和当前的 State 作为参数，返回一个新的 State。

store.dispatch()会触发 Reducer 的自动执行。
