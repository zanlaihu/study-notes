function longestPalindrome(s) {
    if (s.length === 1) {
        return s;
    }

    longestStrArray = [];

    for (let i = 0; i < s.length - 1; i++) {
        expand(i, i);
        expand(i, i + 1);
    }

    function expand(left, right) {
        while (s[left] === s[right] && left > 0 && right < s.length - 1) {
            left = left - 1;
            right = right + 1;
        }
        let longestStr = '';
        if (left === right) {
            longestStr = s.substring(left);
        } else {
            longestStr = s.substring(left, right);
        }

        longestStrArray.push(longestStr);
    }

    console.log(longestStrArray);
}

longestPalindrome('babad');