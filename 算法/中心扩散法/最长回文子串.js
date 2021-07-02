function longestPalindrome(s) {
  if (s.length === 1) {
    return s;
  }

  let longestStr = "";
  for (let i = 0; i < s.length - 1; i++) {
    expand(i, i);
    if (s[i] === s[i + 1]) {
      expand(i, i + 1);
    }
  }

  function expand(left, right) {
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
