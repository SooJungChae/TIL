function solution(arr) {
  let max = 0;
  const total = arr.reduce((acc, cur) => {
    if (cur > max) {
      max = cur;
    }
    
    return acc + cur;
  });
  
  // 나머지 길이가 더 길어야 삼각형이 만들어진다.
  return (total - max) > max ? 'YES' : 'NO';
}

console.log(solution([6, 7, 11]));
console.log(solution([13, 33, 17]));