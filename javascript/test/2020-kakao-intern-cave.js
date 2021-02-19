// 21:38 ~
function solution(border) {
  const CORNER = 5;
  const down = [1, 1];
  const right = [0, 1];
  const left = [0, -1];
  
  let total = 0;
  let change = 0;
  // 최소 비용
  let min = CORNER * border.length * border[0].length;
  
  for (let i = 0, len = border.length; i < len; i++) {
    for (let j = 0; j < len; j++) {
      // 1) 오른쪽 먼저 시작하는 경우.
      
      // 끝에 닿으면 전환
      // if (j === len - 1)
      
      // 벽에 닿을 때까지 +
      while(border[i][j] === 1) {
        
        total++;
      }
      
      
    }
  }
  
  // 다 끝나고 total 계산
  total += (change * CORNER);
  
  if (total < min) {
    min = total;
  }
  
  return min;
}

solution([[0,0,1,0],[0,0,0,0],[0,1,0,1],[1,0,0,0]]);