# react-testing-library 과 "not wrapped in act" in React Admin project  

## 에러메세

```js
Warning: An update to SelectPlanet inside a test was not wrapped in act(...).

When testing, code that causes React state updates should be wrapped into act(...):

act(() => {
  /* fire events that update state */
});
/* assert on the output */

```

비동기를 감쌀 수 있는 방법은 react-dom 의 act() 함수를 사용하는 것이다.

testing-library 에서는 모든 action 들이 act() 로 감싸져있기 때문에 act() 를 쓸 필요없이 자동으로 동기 처리가 된다.
> https://testing-library.com/docs/react-testing-library/migrate-from-enzyme/#using-act-and-wrapperupdate

하지만 act() 를 쓰라고 warning 이 나온 이유는, 비동기 상황이 새롭게 만들어졌기 때문이다.

```js
// SelectPlanet.test.tsx
it('should not fail for empty props', () => {
      render(
        <FinalForm
          render={() => (
            <TestContext>
              <SelectPlanet />
            </TestContext>
          )}
        />
      )
  })
```

```js
// SelectPlanet.tsx
... 
useEffect(() => {
  // Doesn't exist planet data in store.
  if (c.length === 0) {
    dataProvider
      .getList(resourceName,GET_LIST_DEFAULT_PARAMS)
      .then(({ data }) => {
        setChoices(data);
      })
      .catch((error) => {
        notify(`get ${choiceName} options error: ${error.message}`, { type: 'warning' });
      });
  }
}, []);

render(...);

...

```
render 는 동기처리로 완료했지만, 
useEffect 를 사용해서 렌더링이 완료된 후, 내부에서 API 호출을 하고 response 받은 데이터를 setState 로 업데이트 시켜주고 있었다.

그래서 새로운 비동기 액션으로 인해 act() 경고문이 발생한 것이다.

## 해결방법

testing-library 에서는 `waitFor` 함수를 제공하는데 이걸 쓰면 timeout (default 1000ms)될 때까지 Promise 로 callback 을 기다린다.
> https://testing-library.com/docs/dom-testing-library/api-async/#waitfor

이걸 async, await 과 함께 사용하면 경고창을 없앨 수 있다.

```js
// SelectPlanet.test.tsx
it('should not fail for empty props', async () => {
  await waitFor(() =>
    render(
      <FinalForm
        render={() => (
          <TestContext>
            <SelectPlanet />
          </TestContext>
        )}
      />
    )
  );
})
```

