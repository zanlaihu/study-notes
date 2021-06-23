function greeting(name) {
  console.log('Hello ' + name);
}

function processUserInput(callback) {
  var name = '请输入你的名字。';
  callback(name);
}

processUserInput(greeting);