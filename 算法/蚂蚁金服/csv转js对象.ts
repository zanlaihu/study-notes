// 给定 csv 文件，转换成对象结构(并提供测试用例)
const csv = `
name,age,parent
Bob,30,David
David,60,
Anna,10,Bob
`;

interface Person {
    name: string;
    age: number;
    parent: Person;
    children: Person[];
}

// 根据已知条件，推断题目期望的结果是如下所示。
// var Bob: Person = {name: 'Bob', age:30, parent: David, children: [Anna]};
// var David: Person = {name: 'David', age:60, parent: undefined, children: [Bob]};
// var Anna: Person = {name: 'Anna', age:10, parent: Bob, children: undefined};
// 但是对象和对象不能互相嵌套。


var csvarray = csv.split("\n");
var datas = [];
var personType = ['name', 'age', 'parent', 'children'];
var missingType = [];

// 去空处理。
var i;
for (i = 0; i < csvarray.length; i++) {
    if (csvarray[i] == "") {
        csvarray.splice(i, 1);
        i--;
    }
}

var headers = csvarray[0].split(",");
for (i = 1; i < csvarray.length; i++) {
    var data = {};
    var temp = csvarray[i].split(",");
    for (var j = 0; j < temp.length; j++) {
        if (headers[j] === 'age') {
            data[headers[j]] = parseInt(temp[j]);
        } else {
            data[headers[j]] = temp[j];
        }
    }
    datas.push(data);
}

for (i = 0; i < personType.length; i++) {
    if (headers.indexOf(personType[i]) < 0) {
        missingType.push(personType[i]);
    }
}

for (i = 0; i < missingType.length; i++) {
    for (var j = 0; j < datas.length; j++) {
        datas[j][missingType[i]] = '';
    }
}

console.log(datas);
// 得到：
// [
//     { name: 'Bob', age: '30', parent: 'David', children: '' },
//     { name: 'David', age: '60', parent: '', children: '' },
//     { name: 'Anna', age: '10', parent: 'Bob', children: '' }
// ]
