/**
 * 将数组的所有元素连接成一个字符串。是String.prototype.split()的相反操作。
 *
 * 可选，指定链接符
 *
 * @returns {string}
 */

const elements = ["Fire", "Air", "Water"];

console.log(elements.join());
//  output: "Fire,Air,Water"

console.log(elements.join(""));
//  output: "FireAirWater"

console.log(elements.join("-"));
//  output: "Fire-Air-Water"
