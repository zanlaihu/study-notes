三者区别区别在于：

f.bind(obj,arg1,arg2,...)()

f.call(obj,arg1,arg2...)

f.apply(ojb,[arg1,arg2,...])

举一个改变 this 指向的例子：

```js
// bind
function bindThis(f, oTarget) {
  return f.bind(oTarget);
}

// apply
function bindThis(f, oTarget) {
  return function () {
    return f.apply(oTarget, arguments);
  };
}

// call
function bindThis(f, oTarget){
  return function(){
    return f.call(oTarget, ...arguments)
  }
}
```
