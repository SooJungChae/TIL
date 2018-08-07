/*---------------------------------
          같은 숫자는 싫어
----------------------------------*/
function solution(arr)
{
    var answer = [];
    var arrLen = arr.length;
    var temp;

    for (var i = 0; i < arrLen; i ++) {
        if (temp == arr[i]) {
            continue;
        }
        answer.push(arr[i]);
        temp = arr[i];

    }
    console.log(answer);
    return answer;
}

// 모범답안
function solution(arr)
{
    return arr.filter((val,index) => val != arr[index+1]);
}


/*---------------------------------
          두 정수 사이의 합
----------------------------------*/
function solution(a, b) {
    var answer = 0;
    let smallNum = a, bigNum = b;

    // 큰 값을 찾는다
    // a 와 b 가 같다면 바로 리턴
    if ( a > b) {
        smallNum = b;
        bigNum = a;
    } else if (a == b) {
        return a;
    }

    // 작은값 ~ 큰 값의 값을 더한다.
    for (let i = smallNum; i <= bigNum; i++) {
        answer += i;
    }
    return answer;
}

// 모범답안 1
function adder(a, b, s = 0){
  for (var i = Math.min(a, b); i <= Math.max(a, b); i++) s += i;
  return s;
}

// 모범답안 2
function adder(a, b){
    var result = 0
    return (a+b)*(Math.abs(b-a)+1)/2;
}



/*---------------------------------
        문자열 내 p 와 y 의 개수
----------------------------------*/
function solution(s){
    var answer = true;
    let upperS = s.toUpperCase().split('');
    let sLen = s.length;
    let p = 0, y = 0;
    
    upperS.filter((char, idx) => {
           if (char.charCodeAt() == 80) 
               p++;
           else if (char.charCodeAt() == 89) 
               y++;
    });
    
    if (p != y)
        answer = false;
    
    return answer;
}

// 모범답안 1
function numPY(s) {
  return s.match(/p/ig).length == s.match(/y/ig).length;
}

// 모범답안 2
function numPY(s){
    return s.toUpperCase().split("P").length === s.toUpperCase().split("Y").length;
}
