const arr = [13, 9, 3, 8, 5, 25, 31, 11, 21];

var arr1 = arr.sort(function(a, b) {
    return a-b;
})

console.log(arr1);

var arr1 = arr.sort(function(a, b) {
    return a-b;
})
var tempArr = [];
tempArr.push(arr1[0], arr1[1]);
console.log(tempArr);
for(var i=2; i<arr1.length;i++) {
    if(arr1[i] == arr1[i-2] + arr1[i-1]) {
        tempArr.push(arr1[i]);
    } else {
        arr1.splice(i, 1);
        
        i--;
    }
}

console.log(tempArr);