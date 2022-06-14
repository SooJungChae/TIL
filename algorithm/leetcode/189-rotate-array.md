https://leetcode.com/problems/rotate-array/

```js
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var rotate = function(nums, k) {
  k %= nums.length;
  nums.unshift(...nums.splice(nums.length - k));
  return nums;
};
```

```js
var rotate = function(nums, k) {
    k = k > nums.length ?  (k % nums.length) : k;

    if(k >= nums.length) {
      while(k > 0) {
        nums.unshift(nums.pop());
        k--;
      }  
    } else {
        nums.unshift(...nums.splice(nums.length - k, nums.length));
    };
};
```
- `k > nums.length ?  (k % nums.length) : k`  이 부분이 포인트.
- nums 길이를 넘으면 결국 원점이기 때문에 % 를 사용해서 순회를 최소화한다.
- 이 구문은 없어도 통과한다. 왜 저 조건을 추가한지는 모르겠다...
```js
if(k >= nums.length) {
      while(k > 0) {
        nums.unshift(nums.pop());
        k--;
      }  
    }
```

