redux 개념은 [이곳](../javascript/what-is/redux.md)에서 확인할 수 있다.

## Example link
- [Redux essentials Tutorial Example](https://github.com/reduxjs/redux-essentials-example-app/tree/tutorial-steps)
- [Redux Test code Example](https://github.com/reduxjs/rtk-convert-todos-example) 

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

### createAsyncThunk example
- [api/server.js](https://github.com/reduxjs/redux-essentials-example-app/blob/tutorial-steps/src/api/server.js)
- [api/client.js](https://github.com/reduxjs/redux-essentials-example-app/blob/tutorial-steps/src/api/client.js)
  - fake server, client 
- [features/posts/AddPostForm.js](https://github.com/reduxjs/redux-essentials-example-app/blob/tutorial-steps/src/features/posts/AddPostForm.js)
  - save 버튼 두번 클릭 방지 `canSave` 참
```js
// features/posts/postsSlice.js
import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit'
import { client } from '../../api/client'

const initialState = {
  posts: [],
  status: 'idle',
  error: null
}

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await client.get('/fakeApi/posts')
  return response.posts
})

export const addNewPost = createAsyncThunk(
  'posts/addNewPost',
  // The payload creator receives the partial `{title, content, user}` object
  async initialPost => {
    // We send the initial data to the fake API server
    const response = await client.post('/fakeApi/posts', { post: initialPost })
    // The response includes the complete post object, including unique ID
    return response.post
  }
)

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
    },
    [addNewPost.fulfilled]: (state, action) => {
      state.posts.push(action.payload)
    }
  }
})
```

```js
// features/posts/PostsList.js
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
// omit other imports
import { selectAllPosts, fetchPosts } from './postsSlice'

export const PostsList = () => {
  const dispatch = useDispatch()
  const posts = useSelector(selectAllPosts)

  const postStatus = useSelector(state => state.posts.status)
  const error = useSelector(state => state.posts.error)

  useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(fetchPosts())
    }
  }, [postStatus, dispatch])

  let content

  if (postStatus === 'loading') {
    content = <div className="loader">Loading...</div>
  } else if (postStatus === 'succeeded') {
    // Sort posts in reverse chronological order by datetime string
    const orderedPosts = posts
      .slice()
      .sort((a, b) => b.date.localeCompare(a.date))

    content = orderedPosts.map(post => (
      <PostExcerpt key={post.id} post={post} />
    ))
  } else if (postStatus === 'failed') {
    content = <div>{error}</div>
  }

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {content}
    </section>
  )
}
```

### Notification example
- [features/notifications/nofiticationsSlice.js](https://github.com/reduxjs/redux-essentials-example-app/blob/tutorial-steps/src/features/notifications/notificationsSlice.js)
```js
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
);
extraReducers: {
    [fetchNotifications.fulfilled]: (state, action) => {
      Object.values(state.entities).forEach((notification) => {
        // Any notifications we've read are no longer new
        notification.isNew = !notification.read
      })
      notificationsAdapter.upsertMany(state, action.payload)
    },
  },
```

## Tips
사용자 정보 받아오는 등 페이지 로드시점에서 필요한 작업이 있다면 `index.js` 에 작성하면 된다.
```js
// omit imports

import { fetchUsers } from './features/users/usersSlice'

import './api/server'

store.dispatch(fetchUsers())

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
```

### 렌더링 중복 막기 - React.memo()
1. React 에서는 부모 component 가 렌더링 되면 자식 component 들도 전부 렌더링한다. `React.memo`로 컴포넌트의 props 가 변경될 때만 렌더링 시킨다.
```js
let PostExcerpt = ({ post }) => {
  // omit logic
}

PostExcerpt = React.memo(PostExcerpt)
```
2. `post` 가 아니라 `postId` 처럼 key 값을 props 로 받는다. 하지만 정렬이 필요하다면..? 이 방법은 조금 위험하다.
3. `useSelector(selectPostIds, shallowEqual)` 사용한다. [(TODO: 해석)](https://react-redux.js.org/api/hooks#equality-comparisons-and-updates)
4. `createEntityAdapter` 함수를 사용한다. 모든 post 들을 ID 로 나눠놓고, 추가, 삭제 될때 특정한 것만 수정한다. `<PostsList>`, `<PostExcerpt>` 에 똑같이 적용해서 ID 배열이 바뀔 때만 렌더링 되게 만든다.
```js
// PostsSlice.js
const postsAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.date.localeCompare(a.date)
})

// omit other codes

export const {
  selectIds: selectPostIds
} = postsAdapter.getSelectors(state => state.posts)
``` 
```js
// features/posts/PostsList.js

// omit other imports
import {
  selectPostIds,
} from './postsSlice'

let PostExcerpt = ({ postId }) => {
  const post = useSelector(state => selectPostById(state, postId))
  // omit rendering logic
}

export const PostsList = () => {
  const orderedPostIds = useSelector(selectPostIds)

  // omit other selections and effects

  content = orderedPostIds.map(postId => (
    <PostExcerpt key={postId} postId={postId} />
  ))

  // omit other rendering
}
```

### 렌더링 중복 막기 - memoization
```js
// <UserPosts />
export const UserPage = ({ match }) => {
  const postsForUser = useSelector(state => {
      const allPosts = selectAllPosts(state)
      return allPosts.filter(post => post.user === userId)
    })
  // ...
}
``` 
useSelector 안에 filter 메서드를 사용해서 해당사용자가 작성한 글이 바꼈을 때만 리턴하고 싶었지만, posts 데이터가 바뀔 때만이 아니라 모든배열을 select 하고 있기 때문에 
**항상** 새로운 배열 참조가 리턴되기 때문에 컴포넌트가 re-render 된다.

`state.posts` 나 `userId` 가 변경됐을 때만 새로 filter 하면 된다.

```js
// postSlice.js
import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit'

// omit slice logic

export const selectAllPosts = state => state.posts.posts

export const selectPostById = (state, postId) =>
  state.posts.posts.find(post => post.id === postId)

export const selectPostsByUser = createSelector(
  [selectAllPosts, (state, userId) => userId],
  (posts, userId) => posts.filter(post => post.user === userId)
)
```

```js
// <UserPosts />
export const UserPage = ({ match }) => {
  const postsForUser = useSelector(state => selectPostsByUser(state, userId))
  // ...
}
```


-----

## 참고
- [redux 공식문서](https://redux.js.org/tutorials/essentials/part-2-app-structure)
- [redux 공식문서 - Performance 높이기 위해선?](https://redux.js.org/tutorials/essentials/part-6-performance-normalization)