// 请实现find函数，使下列的代码调用正确。
// 约定：
// title数据类型为String
// userId为主键，数据类型为Number
var data = [
    { userId: 8, title: 'title1' },
    { userId: 11, title: 'other' },
    { userId: 15, title: null },
    { userId: 19, title: 'title2' }
];

// 下方调用find.where，说明要将find直接定义成一个对象，且属性包含两个函数where和orderBy。
var find = function (origin) {
    // 直接将一个对象return给find。这样find就可以调用本对象内的属性方法。
    return {
        data: origin,
        where: function (obj) {
            var data2 = [];
            for (let key in obj) {
                for (var i = 0; i < data.length; i++) {
                    if (obj[key].test(data[i][key])) {
                        data2.push(data[i]);
                    }
                }
            }
            return find(data2)
        },
        orderBy: function (key, order) {
            this.data.sort(function (a, b) {
                if (order == 'desc') {
                    return b[key] - a[key]
                } else {
                    return a[key] - b[key]
                }
            })
            return this.data
        }
    }
}

// 查找 data 中，符合条件的数据，并进行排序
var result = find(data).where({
    'title': /\d$/
}).orderBy('userId', 'desc');
console.log(result);// [{ userId: 19, title: 'title2'}, { userId: 8, title: 'title1' }];