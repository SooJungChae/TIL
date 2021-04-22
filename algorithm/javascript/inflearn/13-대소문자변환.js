function solution(str) {
  let result = '';
    for (let i = 0, len = str.length; i < len; i++) {
      const char = str[i];
        result += (char.toUpperCase() === char) ? char.toLowerCase() : char.toUpperCase();
    }
    
    return result;
}

console.log(solution('StuDY'));