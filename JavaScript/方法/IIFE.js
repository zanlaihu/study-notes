// 立即执行函数表达式
(function () {
    return;
})();

for (var i = 0; i < 10; i++) {
    // capture the current state of 'i'
    // by invoking a function with its current value
    (function(i) {
        setTimeout(function() { console.log(i); }, 100 * i);
    })(i);
}
// 参数 i会覆盖for循环里的i，为获取到的变量创建了一个新的变量环境。