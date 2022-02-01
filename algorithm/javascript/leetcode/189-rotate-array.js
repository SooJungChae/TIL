// time limit exceeded
var rotate = function(nums, k) {
  for (let i = 0; i < k; i++) {
    nums.unshift(nums.pop());
  }

  return nums;
};


// Java solution
// TODO: reverse 구문 보소..
class Solution {
  public void rotate(int[] nums, int k) {
  k = k % nums.length;
  // If k is greater than the length of the array, we will ignore the extra rotations by using modulo.
  // Suppose our array size is 3 and k=5. It simply means 5%3 =2 rotations are required.
  
  reverse(nums,0,nums.length-1);
  reverse(nums,0,k-1);
  reverse(nums,k,nums.length-1);
  
}

public void reverse(int[] arr,int start, int end){
  while(start<end){
    int temp=arr[start];
    arr[start]=arr[end];
    arr[end]=temp;
    start++;
    end--;
  }
}
}
