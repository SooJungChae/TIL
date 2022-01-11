# `router.push` vs `<Link>` vs `<a>` in Next.js

## `router.push`

- `router.push('/push')` 는 window.location 과 비슷하게 행동한다.
- `<a>` tag 를 생성하지 않는다. -> 크롤러들이 이 링크를 감지하지 못하기 때문에 SEO 를 고려한다면 안좋은 부분이다. 

## `<Link>`

- children 에 string 을 전달할 때에만 `<a>` 태그를 만든다. -> 크롤러들이 사이트를 방문할 때 링크를 감지할 수 있다.
- `<div>`, `<a>`, `<image>` 등 다른 요소가 들어오면 `<a>` 태그를 만들지 않는다.
- SPA 처럼 페이지를 리로딩하지 않고 이동할 수 있다.
 
## `<a>`
- next.js 의 `<Link>` 없이 사용하면 정규 하이퍼링크 태그를 생성한다.
- full reload 가 일어난다.

---

## 결론
- `<Link>` 태그를 주로 사용하자.
- `<Link>` 를 사용하기 힘든 경우에 (예) 기능 처리 이후 페이지 이동해야할 때) `router.push` 를 사용하자.

---

## 참고
- [Next.JS "Link" vs "router.push()" vs "a" tag](https://stackoverflow.com/questions/65086108/next-js-link-vs-router-push-vs-a-tag/65086176)