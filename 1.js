const o = {
  foo: "bar",
  baz: 1,
  qux: {},
};

console.log(Object.values(o));
// [ 'bar', 1, {} ]

console.log(Object.entries(o));
// [ [ 'foo', 'bar' ], [ 'baz', 1 ], [ 'qux', {} ] ]

const o = {
  qux: {},
};
console.log(Object.values(o)[0] === o.qux);
// true
console.log(Object.entries(o)[0][1] === o.qux);
// true

const sym = Symbol();
const o = {
  [sym]: 'foo'
};
console.log(Object.values(o));
// []
console.log(Object.entries((o)));
// []