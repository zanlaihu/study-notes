let a = new Set([1, 2, 3, 4, 4]);
let b = new Set([1, 2, 3, 4, 5, 6]);

console.log(a);

var c = [1, 2, 3, 4, 5, 4, 3, 2, 1];
// 可以直接放入一个数组来生成集合
let d = new Set(c);

console.log(d);

//并集
let union = new Set([...a, ...b]);
console.log(union);
//交集
let intersect = new Set([...a].filter(x => b.has(x)));
console.log(intersect);
//差集
let difference = new Set([...b].filter(x => !a.has(x)));
console.log(difference);