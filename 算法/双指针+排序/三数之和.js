/**
 * 找到数列中和为0的不重复的三个数
 *
 */

function findSumOfThree(nums, target) {
  sortNums = nums.sort((a, b) => a - b);

  for (let i = 0; i < nums.length - 1; i++) {
    left = i + 1;
    right = nums.length;
  }
}
