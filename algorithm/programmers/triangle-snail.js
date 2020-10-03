// https://programmers.co.kr/learn/courses/30/lessons/68645?language=javascript
function roomLength (n) {
  let roomLength = 0;
  
  for (let i = n; i >= 0; i--) {
    roomLength += i;
  }
  
  return roomLength;
}

function solution (n) {
  const rLen = roomLength(n);
  const answer = new Array(rLen);
  const floorIdx = rLen - n;
  
  let leftPos = 0;
  let rightPos = floorIdx - 1;
  
  let incStart = 1;
  let c = 1;
  
  // draw floor
  let inc = 0;
  for (let i = floorIdx; i < rLen; i++) {
    answer[i] = n + inc;
    inc++;
  }
  
  function searchR () {
    leftPos = answer.findIndex(r => !r);
    let idx = leftPos;
    
    while (idx < floorIdx) {
      answer[idx] = c++;
      console.log(answer);
      idx += incStart;
      
      incStart++;
      
      // floor 는 다른 곳에서 ...
      if (c === n) {
        c += n;
      }
    }
  }
  
  function searchL () {
    if (c > rLen) {
      return;
    }
    
    for(let i = floorIdx - 1; i > leftPos; i--) {
      if (!answer[i]) {
        rightPos = i;
        break;
      }
    }
    
    let idx = rightPos;
    
    while (idx > leftPos) {
      incStart--;
      
      answer[idx] = c++;
      console.log(answer);
  
      idx -= incStart;
      
    }
  }
  
  while (c <= rLen) {
    searchR();
    searchL();
    
    incStart++;
  }
  
  return answer;
}

// console.log(solution(4), 'shoud be', [1,2,9,3,10,8,4,5,6,7]);
// console.log(solution(5), 'shoud be', [1, 2, 12, 3, 13, 11, 4, 14, 15, 10, 5, 6, 7, 8, 9]);
console.log(solution(6), 'shoud be', [1,2,15,3,16,14,4,17,21,13,5,18,19,20,12,6,7,8,9,10,11]);