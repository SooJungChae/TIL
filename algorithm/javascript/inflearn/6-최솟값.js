function solution(arr) {
    let min = Number.MAX_SAFE_INTEGER;

    arr.forEach(n => {
        if (n < min) {
            min = n;
        }
    });

    return min;
}

console.log(solution([5, 3, 7, 11, 2, 15, 17]));

// for 문 쓸 땐 arr[0] 으로 바로 접근할 수도 있고,
// 처음부터 돌고싶다면 Number.MAX_SAFE_INTEGER 쓰면 된다.

// 최소, 최댓값 구하는 내장함수가 있다.
// Math.min(...arr) / Math.max(...arr)

// 전개연산자 안쓰려면
// Math.min.apply(null, arr) / Math.max.apply(null, arr)