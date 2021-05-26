class Play {
    constructor(height, width){
        this.square = height*width;
    }
}

class Square extends Play {
    constructor(length){
        super(length,length);
        this.result = length;
        this.squareResult = this.square;
    }

    printResult(){
        console.log(this.squareResult);
    }
}

console.log(new Play(3,4).square); // 12

console.log(new Square(3).square); // 9

console.log(new Square(4).squareResult); // 16

let s = new Square(5);
s.printResult(); // 25
