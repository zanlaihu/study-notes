# Array.prototype.map()

map()方法创建一个新数组，包含原数组中每个元素调用提供的函数之后的返回值。

```js
const array1 = [1, 4, 6, 14];

const array2 = array1.map((x) => x * 2);

console.log(array2);
// output: [ 2, 8, 12, 28 ]
```

# 参数
```hs
let new_array = arr.map(function callback(currentValue[, index[, array]]) {
 // Return element for new_array 
}[, thisArg])
```

callback：生成新数组的函数。具有三个参数：数组元素，元素索引，原数组本身
1. currentValue：原数组元素
2. index：可选，原数组的元素索引
3. array：可选，map()调用的原数组本身

thisArg：可选，执行函数时值被用作this

# 描述
map()会被原数组中的每个元素都按顺序调用一次callback函数。callback每次执行后的返回值（包括undefined）组合起来形成一个新数组。

callback函数只会在有值的索引上被调用，没有被赋过值或只是delete删除的索引不会被调用。

因为map()生成一个新数组。所以不打算使用返回的新数组时，考虑用forEach或for-of替代。不该使用map: A)不打算使用返回的新数组，或/且 B) 没有从回调函数中返回值。

# 使用 map 重新格式化数组中的对象
```js
var kvArray = [{key: 1, value: 10},
               {key: 2, value: 20},
               {key: 3, value: 30}];

var reformattedArray = kvArray.map(function(obj) {
   var rObj = {};
   rObj[obj.key] = obj.value;
   return rObj;
});

// reformattedArray 数组为： [{1: 10}, {2: 20}, {3: 30}],

// kvArray 数组未被修改:
// [{key: 1, value: 10},
//  {key: 2, value: 20},
//  {key: 3, value: 30}]
```

# 使用call()方法调用map()
```js
var map = Array.prototype.map
var a = map.call("Hello World", function(x) {
  return x.charCodeAt(0);
})
// a的值为[72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100]
```

https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/map