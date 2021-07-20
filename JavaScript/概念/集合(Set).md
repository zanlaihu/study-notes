# set

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

移除 Set 中与这个值相等的元素，并返回一个布尔值（即如果该元素存在，返回 true，否则返回 false）。

# Set.prototype.forEach()

forEach 方法会根据集合中元素的插入顺序，依次执行提供的回调函数。

# Set.prototype.values()

values() 方法按照元素插入顺序返回一个具有 Set 对象每个元素值的全新 Iterator 对象。

keys() 方法是这个方法的别名（与 Map 对象相似）；他们的行为一致，都是返回 Set 对象中的元素值。

[Set Iterator] { 'apple', 'a', 'change' }

# Set.prototype.entries()

entries() 方法返回一个新的迭代器对象 ，这个对象的元素是类似 [value, value] 形式的数组，value 是集合对象中的每个元素，迭代器对象元素的顺序即集合对象中元素插入的顺序。由于集合对象不像 Map 对象那样拥有 key，然而，为了与 Map 对象的 API 形式保持一致，故使得每一个 entry 的 key 和 value 都拥有相同的值，因而最终返回一个 [value, value] 形式的数组。

```js
const set1 = new Set(["apple", "a", "change"]);
const setEntries = set1.entries();

console.log(setEntries);
// output:
// [Set Entries] {
//   [ 'apple', 'apple' ],
//   [ 'a', 'a' ],
//   [ 'change', 'change' ]
// }
```
