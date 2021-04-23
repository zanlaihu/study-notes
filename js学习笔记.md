button 标签的 type 有三个值：submit、button、reset。
IE 浏览器的默认类型是 button，其他浏览器的默认值是 submit。
所以使用 button 时应明确 type 属性。

# js 三种输出方式：

getElementById
window.alert()
document.write() 在 html 文档完全加载后使用会删除所有已有的 html。

instanceof 判断是否是对象类型，返回 true

5\*\*2 等于 math.pow(5,2) js 的次方运算



### 数字

始终是双精度浮点数
整数会被精确到 15 位：

var y = 9999999999999999; // y 将是 10000000000000000

小数的最大整数是 17 位，但是浮点的算数并不总是 100%精准：
var x = 0.2 + 0.1; // x 将是 0.30000000000000004
解决方法：
var x = (0.2 _ 10 + 0.1 _ 10) / 10; // x 将是 0.3

NaN 非数值，类型是 number:
var x = 100 / "Apple"; // x 将是 NaN（Not a Number）

可以使用 isNaN()来确定某个值是否是数。

infinity(-infinity)超出最大可能数范围时返回的值，类型是 number:

十六进制
JavaScript 会把前缀为 0x 的数值常量解释为十六进制。
var x = 0xFF; // x 将是 255

绝不要用前导零写数字（比如 07）。
一些 JavaScript 版本会把带有前导零的数解释为八进制。

# 集合

const s = new Set();
[2,3,5,4,5,2,2].forEach(x => s.add(x));
