/**
 * 给定字符串和行数，排列成Z字形
 *
 * https://leetcode-cn.com/problems/zigzag-conversion/
 */

function convert(s, numRows) {
    let matrix = [];
    for (let i = 0; i < numRows; i++) {
      matrix.push([]);
    }
  
    let count = 0;
    let flag = 1;
    let col = 0;
  
    while (count < s.length) {
      if (flag === 1) {
        for (let i = 0; i < numRows; i++) {
          matrix[i][col] = s[count];
          count++;
        }
        col++;
        flag = flag - 2;
      } else if (flag === -1) {
        for (let i = numRows - 2; i > 0; i--) {
          matrix[i][col] = s[count];
          count++;
          col++;
        }
        flag = flag + 2;
      }
    }
  
    newStr = "";
    for (const i of matrix) {
      for (const j of i) {
        if (j) {
          newStr += j;
        }
      }
    }
    
    return newStr;
}


console.log(convert("PAYPALISHIRING", 3));
