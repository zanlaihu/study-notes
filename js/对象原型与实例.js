// 声明一个原型
function Products() {
    this.name = 'car',
    this.ids = [1,2]
}

// 可以为原型添加新值，但不能修改值。
Products.prototype.type = 'apple';

// 原型不能被打印
console.log(Products.prototype.ids); 
// 结果： 
// undefined

// 声明一个实例
var product1 = new Products();

// 在实例中添加新值
product1.color = 'red';
// 在实例中修改原型的值
product1.name = 'benz';


console.log(product1.name);
console.log(product1.type);
console.log(product1.color);
// 结果：
// benz
// apple
// red
console.log(product1);
// Products { name: 'benz', ids: [ 1, 2 ], color: 'red' }