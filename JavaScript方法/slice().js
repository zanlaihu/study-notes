// slice()截取字符串的一部分。不对目标字符串做永久处理。

// stringObject.slice(start,end)，如果未指定end，则截取到末尾。


let str = "abcde";

console.log(str.slice(0,2));
// ab

console.log(str.slice(1,1));
// 什么都没

console.log(str.slice(1,2));
// b

console.log(str.slice(2));
// cde
