# React 에서의 코드 분할

리액트 앱은 한번에 전체 페이지를 모아서 번들 파일로 만든다. 프로젝트가 커질 수록 이 파일의 크기도 커진다.
그래서 큰 큐모의 프로젝트에서는 파일을 **'쪼개는'** 작업이 필요하다.

코드 분할을 하면 앱을 "lazy loading" 하게 도와주어 성능을 향상시킨다.
코드의 양을 줄이지 않고 필요하지 않은 코드는 불러오지 않도록 하는 방법이다.

> **lazy loading** 이란 페이지를 읽어들이는 시점에 필요하지 않은 리소스는 추후에 로딩을 하는 기술이다.
> lazy loading 을 하면 페이지가 placeholder 콘텐츠로 작성되며, 사용자가 필요할 때만 실제 콘텐츠로 대체된다.

## import()
이 코드를
```js
import { add } from './math';

console.log(add(16, 26));
```
이렇게 바꾸면
```js
import("./math").then(math => {
  console.log(math.add(16, 26));
});
```
앱의 코드를 분할한다. 

## React.lazy
동적 import 를 사용해서 컴포넌트를 렌더링 할 수 있다.
lazy 컴포넌트는 `Suspense` 컴포넌트 하위에서 렌더링 되어야 한다.
`Suspense` 는 lazy 컴포넌트가 로드되길 기다리는 동안 예비 컨텐츠를 보여줄 수 있다.

lazy 컴포넌트는
```js
import OtherComponent from './OtherComponent';
```
이런식으로 import 한다.
```js
const OtherComponent = React.lazy(() => import('./OtherComponent'));
```

## Suspense




## 참고
- [코드 분할 - react 공식 문서](https://ko.reactjs.org/docs/code-splitting.html)
- [Lazy Loading 이란? - scarlett-dev](https://scarlett-dev.gitbook.io/all/it/lazy-loading)