function add(c, d) {
    return this.a + this.b + c + d;
}

var o = { a: 1, b: 3 };
add.call(o, 5, 7); // 1 + 3 + 5 + 7 = 16
add.apply(o, [10, 20]); // 1 + 3 + 10 + 20 = 34
