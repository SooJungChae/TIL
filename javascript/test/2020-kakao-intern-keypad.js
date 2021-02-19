// 문제 한번 풀었었음. 20:45 ~
function solution (numbers, hand) {
  const STAR = 10;
  const SHARP = 12;
  
  const phone = {
    1: [0, 0],
    2: [0, 1],
    3: [0, 2],
    4: [1, 0],
    5: [1, 1],
    6: [1, 2],
    7: [2, 0],
    8: [2, 1],
    9: [2, 2],
    [STAR]: [3, 0],
    0: [3, 1],
    [SHARP]: [3, 2],
  };
  
  let left = STAR;
  let right = SHARP;
  let leftCount = 0;
  let rightCount = 0;
  
  return numbers.map(n => {
    if (n === 1 || n === 4 || n === 7) {
      left = n;
      return 'L';
    }
    
    if (n === 3 || n === 6 || n === 9) {
      right = n;
      return 'R';
    }
    
    if (n === 0) {
      console.log('stop');
    }
    
    // console.log(n);
    leftCount = Math.abs(phone[left][0] - phone[n][0]) + Math.abs(phone[left][1] - phone[n][1]);
    rightCount = Math.abs(phone[right][0] - phone[n][0]) + Math.abs(phone[right][1] - phone[n][1]);
    
    // 값이 같으면 x손잡이를 선택한다.
    if (leftCount === rightCount) {
      if (hand === 'left') left = n;
      if (hand === 'right') right = n;
      
      return (hand === 'left') ? 'L' : 'R';
    }
    
    if (leftCount < rightCount) {
      left = n;
      return 'L';
    }
    
    right = n;
    return 'R';
  }).join('');
}

// solution([1, 3, 4, 5, 8, 2, 1, 4, 5, 9, 5], "right");
// console.log(solution([7, 0, 8, 2, 8, 3, 1, 5, 7, 6, 2], "left"));
console.log(solution([1, 2, 3, 4, 5, 6, 7, 8, 9, 0], "right"));