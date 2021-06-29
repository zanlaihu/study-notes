/**
 * 返回A字符串在B字符串内的位置，indexOf()对大小写敏感
 */

const strB = "123abc";

// 3a在B字符串内的位置
console.log(strB.indexOf("3a"));
// output：2

// 不存在的值会返回-1
console.log(strB.indexOf("d"));
// output：-1