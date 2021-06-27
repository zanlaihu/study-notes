function add(c, d) {
    return this.a + this.b + c + d;
}

var o = { a: 1, b: 3 };

add.apply(o, [10, 20]); // 1 + 3 + 10 + 20 = 34
