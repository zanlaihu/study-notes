/**
 * 找到数列中和为0的不重复的三个数
 * 
 * 双指针法+排序+一次循环
 *
 * https://leetcode-cn.com/problems/3sum/
 */
function findSumOfThree(nums, target) {
  targetArray = [];
  sortNums = nums.sort((a, b) => a - b);
  for (let i = 0; i < nums.length - 2; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) {
      continue;
    }
    left = i + 1;
    right = nums.length - 1;
    while (left < right) {
      if (nums[i] + nums[left] + nums[right] === target) {
        targetArray.push([nums[i], nums[left], nums[right]]);
        left++;
        while (nums[left] === nums[left - 1]) {
          left++;
        }
      } else if (nums[i] + nums[left] + nums[right] < target) {
        left++;
        while (nums[left] === nums[left - 1]) {
          left++;
        }
      } else if (nums[i] + nums[left] + nums[right] > target) {
        right--;
        while (nums[right] === nums[right + 1]) {
          right--;
        }
      }
    }
  }

  return targetArray;
}

console.log(findSumOfThree([0, 0, 0], 0));
