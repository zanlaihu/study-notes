(function() {

  setTimeout(function cb() {
    console.log('这是来自第一个回调的消息');
  }, 3);

  setTimeout(function cb1() {
    console.log('这是来自第二个回调的消息');
  }, 0);

})();

// "这是来自第一个回调的消息"
// "这是来自第二个回调的消息"
