function h(x) {
  return f(g(x));
}

function f(x) {
  return x + 1;
}

function g(x) {
  return 2 * x;
}

const result = h(3);

console.log(result);
