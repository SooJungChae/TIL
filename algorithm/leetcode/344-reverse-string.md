https://leetcode.com/problems/reverse-string/submissions/

```js
// Runtime: 92 ms, faster than 97.37% of JavaScript online submissions for Reverse String.
// Memory Usage: 49.4 MB, less than 12.27% of JavaScript online submissions for Reverse String.
/**
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 */
var reverseString = function(s) {
    let start = 0;
    let end = s.length - 1;
    let temp;
    
    while (start <= end) {
        if (start === end) break;
        
        temp = s[start];
        
        s[start] = s[end]; 
        s[end] = temp;
        
        start++;
        end--;
   }
    
    return s;
};
```
