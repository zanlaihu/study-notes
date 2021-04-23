let person = {
    name: 'Matt',
    age: 27
};
function printPerson(foo, { name, age }, bar) {
    console.log(arguments);
    console.log(name, age);
}
function printPerson2(foo, { name: personName, age: personAge }, bar) {
    console.log(arguments);
    console.log(personName, personAge);
}
printPerson('1st', person, '2nd');
// ['1st', { name: 'Matt', age: 27 }, '2nd']
// 'Matt', 27
printPerson2('1st', person, '2nd');
    // ['1st', { name: 'Matt', age: 27 }, '2nd']
    // 'Matt', 27