https://leetcode.com/problems/binary-search/

```js
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

---

- left, right 할 때 -1, +1 해주기
