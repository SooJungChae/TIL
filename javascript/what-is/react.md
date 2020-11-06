## Hooks

### useEffect
첫번재 렌더링과 이후의 모든 업데이터에서 수행된다. **렌더링 이후에 발생** 하는 것이기 때문에 effect 가 수행되는 시점에 DOM 이 이미 업데이트 되었음을 보장한다.

## Suspense
컴포넌트가 렌더링하기 전에 다른 작업이 먼저 이루어지도록 "대기한다".
loader 를 사용할 곳이 여기다. 이 때 lazy 한 컴포넌트를 지연시켜서 불러와야 한다. 
```js
// 이 컴포넌트는 동적으로 불러옵니다
const OtherComponent = React.lazy(() => import('./OtherComponent'));

function MyComponent() {
  return (
    // Displays <Spinner> until OtherComponent loads
    <React.Suspense fallback={<Spinner />}>
      <div>
        <OtherComponent />
      </div>
    </React.Suspense>
  );
}
```

## 참고
- [Effect Hook 사용하기 - React 공식 문서](https://ko.reactjs.org/docs/hooks-effect.html)
- [React 최상위 API - React 공식 문서](https://ko.reactjs.org/docs/react-api.html#reactsuspense)
- [useAsync 커스텀 Hook 만들어서 사용하기](https://react.vlpt.us/integrate-api/03-useAsync.html)