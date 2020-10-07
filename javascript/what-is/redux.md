# Redux 

리덕스는 `action` 이벤트를 호출하면서 상태를 관리하고 업데이트하는 패턴이며, 라이브러리다.
프로젝트 전체에 사용되는 상태를 중앙집중형 스토어가 전달하면서 상태를 업데이트한다. 즉, 공통으로 사용되는 상태를 업데이트 할 때 좋다.

## 기본개념
### action
`action` 은 type 필드를 가진 object.
```js
// action 의 이름은 "카테고리/일어나는 구체적인 행동" 형식으로 작성한다.

const addTodoAction = {
  type: 'todos/todoAdded'
}
``` 

어떤 일이 일어날지에 대한 다른 정보를 추가할 수도 있다.  
```js
const addTodoAction = {
  type: 'todos/todoAdded',
  payload: 'Buy milk'
}
```

### action creator
`action` 오브젝트를 만들어서 리턴하는 함수. 이게 있기 때문에 매번 `action` 오브젝트를 만들 필요가 없다. 또한 테스트하기 쉬운 장점이 있다.

```js
const addTodo = text => {
  return {
    type: 'todos/todoAdded',
    payload: text
  }
}
```

액션을 호출하려면
```js
dispatch(addTodo('장 보기'));

// 또는 바인딩해서 바로 실행시킬 수 있다.
const boundAddTodo = text => dispatch(addTodo(text));
boundAddTodo('장 보기');
```

redux 에서는 두 번째 방식처럼 액션들을 바인딩할 수 있게 도와주는 메서드가 있다. `connect()` 와 `bindActionCreators()` 를 사용하면 된다.

> bindActionCreators(actionCreators, dispatch)

action creators 를 전달해주면 하위 컴포넌트에서는 Redux 를 알 필요가 없다. 액션을 바인딩한 후 전달해주면 된다. 다음을 참고하자.
```js
import { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as TodoActionCreators from './TodoActionCreators'

class TodoListContainer extends Component {
  constructor(props) {
    super(props)

    const { dispatch } = props

    this.boundActionCreators = bindActionCreators(TodoActionCreators, dispatch)
  }

  componentDidMount() {
    let { dispatch } = this.props

    // action 을 만드는 함수를 호출하고만 있기 땨뮨애 다음 코드는 실행되지 않을 것이다.  
    // 실행하려면 action 을 dispatch 해줘야 한다.
    let action = TodoActionCreators.addTodo('Use Redux');
    dispatch(action)
  }

  render() {
    let { todos } = this.props

    return <TodoList todos={todos} {...this.boundActionCreators} />
  }
}

export default connect(state => ({ todos: state.todos }))(TodoListContainer)
```
 

### reducer
현재 `state` 와 `action` 오브젝트를 받아서 새로운 상태를 리턴하는 함수. `(state, action) => newState`
- 한 reducer 에 한 state 를 갖고 있다.
- 프로젝트가 커질수록 독립적인 reducer 들이 모인다.
- reducer 들은 같은 action type 이라도 독립적으로 응답할 수 있다. (extraReducers 참고)

```js
const initialState = { value: 0 }

function counterReducer(state = initialState, action) {
  if (action.type === 'counter/increment') {
    return {
      ...state,
      value: state.value + 1
    }
  }
  
  return state
}
```

### store
현재의 redux 에서 존재하는 state 오브젝트를 `store` 라고 한다. 
`store` 는 리듀서로 인해 생겨난 것이고, getState 메소드를 가지고 있다. 이 메소드는 현재 state 를 리턴한다.
```js
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({ reducer: counterReducer })

console.log(store.getState())
// {value: 0}
```

### dispatch
`store`는 `dispatch` 메서드도 갖고 있다. state 를 업데이트 하는 유일한 방법이 `dispatch`를 사용하는 것이다.
```js
store.dispatch({ type: 'counter/increment' })

console.log(store.getState())
// {value: 1}
```

`dispatch`는 이벤트를 발생시키는 거고 `reducer`는 이벤트 리스터라고 생각하면 된다.

### selectors
store state 값에서 특정 정보만 빼오는 함수다. 같은 데이터를 중복해서 읽어오는 로직을 피할 수 있어서 프로젝트가 커질수록 유용하다.
```js
const selectCounterValue = state => state.value

const currentValue = selectCounterValue(store.getState())
console.log(currentValue)
// 2
```

----

## API
### configureStore
### createReducer
### createAction
### createSlice
"slice name", initial state, reducer 함수를 갖고 있는 함수다. 
- 매번 action 객체, type, action creator 를 만드는 것은 번거로운 일이다. 
- createSlice 는 자동으로 action creator 와 action types 를 생성해준다.
- createSlice 는 createAction 과 createReducer 메서드를 갖고있다.
    > reducer 함수는 createSlice 의 createReducer 를 사용해 만들어진다.
```js
import { createSlice } from '@reduxjs/toolkit'

const counterSlice = createSlice({
  name: 'counter',
  initialState: 0,
  reducers: {
    increment: (state) => state + 1,
    decrement: state => {
      state.value -= 1
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    }
  },
})
// Will handle the action type `'counter/increment'`
export const { increment, decrement } = counterSlice.actions

export default counterSlice.reducer
```

```js
console.log(counterSlice.actions.increment())
// {type: "counter/increment"}
```

```js
const newState = counterSlice.reducer(
  { value: 10 },
  counterSlice.actions.increment()
)
console.log(newState)
// {value: 11}
```

- createReducer, createSlice 에서만 mutating 할 수 있다.
```js
function handwrittenReducer(state, action) {
  return {
    ...state,
    first: {
      ...state.first,
      second: {
        ...state.first.second,
        [action.someId]: {
          ...state.first.second[action.someId],
          fourth: action.someValue
        }
      }
    }
  }
}
```

```js
function reducerWithImmer(state, action) {
  state.first.second[action.someId].fourth = action.someValue
}
```
**extraReducers**
"외부" action 을 의미한다. `slice.actions` 엔 포함되지 않는다.
많은 reducer 들이 같은 action type 에라도 독립적으로 응답할 수 있게 해준다.
createSlice 가 다른 action types 에 응답하게 해주고, types 을 생성하게 해준다. 
`reducers` 와 `extraReducers` 가 같은 action type 을 받는다면 `reducers` 의 액션이 실행된다.

```js
import { createAction, createSlice } from '@reduxjs/toolkit'
const incrementBy = createAction('incrementBy')
const decrement = createAction('decrement')

function isRejectedAction(action) {
  return action.type.endsWith('rejected')
}

createSlice({
  name: 'counter',
  initialState: 0,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(incrementBy, (state, action) => {
        // action is inferred correctly here if using TS
      })
      // You can chain calls, or have separate `builder.addCase()` lines each time
      .addCase(decrement, (state, action) => {})
      // You can match a range of action types
      .addMatcher(
        isRejectedAction,
        // `action` will be inferred as a RejectedAction due to isRejectedAction being defined as a type guard
        (state, action) => {}
      )
      // and provide a default case if no other handlers matched
      .addDefaultCase((state, action) => {})
  },
})
```
### createSelector

-----
## Hooks
### useSelector
useSelector 를 사용하면 아무곳에서나 Redux store 에서 state 를 가져올 수 있다.
```js
// feature/counter/counterSlice.js
...
export const selectCount = state => state.counter.value

// Redux store 를 import 한다면
import store from '../app/store'
import { selectCount } from './counterSlice';
const count = selectCount(store.getState())

// useSelector 를 사용한다면
// feature/counter/Counter.js
import { useSelector } from 'react-redux'
import { selectCount } from './counterSlice';
const count = useSelector(selectCount)
```
selector function 을 그때그때 만들어서 쓸수도 있다.
```js
const countPlusTwo = useSelector((state) => state.counter.value + 2);
``` 
-----

## Data Flow

### Initial setup
- root reducer 으로 `Redux store` 가 만들어진다.
- `store` 는 root reducer 를 한번만 호출해서 초기 `state` 값을 리턴해와 저장해둔다.
-  `UI`가 렌더링되면 UI 컴포넌트들이 Redux store 의 현재 state 에 접근한다. 그리곤 업데이트 할 데이터를 결정한다. 
subscribe 도 해두기 때문에 나중에 상태 변경되어도 감지할 수 있다.

### Updates 
이벤트가 발생하면 > 상태가 변하고 > UI 가 변한다.

------
 
## 참고
- [redux 공식문서](https://redux.js.org/tutorials/essentials/part-1-overview-concepts)
- https://redux.js.org/tutorials/essentials/part-2-app-structure#creating-slice-reducers-and-actions

