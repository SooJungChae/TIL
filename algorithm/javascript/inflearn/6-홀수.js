function solution(arr) {
  // 고른 홀수들 중 최솟값 찾기
  let min = Number.MAX_SAFE_INTEGER;
  
  // 홀수를 골라서 합 구하기
  const sum = arr.reduce((acc, cur) => {
    // 홀수
    if (cur % 2 !== 0) {
      if (cur < min) {
        min = cur;
      }
      return acc + cur;
    }
    return acc;
  }, 0);
  
  return [sum, min];
}

console.log(solution([12, 77, 38, 41, 53, 92, 85]));