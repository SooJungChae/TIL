# 목차
- [DocType](#doctype)
- [Meta tag](#meta-tag)
- [이벤트 버블링, 캡쳐링](#이벤트-버블링-이벤트-캡쳐링)
- [실행 컨텍스트](#실행-컨텍스트)
- [이벤트 루프](#이벤트-루프)
- [체이닝](#체이닝)
- [DOM 에서 id 와 class 의 차이](#dom-에서-id-와-class-의-차이)
- [SPA](#spa)
- [검색엔진 최적화 문제](#검색엔진-최적화-문제)
- [float 을 해제하지 않으면 안되는 이유](#float-을-해제하지-않으면-안되는-이유)
- [css 애니메이션, js 애니메이션 차이](#css-애니메이션-js-애니메이션-차이)
- [CSS 트리거](#css-트리거)
- [SOP](#sop)
- [CORS 허가 방법](#cors-허가-방법)
- [JSON](#json)
- [JSONP](#jsonp)

## DocType

> 웹 표준을 지키는 문서타입.

HTML, XHTML 등이 있는데 어떤 버전의 문서 타입인지 표시한다.
HTML5 에서는 `<!DOCTYPE html>` 이런 식으로 문서 타입을 지정한다.
- 만약 XHTML 1.1 버전을 사용한다고 하면 이렇게 표현해야 한다.
- `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">`

## Meta tag

> 문서가 어떤 내용을 담고 있고 있는지 알려주는 태그.

- 이렇게 표현.
- `<meta name="viewport" conten"width=device-width, initial-scale=1>`
- 주로 subject, keywords, title, author 키 를 사용한다.

## 이벤트 버블링, 이벤트 캡쳐링

> 상위 노드에 이벤트를 전달하는 것, 하위 노드에 이벤트를 전달하는 것

## 실행 컨텍스트
Execution context

> 실행가능한 코드를 형상화하고 구분하는 추상적인 개념

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

## DOM 에서 id 와 class 의 차이

> 1) id 는 유일한 값, class 는 여러번 중복 가능하다. <br>
> 2) 문서 내에 id 를 통해 해당 위치로 이동할 수 있다.


## SPA

> 서버에 전체 페이지를 로드하지 않고 필요한 부분만 로드하는 것.

### SPA 장점
- 성능. 속도에 영향을 주는 서버 요청을 줄여준다.
- UX. 속도가 좋기 때문에 사용자에게 좋은 환경을 제공한다.

### SPA 단점
- **처음 속도가 느리다.** 많은 리소스들을 처음 한번에 받기 때문에 느리다.
- **보안 이슈.** 핵심로직은 클라에서는 최소화시키고 서버에서 수행하도록 한다.
- **[검색엔진 최적화 문제.](#검색엔진_최적화_문제)**
- **JS 가 활성화되어야 한다.** 누군가가 JS 작동 멈추면 SPA 는 소용없음.

## 검색엔진 최적화 문제

> 서버 렌더링 방식이 아닌, 클라이언트에서 자바스크립트로 렌더링 하는 방식은
검색 봇(Bot)이 찾을 수 없는 문제가 있다.

## float 을 해제하지 않으면 안되는 이유

> 부모는 float 된 자식의 크기는 계산하지 않고 그린다.

해결법
- 부모 태그의 display 를 inline-block 으로 설정한다.
- float 자식을 가지는 container 의 마지막 자식에 빈 엘리먼트를 추가하고 clear:both 스타일을 준다.
```html
<body>
  <div class="container">
    ...
    <div style="clear: both;"></div>
  </div>
</body>
```
- 부모의 :after 에 clear 속성 넣기
```css
.container:after {
  content: "";
  clear: both;
  display: block;
}
```

## css 애니메이션, js 애니메이션 차이

> 작은 부분은 CSS 애니메이션을 사용하고, 보다 세밀한 제어를 위해선 자바스크립트 사용을 권장한다.

- 속도 차이. velocity.js > css애니메이션 > jquery애니메이션
- velocity.js, GSAP 는 구글이나 어도비 같은 회사들이 모바일 페이지에서 최적화된
애니메이션을 위해 사용하는 라이브러리다.
- jquery 는 레이아웃 스레싱이나 가비지 콜렉션 트리거가 발생하기도 함
```js
// 레이아웃 스레싱
var currentTop, currentLeft;

// 레이아웃 스레싱 발생
currentTop = element.style.top;        // 레이아웃을 계산
element.style.top = currentTop;

currentLeft = element.style.left;    // 위에서 style.top을 설정했기 때문에 레이아웃을 다시 구함
element.style.left = currentLeft + 1;


// 레이아웃 스레싱이 없음
currentTop = element.style.top;        // 레이아웃을 계산
currentLeft = element.style.left;    // 변경 사항이 없기 때문에 레이아웃을 그대로 가져옴

element.style.top = currentTop;
element.style.left = currentLeft + 1;
```
- jquery 는 requestAnimationFrame 이 아닌 setInterval 을 사용. setInterval 은 명령을 어떡해서든 실행시키므로 성능이 좋지 않을 수 있음.
```js
var startingTop = 0;
function tick () {
    element.style.top = (startingTop += 1/60);
}

// 60fps를 만족하기 위해 16ms마다 실행. (16ms * 60 == 960ms, 약 1000ms)
setInterval(tick, 16);

// 브라우저가 기본적으로 60fps로 실행시킴. 브라우저가 알아서 상태를 판단하여, 때때로 몇몇 프레임을 스킵할 수 있음
window.requestAnimationFrame(tick);
```

### velocity.js 애니메이션 최적화 방법

- 레이아웃 스레싱 최소화
- DOM 질의를 최소화 하기 위해 속성값 캐싱
- px, em 같은 단위 변환 비율을 캐싱
- 업데이트가 시각적으로 판별할 수 없는 수준이면 스타일 업데이트 스킵

## CSS 트리거

## CORS

> Cross-Origin Resource Sharing <br>
> 하나의 웹 페이지에서 다른 도메인 서버에 요청하는 것을 승인하거나 차단하는 것을 결정하는 것.

## SOP

> Same-Origin Policy <br>
> 다른 도메인간의 request 를 제한하는 정책

## CORS 허가 방법

> 1) 서버에서 헤더 설정으로 요청을 허가한다.

- response.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");<br>
- response.setHeader("Access-Control-Max-Age", "3600"); --> 최소 1시간동안 서버에게 재요청 하지 않음.<br>
- response.setHeader("Access-Control-Allow-Headers", "x-requested-with"); --> AJAX 호출할 때 이 헤더가 붙는 걸 확인
- response.setHeader("Access-Control-Allow-Origin", "*");

> 2) JSONP

## JSONP (JSON with padding)

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

##


출처 :
https://velog.io/@tmmoond8/%ED%94%84%EB%A1%A0%ED%8A%B8%EC%97%94%EB%93%9C-%EA%B0%9C%EB%B0%9C%EC%9E%90-%EC%9D%B8%ED%84%B0%EB%B7%B0-%ED%9B%84%EA%B8%B0-%EB%A9%B4%EC%A0%91-%EC%A7%88%EB%AC%B8-%EC%A0%95%EB%A6%AC-%EC%9E%91%EC%84%B1-%EC%A4%91

