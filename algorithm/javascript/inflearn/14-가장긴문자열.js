function solution(len, arr) {
    let longest = '';
    
    arr.forEach(word => {
      if (word.length > longest.length) {
        longest = word;
      }
    });
    
    return longest;
}

console.log(solution(5, ['teacher', 'time', "student", "beautiful", "good"]));