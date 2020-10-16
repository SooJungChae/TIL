redux 개념은 [이곳](../javascript/what-is/redux.md)에서 확인할 수 있다.

## 개발 순서

1. Redux store 를 만든다.
- `configureStore` 로 store 가 만들어진다.
- reducer 를 인자로 받는다.
```js
// features/counter/counterSlice.js

import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'counter',
  initialState: {
    value: 0,
  },
  reducers: {
    increment: state => {
      state.value += 1;
    },
    decrement: state => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount } = slice.actions;

export const selectCount = state => state.counter.value;

export default slice.reducer;
```

```js
// app/store.js

import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'

export default configureStore({
  reducer: {
    counter: counterReducer
  }
})
```

createSlice 사용법 example
```js
// https://redux-toolkit.js.org/api/createSlice
import { createSlice, createAction } from '@reduxjs/toolkit'
import { createStore, combineReducers } from 'redux'

const incrementBy = createAction('incrementBy')
const decrementBy = createAction('decrementBy')

const counter = createSlice({
  name: 'counter',
  initialState: 0,
  reducers: {
    increment: (state) => state + 1,
    decrement: (state) => state - 1,
    multiply: {
      reducer: (state, action) => state * action.payload,
      prepare: (value) => ({ payload: value || 2 }), // fallback if the payload is a falsy value
    },
  },
  // "builder callback API", recommended for TypeScript users
  extraReducers: (builder) => {
    builder.addCase(incrementBy, (state, action) => {
      return state + action.payload
    })
    builder.addCase(decrementBy, (state, action) => {
      return state - action.payload
    })
  },
})

const user = createSlice({
  name: 'user',
  initialState: { name: '', age: 20 },
  reducers: {
    setUserName: (state, action) => {
      state.name = action.payload // mutate the state all you want with immer
    },
  },
  // "map object API"
  extraReducers: {
    [counter.actions.increment]: (
      state,
      action /* action will be inferred as "any", as the map notation does not contain type information */
    ) => {
      state.age += 1
    },
  },
})

const reducer = combineReducers({
  counter: counter.reducer,
  user: user.reducer,
})

const store = createStore(reducer)

store.dispatch(counter.actions.increment())
// -> { counter: 1, user: {name : '', age: 21} }
store.dispatch(counter.actions.increment())
// -> { counter: 2, user: {name: '', age: 22} }
store.dispatch(counter.actions.multiply(3))
// -> { counter: 6, user: {name: '', age: 22} }
store.dispatch(counter.actions.multiply())
// -> { counter: 12, user: {name: '', age: 22} }
console.log(`${counter.actions.decrement}`)
// -> "counter/decrement"
store.dispatch(user.actions.setUserName('eric'))
// -> { counter: 6, user: { name: 'eric', age: 22} }
```

## Async Logic and Data Fetching
API 서버가 개발되지 않았을 때 클라이언트에서 테스트용으로 데이터를 전송하는 걸 만들어보자.

**Server**
- `src/api/server.js` 파일에 `fakeApi`를 만든다.
- `fakeApi` 는 `/fakeApi/posts`, `fakeApi/users`, `fakeApi/notifications` 요청에 대한 `GET, POST, PUT, DELETE` 메서드를 지원한다.
- 페이지 호출할 때마다 랜덤 시간이 걸리게 된다. 지우고 싶으면 브라우저의 localStorage 에서 `randomTimestampSeed` 값을 지우던가 `src/api/server.js` 에서 `useSeededRNG` 값을 `false` 로 변경한다.

**Client**
- `src/api/client.js` 파일에 요청 호출 코드를 작성한다.
- `client.get()`, `client.post()` 메서드를 갖고 있는 `client object` 를 만들 것이다.

API 요청할 때 현재 상태를 지속적으로 트랙킹 하도록 slice 코드를 바꿔야 한다.


 
## 참고
- [redux 공식문서](https://redux.js.org/tutorials/essentials/part-2-app-structure)
- [redux 공식문서 - Performance 높이기 위해선?](https://redux.js.org/tutorials/essentials/part-6-performance-normalization)