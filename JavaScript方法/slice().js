// slice()截取字符串的一部分。不对目标字符串做永久处理。

let str = "abcde";

// stringObject.slice(start,end)
console.log(str.slice(0,2)); // ab
console.log(str.slice(1,1)); // 什么都没
// 如果未指定end，则截取到末尾
console.log(str.slice(2)); // cde
