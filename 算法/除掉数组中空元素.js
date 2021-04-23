var array = ['123', 'app', '200', 500, '', 700, '', '123', 'okf', ''];

var i;
for (i = 0; i < array.length; i++) {
    if (array[i] == '') {
        array.splice(i, 1);
        i--;
    }
}

console.log(array);