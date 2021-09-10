function getFi(count){
    let first = 1;
    let second = 1;

    if(count === 1 || count === 2){
        return 1;
    }

    const times = count - 2;

    for (i = 0; i < times + 1; i++){
        newValue = first + second;
        first = second;
        second = newValue;
    }
    return newValue;
}

console.log(getFi(6));