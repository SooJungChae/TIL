https://leetcode.com/problems/longest-substring-without-repeating-characters/

```js
// Runtime: 72 ms
// Memory Usage: 44.8 MB

/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
    let len = 0;
    let idx, char;
    let longest = [];
    
    for (let i = 0; i < s.length; i++) {
        char = s[i];
        idx = longest.indexOf(char);
        
        if (idx !== -1) {
            if (idx === 0) longest.shift();
            else {
                longest = longest.slice(idx + 1);
                longest.push(char);
                continue;
            }
        }
        
        longest.push(char);
        
        if (longest.length > len) len = longest.length;
    }

    return len;
};
```

reduce 를 사용하기도 하는군

근데 돌려보니 runtime 이 2배정도 더 걸린다. 

```js
// Runtime: 133 ms
// Memory Usage: 48.4 MB

function lengthOfLongestSubstring(s) {
    const map = {};
    var left = 0;
    
    return s.split('').reduce((max, v, i) => {
        left = map[v] >= left ? map[v] + 1 : left;
        map[v] = i;
        return Math.max(max, i - left + 1);
    }, 0);
}
```
