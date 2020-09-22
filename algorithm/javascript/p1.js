let ensures = [];
let ensureCount = 0;

function ensureMerge(first, second) {
  const secondSplit = second.split('');
  
  return first.split('').reduce((acc, curr, idx) => {
    const result = (curr === 'O' || secondSplit[idx] === 'O') ? 'O' : 'X';
    return acc + result;
  }, '');
}

// TODO: ensures, ensureCount 캐치하는 곳 부터 하면 됨.
function test(s, arr) {
  if (s) {
    ensures.push(s);
    if (arr.some(a => {
      ensures.push(a);
      ensureCount++;
      // console.log(ensureMerge(s, a));
      if (ensureMerge(s, a).indexOf('X') === -1) {
        console.log('finishi!', ensureCount, ensures);
        return true;
      }
    })) {
      return ensureCount;
    }
    // var result = ensureMerge(s, arr[0]);
    // console.log('expect', ensureMerge(s, arr[0]), 'OOXO');
  }
  
  // if (result.indexOf('X') === -1) {
  //   console.log('end');
  //   return ensureCount;
  // }
  
  if (arr.length > 0) {
    const cpArr = arr.slice(0);
    test(cpArr.splice(0, 1).join(), cpArr);
  }
}

console.log('Result', test(null, ["XOXO", "OXXO", "XXOX", "XOOO"]), 'to be', 2);


// solution(["XOXO", "OXXO", "XXOX", "XOOO"], 2);