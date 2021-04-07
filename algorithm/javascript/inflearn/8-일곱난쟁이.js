function solution(arr) {
  let i, j;
  let answer = arr;
  let sum = answer.reduce((acc, cur) => acc + cur);
  
  for(i = 0; i < answer.length; i++) {
    for(j = i + 1; j < answer.length; j++) {
      if (sum - (answer[i] + answer[j]) === 100) {
        answer.splice(j, 1);
        answer.splice(i, 1);
      }
    }
  }
  
  return answer;
}

let arr = [20, 7, 23, 19, 10, 15, 25, 8, 13];
console.log(solution(arr));

// 삭제는 splice
// splice 두개 하는 경우 index 달라질 수 있으니
// 뒤에꺼 먼저지우고 앞에꺼 지우기(j 지우고 i 지움)