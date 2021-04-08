// 100 이하의 자연수 A, B, C 를 입력받아 세 수 중 가장 작은 값을 출력하는 프로그램.

function solution(arr) {
  let min = 100;
  
  arr.forEach(num => {
    if (num < min) {
      min = num;
    }
  })
  
  return min;
}

console.log(solution([6, 5, 11]));

// 답은 일일이 구하던데
// 이 문제는 내 방식이 더 나은 듯.