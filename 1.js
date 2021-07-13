function threeSumCloest(nums, target) {
  let cloestNum;

  sortArray = nums.sort((a, b) => a - b);

  for (let i = 0; i < sortArray.length - 2; i++) {
    left = i + 1;
    right = sortArray.length - 1;

    while (left < right) {
      trySum = sortArray[i] + sortArray[left] + sortArray[right];
      diff = target - trySum;
      if (cloestNum === undefined) {
        cloestNum = trySum;
      }
      if (Math.abs(target - cloestNum) > Math.abs(diff)) {
        cloestNum = trySum;
      }
      if (target > trySum) {
        left = left + 1;
      } else if (target < trySum) {
        right = right - 1;
      } else if (target === trySum) {
        break;
      }
    }
  }

  return cloestNum;
}

console.log(threeSumCloest([0, 2, 1, -3], 1));
