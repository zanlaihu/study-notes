数组由方括号构成，用逗号分隔元素。

# 创建数组：

```js
let newArray = [];
```

可以将任何类型的元素存储在数组中：字符串，数字，对象，另一个变量，甚至另一个数组。

```js
let newArray = ["tree", 795, [0, 1, 2]];
```

# 访问和修改数组元素

检索数组：

```js
newArray[0];
```

修改数组：

```js
newArray[0] = "new Value";
```

多维数组：

```js
let newArray = [][];
```

# 获取数组长度

```js
newArray.length;
```

# 添加和删除数组元素

末尾：

```js
// 添加元素到数组末尾：
newArray.push("newValue");

// 删除末尾元素：
newArray.pop();
```

开头：

```js
// 添加元素到数组开头：
newArray.unshift()("newValue");

// 删除开头元素：
newArray.shift();
```
