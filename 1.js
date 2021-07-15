/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function (digits) {
  if (digits.length === 0) {
    return [];
  }

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

  function dfs(tmp, index) {
    if (index === digits.length) {
      list.push(tmp);
      return;
    }

    const letters = map[digits[index]];
    for (const letter of letters) {
      dfs(tmp + letter, index + 1);
    }
  }

  dfs("", 0);

  return list;
};

letterCombinations("234");
