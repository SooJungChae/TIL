# async vs Promise

- await 는 async 함수 안에서 사용가능해서 코드의 탑 레벨에는 사용 불가능하다.

## async 장점

- 간결함과 깔끔함
    - `.then` 을 사용할 필요없음
    - 많은 `return` 과 `괄호`들이 사라진다.
    - 분기될 때 보기 편하다.
- 에러 핸들링
    - `async` 는 동기와 비동기 모두 `try/catch` 로 처리할 수 있다.
    - `promise` 는 안쪽에서 에러가 발생하면 `catch`를 사용해야한다. (-> catch 중복 코드 발생)
- 에러 스택
    - Async 는 에러가 발생한 **함수**를 가리킨다.
    - Promise : `Error: oops at callAPromise.then.then.then.then.then (index.js:8:13)`
    - Async : `Error: oops at makeRequest (index.js:7:9)`
- 디버깅
    - 디버그도구는 동기화된 코드만 따라서 움직인다. -> return arrow function, then 에 breakpoint 잡을 수 없다.

## 예시 코드
[async vs promise javascript](async-promise.js)

## 참고
- [자바스크립트의 Async/Await 가 Promises를 사라지게 만들 수 있는 6가지 이유](https://medium.com/@constell99/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8%EC%9D%98-async-await-%EA%B0%80-promises%EB%A5%BC-%EC%82%AC%EB%9D%BC%EC%A7%80%EA%B2%8C-%EB%A7%8C%EB%93%A4-%EC%88%98-%EC%9E%88%EB%8A%94-6%EA%B0%80%EC%A7%80-%EC%9D%B4%EC%9C%A0-c5fe0add656c)