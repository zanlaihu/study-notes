// 冒泡排序
// 快速排序 O(log n)
function quickSort(list){
    if (list.length <= 1){
        return list;
    }
    var pivotIndex = Math.floor(list.length / 2);
    var pivot = list.splice(pivotIndex, 1)[0]
    var left = [];
    var right = [];

    for (var i = 0; i <list.length; i++){
        if (list[i]<pivot){
            left.push(list[i]);
        } else {
            right.push(list[i]);
        }
    }
    return quickSort(left).concat([pivot],quickSort(right));
}

var list = [1,2,6,4,3,7,9,6,4,2,5,7];
console.log(quickSort(list));
// 插入排序
// 二分查找
// 选择排序
// 希尔排序
// 归并排序
// 堆排序
// 计数排序
// 桶排序
// 基数排序