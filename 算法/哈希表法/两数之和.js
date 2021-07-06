/**
 * 使用时间复杂度小于O(n^2)的办法，找到两数，它们和为目标值
 *
 * @param {*} nums
 * @param {*} target
 * @return {*}
 */
function findSum(nums, target) {
  let hash = [];
  for (let i = 0; i < nums.length; i++) {
    //检查当前值是否是谁的期望值，非空说明是
    if (hash[nums[i]] != null) {
      // 返回想要这个期望值的值的索引，和当前值的索引
      return [hash[nums[i]], i];
    } else {
      // 当前值所期望的值，和当前值的索引
      hash[target - nums[i]] = i;
    }
  }
  return [];
}

console.log(findSum([2, 7, 11, 15], 13));
