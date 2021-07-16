/**
 * 截取字符串。不对原字符串做更改
 *
 * @requires start{number} 
 * @requires end{number} 未指定end，截取到末尾
 * @returns string
 *
 */

let str = "abcde";

// 从0到1
console.log(str.slice(0, 2));
// output：ab

// start === end时，不截取
console.log(str.slice(1, 1));
// output：什么都没有

console.log(str.slice(2)); // cde
