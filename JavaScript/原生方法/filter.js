var data = [
    { userId: 8, title: 'title1' },
    { userId: 11, title: 'other' },
    { userId: 15, title: null },
    { userId: 19, title: 'title2' }
];

obj = {
    title: /\d$/,
};


for (let key in obj) {
    console.log(key);

    data.forEach(function (v) {
        console.log(obj[key]);
        console.log(v[key]);
        return obj[key].test(v[key]);
    });
}

console.log(data);

