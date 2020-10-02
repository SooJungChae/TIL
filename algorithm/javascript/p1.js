let mergedEnsure = {};
let ensureCount = 0;

function mergeEnsure(first, second) {
  const secondSplit = second.split('');
  
  if (!first) {
    return second;
  }
  
  return first.split('').reduce((acc, curr, idx) => {
    const result = (curr === 'O' || secondSplit[idx] === 'O') ? 'O' : 'X';
    return acc + result;
  }, '');
}

function hasX(s) {
  return s.indexOf('X') !== -1;
}

let findResult = false;

// -----배열의 길이가 0 이 될때까지 반복
// 배열에서 하나를 선택한다.
// 이전꺼랑 더해준다.
// count를 +1 해준다.
// X 가 없다면 count 를 리턴한다.
// 여전히 X가 있다면 배열에서 하나를 제거한후 실행한다.
// ----- 반복

function combi(s, arr, ensureCount) {
  ensureCount++;
  
  const arrHaveX = arr.some(a => {
    // console.log(s, '+', a, '(' + ensureCount + ')');
    return hasX(mergeEnsure(s, a));
  });
  
  if (arrHaveX) {
    let t = arr.slice(0);
    t.splice(0, 1);
  
    return combi(arr[0], t, ensureCount);
  } else {
    console.log('find', s, arr, ensureCount);
  
    if (min > ensureCount) {
      min = ensureCount;
    }
  
    // return ensureCount;
  }
}

let min = 0;

function solution(arr) {
  min = arr.length;
  
  for (let i = 0; i < arr.length; i++) {
    let t = arr.slice(0);
    t.splice(i, 1);
    
    combi(arr[i], t, 0);
  }
}

// console.log('Q:', ["XOXO", "OXXO", "XXOX", "XOOO"]);
// console.log('hasX:', hasX('0000'), 'to be', false);
console.log('Result', solution(["XOXO", "OXXO", "XXOX", "XOOO"]), 'to be', 2);


// solution(["XOXO", "OXXO", "XXOX", "XOOO"], 2);