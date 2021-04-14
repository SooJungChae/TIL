function solution(str) {
    return str.split('').reduce((acc, cur) => {
      if (cur === 'A') {
        return acc + '#';
      }
      return acc + cur;
    });
}

console.log(solution('BANANA'));

// replace() 정규식 사용해도 된다. replace(/A/g, '#');
// string 은 주소값이 아니라 '값' 이 복사된다.