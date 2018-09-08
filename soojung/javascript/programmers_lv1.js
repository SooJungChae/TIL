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


/*---------------------------------
        문자열 다루기 기본
----------------------------------*/
function solution(s) {
    var answer = true;
    var regex = /^[0-9]+$/;
    var sLen =  s.length; 
    if (regex.test(s) && (sLen == 4 || sLen == 6)) 
        return answer;
    else
        return !answer;
}

// 모범답안
function alpha_string46(s){
  var regex = /^\d{6}$|^\d{4}$/;
  return regex.test(s);
}


/*---------------------------------
         가운데 글자 가져오기
----------------------------------*/
function solution(s) {
    var answer = '';
    var arrS = s.split('');
    var sLen = s.length;
    var center = parseInt(sLen / 2);

    if (sLen % 2 != 0) { 
        return arrS[center];
    };

    answer = arrS[center - 1] + arrS[center];
    return answer;
}

// 모범답안
function solution(s) {
    return s.substr(Math.ceil(s.length / 2) - 1, s.length % 2 === 0 ? 2 : 1);
}


/*---------------------------------
        문자열을 정수로 바꾸기
----------------------------------*/
// 근데 이 방식으로 해결 못했는데 어쩌다보니 통과되었다...? 모범답안으로 사용하자!
function solution(s) {
    return s * 1;
}

// 모범답안 1
function strToInt(str){
  return str/1
  }

// 모범답안 2
function strToInt(str){
  return  +str;
}

// **참고**
int to string => ""+int
string to int => +string


/*---------------------------------
        약수의 합
----------------------------------*/
function solution(n) {
    var answer = 0;
    for(var i = 1; i <= n; i++) {
        if(n%i==0) answer += i;
    }
    return answer;
}


/*---------------------------------
        소수 찾기 (아직 해결 못 함)
----------------------------------*/
function isPrime(k) {
    for (let j = 2; j <= k; j++) {
        if (k % j == 0) {
            if (k == j) {
                continue;
            }
            return false;
        }
    }
    return true;
}

function solution(n) {
    var answer = 1;
    
    for (let i = 3; i <= n; i++) {
        if (isPrime(i)) { 
            answer++; 
        }
    }

    return answer;
}


/*---------------------------------
        자릿수 더하기
----------------------------------*/
function solution(n)
{
    var answer = 0;

    var strN = n + "";
    var arrN = strN.split('');
    arrN.filter((item) => {
       answer += +item;
    });

    return answer;
}

// 다른사람꺼...
function solution(n){
    // 쉬운방법
    return (n+"").split("").reduce((acc, curr) => acc + parseInt(curr), 0)
}


/*---------------------------------
        서울에서 김서방 찾기 
----------------------------------*/
function solution(seoul) {
    var answer = '';
    seoul.filter((item, idx) => {
        if (item == "Kim") {
            return answer = '김서방은 ' + idx + '에 있다';
        }
    });
    return answer;
}

// 모범답안1
function findKim(seoul){
  var idx = seoul.indexOf('Kim');
  return "김서방은 " + idx + "에 있다";
}


/*---------------------------------
       문자열 내림차순으로 배치하기 
----------------------------------*/
function solution(s) {
  let answer = '';
  let charArr = [];
  s.split("").filter((item) => {
      charArr.push(item.charCodeAt());
  });

  bubbleSort(charArr, 0, charArr.length - 1);
  charArr.forEach((item) => {
      answer += String.fromCharCode(item);
  });

  return answer;
}

function bubbleSort(arr, start, end) {
  let temp = "";

  for (let i = start; i < end; i++) {
      if (arr[i] < arr[i+1]) {
          temp = arr[i];
          arr[i] = arr[i+1];
          arr[i+1] = temp;
      }

      if (end == 1) {
          return arr;
      }
  }

  bubbleSort(arr, 0, end - 1);
}

// 다른 답안
function solution(s) {
    var answer = ""
    var str = s.split("");
    return str.sort().reverse().join("");
}

function bubbleSort(arr, start, end) {
    var temp;

    if (end < 1) {
        console.log("finish " + arr);
        return arr;
    }

    for (var i = start; i < end; i++) {
        // console.log(arr[i], arr[i+1]);
        if (arr[i] > arr[i+1]) {
            temp = arr[i];
            arr[i] = arr[i+1];
            arr[i+1] = temp;
        }
        //console.log(arr);
    }

    return bubbleSort(arr, 0, (end-1));
}


/*---------------------------------
       나누어떨어지는숫자배열
----------------------------------*/
function solution(arr, divisor) {
    var answer = [];
    answer = arr.filter((item) => {
        if (item % divisor == 0) {
            return item;
        }
    });

    // 오름차순 정렬 -> bubble sort
    var answerLen = answer.length;
    if (answerLen == 0) {
        return [-1];
    }

    answer = bubbleSort(answer, 0, answerLen - 1);
    return answer;
}

// 모범답안
function solution(arr, divisor) {
    var answer = [];
    arr.map((o) => {
        o % divisor === 0 && answer.push(o);
    })
    return answer.length ? answer.sort((a, b) => a - b) : [-1];

}


/*---------------------------------
       핸드폰 번호 가리기
----------------------------------*/
function solution(phone_number) {
    var answer = '';

    var stars = phone_number.length - 4;
    for(var i = 0; i < stars; i++) {
        answer += "*";
    }

    answer += phone_number.substr(phone_number.length - 4, 4);
    return answer;
}

// 모범답안
function hide_numbers(s) {
  return s.replace(/\d(?=\d{4})/g, "*");
}
