/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrder = function(root) {
    const que = [];
    const result = [];
    let pointer = 0;

    function traverse(root) {
        const result = [];

        if (root.left) traverse(root.left);

        if (root.val) result.push(root.val);

        if (root.right) traverse(root.right);
    }

    // add que (root)

    while(true) {
        // add que at root (left, right)
        // add root to answer
        // que index++;

        // read que until end

        
    }
    // 
    que.push(root.val);
    answer.push(que[pointer]);

    que.push(que[0].left);
    que.push(que[0].right);
    answer.push(que[pointer + 1]);

    que.push(root.left);
    que.push(root.right);

    // loop answer 



    traverse(root);
};