function longestPalindrome(str){
    for (let i = 0; i<str.length;i++){
        originStr = str[i];
        for (let j = i + 1;j<Math.min((str.length-1-i),(i));j++){
            if (str[j] === str[i-(j-i)]){
                continue;
            }
        }
    }
}