// typescript的interface，又叫接口

interface IPerson {
  firstName: string;
  lastName: string;
  sayHi: () => string;
}

// 定义一个变量 customer，它的类型是 IPerson
var customer: IPerson = {
  firstName: "Tom",
  lastName: "Hanks",
  sayHi: (): string => {
    return "Hi there";
  },
};

console.log(customer.firstName);

// 接口继承
interface Musician extends IPerson {
  instrument: string;
}

// 遍历接口里的属性Î
