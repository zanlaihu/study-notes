/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function (digits) {
  const numToWords = {
    2: "abc",
    3: "def",
    4: "ghi",
    5: "jkl",
    6: "mno",
    7: "pqrs",
    8: "tuv",
    9: "wxyz",
  };

  list = [];
  while (digits.length > 0) {
    list.push(digits.pop());
  }

  console.log(list);
};

letterCombinations("234");
