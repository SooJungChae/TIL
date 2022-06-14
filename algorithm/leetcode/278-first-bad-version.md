## Binary search 
- https://leetcode.com/problems/first-bad-version/

```js
/**
 * Definition for isBadVersion()
 * 
 * @param {integer} version number
 * @return {boolean} whether the version is bad
 * isBadVersion = function(version) {
 *     ...
 * };
 */

/**
 * @param {function} isBadVersion()
 * @return {function}
 */
var solution = function(isBadVersion) {
    /**
     * @param {integer} n Total versions
     * @return {integer} The first bad version
     */
    return function(n) {
        let left = 1;
        let right = n;
        let pivot = null;
        let result = null;
        
        while(left <= right) {
            pivot = Math.floor((left + right) / 2);
            
            if (!isBadVersion(pivot)) {
                // find next bad version
                left = pivot + 1;
            } else {
                result = pivot;
                right = pivot - 1;
            }
        }
        
        return result;
    };
};
```

다음은 Easy / Fast / Simple / 95.03%  / 64 ms / 38.5 MB 결과물.

```js
var solution = function(isBadVersion) {
    return function(n) {
        let l = 1, r = n
        while (l < r) {
            const m = Math.floor((r + l) / 2)
            if (!isBadVersion(m)) l = m + 1
            else r = m
        }
        
        return l
    };
};
```

- `l, r, m` 만 사용해도 이해하기 쉽다. 훨씬 단순해진다.
- result 변수를 만들 필요없이 사용한 변수로 리턴해보자.
- 704 문제와 다르게 한쪽만 증가하는 식이 더 간결해보인다.
