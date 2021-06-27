function add(c, d) {
    return this.a + this.b + c + d;
}

let o = { a: 1, b: 3 };

add.call(o, 5, 7); // 1 + 3 + 5 + 7 = 16
