```js
// Runtime: 145 ms
// Memory Usage: 50 MB
/**
 * @param {string} s
 * @return {string}
 */
var reverseWords = function(s) {
    const sLength = s.length;
    let start = 0;
    let end = start + 1;
    let result = '';
    
    let reverseWord = (start, end) => {
        if (start === end) {
            result += s[start];
            return;
        }
        
        for (let i = end; i >= start; i--) {
            result += s[i];
        }
    }
    
    while(true) {
        if (s[end] === " ") {
            reverseWord(start, end - 1);
            result += s[end];
            
            start = end + 1;
            end = start + 1;
            continue;
        }
        
        if (s[end] === undefined) {
            reverseWord(start, end - 1);
            break;
        }
        
        end++;
    }
    
    return result;
};
```

이건 built-in 문법을 쓰는게 더 좋은 것 같다.

```js
// Runtime: 115 ms
// Memory Usage: 48 MB

var reverseWords = function(s) {
    return s.split(' ').map(word => word.split('').reverse().join('')).join(' ');
};
```

단순하고 빠르다. while 로 구현한것에 의의를 두기로.
