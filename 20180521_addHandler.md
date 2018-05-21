# 메모리 누출
[출처] https://developer.mozilla.org/ko/docs/A_re-introduction_to_JavaScript

Javascript 는 가비지 컬렉트를 하는 언어다.
객체가 생성되면 메모리가 할당되고, 사용하고 난 메모리는 더 참조하는 다른 객체가 없을 때 되돌아가는 방식으로 동작한다.
객체들을 어떻게 할당하고 다시 거둬들일지는 브라우저가 알아서 하는데, IE 에서는 Javascript 과는 다른 가비지 컬렉션 방식을 사용한다. 
두 언어가 상호작용 하는 과정에서 메모리 누출이 발생하게 된다.
예를 들어 **Javascript 객체**와 **고유 객체** 가 서로 참조하는 중에, 자기 자신을 참조하게 되면 언제든지 발생한다. (= 순환참조) 
```ruby
function leakMemory() {
    var el = document.getElementById('el');
    var o = { 'el': el };
    el.o = o;
}
// IE 는 완전히 다시 시작하기 전까지는 el 과 o 에 의해 사용되는 메모리를 반환하지 못한다.
```
```ruby
function addHandler() {
    var el = document.getElementById('el');
    el.onclick = function() {
        this.style.backgroundColor = 'red';
    }
}
// 이 방식도 메모리 누출이 일어나는데,
// el 이 익명 함수 내부에 붙잡히기 때문이다.
```
```ruby
// 이렇게 해결한다.
function addHandler() {
    var el = document.getElementById('el');
    el.onclick = function() {
        this.style.backgroundColor = 'red';
    }
    el = null;
}
```


[링크] https://jicjjang.github.io/2017/05/20/javascript-optimize-8/
[도서] Javascript 성능 최적화

이 방법은 *작업을 반복하지 않기 위해* 사용된다.

```
function addHandler(target, eventType, handler) {
  if (target.addEventListener) {
    addHandler = function (target, eventType, handler) {
      target.addEventListener(eventType, handler, false);
    }
  } else {
    addHandler = function (target, eventType, handler) {  //ie 버전
      target.attachEvent('on' + eventType, handler);
    }
  }
}
```
addHandler 를 한 번 실행하면, 내부에서 재정의를 한다.
그 이후부터 target.addEventListenr 가 있는지 검사하는 부분이 사라지게 되어서 빨라진다.
3항연산자를 사용한 미리 읽기 방식을 사용하면 속도가 더 빨라진다.
```
var addHandler = document.body.addEventListener?
  function (target, eventType, handler) {
    target.addEventListener(eventTyep, handler, false);
  }:
  function (target, eventType, handler) {  // ie일 경우
    target.attachEvent('on' + eventType, handler);
  };
```
