# Next.js 프로젝트로 구글 PageSpeed 에서 99% 스코어 받기


다음 사이트를 정리한 글입니다. <br/>
[7 Next.JS Tips to get a 99% score on Google PageSpeed](https://alabenaicha.medium.com/7-next-js-tips-to-get-a-90-score-on-google-pagespeed-55130221cc7) - Ala Ben Aicha


## 1. SSR (Server Side Rendering)

순서
- 클라이언트에서 요청을 하면 서버에서 렌더링을 한다.
- 렌더링된 HTML 파일을 브라우저로 보낸다.
- 브라우저는 자바스크립트 코드를 실행해서 사이트가 상호작용할 수 있게 만든다.

특징
- 서버에서 파일을 만들기 때문에 로딩 속도가 빠르다.
- SEO 에 좋다.

## 2. SSG (Static Site Generation)
- build time 에 파일을 미리 만들어 놓는 방법.
- HTML + CSS + JS + 기타 static 파일들이 생긴다.

특징
- build 시간이 증가한다.

**Next.js 에서 data fetching 하는 방법**

- getStaticProps: build time 에 pre-render 된다.
- getServerSideProps: run time 에 pre-render 된다.
- getStaticPaths: build time 에 pre-render 될 페이지 리스트를 생성한다.

## 3. <Image />
- `<image />` 겉에 `<div>` 를 감싼 Next.js 컴포넌트다.
- layout shift 를 방지한다.
- lazy loading 지원: 해당 영역으로 스크롤이 되는 순간 렌더링 된다.
- target viewport 에 따라서 적절한 비율로 이미지를 렌더링해준다.
- file format 이 SEO 에 좋게 자동 변환된다. (WebP 같은 것, 브라우저가 지원한다면)

## 4. Font 최적화
```js
import Head from 'next/head';
...
<Head>
  <link href="https://fonts.googleapis.com/css2?family=Lobster" rel="stylesheet" />
</Head>
```
- 일반적으로 폰트가 다운받아지는 순서
  - 1) Lobster css style 을 다운받는다.
  - 2) Lobstar font 를 다운받는다.
- `<Head>` 안에 폰트를 넣으면 1) 단계를 무시할 수 있다. Next.js 가 알아서 link 밑에 스타일을 미리 변환해서 넣어주기 때문. (사이트 참고)

## 5. dynamic import
- 일반적인 import 방식은 파일을 읽을 때 읽어오지만 dynamic import 는 원할 때 읽어올 수 있다.
- 분리된 bundle file 로 code splitting 을 할 필요 없이 dynamic import 를 사용해서 페이지 로드 시간을 줄이면 된다.
- TODO: 예시 테스트

## 6. script 최적화
- third-party 라이브러리를 순차적으로 import 시킬 수 있다.
- beforeInteractive, lazyOnload, afterInteractive 방식이 있다.

## 7. Next.js analytics
TODO: Vercel 을 안쓰고 있어서 아직 필요없음

