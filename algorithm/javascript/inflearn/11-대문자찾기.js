function solution(str) {
    let count = 0;
    for(let i = 0, len = str.length; i < len; i++) {
      if (str[i] === str[i].toUpperCase()) count++;
    }
    
    return count;
}

console.log(solution('KoreaTimeGood'));

// toUpperCase 비교해주면 바로 됐네.. 헉
// ASCII 코드로도 찾을 수 있다. str.charCodeAt() 사용하면 찾을 수 있음.