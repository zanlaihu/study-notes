var arr1 = arr.sort(function(a, b) {
    return a-b;
})
var tempArr = [];
tempArr.push(arr1[0], arr[1])
for(var i=2; i<arr1.length;i++) {
    if(arr1[i] == arr1[i-2] + arr1[i-1]) {
        tempArr.push(arr1[i])
    } else {
        arr1.splice(i, 1)
        arr1 = arr1
        i--;
    }
}
return tempArr;