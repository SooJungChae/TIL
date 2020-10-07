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

export const incrementAsync = amount => dispatch => {
  setTimeout(() => {
    dispatch(incrementByAmount(amount));
  }, 1000);
};

export const selectCount = state => state.counter.value;

export default slice.reducer;
```

 
## 참고
[redux 공식문서](https://redux.js.org/tutorials/essentials/part-2-app-structure)
