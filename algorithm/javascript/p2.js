function searchN(word, n) {
  const exactN = new RegExp(`1{${n}}`, 'g');
  const moreThanN = new RegExp(`1{${n + 1}}`, 'g');
  
  return (word.slice().replace(moreThanN, '').match(exactN) || []).length;
}

function solution(h, w, n, board) {
  var answer = 0;
  
  function searchW() {
    let total = 0;
  
    board.forEach(b => {
      total += searchN(b, n);
    });
  
    return total;
  }
  
  function searchH() {
    let hCount = 0;
    
    for(let wIdx = 0; wIdx < w; wIdx++) {
      let lineWord = "";
      
      for(let hIdx = 0; hIdx < h; hIdx++) {
        lineWord += board[hIdx][wIdx];
      }
  
      hCount += searchN(lineWord, n);
    }
    
    return hCount;
  }
  
  function searchRD() {
    // console.log(n, h);
    for(let wIdx = (n-1); wIdx >= 0; wIdx--) {
      // console.log(wIdx);
      for(let hIdx = 0; hIdx <= n - 1; hIdx++) {
        console.log(wIdx, hIdx);
      }
    }
    
  }
  
  answer += searchW();
  answer += searchH();
  answer += searchRD();
  
  // console.log(answer);
  return answer;
}

solution(	7, 9, 4, ["111100000", "000010011", "111100011", "111110011", "111100011", "111100010", "111100000"]);