# Redux 

리덕스는 `action` 이벤트를 호출하면서 상태를 관리하고 업데이트하는 패턴이며, 라이브러리다.
프로젝트 전체에 사용되는 상태를 중앙집중형 스토어가 전달하면서 상태를 업데이트한다.

즉, 공통으로 사용되는 상태를 업데이트 할 때 좋다는 얘기다.

## 기본개념
### action
`action` 은 type 필드를 가진 object.
```
// action 의 이름은 "카테고리/일어나는 구체적인 행동" 형식으로 작성한다.

const addTodoAction = {
  type: 'todos/todoAdded'
}
``` 

어떤 일이 일어날지에 대한 다른 정보를 추가할 수도 있다.  
```
const addTodoAction = {
  type: 'todos/todoAdded',
  payload: 'Buy milk'
}
```

### action creator
`action` 오브젝트를 만들어서 리턴하는 함수. 이게 있기 때문에 매번 `action` 오브젝트를 만들 필요가 없다. 

```
const addTodo = text => {
  return {
    type: 'todos/todoAdded',
    payload: text
  }
}
```

### reducer
현재 `state` 와 `action` 오브젝트를 받아서 새로운 상태를 리턴하는 함수. `(state, action) => newState`

```
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
```
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({ reducer: counterReducer })

console.log(store.getState())
// {value: 0}
```

### dispatch
`store`는 `dispatch` 메서드도 갖고 있다. state 를 업데이트 하는 유일한 방법이 `dispatch`를 사용하는 것이다.
```
store.dispatch({ type: 'counter/increment' })

console.log(store.getState())
// {value: 1}
```

`dispatch`는 이벤트를 발생시키는 거고 `reducer`는 이벤트 리스터라고 생각하면 된다.

### selectors
store state 값에서 특정 정보만 빼오는 함수다. 같은 데이터를 중복해서 읽어오는 로직을 피할 수 있어서 프로젝트가 커질수록 유용하다.
```
const selectCounterValue = state => state.value

const currentValue = selectCounterValue(store.getState())
console.log(currentValue)
// 2
```

## Data Flow

### Initial setup
- root reducer 으로 `Redux store` 가 만들어진다.
- `store` 는 root reducer 를 한번만 호출해서 초기 `state` 값을 리턴해와 저장해둔다.
-  `UI`가 렌더링되면 UI 컴포넌트들이 Redux store 의 현재 state 에 접근한다. 그리곤 업데이트 할 데이터를 결정한다. 
subscribe 도 해두기 때문에 나중에 상태 변경되어도 감지할 수 있다.

### Updates 
이벤트가 발생하면 > 상태가 변하고 > UI 가 변한다.

 
## 참고
[redux 공식문서](https://redux.js.org/tutorials/essentials/part-1-overview-concepts)
