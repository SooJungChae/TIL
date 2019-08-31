# 목차
- [DocType](#doctype)
- [Meta tag](#meta-tag)
- [스탠더드 모드와 관용(쿼크) 모드간의 차이](#스탠더드-모드-vs-관용쿼크-모드)
- [XHTML 페이지의 제약사항](#xhtml-페이지의-제약사항)
- [다국어 페이지 제공방식](#다국어-페이지-제공방식)
- [HTML5 에서 XHTML 문법 사용하는 방법](#html5-에서-xhtml-문법-사용하는-방법)
- [data-*](#data-)
- [HTML5 특징](#html5-의-특징)
- [Cookie, sessionStorage, localStorage](#cookie-sessionstorage-localstorage)
- [DOM 에서 id 와 class 의 차이](#dom-에서-id-와-class-의-차이)
- [SPA](#spa)
- [검색엔진 최적화 문제](#검색엔진-최적화-문제)
- [float 을 해제하지 않으면 안되는 이유](#float-을-해제하지-않으면-안되는-이유)
- [css 애니메이션, js 애니메이션 차이](#css-애니메이션-js-애니메이션-차이)
- [CSS 트리거](#css-트리거)
- [SOP](#sop)
- [CORS 허가 방법](#cors-허가-방법)

## DocType

> 웹 표준을 지키는 문서타입.

HTML, XHTML 등이 있는데 어떤 버전의 문서 타입인지 표시한다.
HTML5 에서는 `<!DOCTYPE html>` 이런 식으로 문서 타입을 지정한다.
- 만약 XHTML 1.1 버전을 사용한다고 하면 이렇게 표현해야 한다.
- `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">`

## 스탠더드 모드 vs 관용(쿼크) 모드

> 하위 호환성을 배제하고 현재 표준 형식만을 인정하는가? <br>
> 하위 호환성을 유지하기 위해 현재 표준에 어긋나는 형식을 지원할 것인가?

## XHTML 페이지의 제약사항

> - 단독 선언 태그 뒤에는 "/" 를 사용해야 한다. <br>
> - 인라인 요소가 블록 요소를 감싸면 안된다.
> - & 는 반드시 &amp; 로 대체해야 한다.
> - 태그 이름이나 속성에 대문자를 사용하면 안된다.
> - attribute 선언시 shortcut 을 사용하면 안된다.

## Meta tag

> 문서가 어떤 내용을 담고 있고 있는지 알려주는 태그.

- 이렇게 표현.
- `<meta name="viewport" conten"width=device-width, initial-scale=1>`
- 주로 subject, keywords, title, author 키 를 사용한다.

## 다국어 페이지 제공방식

> html 선언시 주요 사용언어를 기입해준다. <html lang="ko">

## HTML5 에서 XHTML 문법 사용하는 방법

> - MIME 타입을 `application/xhtml-html` 로 지정한다.
> - 파일 최상단에 인코딩을 지정해준다. `<?xml version="1.0" encoding="UTF-8"?>`
> - 네임스페이스를 명시해준다. `<html xmlns="http://www.w3c.org/1999/xhtml">`

## data-*

> 사용자가 임의 설정하고 선언할 수 있는 데이터의 정의.

## HTML5 의 특징

> - 시멘틱 마크업
> - 미디어 핸들링을 위한 내장 플랫폼
> - application API
> - 오프라인 핸들러

## Cookie, sessionStorage, localStorage

> - cookie 는 클라이언트 컴퓨터에 텍스트 기반 파일로 저장된다.
> - sessionStorage 는 브라우저의 window 에 저장되어서 윈도우 닫히면 저장된 데이터 사라진다.
> - localStorage 브라우저 자체에 저장되며 윈도우 닫혀도 내용을 유지할 수 있다.

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

> 2) [JSONP](./interview_js.md#jsonp)


출처 :
- https://velog.io/@tmmoond8/%ED%94%84%EB%A1%A0%ED%8A%B8%EC%97%94%EB%93%9C-%EA%B0%9C%EB%B0%9C%EC%9E%90-%EC%9D%B8%ED%84%B0%EB%B7%B0-%ED%9B%84%EA%B8%B0-%EB%A9%B4%EC%A0%91-%EC%A7%88%EB%AC%B8-%EC%A0%95%EB%A6%AC-%EC%9E%91%EC%84%B1-%EC%A4%91
- http://insanehong.kr/post/front-end-developer-interview-html/
