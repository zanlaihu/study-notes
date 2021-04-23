// 对象构造器
function car(firstname, lastname, age, eyecolor) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.age = age;
    this.eyecolor = eyecolor;
    this.renameAge = function (age) {
        this.age = age;
    };
}

// 另一种声明对象构造器的写法
var car2 = function (firstname, lastname, age, eyecolor) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.age = age;
    this.eyecolor = eyecolor;
    this.renameAge = function (age) {
        return 100;
    };
}

// 构造出一个实例myFather
myFather = new car("John", "Doe", 50, "blue");

// 使用原型的方法来重命名
myFather.renameAge(100);
