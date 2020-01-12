# Array.sort([compareFunction(a, b)])

## 인자
- compareFunction()

## 리턴값 
- 정렬된 Array
- 원본 배열이 바뀜.

### (옵션) compareFunction(a, b)
- comapreFunction(a, b) -> (b, a) 로 적는게 편함.
- index1, index0 순으로 비교가 되거든
- 문자열 비교는 >, <, = 부등호 비교
- 숫자 비교는 - 비교로 쉽게 가능
- 뒤에 값이 크면 -1
- 앞에 값이 크면 1
- 둘이 같으면 0 리턴

```javascript
function solution(s) {
    var answer = '';
    var splitAnswer = s.split('');

    splitAnswer.sort(function (b, a) {
        if (a > b) return 1;
        else if (a < b) return -1;
        else return 0;
    });

    answer = splitAnswer.join('');
    return answer;
}
```
