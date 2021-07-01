/**
 * 给定一个字符串，找到不含有重复字符的最长子串。
 */
const str = 'asasdfasdasdfasfasf';

function isMultipled(str, newValue){
    let validateSet = new Set(str);
    if (validateSet.has(newValue)){
        return true;
    } else {
        return false;
    }
}

function findLongest(str){
    let left = 0;
    let right = 1;
    for (let i = right; i < str.length; i++){
        validateStr = str.substring(left, right);
        if (isMultipled(validateSet, validateSet[validateSet.length-1])){
            
        }
    }
}