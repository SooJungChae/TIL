# Redux 강의 정리
:gift:[https://egghead.io/lessons/react-redux-writing-a-counter-reducer-with-tests](https://egghead.io/lessons/react-redux-writing-a-counter-reducer-with-tests)

## 1-2. Basic
하나의 state tree 에
- data, state object, action 가 있다.
- state tree 는 read only
- action : describing what happen in the app
- action : plain js object

## 5. Writing a Counter Reducer with Tests
```javascript
function counter(state, action) {
  if (typeof state === 'undefined') {
  return 0;
  }

  switch(action.type) {
  case "INCREMENT":
  return state + 1;
  case "DECREMENET" :
  return state - 1;
  default :
  return state;
  }
}

expect(
  counter(0, { type: 'INCREMENT' })
).toEqual(1);

expect(
  counter(1, { type: 'DECREMENT' })
).toEqual(0);

expect(
  counter(undefined, {})
).toEqual(0);

console.log('Test passed!');
```
이걸 es6 구문으로 바꾸면

const counter = (state = 0, action) => {
  switch(action.type) {
  case "INCREMENT":
  return state + 1;
  case "DECREMENET" :
  return state - 1;
  default :
  return state;
  }
}

## 6. Store Methods: getState(), dispatch( ), subscribe()
- subscribe() : callback 하고 rerender 한다 (?)
- redux 를 CDN 으로 갖고오면 다음처럼 import 할 수 있다. 셋 다 같은 말
```javascript
const { createStore } = Redux;
// var createStore = Redux.createStore;
// import { createStore } from 'redux';
```
- redux 의 createStore 를 가져오면 reducer 를 연결해서 store 의 메서드를 사용할 수 있다.
- `const store = createStore(counter);`

페이지 클릭하면 카운터 되는 예시
```javascript
const { createStore } = Redux;
const store = createStore(counter);

store.subscribe(() => {
  document.body.innerText = store.getState();
});

document.addEventListener('click', () => {
  store.dispatch({ type: 'INCREMENT' });
})
```
- 맨 처음 화면이 로드되었을 때 **state**(0)를 출력하지 못하는데,
- subscribe 부분에 getState 를 출력하는 방식을 취하고 있기 때문이다.
- 위의 코드를 다음과 같이 바꾸면 페이지 렌더시에 바로 state 를 출력할 수 있다.
```js
const { createStore } = Redux;
const store = createStore(counter);

const render = () => {
  document.body.innerText = store.getState();
};

store.subscribe(render);
render();

document.addEventListener('click', () => {
  store.dispatch({ type: 'INCREMENT' });
})
```

## 7. Implementing Store from Scratch

createStore 를 다음으로 구현할 수 있다.
```js
// const { createStore } = Redux;
const createStore = (reducer) => {
  let state;
  let listeners = [];

  const getState = () => state;

  const dispatch = (action) => {
  state = reducer(state, action);
  listeners.forEach(listener => listener());
  };

  const subscribe = (listener) => {
  listeners.push(listener);
  return () => {
  listeners = listeners.filter(l => l !== listener);
  };
  };

  dispatch({});

  return { getState, dispatch, subscribe };
};
```

## 8. React Counter example
- 위의 방식은 큰 프로젝트에선 비효율적. 그래서 리액트를 써보기로 한다.
```js
const counter = (state = 0, action) => {
  switch(action.type) {
  case "INCREMENT":
  return state + 1;
  case "DECREMENET" :
  return state - 1;
  default :
  return state;
  }
}

// const { createStore } = Redux;
const createStore = (reducer) => {
  let state;
  let listeners = [];

  const getState = () => state;

  const dispatch = (action) => {
  state = reducer(state, action);
  listeners.forEach(listener => listener());
  };

  const subscribe = (listener) => {
  listeners.push(listener);
  return () => {
  listeners = listeners.filter(l => l !== listener);
  };
  };

  dispatch({});

  return { getState, dispatch, subscribe };
};

const Counter = ({
  value,
  onIncrement,
  onDecrement
}) => {
  <h1>{value}</h1>
  <button onClick={onIncrement}>+</button>
  <button onClick={onDecrement}>-</button>
}

const store = createStore(counter);
const render = () => {
  <Counter
  value={store.getState()}
  onIncrement={() => store.dispatch({ type: 'INCREMENT' }) }
  onDecrement={() => store.dispatch({ type: 'DECREMENET'}) }
  />,
  document.getElementByid('root');
}

store.subscribe(render);
render();

document.addEventListener('click', () => {
  store.dispatch({type: 'INCREMENT'});
});
```
- 여기서 Counter 는 dumb component 다.
- 비지니스 로직이 없거든.
- 그냥 output render 하고, callback 을 수행한다.
- counter 리듀서가 어떻게 변화할지 비지니스 로직을 얘기하고 있다.
