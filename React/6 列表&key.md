使用 Javascript 中的 map() 方法来遍历 numbers 数组。将数组中的每个元素变成 \<li> 标签，生成新数组 listItems：

```js
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) => <li>{number}</li>);
  return <ul>{listItems}</ul>;
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById("root")
);
```

但是会看到一个警告 a key should be provided for list items。意思是当你创建一个元素时，必须包括一个特殊的 key 属性。给每个列表元素分配一个 key 属性来解决上面的那个警告。

```js
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) => (
    <li key={number.toString()}>{number}</li>
  ));
  return <ul>{listItems}</ul>;
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById("root")
);
```

# key

key 帮助 React 识别哪些元素改变了，比如被添加或删除。因为应该给数组中的每一个元素赋予一个确定的标识。

一个元素的 key 最好是这个元素在列表中拥有的一个独一无二的字符串。通常，我们使用数据中的 id 来作为元素的 key：

```js
const todoItems = todos.map((todo) => <li key={todo.id}>{todo.text}</li>);
```

当元素没有确定 id 的时候，万不得已你可以使用元素索引 index 作为 key：

```js
const todoItems = todos.map((todo, index) => <li key={index}>{todo.text}</li>);
```

如果列表项目的顺序可能会变化，则不建议使用索引来用作 key 值，因为这样做会导致性能变差，还可能引起组件状态的问题。如果选择不指定显式的 key 值，那么 React 将默认使用索引用作为列表项目的 key 值。

# 用 key 提取组件

元素的 key 只有放在就近的数组上下文中才有意义。

比方说，如果提取出一个 ListItem 组件，应该把 key 保留在数组中的这个 <ListItem /> 元素上，而不是放在 ListItem 组件中的 <li> 元素上。

```js
function ListItem(props) {
  const value = props.value;
  return (
    // 错误！你不需要在这里指定 key：
    <li key={value.toString()}>{value}</li>
  );
}

function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) => (
    // 错误！元素的 key 应该在这里指定：
    <ListItem value={number} />
  ));
  return <ul>{listItems}</ul>;
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById("root")
);
```

正确的例子：

```js
function ListItem(props) {
  // 正确！这里不需要指定 key：
  return <li>{props.value}</li>;
}

function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) => (
    // 正确！key 应该在数组的上下文中被指定
    <ListItem key={number.toString()} value={number} />
  ));
  return <ul>{listItems}</ul>;
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById("root")
);
```

## key 只是在兄弟节点之间必须唯一

数组元素中使用的 key 在其兄弟节点之间应该是独一无二的。然而，它们不需要是全局唯一的。当我们生成两个不同的数组时，我们可以使用相同的 key 值：

```js
function Blog(props) {
  const sidebar = (
    <ul>
      {props.posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
  const content = props.posts.map((post) => (
    <div key={post.id}>
      <h3>{post.title}</h3>
      <p>{post.content}</p>
    </div>
  ));
  return (
    <div>
      {sidebar}
      <hr />
      {content}
    </div>
  );
}

const posts = [
  { id: 1, title: "Hello World", content: "Welcome to learning React!" },
  { id: 2, title: "Installation", content: "You can install React from npm." },
];

ReactDOM.render(<Blog posts={posts} />, document.getElementById("root"));
```

key 会传递信息给 React ，但不会传递给你的组件。不能通过 props.key 使用 key 属性的值，请用其他属性名比如 id，显式传递这个值：

```js
const content = posts.map((post) => (
  <Post key={post.id} id={post.id} title={post.title} />
));
```

# JSX 中嵌入 map()

JSX 允许在大括号中嵌入任何表达式，所以可以内联 map() 返回的结果：

```js
function NumberList(props) {
  const numbers = props.numbers;
  return (
    <ul>
      {numbers.map((number) => (
        <ListItem key={number.toString()} value={number} />
      ))}
    </ul>
  );
}
```
