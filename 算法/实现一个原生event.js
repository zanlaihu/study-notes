function Events() {
  // 放置所有添加的 监听事件
  this._events = {};
}
Events.prototype = {
  on: function (name, fn, ...argOrg) {
    // 必传参数验证
    if (!name || !fn) {
      throw new Error(
        `[Events TypeError] Failed to execute 'Events' on '${name}' : 2 arguments required`
      );
    }
    // 阻止重复添加相同的监听
    let fns = this._events[name] || [];
    if (fns.find((item) => item.fnOrg === fn)) {
      return;
    }
    this._events[name] = fns.concat({
      fn: (arg) => fn.apply(null, [...argOrg, ...arg]),
      fnOrg: fn,
    });
  },
  once: function (name, fn, ...argOrg) {
    const onFn = (...arg) => {
      fn.apply(null, arg);
      this.off(name, onFn);
    };
    this.on(name, onFn, ...argOrg);
  },
  emit: function (name, ...arg) {
    (this._events[name] || []).forEach((item) => {
      item.fn(arg);
    });
  },
  off: function (name, fn) {
    // 无参数 ： 清掉所有监听
    if (!arguments.length) {
      this._events = Object.create(null);
    }
    // 一个参数 ： 清掉该事件名下所有监听
    if (arguments.length == 1) {
      delete this._events[name];
    }
    let fns = this._events[name];
    if (!fns || !fns.length) return;
    this._events[name] = (fns || []).filter((item) => {
      return item.fnOrg !== fn;
    });
  },
};
// 调用demo
const event = new Events();
const fn1 = (...args) => console.log("I want sleep1", ...args);
const fn2 = (...args) => console.log("I want sleep2", ...args);
// part1: 添加多次监听
event.on("sleep", fn1, 1, 2, 3);
event.on("sleep", fn2, 4, 5, 6);
event.emit("sleep", 7, 8, 9);
// 输出
// I want sleep1 1 2 3 4 5 6
// I want sleep2 1 2 3 4 5 6

// part2：once监听 只触发一次
event.once("sleep1", fn1, 11, 12);
event.emit("sleep1", 13);
event.emit("sleep1", 13);
// 输出
// I want sleep1 11 12 13

// part3: 重复监听“相同回调”无效（匿名函数除外）
event.on("sleep2", fn2, 22);
event.on("sleep2", fn2, 23);
event.emit("sleep2", 25);
// 输出
// I want sleep2 22 25

// part3: 清除监听
event.off("sleep2", fn2);
event.off("sleep1"); // 清除该事件下所有监听
event.off(); // 全部清除
event.emit("sleep2", 25);
// 输出
// 无
