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
  
  let c = 1;
  let startFloorIndex = 0;
  let endFloorIndex = n - 1;
  
  let writeStartIndex = 0;
  let writeEndIndex = n - 1;
  
  const floorIndexes = getFloorIndexes(n);
  
  // searchR();
  // searchL();
  
  while (c <= rLen) {
    searchR();
    searchL();
  }
  
  console.log(answer);
  
  function searchR () {
    for(let i = startFloorIndex; i <= endFloorIndex; i++) {
      answer[floorIndexes[i] + writeStartIndex] = c++;
  
      // draw floor
      if (i === endFloorIndex) {
        for (let inc = 1; inc < n; inc++) {
          answer[floorIndexes[i] + inc] = c++;
          console.log(answer);
        }
        
        endFloorIndex--;
        // writeEndIndex--;
      }
    }
    
    writeStartIndex++;
    startFloorIndex++;
  }
  
  function searchL () {
    if (c > rLen) {
      return;
    }
    
    for(let i = endFloorIndex; i >= startFloorIndex; i--) {
      writeEndIndex--;
      
      answer[floorIndexes[i] + writeEndIndex] = c++;
      console.log(answer);
    }
  
    writeEndIndex = endFloorIndex;
  }
}

// console.log(solution(4), 'shoud be', [1,2,9,3,10,8,4,5,6,7]);
console.log(solution(5), 'shoud be', [1, 2, 12, 3, 13, 11, 4, 14, 15, 10, 5, 6, 7, 8, 9]);
// console.log(solution(6), 'shoud be', [1,2,15,3,16,14,4,17,21,13,5,18,19,20,12,6,7,8,9,10,11]);