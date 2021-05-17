// 按条件拆分字符串

let str = "How are you doing today?";

console.log(str.split(" "));
console.log(str.split(""));
console.log(str.split(" ", 3));

// [ 'How', 'are', 'you', 'doing', 'today?' ]
// [
//   'H', 'o', 'w', ' ', 'a',
//   'r', 'e', ' ', 'y', 'o',
//   'u', ' ', 'd', 'o', 'i',
//   'n', 'g', ' ', 't', 'o',
//   'd', 'a', 'y', '?'
// ]
// [ 'How', 'are', 'you' ]
