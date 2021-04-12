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