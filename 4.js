function findGood(arr) {
  result = {};
  for (let i = 0; i < arr.length; i++) {
    if (result.hasOwnProperty(arr[i])) {
      let value = result[arr[i]];
      result[arr[i]] = value + 1;
    } else {
      result[arr[i]] = 1;
    }
  }

  correctArr = [];
  Object.keys(result).forEach((item) => {
    if (parseInt(item) === result[item]) {
      correctArr.push(parseInt(item));
    }
  });

  correctArr.sort((a, b) => a - b);

  if (correctArr.length === 0) {
    return -1;
  }

  return correctArr[correctArr.length - 1];
}

console.log(findGood([2, 2, 2, 3, 3]));
