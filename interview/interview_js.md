# 목차
- [객체](#객체)
- [객체 지향 프로그래밍](#객체-지향-프로그래밍)
- [함수형 프로그래밍](#함수형-프로그래밍)
- [명령형과 선언형의 프로그래밍 비교](#명령형과-선언형의-프로그래밍-비교)
- [이벤트 버블링, 캡쳐링](#이벤트-버블링-이벤트-캡쳐링)
- [실행 컨텍스트](#실행-컨텍스트)
- [모듈 패턴](#모듈-패턴)
- [이벤트 루프](#이벤트-루프)
- [체이닝](#체이닝)
- [호이스팅](#호이스팅)
- [클로저](#클로저)
- [일급객체](#일급객체)
- [람다함수](#람다함수)
- [JSON](#json)
- [JSONP](#jsonp)
- [Debouncing](#debouncing)
- [타입스크립트](#타입스크립트)

## 자바스크립트의 특징

- 단일 스레드 기반
- [함수형 프로그래밍](#함수형-프로그래밍) + [객체지향 프로그래밍](#객체-지향-프로그래밍) 함께 사용하곤 한다.
- 프로토타입 기반의 언어로 객체를 상속하는 언어다.

## 표현식과 문의 차이

> 표현식은 무언가를 요청하는 것. 결과가 나올 수 있다.<br>
> 문은 무언가를 지시하는 것.

```js
lex x;  // 선언문
x = 3 * 5;  // 표현식
```

- [러닝 자바스크립트: ES6로 제대로 입문하는 모던 자바스크립트 웹 개발](https://books.google.co.kr/books?id=iAQrDwAAQBAJ&pg=PA139&lpg=PA139&dq=%EB%AC%B8%EA%B3%BC+%ED%91%9C%ED%98%84%EC%8B%9D+%EC%B0%A8%EC%9D%B4&source=bl&ots=uka496awdX&sig=ACfU3U1k2tWCUFlIxcUPrdiJHmNV9sWnfw&hl=ko&sa=X&ved=2ahUKEwiJ5eev9q7kAhXKIqYKHX8mBkUQ6AEwAnoECAkQAQ#v=onepage&q=%EB%AC%B8%EA%B3%BC%20%ED%91%9C%ED%98%84%EC%8B%9D%20%EC%B0%A8%EC%9D%B4&f=false)

## 자료형

> 원시값 : string, number, 값 아닌 값(null, undefined), boolean
> 이외의 것 : object
> ES6 에 Symbol 이 추가됨
> - 객체의 유일한 property key 를 만들기 위해 사용된다.

## 원시값과 객체를 비교하는 방법

> 원시값 비교엔 typeof
> 객체 비교엔 instanceof

## undefined 와 undeclared 변수

> undefined 는 선언만 되어지고 특정 값 할당되지 않은 경우.
> undeclared 는 선언하지 않고도 사용가능한 변수.

- [](http://insanehong.kr/post/front-end-developer-interview-javascript/)

## 객체

> 관련된 데이터와 함수의 집합.

- 모든 객체는 Object 의 prototype 으로부터 메서드와 속성을 상속받는다. (+constructor)

### 일급객체

- 변수나 데이터 구조안에 담을 수 있다.
- 파라미터로 전달할 수 있다.
- 반환값으로 사용할 수 있다.

## 모듈, 인터페이스

> 인터페이스 : 표준, 약속, 규칙.

## var, let, const 의 차이

> 1) 할당 : var/let 은 재할당이 되지만 const 는 아니다.
> 2) 호이스팅 : 모두 자신의 스코프의 가장 맨 위로 호이스팅 되는데, let/const 는 할당 되지 않으면 아예 접근할 수 없다.
> 3) 스코프 : var 는 함수스코프, let/const 는 블록 스코프

- let/const 는 어휘적 바인딩이 실행되기 전까지 액세스 할 수 없다. (TDZ)

## call, apply, bind

> 함수를 호출해서 실행해

> - call() 인수 리스트를 받아서 함수를 호출한다.
> - apply() 인수 배열을 받아서 함수를 호출한다.
> - bind() 새로운 바인딩한 함수를 만든다. bound 함수 리턴.

- [](https://wooooooak.github.io/javascript/2018/12/08/call,apply,bind/)

## 객체 지향 프로그래밍과 함수형 프로그래밍의 차이

> 객체지향은 프로그래밍을 상호작용하는 객체들의 집합으로 보고,
> 함수형은 상태 값을 지니지 않는 함수 값들의 연속으로 생각할 수 있다.

- 캡슐화 : 관련 속성과 메소드를 하나의 객체로 묶어 포함할 수 있다.

- [](https://madplay.github.io/post/functional-programming-object-oriented-programming)
- [](https://webclub.tistory.com/94?category=501058)

## 객체 지향 프로그래밍

> 관련 있는 객체들이 집합이라는 관점으로 접근하는 소프트웨어 디자인
> 프로퍼티와 메서드를 포함하는 데이터 구조들.

- prototype
- class

```js
const num = {
  val: 1
};
const add5 = () => num.val += 5;
const multiply5 = () => num.val *= 5;
```

## 함수형 프로그래밍

> [순수 함수](#순수-함수)를 조합해서 소프트웨어를 만드는 프로세스다.

- [1급 객체](#1급-객체)
- [고차 함수](#고차-함수)
- 불변성
- 명령형이 아닌 선언형이다.

```js
const num = {
  val: 1
};
const add5 = () => Object.assign({}, num, {val: num.val + 5});
const multiply5 = () => Object.assign({}, num, {val: num.val * 5});
```

- https://velog.io/@kyusung/%ED%95%A8%EC%88%98%ED%98%95-%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D-%EC%9A%94%EC%95%BD
- [](https://futurecreator.github.io/2018/10/05/why-functional-programming/)
- [](https://medium.com/@bretcameron/9-javascript-interview-questions-48416366852b)
### 순수 함수

> - 동일한 입력에는 같은 값을 반환한다.
> - 함수의 실행은 프로그램의 실행에 영향을 미치지 않아야 한다.

```js
// 순수하지 않은 함수, DOM을 변경하는 부수효과를 발생시킴
function Header(text) {
  let h1 = document.createElement('h1');
  h1.innerText = text;
  document.body.appendChild(h1);
}

// 순수한 함수, 부수효과를 발생시키지 않음
// DOM을 변경하는 책임은 애플리케이션의 다른 부분이 담당하도록 한다.
const Header = (props) => <h1>{props.title}</h1>
```

### 고차 함수

> - 함수에 함수를 파라미터로 전달 할 수 있다.
> - 함수의 반환값으로 함수를 사용할 수 있다.

### 1급 객체

> - 변수나 데이터 구조안에 담을 수 있다.
> - 파라미터로 전달 할 수 있다.
> - 반환값으로 사용할 수 있다.
> - 동적으로 프로퍼티 할당이 가능하다.

## 명령형과 선언형의 프로그래밍 비교

> - 명령형 : 어떤 방식으로 상태를 변경시키는 구문의 관점에서 연산을 설명하는 방식. (How)
> - 선언형 : 무엇과 같은지를 설명하는 방식 (What)

- 명령형 : 절차지향 프로그래밍, 객체지향 프로그래밍
- 선언형 : 함수형 프로그래밍

```js
// 명령형
const sumArray = array => {
  let result = 0;
  for (let i = 0; i < array.length; i++) {
    result += array[i]
  };
  return result;
}

// 선언형
const sumArray = array => { return array.reduce((x, y) => x + y) };
```

- [](https://medium.com/@bretcameron/9-javascript-interview-questions-48416366852b)

## 커링

> 다중인자를 받는 함수를 단일 인자 함수열로 만드는 것을 말한다.

```js
function curry (fn) {
    // 인자의 갯수를 알기 전까지 새로운 함수 반환하고,
    // 다 끝나면 함수 대신 값을 반환해야 한다.
    let fnCall = fn.length;

    return (function resolver() {
    // 지금까지 입력받은 모든 인자를 복사.
        let memory = Array.prototype.slice.call(arguments);
        return function() {
            let local = memory.slice();
            Array.prototype.push.apply(local, arguments);
            next = local.length >= fnCall ? fn : resolver;
            return next.apply(null, local);
        };
    }());
}
function volume ( l, w, h ) {
  return l * w * h;
}

var curried = curry( volume );

curried( 1 )( 2 )( 3 ); // 6
```

- [](https://edykim.com/ko/post/writing-a-curling-currying-function-in-javascript/)
- [함수로 함수 만들기2 커링](http://jeonghwan-kim.github.io/js/2017/04/17/curry.html)

## 오버라이딩, 오버로딩

> 오버라이딩 : 상속된 객체의 속성을 재정의 하는 것. <br>
> 오버로딩 : 같은 이름이더라도 매개변수 다르면 중복으로 선언 가능.

## 이벤트 버블링, 이벤트 캡쳐링

> 상위 노드에 이벤트를 전달하는 것, 하위 노드에 이벤트를 전달하는 것

## 실행 컨텍스트
Execution context

> 실행 가능한 코드가 실행되기 위해 필요한 환경

### 실행 컨텍스트가 생성되어 코드가 실행되는 과정

1) 함수가 실행되면, 실행 컨텍스트를 생성한다.
2) 컨텍스트에서 실행에 필요한 정보들을 담을 객체인 활성 객체를 생성한다. (형상화한 대상을 가지는 객체다.)
3) 활성 객체 내에, 매개변수의 정보를 갖는 arguments 객체를 생성하고, 함수가 호출될 때 사용된 인자들을 넣는다.
4) 활성 객체 내에, 실행 컨텍스트의 스코프 체인을 생성한다.
- 현재 호출한 함수의 스코프 체인에 현재 활성객체를 마지막에 추가한 리스트를 현재 활성객체에 추가한다.
5) 변수 객체가 생성되고, 함수가 가지고 있는 변수 및 객체 정보를 생성한다.
6) this 에 대한 정보를 저장하며, 이 객체에 바인딩한다.
- this 에 바인딩할 대상이 없으면 window 로 바인딩한다.
- 브라우저는 window 객체에 바인딩, node 는 global 객체에 바인딩
7) 활성 객체 생성되면 코드 실행할 준비를 마침, 코드를 실행시킨다.
- 변수에 값이 할당된다.
8) 코드를 실행한 후 실행 컨텍스트를 파기한다.

- TODO: 화살표 함수에서의 this https://velog.io/@yhe228/%ED%99%94%EC%82%B4%ED%91%9C-%ED%95%A8%EC%88%98%EC%97%90%EC%84%9C-this

## 모듈 패턴

> 네임스페이스 캡슐화를 사용하는 방법

## prototype

- [](https://webclub.tistory.com/559?category=501058)

## 이벤트 루프

> '단일 스레드' 기반의 자바스크립트가 '동기성' 을 지원하는 방식.

## 체이닝

> 객체에 연쇄적으로 메서드를 호출할 수 있도록 하는 패턴.

```js
var element = new Test();

// 체이닝 사용 안했을 때
element.setX(1);
element.setY(2);
element.setZ(3);

// 메소드 체이닝 사용 시
element.setX(1).setY(2).setZ(3);

출처: https://includestdio.tistory.com/42 [includestdio]
```
- 어떤 메서드가 명백히 의미있는 반환값을 가지지 않는다면 항상 this 를 반환하게 한다.

### 체이닝의 장단점

> 코드를 간결하게 하지만, 디버깅이 어렵다.

## 호이스팅
> 함수 안에 있는 선언들을 모두 끌어올려서 함수의 유효범위 안의 최상단에 선언하는 것

- var, let, const, 함수선언문이 끌어올려진다.
- let 과 const 가 호이스팅 되지 않는다고 알고있는데 이건 잘못알고있는 것이다. 
둘다 호이스팅은 일어나지만 실제로 `let` 과 `const` 로 선언된 구문을 만나기 까지 `TDZ(Temporary Dead Zone)` 에 갇힌다.
이 안에 있으면 변수에 접근할 수 없어서 `Reference error` 가 발생하는 것이다.

- https://gmlwjd9405.github.io/2019/04/22/javascript-hoisting.html
- https://medium.com/korbit-engineering/let%EA%B3%BC-const%EB%8A%94-%ED%98%B8%EC%9D%B4%EC%8A%A4%ED%8C%85-%EB%90%A0%EA%B9%8C-72fcf2fac365
- https://ponyfoo.com/articles/es6-let-const-and-temporal-dead-zone-in-depth

## 클로저

> 이너 함수에 스코프 밖에 있는 변수에 접근하기 위한 객체

```js
for (var i = 0; i < 5; i++) {
  setTimeout(function() {
    console.log('i:', i);  
  }, 3000);
}
```

이때 항상 `i: 4` 가 나온다. 콘솔에 값을 찍기전에 이미 i 는 4까지 증가된 상태이고
콘솔에 찍을 땐 변화된 값을 참조하기 때문이다.

이걸 해결하기 위한 방법에는 두가지가 있다.

1. 즉시실행함수 추가하기
2. `var` 대신에 `let` 사용하기

1번은 이렇게 구현할 수 있다.

```js
for (var i = 0; i < 5; i++) {
  (function(currentI) {
    setTimeout(function() {
    console.log('i:', currentI);  
  }, 3000);
  })(i);
}
```
`var` 는 'Function Scope' 이다. 그래서 즉시실행 함수로 setTimeout 을 감싸주면 새로운 스코프가 만들어지고,
각각의 스코프에 현재 i 를 할당해줘서 i 값이 유지되게 된다.

2번은 스코프의 특성을 사용하는 방법이다.
앞서 얘기했다시피 `var` 는 'Function Scope' 이다. 반면 ES6 에서 만들어진 `let` 은 'Block Scope' 이다.
그래서 loop 가 돌면서 새로운 스코프가 만들어지고, i 값은 내부 setTimeout 함수에서 유지될 수 있는 것이다. 

```js
for (let i = 0; i < 5; i++) {
  setTimeout(function() {
    console.log('i:', i);  
  }, 3000);
}
```

- https://stackoverflow.com/questions/762011/whats-the-difference-between-using-let-and-var
- https://rypro.tistory.com/100   

```js
function makeAdd(x) {
    return function(z) {
        y = 100;
        return x + y + z;
    }
}
let add5 = makeAdd(5);  // 함수만 리턴. (실행은 안함)
let add10 = makeAdd(10); // 함수만 리턴. (실행은 안함)

console.log(add5(3));    // 108 (x: 5, y: 100, z:3)
console.log(add10(3)); // 113 (x: 10, y: 100, z:3)
```

- 같은 함수를 공유하지만, 서로 다른 맥락(어휘)적 환경을 저장한다.
- 세가지 스코프가 있다. local, global, outer function 스코프

- [](https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Closures)
- [](https://aljjabaegi.tistory.com/294)
- [](https://yuddomack.tistory.com/entry/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%ED%81%B4%EB%A1%9C%EC%A0%80Closure)

## 스코프

> 변수의 유효범위.
> "변수의 값을 찾을 때 들여다 보는 곳"

### 동적 스코프

> 함수를 **어디서 호출**했는지에 따라 상위 스코프를 결정하는 것

### 렉시컬 스코프

> 함수를 **어디에 선언**했는지에 따라 상위 스코프를 결정하는 것

- [스코프](https://poiemaweb.com/js-scope#7-%EB%A0%89%EC%8B%9C%EC%BB%AC-%EC%8A%A4%EC%BD%94%ED%94%84)

## 익명함수

> 이름이 없는 함수. 다른 함수에 인자로 넘기거나 함수의 결과 값으로 리턴할 용도로 사용된다. (함수 [표현식](#표현식과-문의-차이) 이용)

- 즉시실행함수
- 콜백, 클로저

## 람다함수

> 익명 함수.

### 람다대수

> 수학용어. 함수를 보다 단순하게 표현하는 방법

- 이름을 가질 필요가 없다. (익명 함수)
- 두 개 이상 입력이 있는 함수는 1개의 입력만 받는 람다 대수로 단순화 될 수 있다. (커링)

출처 : https://hyunseob.github.io/2016/09/17/lambda-anonymous-function-closure/

## 화살표 함수

> function 키워드 대신 화살표를 사용해서 보다 간략한 방법으로 함수를 선언하는 방법

- 함수 표현식을 사용한다.
- Lexical this 를 지원해서 콜백 함수로 사용하기 편리하다.
- call, apply, bind 메소드로 this 변경 불가.
- prototype 프로퍼티 없음.

### 화살표 함수 사용하면 안되는 경우

> - 화살표 함수로 메소드를 정의하는 경우.
> - 화살표 함수로 정의된 메소드를 prototype 에 할당하는 경우.
> - 생성자 함수로 사용할 수 없다.

- [화살표 함수](https://poiemaweb.com/es6-arrow-function)

## 클래스

> prototype 기반의 상속 보다 명료하게 사용하는 함수.

- 호이스팅 안 일어남.

## 생성자 함수

> 같은 값과 같은 동작을 공유하는 객체를 여러 개 만드는 함수.

- 생성자 함수에서 return 값이 없으면 this 를 반환한다.
- 객체 인스턴스를 생성하고 반환한다.
- class 로 생성된 객체를 생성하고, 초기화하기 위한 특수한 메소드다.

### 생성자 함수가 호출되면

> 빈 객체가 생성되고, 해당 함수의 프로토타입을 상속받는다.
> this 로 참조되는 객체에 프로퍼티와 메소드가 추가된다.
> 다른 객체가 명시적으로 반환되지 않을 경우, this 로 참조된 이 객체가 반환된다.

- prototype 프로퍼티를 가지며, prototype 프로퍼티가 가리키는 프로토타입 객체의 constructor 를 사용한다.

- [](https://webclub.tistory.com/239?category=501058)
- [](https://webclub.tistory.com/309)

## 인스턴스

> 생성자 함수가 반환한 새로운 객체.

## constructor

> 인스턴스를 생성하는데 사용하는 함수
> class 로 생성된 객체를 생성하고 초기화하기 위한 특수한 메소드.

## this

> - 객체 안의 this --> 객체
> - 메소드 안의 this --> window
> - 화살표 함수의 this --> 상위 스코프의 this ([렉시컬 스코프](#렉시컬-스코프))
> - 메소드 안의 화살표 함수의 this --> window (화살표 함수로 메소드 정의하는 것은 바람직하지 않다.)

### 메소드 안의 this 가 메소드를 호출한 객체를 가리키게 하는 방법

> 1) var that = this
> 2) map(func, this)
> 3) bind(this)

```js
// Function.prototype.bind()
if (!Function.prototype.bind) {
    Function.prototype.bind = function() {
        var funcObj = this;
        var original = funcObj;
        var extraArgs = Array.prototype.slice.call(arguments);
        var thisObj = extraArgs.shift();
        var func = function() {
            var thatObj = thisObj;
            return original.apply(thatObj, extraArgs.concat(
                Array.prototype.slice.call(
                    arguments, extraArgs.length
                )
            ));
        };
        func.bind = function() {
            var args = Array.prototype.slice.call(arguments);
            return Function.prototype.bind.apply(funcObj, args);
        }
        return func;
    };
}
```

- [](https://poiemaweb.com/es6-arrow-function)

### async, await 가 promise 보다 좋은 점
> - 간결함. `.then` 을 추가할 필요가 없으며 그 속에서 변수를 선언하고 사용할 필요가 없다.
> - 코드의 nesting 을 피할 수 있다.
> - `try/catch` 구문에서 에러를 처리할 수 있다.
> - promise 는 에러가 나면 `.catch`를 호출해야 한다.
> - 디버깅이 편리하다.

```js
// promise
const makeRequest = () => {
  return promise1()
    .then(value1 => {
      // do something
      return Promise.all([value1, promise2(value1)])
    })
    .then(([value1, value2]) => {
      // do something
      return promise3(value1, value2)
    })
}

// async, await
const makeRequest = async () => {
  const value1 = await promise1()
  const value2 = await promise2(value1)
  return promise3(value1, value2)
}

```
- [](https://medium.com/@constell99/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8%EC%9D%98-async-await-%EA%B0%80-promises%EB%A5%BC-%EC%82%AC%EB%9D%BC%EC%A7%80%EA%B2%8C-%EB%A7%8C%EB%93%A4-%EC%88%98-%EC%9E%88%EB%8A%94-6%EA%B0%80%EC%A7%80-%EC%9D%B4%EC%9C%A0-c5fe0add656c)

## fetch

> Header, Request, Response 인터페이스를 갖고 있어서
XHR 보다 강력하고 유연한 조작이 가능한 비동기 통신 API.

```js
const obj = {
  body: ...,
  headers: {},
  method: 'POST'
}
fetch(URL, obj)
.then(res => res => res.json())
.then(json => console.log(json))
.catch(err => console.log(err));
```

- [fetch api 사용하기](https://justmakeyourself.tistory.com/entry/fetch-api)

## JSONP

> JSON with padding <br>
> 서로다른 도메인 간의 javascript 호출을 위해 등장한 방법.

- <script/> 태그는 SOP 정책에 속하지 않는다.
- 단순히 script 태그에 담아 호출하면 응답 json 포맷을 블록{ } 형식으로 받아들여 javascript 문법 오류가 발생한다.
- 클라이언트가 parseResponse 함수를 JSONP 요청의 콜백 함수로 지정하였다.
```js

```
- 다음과 같은 HTML 태그가 문서에 삽입된다.
JSON 데이터를 클라이언트가 지정한 콜백 함수를 호출하는 javascript 문법으로 감싸 클라이언트에 전송한다.
```html
<script type="application/javascript"
        src="http://server.example.com/Users/1234?callback=parseResponse">
</script>
```
- 서버는 JSON 데이터를 패딩하여 클라이언트에 보낸다.
```js
parseResponse({"Name": "Foo", "Id": 1234, "Rank": 7});
```

## JSON

> JavaScript Object Notation <br>
> '키-값' 으로 이루어진 데이터 오브젝트를 전달하기 위해 인간이 읽을 수 있는 텍스트를 사용하는 개방형 표준 포맷이다. <br>
> 인터넷에서 데이터를 주고받을 때 자료를 표현하는 방법.

## Trottle, Debounce

> 이벤트 핸들러가 많은 연산을 수행하는 경우 제약을 걸어 제어할 수 있는 수준으로 이벤트를 발생시키는 것

### Throttle

> 마지막 함수가 호출된 후 일정 시간이 지나기 전에 다시 호출되지 않도록 하는 것.

### Debounce

> 연이어 호출된 함수들 중 마지막 함수만 호출하도록 하는 것.

- [Debouncing 코드](../javascript/pattern/debounce.html)
- [Throttling 코드](../javascript/pattern/throttle.html)

- [Debounce, throttle 참고](https://webclub.tistory.com/607)

- 무한 스크롤링 페이지 : 디바운싱은 사용자가 스크롤을 멈출 때만 이벤트를 발생시키므로 디바운싱보다는 스로틀이 적합하다.
- 사용자가 footer 에 도달하기 전에 콘텐츠를 가져와야 하기 때문.

## 타입스크립트

> javascript 에 [OOP](#객체-지향-프로그래밍) 특징을 더해준 언어.

## Anuglar.js

> MVC 웹 프레임워크로 SPA 형태의 웹 어플리케이션을 빠르게 개발할 수 있도록 도와준다.



## XHR

> XMLHttpRequest <br>
> 비동기 요청을 생성하는 javascript API (AJAX)

쓰로틀링!!!

## 기타 출처
- https://velog.io/@tmmoond8/%ED%94%84%EB%A1%A0%ED%8A%B8%EC%97%94%EB%93%9C-%EA%B0%9C%EB%B0%9C%EC%9E%90-%EC%9D%B8%ED%84%B0%EB%B7%B0-%ED%9B%84%EA%B8%B0-%EB%A9%B4%EC%A0%91-%EC%A7%88%EB%AC%B8-%EC%A0%95%EB%A6%AC-%EC%9E%91%EC%84%B1-%EC%A4%91
- http://insanehong.kr/post/front-end-developer-interview-html/
