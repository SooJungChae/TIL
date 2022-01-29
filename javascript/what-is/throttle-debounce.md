# throttle & debounce

스크롤하는 경시 한번에 많은 이벤트가 발생하기 때문에 이와 같은 상황에서 매번 호출되는 것을 피하도록 조절하는 방법이다.

## throttle

이벤트가 호출되면 일정 시간이 지난 후에만 한번씩 함수를 호출한다.

## 사용 예시
- 메모장 자동 저장
- 브라우저 리사이징

## 예제
Throttle - requestAnimationFrame + customEvent
```js
// https://www.zerocho.com/category/JavaScript/post/59a8e9cb15ac0000182794fa
var timer;
document.querySelector('#input').addEventListener('input', function (e) {
  if (!timer) {
    timer = setTimeout(function() {
      timer = null;
      console.log('여기에 ajax 요청', e.target.value);
    }, 200);
  }
});
```

---

## debounce

이벤트가 끝나고 일정시간이 지난 후 실행시킨다. 

## 사용 예시
- 검색창에 자동완성 글자 보여주기

Debounce
```js
// https://www.zerocho.com/category/JavaScript/post/59a8e9cb15ac0000182794fa
let timer;
document.querySelector('#input02').addEventListener('input', function(e) {
  if (timer) { // 변화가 생겼을때 timer에 값이 존재한다면 그 값으로 타이머를 멈추고 , 새로운 타이머를 걸어준다
    console.log(timer)
    clearTimeout(timer);
  }
  timer = setTimeout(function() {
    console.log('[ 후 ] input value ? ', e.target.value);
  }, 1000);
});
```
## 참고
- [디바운스(Debounce)와 스로틀(Throttle ) 그리고 차이점](https://webclub.tistory.com/607)
- [쓰로틀링과 디바운싱 - ZeroCho](https://www.zerocho.com/category/JavaScript/post/59a8e9cb15ac0000182794fa)
