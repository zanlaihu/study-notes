Set 对象是值的集合。Set 里面的每个元素只会出现一次，每个元素是唯一的。允许存储任何类型的唯一值。NaN 和 undefined 也可以被存储在 Set 中，尽管 NaN !== NaN，但是 NaN 被认为是相同的且不可重复的。

```js
let a = new Set([1, 2, 3, 4, 4]);

console.log(set1.has(1));
// output: true

// 可以直接放入一个数组来生成集合
let c = new Set([1, 2, 3, 4, 5, 4, 3, 2, 1]);

// 再来个b做并集、交集、差集
let b = new Set([1, 2, 3, 4, 5, 6]);

//并集
let union = new Set([...a, ...b]);
console.log(union);

//交集
let intersect = new Set([...a].filter((x) => b.has(x)));
console.log(intersect);

//差集
let difference = new Set([...b].filter((x) => !a.has(x)));
console.log(difference);
```

# Set.prototype.size

返回 set 对象中元素的个数

# Set.prototype.add()

添加新元素

# Set.prototype.clear()

移除 Set 对象内的所有元素。

# Set.prototype.delete(value)
移除Set中与这个值相等的元素，并返回一个布尔值（即如果该元素存在，返回true，否则返回false）。