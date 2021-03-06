// 20:26 ~
// 00:00:00 ~ 12:59:59 까지 구한다.
function solution(segment) {
  let store = new Array(60);
  let cnt = 0;
  
  // 중복 방지하기 위해 미리 계산
  for(let t = 0; t < 60; t++) {
    store[t] = calc(t);
  }
  
  for(let h = 0; h < 24; h++) {
    for(let m = 0; m < 60; m++) {
      for(let s = 0; s < 60; s++) {
        if (store[h] + store[m] + store[s] === segment) {
          cnt++;
        }
      }
    }
  }
  
  return cnt;
}

function calc(t) {
  const light = [6, 2, 5, 5, 4, 5, 6, 3, 7, 6];
  
  // 10의 자리, 1의 자리를 각각 더해준다.
  return light[Math.floor(t / 10)] + light[Math.floor(t % 10)];
}

console.log(solution(30));