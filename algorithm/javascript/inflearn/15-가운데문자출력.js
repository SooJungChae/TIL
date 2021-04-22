function solution(str) {
    const idx = Math.floor(str.length / 2);
    let center = '';
    
    if (str.length === 1 || str.length === 2) return str;
    
    if (str.length % 2 === 0) {
      // 짝수인 경우 가운데 2개문자 출력
      center += str[idx - 1];
      center += str[idx];
    } else {
      // 홀수인 경우 몫 그대로 출력
      center = str[idx];
    }
    
    return center;
}

// a -> a -> 0 (0)
// ab -> ab -> 1 (0, 1)
// abc -> b -> 1 (1)
// abcd -> bc -> 2 (1,2)
// abcdef -> cd -> 3 (2, 3)

console.log(solution('study'));
console.log(solution('good'));