// str 안에 char 가 몇개 존재하는지 찾기
function solution (str, char) {
  let cnt = 0;
  for (let i = 0, len = str.length; i < len; i++) {
    if (str[i] === char) cnt++;
  }
  return cnt;
}

function solution2 (str, char) {
  return str.split(char).length - 1;
}

console.log(solution('COMPUTERPROGRAMMING', 'R'));
console.log(solution2('COMPUTERPROGRAMMING', 'R'));