https://poiemaweb.com/js-this <br/>
https://poiemaweb.com/es6-arrow-function 을 요약한 글입니다.

# this

자바스크립트의 함수는 호출될 때,
매개변수로 전달되는 값 이외에 `arguments`객체와 `this`를 암묵적으로 전달받는다.

- 함수 호출 방식에 의해 `this`가 어디에 바인딩할지 정해진다.
- 일반적으로 this 는 `window` 최상위 객체를 가리킨다.
    - 전역함수
    - 내부함수
    - 메소드의 내부함수
    - 콜백함수
- 메소드를 호출하면, 메소드를 소유한 객체에 바인딩된다. 

## 함수 호출 방식
1. 함수 호출
```js
var foo = function () {
  console.dir(this);
};

foo(); // window
```
2. 메소드 호출
```js
var obj = { foo: foo };
obj.foo(); // obj
```
3. 생성자 함수 호출
```js
var instance = new foo(); // instance
```
4. apply/call/bind 호출
```js
var bar = { name: 'bar' };
foo.call(bar);   // bar
foo.apply(bar);  // bar
foo.bind(bar)(); // bar
```

## 화살표 함수
- es6 에서 나온 화살표 함수는, 동적함수로 결정되는 일반 함수와는 달리, 
*화살표 함수의 this 는 언제나 상위 스코프의 this를 가리킨다.*
```js
function Prefixer(prefix) {
  this.prefix = prefix;
}

Prefixer.prototype.prefixArray = function (arr) {
  // this는 상위 스코프인 prefixArray 메소드 내의 this를 가리킨다.
  return arr.map(x => `${this.prefix}  ${x}`);
};

const pre = new Prefixer('Hi');
console.log(pre.prefixArray(['Lee', 'Kim']));
```
- 화살표 함수는 call, applay, bind 메소드를 사용하여 this를 변경할 수 없다.
```js
window.x = 1;
const normal = function () { return this.x; };
const arrow = () => this.x;

console.log(normal.call({ x: 10 })); // 10
console.log(arrow.call({ x: 10 }));  // 1
```
- 화살표 함수를 사용해서는 안되는 경우
    - 메소드
    - 프로토타입
    - 생성자 함수
    - addEventListener 함수의 콜백 함수