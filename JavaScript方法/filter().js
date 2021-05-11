var data = [
    { userId: 8, title: 'title1' },
    { userId: 11, title: 'other' },
    { userId: 15, title: null },
    { userId: 19, title: 'title2' }
];

obj = {
    // 匹配结尾为数字的字符串
    title: /\d$/,
};

var data2 = [];
for (let key in obj) {
    for (var i = 0;i<data.length;i++)
    {
        console.log(data[i]);
        if (obj[key].test(data[i][key])){
            data2.push(data[i]);
        }
    }
}

console.log(data2);