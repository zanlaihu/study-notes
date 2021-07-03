/**
 * 找到最长的回文子串。回文就是中心对称的字符串
 *
 * 例如：输入"babad" 得到 "bab"。
 * 例如：输入"cbbd" 得到 "bb"。
 * 例如：输入"ac" 得到 "a"。
 * 例如：输入"a" 得到 "a"。
 */

function longestPalindrome(s) {
  // 判断极端条件
  if (s.length === 1) {
    return s;
  }

  // 定义相对全局的变量，用来存放结果
  let longestStr = "";
  for (let i = 0; i < s.length - 1; i++) {
    expand(i, i);
    if (s[i] === s[i + 1]) {
      expand(i, i + 1);
    }
  }

  function expand(left, right) {
    // 适当使用while
    while (s[left - 1] === s[right + 1] && left > 0 && right < s.length - 1) {
      left = left - 1;
      right = right + 1;
    }

    longestStrMight = s.substring(left, right + 1);
    if (longestStrMight.length > longestStr.length) {
      longestStr = longestStrMight;
    }
  }

  return longestStr;
}

console.log(longestPalindrome("ac"));
