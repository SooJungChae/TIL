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

위에꺼로는 못풀었음.

그래서 새롭게 접근해봤다. 

"정렬된 배열" 이라는 것에 힌트를 얻어 맨 앞과 맨뒤를 더한 값을 
target 과 비교하는 방식으로 했다. 훨씬 간결해졌다.
 
```js
// Runtime: 95 ms, faster than 53.11% of JavaScript online submissions for Two Sum II - Input Array Is Sorted.
// Memory Usage: 42.7 MB, less than 6.20% of JavaScript online submissions for Two Sum II - Input Array Is Sorted.

/**
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(numbers, target) {
    let s = 0;
    let e = numbers.length - 1;
    let total = null;
    
    while(total !== target) {
        total = numbers[s] + numbers[e];
        
        if (total < target) s++;
        else if (total > target) e--;
    }
    
    return [s + 1, e + 1];
};
```
