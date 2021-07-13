/**
 * 删除或替换现有元素或添加新的元素，是一种非常灵活的用来处理数组的方法。
 *
 * @return 作用于原数组
 */

const months = ['Jan', 'March', 'April', 'June'];

months.splice(1, 0, 'Feb');
// inserts at index 1
// 结果: Array ["Jan", "Feb", "March", "April", "June"]

months.splice(4, 1, 'May');
// replaces 1 element at index 4
// 结果: Array ["Jan", "Feb", "March", "April", "May"]

months.splice(1, 0);
 // 可选的删除第 1 位的元素
 // 结果: Array ["Jan", "April", "May"]