- https://leetcode.com/problems/search-insert-position/

```js
// Runtime: 133 ms, faster than 8.01% of JavaScript online submissions for Search Insert Position.
// Memory Usage: 44 MB, less than 5.17% of JavaScript online submissions for Search Insert Position.

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var searchInsert = function(nums, target) {
    let l = 0;
    let r = nums.length - 1;
    let m = null;
    
    while(l <= r) {
        m = Math.floor((r + l) / 2);
        
        if (target < nums[m]) r = m - 1;
        else if (target > nums[m]) l = m + 1;
        else return m;
    }
    
    return l;
};
```

효율이 안나와서 다른 solution 을 찾아봤다.

```js
// Runtime: 56 ms, faster than 99.80% of JavaScript online submissions for Search Insert Position.
// Memory Usage: 42.1 MB, less than 5.17% of JavaScript online submissions for Search Insert Position.
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
function searchInsert(nums, target) {
    return binarySearch(nums, target, 0, nums.length - 1);
};


function binarySearch(array, target, start, end) {
	 // If the target is less then the very last item then insert it at that item index
	 // because anything index less then that has already been confirmed to be less then the target.
	 // Otherwise insert it at that item index + 1
	 // because any index grater then that has already been confirmed to be greater then the target
    if (start > end) return start;
    
    const midPoint = Math.floor((start + end)/2);
    
	// found target
    if (array[midPoint] === target) return midPoint;
    
	// search the left side
    if (array[midPoint] > target) return binarySearch(array, target, start, midPoint - 1);
    // search the right side
    if (array[midPoint] < target) return binarySearch(array, target, midPoint + 1, end);
}
```

별로 차이가 없다고 생각했는데, 
정답을 찾았을 때 while 구문을 먼저 리턴해줬더니 Runtime 속도가 훨씬 빨라졌다.

```js
// Runtime: 64 ms, faster than 97.32% of JavaScript online submissions for Search Insert Position.
// Memory Usage: 42.9 MB, less than 5.17% of JavaScript online submissions for Search Insert Position.
var searchInsert = function(nums, target) {
    let l = 0;
    let r = nums.length - 1;
    let m = null;
    
    while(l <= r) {
        m = Math.floor((r + l) / 2);
        
        // Point ! return found index
        if (target === nums[m]) return m;
        
        if (target < nums[m]) r = m - 1;
        else if (target > nums[m]) l = m + 1;
    }
    
    return l;
};
```

- 정답을 찾은 경우 먼저 return 시키자.
