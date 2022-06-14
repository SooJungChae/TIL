https://leetcode.com/problems/middle-of-the-linked-list/

안풀려서 .. python 으로 구현한 해답을봤는데 너무 단순했던 문제였다.

- 알고리즘을 찾으려고 좀 더 고민하기!
- two pointers 를 slow, fast 변수로 사용한게 좋았음!
 
```js
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var middleNode = function(head) {
    let slow = fast = head;
    
    while(fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
    }
    
    return slow;
};
```
