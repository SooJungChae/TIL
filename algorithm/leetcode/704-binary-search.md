https://leetcode.com/problems/binary-search/

```js
// Runtime: 64 ms, faster than 99.36% of JavaScript online submissions for Binary Search.
// Memory Usage: 45.2 MB, less than 5.07% of JavaScript online submissions for Binary Search.

var search = function(nums, target) {
  let result = -1;
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    let pivot = Math.floor((left + right) / 2);

    if (target < nums[pivot]) {
      right = pivot - 1;
    } else if (target > nums[pivot]) {
      left = pivot + 1;
    } else {
      result = pivot;
      break;
    }
  }

  return result;
};
```

```js
// Runtime: 80 ms, faster than 74.67% of JavaScript online submissions for Binary Search.
// Memory Usage: 45.6 MB, less than 5.07% of JavaScript online submissions for Binary Search.

var search = function(nums, target) {
    let l = 0, r = nums.length - 1, m = 0;
    let result = -1;
    
    while (l <= r) {
        
        m = Math.floor((l + r) / 2);
        
        if (target < nums[m])  r = m - 1;
        else if (target > nums[m]) l = m + 1;
        else if (target === nums[m]) {
            result = m;
            break;
        }
    }
    
    return result;
};
```

---

- left, right 할 때 -1, +1 해주기
- 왜 첫번재 코드가 더 빠른지 이해가 안간다 ... 
