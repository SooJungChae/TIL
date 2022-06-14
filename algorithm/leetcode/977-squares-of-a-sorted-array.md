https://leetcode.com/problems/squares-of-a-sorted-array/submissions/

```js
// Runtime: 166 ms, faster than 43.84% of JavaScript online submissions for Squares of a Sorted Array.
// Memory Usage: 49.2 MB, less than 5.26% of JavaScript online submissions for Squares of a Sorted Array.

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortedSquares = function(nums) {
    let result = [];
    let l = 0, r = nums.length - 1;
    
    for (let i = nums.length - 1; i >= 0; i--) {
        
        if (Math.abs(nums[l]) < Math.abs(nums[r])) {
            result[i] = nums[r] * nums[r];
            r--;
        } else if (Math.abs(nums[l]) > Math.abs(nums[r])) {
            result[i] = nums[l] * nums[l];
            l++;
        } else {
            result[i] = nums[l] * nums[l];
            l++;
        }
    }
    
    return result;
};
```

효율성을 높여보기 위해 다른 코드를 참고해보니 다음 특징을 발견했다.

```js
var sortedSquares = function(nums) {
    // use two pointers
    // create a new array
    const result = new Array(nums.length);
    let left = 0, 
        right = nums.length - 1;
    
	// don't want to rearrange the array, so iterating the array in descending order 
    for (let i = nums.length - 1; i >= 0; i--) {
        if (Math.abs(nums[left]) < Math.abs(nums[right])) {
            result[i] = nums[right] ** 2
            right--;
        } else {
            result[i] = nums[left] ** 2
            left++;
        }
    }
    
    return result;
};
```

- 배열의 길이를 정했더니 Runtime 시간이 25% 줄었다.

그런데 이때의 효율성이 99% 가 아닌걸 보고 더 효율성이 높은 답안을 찾아봤더니
내장객체를 사용하고 있었다.

Two pointer 를 사용해보려고 했던 문제였지만 
필요하다면 내장객체를 사용하는 게 좋을 것 같다.

```js
// Runtime: 108 ms, faster than 93.76% of JavaScript online submissions for Squares of a Sorted Array.
// Memory Usage: 48.7 MB, less than 7.61% of JavaScript online submissions for Squares of a Sorted Array.

return nums.map((num) => num * num).sort((a,b)=> a-b);
```

- 내장객체를 사용하자. 
