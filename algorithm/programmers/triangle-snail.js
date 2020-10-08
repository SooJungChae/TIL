// https://programmers.co.kr/learn/courses/30/lessons/68645?language=javascript
function roomLength (n) {
  let roomLength = 0;
  
  for (let i = n; i >= 0; i--) {
    roomLength += i;
  }
  
  return roomLength;
}

function getFloorIndexes(n) {
  const result = [];
  
  let index = 0;
  for (let i = 0; i < n; i++) {
    index += i;
    result.push(index);
  }
  
  return result;
}

function solution (n) {
  const rLen = roomLength(n);
  const answer = new Array(rLen);
  
  let c = 0;
  let num = 1;
  let idx = 0;
  let lastIdx = idx;
  
  let startFloorIndex = 0;
  let endFloorIndex = n - 1;
  
  let writeStartIndex = 0;
  let writeEndIndex = n - 1;
  
  const floorIndexes = getFloorIndexes(n);
  
  // searchR();
  // searchL();
  
  while (num <= rLen) {
    searchD();
    searchR();
    searchU();
  }
  
  function searchD() {
    if (num > rLen) {
      return;
    }
    
    c++;
    
    while (idx < rLen && !answer[idx]) {
      answer[idx] = num++;
      lastIdx = idx;
      idx += c++;
    }
    
    idx = lastIdx + 1;
  }
  
  function searchR () {
    if (num > rLen) {
      return;
    }
  
    while (idx < rLen && !answer[idx]) {
      answer[idx] = num++;
      lastIdx = idx;
      idx++;
    }
  
    // idx = lastIdx;
  }
  
  function searchU () {
    if (num > rLen) {
      return;
    }
  
    idx -= c--;
    
    while (idx > 0 && !answer[idx]) {
      answer[idx] = num++;
      lastIdx = idx;
      c--;
      idx -= c;
    }
  }
}

// console.log(solution(4), 'shoud be', [1,2,9,3,10,8,4,5,6,7]);
console.log(solution(5), 'shoud be', [1, 2, 12, 3, 13, 11, 4, 14, 15, 10, 5, 6, 7, 8, 9]);
// console.log(solution(6), 'shoud be', [1,2,15,3,16,14,4,17,21,13,5,18,19,20,12,6,7,8,9,10,11]);