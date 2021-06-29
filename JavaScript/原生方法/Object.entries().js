/**
 * 返回对象内所有键值对数组形成的一个数组，
 * @returns 数组
 */

const o = {
  foo: "bar",
  baz: 1,
  qux: {},
};

console.log(Object.entries(o));
// output： [ [ 'foo', 'bar' ], [ 'baz', 1 ], [ 'qux', {} ] ]
