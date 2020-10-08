# You don't know JS 타입과 문법, 스코프와 클로저

## 타입
어떤 값을 다른 값과 비교할 수 있는 고유 특성을 의미한다.<br>
타입은 7가지가 있다.
1. String
2. Number
3. Boolean
4. Null
5. Undefined
6. Object
7. Set (ES6 부터 추가)

`typeof`로 타입을 알 수 있다.<br>
6가지 타입은 동일하게 리턴하지만 `typeof null` 은 `object` 를 리턴한다.<br>
null 값을 정확히 확인하려면
```
(!a && typeof a === 'object')
```
function 은 object 의 하위타입이지만 `typeof function` 은 `function`을 리턴한다.
**함수는 호출가능한 객체**이다.

undefined 는 `값이없는` 과 `선언되지 않은` 을 의미한다.
```
var a;
a; // undefined
b; // ReferenceError: b가 정의되지 않았습니다.
```
a 는 선언됐지만 값이 안들어간 `값이없는` 뜻이고,
b 는 선언조차 되지 않아 에러가 발생한 `선언되지 않은` 상태다.

변수의 선언여부를 체크하려면
```
var DEBUG = true

// 다른 파일
if (DEBUG) { ... } // ReferenceError

// 이렇게 해야 안전하게 변수의 존재여부를 체크할 수 있다.
if (typeof DEBUG === 'undefined') { ... } 
```
## 모듈
ES6 부터 export/import 변수로 외부 모듈의 변수를 사용할 수 있다.
```
// addFunc.js
const addOne = (a) => a + 1;
const addTwo = (a) => a + 2;

export { addOne, addTwo };
``` 
```
// app.js
import { addOne, addTwo } from './addFunc';

addOne(1); // 2
addTwo(3); // 3
```

## 스코프

렉시컬 스코프는 함수가 선언된 위치에 따라 정의되는 스코프를 말한다.
 



