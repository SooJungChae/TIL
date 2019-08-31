# 목차
- [객체](#객체)
- [객체 지향 프로그래밍](#객체-지향-프로그래밍)
- [함수형 프로그래밍](#함수형-프로그래밍)
- [명령형과 선언형의 프로그래밍 비교](#명령형과-선언형의-프로그래밍-비교)
- [이벤트 버블링, 캡쳐링](#이벤트-버블링-이벤트-캡쳐링)
- [실행 컨텍스트](#실행-컨텍스트)
- [이벤트 루프](#이벤트-루프)
- [체이닝](#체이닝)
- [클로저](#클로저)
- [일급객체](#일급객체)
- [람다함수](#람다함수)
- [JSON](#json)
- [JSONP](#jsonp)
- [Debouncing](#debouncing)
- [타입스크립트](#타입스크립트)

## 객체

> 관련된 데이터와 함수의 집합.

## 객체 지향 프로그래밍

> 관련 있는 객체들이 집합이라는 관점으로 접근하는 소프트웨어 디자인

## 함수형 프로그래밍

> 함수로 프로그래밍하는 사고를 배우는 것. <br>
> [순수 함수](#순수-함수)를 조합해서 소프트웨어를 만드는 프로세스다.

- [1급 객체](#1급-객체)
- [고차 함수](#고차-함수)
- 불변성

- 명령형이 아닌 선언형이다.

출처: https://velog.io/@kyusung/%ED%95%A8%EC%88%98%ED%98%95-%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D-%EC%9A%94%EC%95%BD

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
function double (arr) {
  let results = []
  for (let i = 0; i < arr.length; i++){
    results.push(arr[i] * 2)
  }
  return results
}

$("#btn").click(function() {
  $(this).toggleClass("highlight")
  $(this).text() === 'Add Highlight'
    ? $(this).text('Remove Highlight')
    : $(this).text('Add Highlight')
})


// 선언형
function double (arr) {
  return arr.map((item) => item * 2)
}

function add (arr) {
  return arr.reduce((prev, current) => prev + current, 0)
}

<Btn
  onToggleHighlight={this.handleToggleHighlight}
  highlight={this.state.highlight}>
    {this.state.buttonText}
</Btn>
```

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

## 클로저

> 이너 함수가 스코프 밖에 있는 객체, 변수에 접근하는 것.

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

- 참고 : https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Closures

## 익명함수

> 다른 함수에 인자로 넘기거나 함수의 결과 값으로 리턴할 용도로 사용된다.

- 흔한 예: 콜백, 클로저.

## 람다함수

> 익명 함수.

### 람다대수

> 수학용어. 함수를 보다 단순하게 표현하는 방법

- 이름을 가질 필요가 없다. (익명 함수)
- 두 개 이상 입력이 있는 함수는 1개의 입력만 받는 람다 대수로 단순화 될 수 있다. (커링)

출처 : https://hyunseob.github.io/2016/09/17/lambda-anonymous-function-closure/

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

## Debouncing

[Debouncing 코드](../javascript/pattern/debounce.html)

## 타입스크립트

> javascript 에 [OOP](#객체-지향-프로그래밍) 특징을 더해준 언어.


쓰로틀링!!!
