/**
 * 给定一个字符串，找到不含有重复字符的最长子串。
 */

function isMultipled(set, newValue) {
    if (set.has(newValue)) {
        return true;
    } else {
        return false;
    }
}

function findLongest(str) {
    let longestArray = [];

    for (i = 0; i < str.length; i++) {
        let right = i + 1;
        let validateSet = new Set(str[i]);

        if (!isMultipled(validateSet, right)) {
            validateSet.add(str[right]);
        } else {
            break
        }
    }
}


findLongest('abcabcbb');

