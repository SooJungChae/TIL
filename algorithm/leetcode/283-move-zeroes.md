https://leetcode.com/problems/move-zeroes/submissions/

```js
// Runtime: 88 ms, faster than 98.78% of JavaScript online submissions for Move Zeroes.
// Memory Usage: 47.5 MB, less than 5.11% of JavaScript online submissions for Move Zeroes.

/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function(nums) {
    let s = 0;
    let e = s + 1;
    
    while(e < nums.length) {
        if (nums[s] === 0) {
            if (nums[e] === 0) e++;
            else {    
                nums[s] = nums[e];
                nums[e] = 0;
                s++;
                e++;
            }
        } else {
            s++;
            e++;
        }
    }
};
```

아...? 속도가 왔다갔다 한다. 하지만 98%를 봤기 때문에 만족!!!
