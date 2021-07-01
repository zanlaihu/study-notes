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
    if(str === ""){
        return 0;
    } else if(str === " "){
        return 1;
    } else if (str.length === 1){
        return 1;
    }
    let longestArray = [];

    for (i = 0; i < str.length; i++) {
        let validateSet = new Set(str[i]);

        for (j = i+1;j<str.length;j++){
            if(!isMultipled(validateSet,str[j])){
                validateSet.add(str[j]);
                longestArray.push(validateSet.size);
            } else {
                longestArray.push(validateSet.size);
                break;
            }
        }
    }
    longestArray.sort((a,b)=>a-b);
    return longestArray[longestArray.length-1];
}



console.log(findLongest("au"));