function f1(arg){
  console.log("f1",arg)
  return arg;
}
function f2(arg){
  console.log("f2",arg)
  return arg;
}
function f3(arg){
  console.log("f3",arg)
  return arg;
}
function compose(...funcs){
  if(funcs.length===0){
      return arg=>arg;
  }
  if(funcs.length===1){
      return funcs[0];
  }
  // return funcs.reduce((a,b)=>(...args)=>a(b(...args)))
  return funcs.reduce(function(a,b){
      return function(o){
          return a(b(o))
      }
  })
}
let res = compose(f1,f2,f3)("omg");//f1(f2(f3("omg"))) 洋葱模型
console.log("res",res);