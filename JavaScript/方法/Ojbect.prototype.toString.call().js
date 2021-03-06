// 使用 Object.prototype 上的原生 toString()方法判断数据类型：

Object.prototype.toString.call(null);//”[object Null]”
Object.prototype.toString.call(undefined);//”[object Undefined]”
Object.prototype.toString.call('abc');//”[object String]”
Object.prototype.toString.call(123);//”[object Number]”
Object.prototype.toString.call(true);//”[object Boolean]” 2.判断原生引用类型：

// 函数类型
function fn(){console.log('test');};
Object.prototype.toString.call(fn);//”[object Function]”

// 日期类型
var date = new Date();
Object.prototype.toString.call(date);//”[object Date]”

// 数组类型
var arr = [1,2,3];
Object.prototype.toString.call(arr);//”[object Array]”

// 正则表达式
var reg = /[hbc]at/gi;
Object.prototype.toString.call(arr);//”[object Array]”

// 自定义类型
function Person(name, age) {
this.name = name;
this.age = age;
}
var person = new Person("Rose", 18);
Object.prototype.toString.call(arr); //”[object Object]”

// 很明显这种方法不能准确判断 person 是 Person 类的实例，而只能用 instanceof 操作符来进行判断，如下所示：
console.log(person instanceof Person);//输出结果为 true 3.判断原生 JSON 对象：

var isNativeJSON = window.JSON && Object.prototype.toString.call(JSON);
console.log(isNativeJSON);//输出结果为”[object JSON]”说明 JSON 是原生的，否则不是；
// 注意：Object.prototype.toString()本身是允许被修改的，而我们目前所讨论的关于 Object.prototype.toString()这个方法的应用都是假设 toString()方法未被修改为前提的。
