/**
 * 分割字符串并合并成一个数组。如果没有找到或者省略了分隔符，则该数组包含一个由整个字符串组成的元素。
 *
 * @requires 分隔符{string}
 * @returns {string}
 */

const str = "The quick brown fox jumps over the lazy dog.";

const words = str.split(" ");
console.log(words[3]);
// expected output: "fox"

const chars = str.split("");
console.log(chars[8]);
// expected output: "k"

const strCopy = str.split();
console.log(strCopy);
// expected output: Array ["The quick brown fox jumps over the lazy dog."]
