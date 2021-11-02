2021.10.27

next 12 버전이 발표되었다.

## HTML streaming
 
서버에서 html 을 보내주는 것.

renderToString -> pipiToNodeWritable 이용하면
html 코드를 작은 청크로 나누어 보낼 수 있다.

`<Suspense>` 는 전체 페이지를 작은 청크로 나누어
렌더링할 수 있게 도와준다.

리엑트 18에서 소개된 건 아니고 2018년도에 소개되어
CSR 렌더링 단계에서 큰 번들의 자바스크립트 코드들을 
작은 청크로 나누어 로드될 수 있도록 React.lazy 와 함께 수행했다.
이걸 코드 스플리팅이라고 한다.

하지만 서버 사이드 렌더링을 구현할 때 사용되는 `renderToString` 과 
함께 사용할 수 없었고, loadable-component 와 같은 서드파티 라이브러리를 함께 사용해야 했다.

React 18 부터는 서드파티 라이브러리 없이도 <Suspense /> 를 SSR 환겨에서 정상적으로 이용 가능하다.

페이지가 유저 인터렉션에 반응하기 위해선 html 에 JS 코드들이 동화되어야 하는데
이걸 `hydration` 과정이라 한다.

## 선택적 hydration

어떤 것을 hydration 먼저 시킬지 우선순위를 정할 수 있게 되었다.

두개 항목이 Suspense 로 감싸져있다고 할때 hydration 은 돔 트리에 배치된 순서에 따라 순차적으로 전행된다.
그런데 만약, 첫번째 Suspense 항목이 hydration 되기 이전에 두번째 Suspense 항목에 버튼 클릭을 발생시켰다면,
리액트는 해당 클릭 이벤트를 기록하고 두번째 부분에 대한 hydration 우선순위를 높여서 진행한다.
 
Suspense 를 좀더 세분화해서 여러 부모 자식 관계를 가진 컴포넌트로 만들 수도 있다.
인터렉션이 발생한 요소부터 실행하기 때문에 hydration 이 즉시 일어나는 것 같은 느낌을 받을 수 있다.

```jsx
<Layout>
  <NavBar />
  <Suspense fallback={<BigSpinner />}>
    <Suspense fallback={<SidebarGlimmer />}>
      <Sidebar />
    </Suspense>
    <RightPane>
      <Post />
      <Suspense fallback={<CommentsGlimmer />}>
        <Comments />
      </Suspense>
    </RightPane>
  </Suspense>
</Layout>
```

## state batch update (automatic batching!!!!)

업데이트 되는 대상을 하나의 그룹으로 묶어서 한번에 리렌더링되게 할 수 있었다.

```js
function handleClick() {
    setCount(c => c + 1); // Does not re-render yet
    setFlag(f => !f); // Does not re-render yet
    // React will only re-render once at the end (that's batching!)
  }
```
react 18 이전에도 지원이 됐지만 클릭과 같은 브라우저 이벤트에서만 적용이 가능하고
api 호출에 콜백으로 넣은 함수나 timeouts 함수에서는 작동하지 않았다.

```js
function handleClick() {
    fetchSomething().then(() => {
      // React 17 and earlier does NOT batch these because
      // they run *after* the event in a callback, not *during* it
      setCount(c => c + 1); // Causes a re-render
      setFlag(f => !f); // Causes a re-render
    });
  }

setTimeout(() => {
  setCount(c => c + 1); // re-render occurs
  setFlag(f => !f); // re-render occurs again!
}, 1000);
```

18버전부터는 React.createRoot 를 이용해 브라우저 이벤트 뿐 아니라 timeouts, promise 를 비롯한
모든 이벤트에서 batching 이 자동으로 적용된다.

```js
// onClick 핸들러
function handleClick() {
  setCount(c => c + 1);
  setFlag(f => !f);
  // React will only re-render once at the end (that's batching!)
}

// setTimeout
setTimeout(() => {
  setCount(c => c + 1);
  setFlag(f => !f);
  // React will only re-render once at the end (that's batching!)
}, 1000);

// fetch API
fetch(/*...*/).then(() => {
  setCount(c => c + 1);
  setFlag(f => !f);
  // React will only re-render once at the end (that's batching!)
})

// addEventListener callback
elm.addEventListener('click', () => {
  setCount(c => c + 1);
  setFlag(f => !f);
  // React will only re-render once at the end (that's batching!)
});
```

만약 batch 를 적용하고 싶지않다면 ReactDOM.flushSync() 를 이용해 
해당 상태 업데이트 호출을 배치 대상에서 제외시킬 수 있다.

```js
import { flushSync } from 'react-dom'; // Note: react-dom, not react

function handleClick() {
  flushSync(() => {
    setCounter(c => c + 1);
  });
  // React has updated the DOM by now
  flushSync(() => {
    setFlag(f => !f);
  });
  // React has updated the DOM by now
 }
```

TODO: transition


- https://velog.io/@jay/React-18-%EB%B3%80%EA%B2%BD%EC%A0%90
