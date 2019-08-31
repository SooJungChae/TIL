# 목차
- [이벤트 버블링, 캡쳐링](#이벤트-버블링-이벤트-캡쳐링)
- [실행 컨텍스트](#실행-컨텍스트)
- [이벤트 루프](#이벤트-루프)
- [체이닝](#체이닝)
- [JSON](#json)
- [JSONP](#jsonp)
- [Debouncing](#debouncing)

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

쓰로틀링!!!
