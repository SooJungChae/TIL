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
import { Component } from 'javascript/what-is/react'
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
`createStore` 처럼 store 를 생성해주는 축약방식이다.
slice reducers 들이 파라미터로 들어온다면 `combineReducers` 를 하는 루트 리듀서를 생성한다.
 
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
    },
    // prepare 를 사용해 받은 payload 를 재구조화 시킬 수 있다.
    // 그럼 payload object 가 어떻게 생겼는지를 고민할 필요가 없다. action creator 가 자동으로 넣어주기 때문.
    postAdded: {
      reducer(state, action) {
        state.push(action.payload)
      },
      prepare(title, content) {
        return {
          payload: {
            id: nanoid(),
            title,
            content
          }
        }
      }
    }
  },
})
// Will handle the action type `'counter/increment'`
export const { increment, decrement } = counterSlice.actions

// 모든 state 를 select 함수로 만들 필요는 없다.
// 여러 컴퍼넌트에서 중복으로 사용되는 경우가 있을 때 한번에 사용할 때 유용하다. 
// 나중에 추가해도 되는 옵션이다. 

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
reducer 가 slice 에 정의되어 있지 않은 다른 action 에 응답해야 하는 경우가 종종 있다.
그때 사용하는 필드가 extraReducers 필드이다.

즉, "외부" action 을 의미한다. `slice.actions` 엔 포함되지 않는다.

```js
const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    // slice-specific reducers here
  },
  extraReducers: {
    'counter/increment': (state, action) => {
      // normal reducer logic to update the posts slice
    }
  }
})
```

Redux toolkit 에서 action type 을 자동으로 생성해주기 때문에 
다음처럼 오브젝트의 키 형태로도 사용 가능하다.
```js
import { increment } from '../features/counter/counterSlice'

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    // slice-specific reducers here
  },
  extraReducers: {
    [increment]: (state, action) => {
      // normal reducer logic to update the posts slice
    }
  }
})
```

개별적인 상황에 대해서 `builder` 케이스를 작성할 수도 있다는데, 정확히 어떤 경우인지는 모르겠다. (ps. TypeScript 에서는 extraReducers 대신 무조건 이걸 써야한다.)

```js
import { increment } from '../features/counter/counterSlice'

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    // slice-specific reducers here
  },
  extraReducers: builder => {
    builder.addCase('counter/decrement', (state, action) => {})
    builder.addCase(increment, (state, action) => {})
  }
})
```

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

**memorized-selector** 를 반환한다. argument 가 하나라도 변경되었을 때에만 계산한다.
- 1개 이상의 input selector 을 받고, 리턴값을 다시 output selector 에게 argument 로 넘긴다. 

```js
import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit'

export const selectAllPosts = state => state.posts.posts

export const selectPostById = (state, postId) =>
  state.posts.posts.find(post => post.id === postId)

export const selectPostsByUser = createSelector(
  [selectAllPosts, (state, userId) => userId],
  (posts, userId) => posts.filter(post => post.user === userId)
)
``` 
> input selector : selectAllPosts & (state, userId) => userId (작은 selector) <br/>
> output selector : (posts, userId) => posts.filter(post => post.user === userId)


```js
// import { createSelector } from 'reselect'
import { createSelector } from '@reduxjs/toolkit'

const shopItemsSelector = state => state.shop.items
const taxPercentSelector = state => state.shop.taxPercent

const subtotalSelector = createSelector(
  shopItemsSelector,
  items => items.reduce((acc, item) => acc + item.value, 0)
)

const taxSelector = createSelector(
  subtotalSelector,
  taxPercentSelector,
  (subtotal, taxPercent) => subtotal * (taxPercent / 100)
)

export const totalSelector = createSelector(
  subtotalSelector,
  taxSelector,
  (subtotal, tax) => ({ total: subtotal + tax })
)

let exampleState = {
  shop: {
    taxPercent: 8,
    items: [
      { name: 'apple', value: 1.20 },
      { name: 'orange', value: 0.95 },
    ]
  }
}

console.log(subtotalSelector(exampleState)) // 2.15
console.log(taxSelector(exampleState))      // 0.172
console.log(totalSelector(exampleState))    // { total: 2.322 }
``` 

## Async Logic and Data Fetching
[redux 공식문서 part5 - async logic](https://redux.js.org/tutorials/essentials/part-5-async-logic)

### createAsyncThunk

API 호출 상태를 자동으로 업데이트 시켜준다.
```js
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await client.get('/fakeApi/posts')
  return response.posts
})
```
- 첫번째 arg : action type
- 두번째 arg : Promise 를 반환하는 콜백

`createAsyncThunk` 를 통해서 `pending/fullfilled/rejected` action type 과 action creator 가 자동으로 생성되어 `fetchPosts` 함수에 추가된다.
`posts/fetchPosts/fultilled` action type 과 action creators 가 

그래서 thunk 를 호출하면 현재 상황에 맞게 `pending/fullfilled/rejected` 선택되어 해당하는 액션이 호출된다.
```js
dispatch(fetchPosts())
``` 
- 먼저 `posts/fetchPosts/pending`액션을 dispatch 한다.
- `Promise` 가 resolve 되면 `response.posts` 를 받고 `posts/fetchPosts/fultilled` 액션을 dispatch 한다.
- `Promise` 가 reject 되면 `posts/fetchPosts/reject` 액션을 dispatch 한다.

이 상태만으로는 postsSlice 에서 액션이 호출되었다는 걸 들을 수 없다. `extraReducers` 에서 액션들을 들을 수 있도록 작성해줘야 한다.
```js
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await client.get('/fakeApi/posts')
  return response.posts
})

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    // omit existing reducers here
  },
  extraReducers: {
    [fetchPosts.pending]: (state, action) => {
      state.status = 'loading'
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.status = 'succeeded'
      // Add any fetched posts to the array
      state.posts = state.posts.concat(action.payload)
    },
    [fetchPosts.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    }
  }
})
```

`createAsyncThunk`는 에러를 내부적으로 처리한다. 그래서 reject 되면 로그에 `rejected Promises` 라는 것밖에 못본다. 
그래서 따로 에러핸들링을 하려면 `unwrapResult` 를 사용해야 된다. 에러를 리턴하기 때문에 `try/catch` 를 사용해서 직접 핸들링할 수 있다.
```js
 const onSavePostClicked = async () => {
    if (canSave) {
      try {
        setAddRequestStatus('pending')
        const resultAction = await dispatch(
          addNewPost({ title, content, user: userId })
        )
        unwrapResult(resultAction)
      } catch (err) {
        console.error('Failed to save the post: ', err)
      } finally {
        setAddRequestStatus('idle')
      }
    }
  }
```

## Performance and Normalizing Data
[redux 공식문서 part6 - performance normalization](https://redux.js.org/tutorials/essentials/part-6-performance-normalization)

어떤 어플리케이션에서든 알림이 오면 알림이 왔다는 표시가 경우를 쉽게 볼수있다. 이건 서버랑 게속 연결을 해두고, 서버에서 알림을 보냈을 때 클라이언트 화면에서 업데이트를 하는 방법이다.
규모가 작은 어플리케이션은 상관없지만, 큰 경우는 알림을 모두 변경해줘야 하기 때문에 React 에서는

```js
// features/notifications/notificationsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { client } from '../../api/client'

export const fetchNotifications = createAsyncThunk(
  'notifications/fetchNotifications',
  async (_, { getState }) => {
    const allNotifications = selectAllNotifications(getState())
    const [latestNotification] = allNotifications
    const latestTimestamp = latestNotification ? latestNotification.date : ''
    const response = await client.get(
      `/fakeApi/notifications?since=${latestTimestamp}`
    )
    return response.notifications
  }
)

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: [],
  reducers: {},
  extraReducers: {
    [fetchNotifications.fulfilled]: (state, action) => {
      state.push(...action.payload)
      // Sort with newest first
      state.sort((a, b) => b.date.localeCompare(a.date))
    }
  }
})

export default notificationsSlice.reducer

export const selectAllNotifications = state => state.notifications
```

데이터를 찾을 땐 ID(key) 값을 기준으로 찾는 경우가 많다. 
```js
const users = [
    {id: "user1", firstName, lastName},
    {id: "user2", firstName, lastName},
    {id: "user3", firstName, lastName}
]
```
이 ID 가 위에 처럼 다른 정보들이 같이 있다면 `array.find()` 를 통해서 arrays 를 돌면서 id 가 들어있는 object 를 찾게 된다는걸 의미한다. 
수백, 수천개 아이템이 안에 있다면 한 아이템을 찾기 위해 object 를 포함한 전체 배열을 둘러보는건 비효율적이다.
```js
{
  users: {
    ids: ["user1", "user2", "user3"],
    entities: {
      "user1": {id: "user1", firstName, lastName},
      "user2": {id: "user2", firstName, lastName},
      "user3": {id: "user3", firstName, lastName},
    }
  }
}
```
firstName, lastName 까지 둘러볼 필요없이 ID 만 있는 배열로 ID 하나만을 찾는걸 "normalization" 이라 한다.
Redux toolkit 의 `CreateEntityAdapter` API 가 자동으로 만들어주는 역할을 한다.

**CreateEntityAdapter**

slice 에 선언한 데이터를 `ids:[], entities: {}` 구조로 만들어주고, 
만든걸 사용할 수 있도록 reducer 와 selector 도 자동으로 만들어준다.
다음과 같이 일반적인 경우를 다룬다. (데이터 핸들링을 ID 로 데이터를 다루기 때문이다.)   

- 전체 아이템 업데이트
- 한 아이템만 업데이트
- 여러개 삭제

```js
const usersAdapter = createEntityAdapter()
```
- `내장 함수` : getSelectors, getInitialState, upsertMany, addOne (,setAll,addMany,upsertOne)
    > `getSelectors` 함수로 `selectAll`, `selectById` 같은 selector 를 생성한다. <br>
    `getInitialState` 함수로 `ids:[], entities: {}` 구조를 만든다.<br>
    `upsertMany` 함수는 action.payload 에 온 데이터를 state 에 전부 더한다. (같은 ID 가 있으면 병합한다.)<br>
    `addOne` 함수는 action.payload 에 온 데이터를 state 에 더한다.
- `return` : reducer object
    > add, update, remove 기능을 하는 reducer function
- id 를 customize 하고 싶다면 `selectId: (location: Location) => location.locationid` 이런식으로.

```js
// features/posts/postsSlice.js
import {
  createEntityAdapter
  // omit other imports
} from '@reduxjs/toolkit'

const postsAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.date.localeCompare(a.date)
});

// { ids:[], entities: {}, status: 'idle', error: null } 구조로 만든다.
const initialState = postsAdapter.getInitialState({
  status: 'idle',
  error: null
})

// omit thunks

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    reactionAdded(state, action) {
      const { postId, reaction } = action.payload
      const existingPost = state.entities[postId]
      if (existingPost) {
        existingPost.reactions[reaction]++
      }
    },
    postUpdated(state, action) {
      const { id, title, content } = action.payload
      const existingPost = state.entities[id]
      if (existingPost) {
        existingPost.title = title
        existingPost.content = content
      }
    }
  },
  extraReducers: {
    // omit other reducers

    [fetchPosts.fulfilled]: (state, action) => {
      state.status = 'succeeded'
      // Add any fetched posts to the array
      // `upsertMany` reducer as a mutating update utility
      // action.payload 에 온 데이터를 state 에 전부 더한다. (같은 ID 가 있으면 병합한다.)
      postsAdapter.upsertMany(state, action.payload)
    },
    // Use the `addOne` reducer for the fulfilled case
    [addNewPost.fulfilled]: postsAdapter.addOne
  }
})

export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions

export default postsSlice.reducer

// Export the customized selectors for this adapter using `getSelectors`
export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds
  // Pass in a selector that returns the posts slice of state
} = postsAdapter.getSelectors(state => state.posts)

export const selectPostsByUser = createSelector(
  [selectAllPosts, (state, userId) => userId],
  (posts, userId) => posts.filter(post => post.user === userId)
)
```

> **[내장 함수들]**
>
> **sortComapre**
> `Array.sort()`와 같은 정렬이 가능하다.
>
> **getSelectors**
> 특정 slice를 리턴하는 selector 를 사용할 수 있고, `selectAll`, `selectByID` 와 같은 selector 를 생성한다.
```js
 // features/posts/postsSlice.js
export const selectAllPosts = state => state.posts.posts

export const selectPostById = (state, postId) =>
  state.posts.posts.find(post => post.id === postId)

// getSelectors 를 사용하면 이렇게 바뀐다. 
// getSelectors 에서 리턴한 값을 selectAllPosts, selectPostsById 로 rename 됐다. 
export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds
    // Pass in a selector that returns the posts slice of state
} = postsAdapter.getSelectors(state => state.posts)
```
>
>**getInitialState**
>`{idx:[], entities:{}}` 오브젝트를 생성한다. 
```js
// features/posts/postsSlice.js
const initialState = postsAdapter.getInitialState({
  status: 'idle',
  error: null
})
```

### Provider
앱 전체에서 store 를 연결하려면 맨 상단에 Provider 로 감싸줘야 한다.
```js
import { ReactReduxContext } from 'react-redux'

// in your connected component
render() {
  return (
    <ReactReduxContext.Consumer>
      {({ store }) => {
        // do something with the store here
      }}
    </ReactReduxContext.Consumer>
  )
}
``` 

React의 Component자체는 Redux의 흐름에 타는 것이 불가능 합니다. 흐름에 타기 위해서는 ReactRedux에 의해 제공 되는 connect라고 불리는 함수를 이용하여 아래와 같이 씁니다.

----

## Thunks
**Redux middleware**
- 비동기 로직을 store 와 상호작용할 수 있게 하기 위해 사용한다.
- `setTimeout`, `Promise`, `async/await`, server API 호출 요청을 작성하기에 좋다. Redux Toolkit 이 생성과 액션 호출을 수행하는 `createAsyncThunk` API 를 지원한다.
- action 이 dispatch 될 때 추가적인 로직을 수행할 수 있다. (로깅)
- dispatch 된 action 을 멈추거나, 수정, 지연, 대체, 멈출 수 있다.
- `dispatch`, `getState` 에 접근할 수 있는 코드를 작성할 수 있다.
- **redux-thunk** 가 가장 일반적이다. (공식문서에서 비동기 로직을 쓸 때 thunks 를 사용하는걸 추천한다. ex) `configureStore`)

thunk 미들웨어가 Redux store 에 추가되면 `store.dispatch` 에 **(dispatch, getState) 구조** 로 된 thunk functions 을 추가할 수 있다.
```js
const store = configureStore({ reducer: counterReducer })

const exampleThunkFunction = (dispatch, getState) => {
  const stateBefore = getState()
  console.log(`Counter before: ${stateBefore.counter}`)
  dispatch(increment())
  const stateAfter = getState()
  console.log(`Counter after: ${stateAfter.counter}`)
}

store.dispatch(exampleThunkFunction)
```
`createSlice`에서는 `thunks` 정의하는 걸 지원하지 않으니까 따로 추가해야 한다.
 

-----
## Hooks
### useSelector
useSelector 를 사용하면 아무곳에서나 Redux store 에서 state 를 가져올 수 있다.
**useSelector 값이 변할 때마다 component 는 re-render 된다.** 그래서 작은 데이터를 선택하도록 하자.
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

## Libraries

### Reselect

memorized selector 함수를 생성하는 라이브러리다. Redux Toolkit 에서 `createSelector`가 그 역할을 하고 있기 때문에 따로 설치안해도 사용할 수 있다.

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
- [redux 구조 프로젝트 예시](https://redux.js.org/tutorials/essentials/part-2-app-structure)
- [아마 이게 제일 이해하기 쉬울껄요 - react redux 플로우의 이해](https://medium.com/@ca3rot/%EC%95%84%EB%A7%88-%EC%9D%B4%EA%B2%8C-%EC%A0%9C%EC%9D%BC-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0-%EC%89%AC%EC%9A%B8%EA%B1%B8%EC%9A%94-react-redux-%ED%94%8C%EB%A1%9C%EC%9A%B0%EC%9D%98-%EC%9D%B4%ED%95%B4-1585e911a0a6)

