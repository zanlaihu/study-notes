class Polygon {
  constructor(height, width) {
    this.area = height * width;
  }

  printArea() {
    console.log(this.area);
  }
}

console.log(new Polygon(4, 3).area);
let p = new Polygon(4, 5);
p.printArea();
