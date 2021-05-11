function Person(){
    this.name = "Amy";
};

Person.prototype.sayName = function(){
    console.log(this.name);
};

let person1 = new Person();
person1.sayName();

