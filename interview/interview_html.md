# 목차
- [브라우저가 동작하는 순서](#브라우저가-동작하는-순서)
- [웹 페이지 속도 개선 방안](#웹-페이지-속도-개선-방안)
- [HTML](#html)
- [스키마](#스키마)
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
- [CORS](#cors)
- [SOP](#sop)
- [Web worker](#web-worker)
- [CSS3](#css3)

## 브라우저의 주요 구성 요소

> - 사용자 인터페이스
> - 브라우저 엔진
> - 렌더링 엔진
> - 통신
> - UI 백엔드
> - 자바스크립트 해석기
> - 자료 저장

- [](https://d2.naver.com/helloworld/59361)

## 브라우저 렌더링 엔진이 동작하는 순서
[맨 위로](#목차)

> 1) HTML파싱해서 DOM 트리 구축
> 2) 렌더 트리 구축 (DOM + 스타일 규칙)
> 3) 렌더 트리 배치
> 4) 렌더 트리 그리기

- [기본적인 웹 사이트 최적화 방법](https://12bme.tistory.com/128)

## DOM

> 도큐먼트 객체와 관련된 객체의 집합.

- 웹 브라우저가 HTML 페이지를 인식하는 방식

## 웹 페이지 속도 개선 방안
[맨 위로](#목차)

> - HTTP 리퀘스트 줄이기
>   - javascript 파일 통합
>   - 파일 크기 1~2KB 이상이라면 Gzip 으로 압축
>   - 불필요한 404 상태 코드 요소 찾기
>   - CSS 스프라이트 활용. (`background-position` 으로 스위칭)
> - 스타일 시트, 자바스크립트 배치
>   - 파이어 폭스나 IE는 스타일시트 파일 모두 다운로드 할때까지 화면 렌더링하지 않고 기다린다.
>   - js 파일을 다운로드해서 실행하기 전까지 브라우저는 DOM 파싱 중지, 아무것도 렌더링 하지 않음.
> - 초기 렌더링 시 Ajax 요청 최소화
>   - 데이터가 있는 마크업 전체를 서버에서 보내고, 사용자 요청이 있을 때만 Ajax 요청하기
> - 데이터 캐싱하기
>   - 쿠키 대신 web storage 사용
>   - 헤더에 만료 날짜 추가
> - 중첩된 태그를 최소화한다.
> - javascript animation 보다 CSS Transition 사용
> - 모바일 환경에서 터치 이벤트 구현할 때 click 이벤트는 300ms 딜레이 발생. touchstart, touchmove, touchend 로 대체

- [Best Practices for a Faster Web App with HTML5](https://www.html5rocks.com/en/tutorials/speed/quick/)
- [기본적인 웹 사이트 최적화 방법](https://12bme.tistory.com/128)

## RESTful 아키텍쳐


## HTML
[맨 위로](#목차)

> 내용과 형식을 분리한 마크업 언어.

- 내용에 대해서는 이해를 하지 못하고 어떤 데이터는 <h1>로 보여주고 어떤 데이터는 <p> 로 표현하자는 규약에 불과하다.

## 스키마
[맨 위로](#목차)
> 데이터에 의미를 부여하는 것.

## DocType
[맨 위로](#목차)

> 웹 표준을 지키는 문서타입.

HTML, XHTML 등이 있는데 어떤 버전의 문서 타입인지 표시한다.
HTML5 에서는 `<!DOCTYPE html>` 이런 식으로 문서 타입을 지정한다.
- 만약 XHTML 1.1 버전을 사용한다고 하면 이렇게 표현해야 한다.
- `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">`

## Meta tag
[맨 위로](#목차)
> 문서가 어떤 내용을 담고 있고 있는지 알려주는 태그.

- 이렇게 표현.
- `<meta name="viewport" conten"width=device-width, initial-scale=1>`
- 주로 subject, keywords, title, author 키 를 사용한다.

## 스탠더드 모드 vs 관용(쿼크) 모드
[맨 위로](#목차)
> 하위 호환성을 배제하고 현재 표준 형식만을 인정하는가? <br>
> 하위 호환성을 유지하기 위해 현재 표준에 어긋나는 형식을 지원할 것인가?

## XHTML 페이지의 제약사항
[맨 위로](#목차)
> - 단독 선언 태그 뒤에는 "/" 를 사용해야 한다. <br>
> - 인라인 요소가 블록 요소를 감싸면 안된다.
> - & 는 반드시 `&amp;` 로 대체해야 한다.
> - 태그 이름이나 속성에 대문자를 사용하면 안된다.
> - attribute 선언시 shortcut 을 사용하면 안된다.

## 다국어 페이지 제공방식
[맨 위로](#목차)
> html 선언시 주요 사용언어를 기입해준다. <html lang="ko">

## HTML5 에서 XHTML 문법 사용하는 방법
[맨 위로](#목차)
> - MIME 타입을 `application/xhtml-html` 로 지정한다.
> - 파일 최상단에 인코딩을 지정해준다. `<?xml version="1.0" encoding="UTF-8"?>`
> - 네임스페이스를 명시해준다. `<html xmlns="http://www.w3c.org/1999/xhtml">`

## 마크업

> 웹 페이지를 만들기 위해서 내용과, 구조를 만드는 언어다.

## data-*
[맨 위로](#목차)
> 사용자가 임의 설정하고 선언할 수 있는 데이터의 정의.

## HTML5 의 특징
[맨 위로](#목차)
> - 시멘틱 마크업
> - 미디어 핸들링을 위한 내장 플랫폼
> - application API
> - 오프라인 핸들러

## Cookie, sessionStorage, localStorage
[맨 위로](#목차)
> - cookie 는 클라이언트 컴퓨터에 텍스트 기반 파일로 저장된다.
> - sessionStorage 는 브라우저의 window 에 저장되어서 윈도우 닫히면 저장된 데이터 사라진다.
> - localStorage 브라우저 자체에 저장되며 윈도우 닫혀도 내용을 유지할 수 있다.

## DOM 에서 id 와 class 의 차이
[맨 위로](#목차)
> 1) id 는 유일한 값, class 는 여러번 중복 가능하다. <br>
> 2) 문서 내에 id 를 통해 해당 위치로 이동할 수 있다.

## SPA
[맨 위로](#목차)
> 서버에 전체 페이지를 로드하지 않고 필요한 부분만 로드하는 것.

### SPA 장점
- 성능. 속도에 영향을 주는 서버 요청을 줄여준다.
- UX. 속도가 좋기 때문에 사용자에게 좋은 환경을 제공한다.

### SPA 단점
- **처음 속도가 느리다.** 많은 리소스들을 처음 한번에 받기 때문에 느리다.
- **보안 이슈.** 핵심로직은 클라에서는 최소화시키고 서버에서 수행하도록 한다.
- **[검색엔진 최적화 문제.](#검색엔진_최적화_문제)**
- **JS 가 활성화되어야 한다.** 누군가가 JS 작동 멈추면 SPA 는 소용없음.

## 검색엔진 최적화
[맨 위로](#목차)
> - 메타 태그 추가 (keywords, description)
> - 스키마 마크업
> - 이미지에 alt 속성 기재
> - 앵커 텍스트에 키워드 기재 `<a href=“https://www.gabia.com”>가비아 바로가기</a>`
> - `rel="next"` 나 `rel="prev" 로 연재글 사이의 순서 알림
> - HTTPS 사용

- https://library.gabia.com/contents/domain/4359

### 스키마 마크업

> 마크업에 스키마를 추가해서 검색엔진이 좋은 결과를 낼 수 있게 도와준다.

- itemscope, itemtype, itemid
- itemprop, itemref
- [HTML microdata](https://www.w3.org/TR/2018/WD-microdata-20180426/)

 JSON-LD

https://www.twinword.co.kr/blog/schema-markup/

### 검색엔진 최적화 문제

> 서버 렌더링 방식이 아닌, 클라이언트에서 자바스크립트로 렌더링 하는 방식은
검색 봇(Bot)이 찾을 수 없는 문제가 있다.

## float 을 해제하지 않으면 안되는 이유
[맨 위로](#목차)
> 부모는 float 된 자식의 크기는 계산하지 않고 그린다.

### 해결법
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
[맨 위로](#목차)
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
[맨 위로](#목차)

## CORS
[맨 위로](#목차)
> Cross-Origin Resource Sharing <br>
> 하나의 웹 페이지에서 다른 도메인 서버에 요청하는 것을 승인하거나 차단하는 것을 결정하는 것.

### CORS 허가 방법

> 1) 서버에서 헤더 설정으로 요청을 허가한다.

- response.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");<br>
- response.setHeader("Access-Control-Max-Age", "3600"); --> 최소 1시간동안 서버에게 재요청 하지 않음.<br>
- response.setHeader("Access-Control-Allow-Headers", "x-requested-with"); --> AJAX 호출할 때 이 헤더가 붙는 걸 확인
- response.setHeader("Access-Control-Allow-Origin", "*");

> 2) [JSONP](./interview_js.md#jsonp)

## SOP
[맨 위로](#목차)
> Same-Origin Policy <br>
> 다른 도메인간의 request 를 제한하는 정책

## Web worker
[맨 위로](#목차)
> 스크립트가 웹 페이지의 성능에 영향을 미치지 않도록 백 그라운드 스레드에서 스크립트를 동작하게 해주는 자바스크립트.

- `window.Worker`로 지원 유무 확인 가능
- `webworker.terminate(); webworker = undefined; `로 종료

## CSS3
[맨 위로](#목차)
- 그라디언트
- border-radius
- box-shadow
- RGBA
- 변형 & 회전
- CSS Masks

- [웹 퍼포먼스 높이기](https://spoqa.github.io/2012/06/18/enhence-web-performance.html)

## 기타 출처
- https://velog.io/@tmmoond8/%ED%94%84%EB%A1%A0%ED%8A%B8%EC%97%94%EB%93%9C-%EA%B0%9C%EB%B0%9C%EC%9E%90-%EC%9D%B8%ED%84%B0%EB%B7%B0-%ED%9B%84%EA%B8%B0-%EB%A9%B4%EC%A0%91-%EC%A7%88%EB%AC%B8-%EC%A0%95%EB%A6%AC-%EC%9E%91%EC%84%B1-%EC%A4%91
- http://insanehong.kr/post/front-end-developer-interview-html/
