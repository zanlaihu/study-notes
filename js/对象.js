var person = {
  firstName: "Bill",
  lastName: "Gates",
  id: 648,
  fullName: function () {
    return this.firstName + " " + this.lastName;
  },
};

// 加入新属性和值 或 修改旧属性的值
person.sex = "Male";

// 删去属性和值
delete person.sex;

// 访问对象(下面两个方法一样)
console.log(person.firstName);
console.log(person["firstName"]);

// 遍历对象
for (x in person) {
  // 打印 属性
  console.log(x);
  // 打印 属性的值
  console.log(person[x]);
}

// 获取对象中属性的个数
console.log(Object.getOwnPropertyNames(person).length);

//调用对象方法
console.log(person.fullName());