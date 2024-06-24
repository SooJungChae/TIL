// 의문) 왜 sortedSquares01 가 sortedSquares 보다 빠를까?

// Runtime: 134 ms, faster than 50.76% of JavaScript online submissions for Squares of a Sorted Array.
// Memory Usage: 45.9 MB, less than 40.77% of JavaScript online submissions for Squares of a Sorted Array.
// @param {number[]} nums
//  @return {number[]}

var sortedSquares = function(nums) {
  return nums.map(n => n * n).sort((a, b) => a - b);
};

/*
 * Runtime: 108 ms, faster than 91.93% of JavaScript online submissions for Squares of a Sorted Array.
 * Memory Usage: 45.8 MB, less than 70.22% of JavaScript online submissions for Squares of a Sorted Array.
 * @param {number[]} nums
 * @return {number[]}
 */

var sortedSquares01 = function(nums) {
  for (let i = 0; i < nums.length; i++) {
    nums[i] = nums[i] * nums[i];
  }
  return nums.sort((a, b) => {
    return a - b;
  });
};
