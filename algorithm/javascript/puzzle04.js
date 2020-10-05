// 20:26 ~
// 00:00:00 ~ 12:59:59 까지 구한다.
function solution(segment) {
  const time = {};
  const segCounts = [6, 2, 5, 5, 4, 5, 6, 3, 7, 6];
  const segmentTimes = [];
  
  // 00,00,00
  // 00,00,01
  
  for(let h = 0; h < 13; h++) {
    if (h - 10 < 0) {
      h = '0' + h;
    }
    
    for(let m = 0; m < 60; m++) {
      if (m - 10 < 0) {
        m = '0' + m;
      }
      
      for(let s = 0; s < 60; s++) {
        if (s - 10 < 0) {
          s = '0' + s;
        }
  
        console.log(s);
        calc(h + '', m + '', s + '');
      }
    }
  }
  
  function calc(h, m, s) {
    if (!time[h]) {
      time[h] = h.split('').reduce((acc, cur) => {
        return acc += segCounts[cur] * 1;
      }, 0);
    }
    
    if (!time[m]) {
      time[m] = m.split('').reduce((acc, cur) => {
        return acc += segCounts[cur] * 1;
      }, 0);
    }
  
    if (!time[s]) {
      console.log(s);
      time[s] = s.split('').reduce((acc, cur) => {
        return acc += segCounts[cur] * 1;
      }, 0);
    }
  
    let totalCalc = time[h] + time[m] + time[s];
  
    if (totalCalc === segment) {
      segmentTimes.push(`${h}:${m}:${s}`);
    }
  }
  
  return segmentTimes.length;
}

solution(30);