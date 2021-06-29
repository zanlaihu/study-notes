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
