var array = ["apple", 100, "good"];

// 打印第一个元素
console.log(array[0]);

// 打印超出长度的元素不会报错，得到undefined
console.log(array[10]);

// 遍历数组
var i;
for (i = 0; i < array.length; i++) {
    console.log(array[i]);
}

// 删去数组元素,被删处会留下undefined
delete array[1];
console.log(array);
// [ 'apple', <1 empty item>, 'good' ]

// 用splice删元素，会直接把索引也删掉
array.splice(1, 1);
console.log(array);
// [ 'apple', 'good' ]

// 添加数组元素

var data = [
    { userId: 8, title: 'title1' },
    { userId: 11, title: 'other' },
    { userId: 15, title: null },
    { userId: 19, title: 'title2' }
];

