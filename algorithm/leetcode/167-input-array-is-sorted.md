아직 못풀음!!!

https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/

```js
/**
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(numbers, target) {
    let s = 0;
    let e = s + 1;
    let total = null;
    // let count = 0;
    
    while(s < numbers.length - 1) {
        // count++;
        
        total = numbers[s] + numbers[e];
        // console.log(s, e, total, target, total === target);
        
        if (total === target) return [s + 1, e + 1];
        
        if (total < target) {
            if (e === numbers.length - 1) {
                s++;
                e = s + 1;
            }
            else e++;
        }
        else if (total > target) {
            s++;
            e = s + 1;
        }
    }
};
```
