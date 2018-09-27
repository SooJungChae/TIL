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

## 9. avoiding array mutations with concat(), slice(), and ...spread
- 테스트 하려면 expect, freezer 라이브러리 추가한다.
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/expect/1.20.2/expect.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/freezer-js/0.14.1/freezer.js"></script>
```
```js
// freezer 사용예
var freezer = new Freezer(todoBefore);

expect(
  toggleTodo(freezer.get())
).toEqual(todoAfter);
```
```js
const addCounter = (list) => {
  list.push(0);
  return list;
};

const testAddCounter = () => {
  const listBefore = [];
  const listAfter = [0];

  expect(
  addCounter(listBefore)
  ).toEqual(listAfter);
};

testAddCounter();
console.log('All tests passed');
```
- All tests passed 결과가 나온다.
- 그런데 redux 는 avoiding array mutation 을 한다. 
- 이걸 구현하기 위해 deepFreeze 메서드를 추가해서 테스트해보자.
```js
const addCounter = (list) => {
  list.push(0);
  return list;
};

const testAddCounter = () => {
  const listBefore = [];
  const listAfter = [0];

  deepFreeze(listBefore);

  expect(
  addCounter(listBefore)
  ).toEqual(listAfter);
};

testAddCounter();
console.log('All tests passed');
```
- 배열에 새로운 값을 추가할 수 없다.
- 이렇게 freeze array 에 새로운 값을 추가하려면 기존 배열을 복사하는 작업이 필요하다.
```js
const addCounter = (list) => {
  return list.contcat([0]);
  // return [...list, 0]; // 같은 거
};
```
- 데이터 삭제할 땐 주로 splice() 를 사용하는데, 이건 immutation method 다. 이땐 다음 코드를 사용한다.
```js
const removeCounter = (list, index) => {
  return list
  .slice(0, index)
  .concat(list.slice(index + 1));
};

// es6 로 더 편하게 나타낼 수 있다.
const removeCounter = (list, index) => {
  return [
  ...list.slice(0, index),
  ...list.slice(index + 1)
  ];
};
```
- 배열 내의 한 값을 변경시키려고 할 때, 주로 다음과 같이 사용할테지만 이건 immutable method 다.
```js
const incrementCounter = (list, index) => {
  return list[index]++;
}
```
- 다음처럼 바꾼다.
```js
const incrementCounter = (list, index) => {
  return list
  .slice(0, index)
  .concat([list[index] + 1])
  .concat(list.slice(index+1));
};

// es6
const incrementCounter = (list, index) => {
  return [
  ...list.slice(0, index),
  list[index] + 1,
  ...list.slice(index+1)
  ];
};
```

## Avoiding Object Mutations with Object.assign() and ...spread
```js
const toggleTodo = (todo) => {
  todo.completed = !todo.completed;
  return todo;
};
```
- 한 속성을 바꾸고 싶을 때, 위 처럼 할 수도 있겠지만 이건 immutable method 다.
- 새로운 객체를 만들어 모든 속성을 일일이 재정의해주는 방법이 있다.
```js
const toggleTodo = (todo) => {
  return {
  id: todo.id,
  text: todo.text,
  completed: !todo.completed
  }
};

// es6 의 Object.assign
const toggleTodo = (todo) => {
  return Object.assign({}, todo, {
  completed: !todo.completed
  });
};

// babel (under es6)
const toggleTodo = (todo) => {
  return {
  ...todo,
  completed: !todo.completed
  };
};
```
- 빈 객체에 todo 값 중 completed 값을 바꾼다.
- override 된 todo 가 새로운 객체{} 로 넣어지게 된다.

## 11. Writing a Todo List Reducer (Adding a Todo)
```js
// reducer
const addTodo = (state, action) => {

  switch(action.type) {
  case 'ADD_TODO':
  console.log([
  ...state,
  {
  id: action.id,
  text: action.text,
  completed: false
  }
  ]);
  return [
  ...state,
  {
  id: action.id,
  text: action.text,
  completed: false
  }
  ];
  default:
  return state;
  }
};

// test codes
const testAddTodo = () => {
  const stateBefore = [];

  const action = {
  type: 'ADD_TODO',
  id: 0,
  text: 'Learn Redux'
  };

  const stateAfter = [{
  id: 0,
  text: 'Learn Redux',
  completed: false
  }];

  var beforeFreeze = new Freezer(stateBefore);
  var actionFreeze = new Freezer(action);
console.info(stateAfter);
  expect(
  addTodo(beforeFreeze.get(), actionFreeze.get())
  ).toEqual(stateAfter);

};

testAddTodo();

console.log('Test completed');
```

## 12. toggle 기능 추가
```js
// reducer
const todos = (state, action) => {

  switch(action.type) {
  case 'ADD_TODO':
  return [
  ...state,
  {
  id: action.id,
  text: action.text,
  completed: false
  }
  ];
  case 'TOGGLE_TODO':

  return state.map(todo => {

  if (todo.id !== action.id) {
  return {...todo};
  }

  return {
  ...todo,
  completed: !todo.completed
  };
  });
  default:
  return state;
  }
};

// test codes
const testAddTodo = () => {
  const stateBefore = [];

  const action = {
  type: 'ADD_TODO',
  id: 0,
  text: 'Learn Redux'
  };

  const stateAfter = [{
  id: 0,
  text: 'Learn Redux',
  completed: false
  }];

  let beforeFreeze = new Freezer(stateBefore);
  let actionFreeze = new Freezer(action);

  expect(
  todos(beforeFreeze.get(), actionFreeze.get())
  ).toEqual(stateAfter);

};

const testToggleTodo = () => {
  const todoBefore = [
  {
  id: 0,
  text: 'Learn Redux',
  completed: false
  },
  {
  id: 1,
  text: 'Go shopping',
  completed: false
  }
  ];

  const action = {
  type: 'TOGGLE_TODO',
  id: 1
  };

  const todoAfter = [
  {
  id: 0,
  text: 'Learn Redux',
  completed: false
  },
  {
  id: 1,
  text: 'Go shopping',
  completed: true
  }
  ];

  let beforeFreeze = new Freezer(todoBefore);
  let actionFreeze = new Freezer(action);

  expect(
  todos(beforeFreeze.get(), actionFreeze.get())
  ).toEqual(todoAfter);
}

testAddTodo();
testToggleTodo();

console.log('Test completed');
```

13. Composition - Arrays
- function 이 너무 많은 기능을 하게 하지 말자.
- single concern 을 갖도록 하라.
- 리듀서를 분리한다. 위의 코드를 바꾸자.
```js
// 각각의 리듀서들은 state tree 가 어떻게 관리되고
// 있는지 보여준다.
const todo = (state, action) => {
  switch(action.type) {
  case 'ADD_TODO':
  return {
  id: action.id,
  text: action.text,
  completed: false
  }
  case 'TOGGLE_TODO':
  if (state.id !== action.id) {
  return {...state};
  }

  return {
  ...state,
  completed: !state.completed
  };
  default:
  return state;
  }
}

// reducer
// 리듀서는 normal function 이다.
// todo(undefined, action)
const todos = (state, action) => {

  switch(action.type) {
  case 'ADD_TODO':
  return [
  ...state,
  todo(undefined, action)
  ];
  case 'TOGGLE_TODO':
  return state.map(t => todo(t, action));
  default:
  return state;
  }
};

// test codes
const testAddTodo = () => {
  const stateBefore = [];

  const action = {
  type: 'ADD_TODO',
  id: 0,
  text: 'Learn Redux'
  };

  const stateAfter = [{
  id: 0,
  text: 'Learn Redux',
  completed: false
  }];

  let beforeFreeze = new Freezer(stateBefore);
  let actionFreeze = new Freezer(action);

  expect(
  todos(beforeFreeze.get(), actionFreeze.get())
  ).toEqual(stateAfter);

};

const testToggleTodo = () => {
  const todoBefore = [
  {
  id: 0,
  text: 'Learn Redux',
  completed: false
  },
  {
  id: 1,
  text: 'Go shopping',
  completed: false
  }
  ];

  const action = {
  type: 'TOGGLE_TODO',
  id: 1
  };

  const todoAfter = [
  {
  id: 0,
  text: 'Learn Redux',
  completed: false
  },
  {
  id: 1,
  text: 'Go shopping',
  completed: true
  }
  ];

  let beforeFreeze = new Freezer(todoBefore);
  let actionFreeze = new Freezer(action);

  expect(
  todos(beforeFreeze.get(), actionFreeze.get())
  ).toEqual(todoAfter);
}

testAddTodo();
testToggleTodo();

console.log('Test completed');
```

## 14. Composition - Objects
- 다른 state 를 갖고 있는 reducer 를 합하는 패턴에 대해 알아보자.
- 여러 사람이 함께 작업하는 경우 reducer 의 이름을 같게 할 수도 있는데, 이걸 방지할 수 있다.
```js
const todos = (state, action) => {

  switch(action.type) {
  case 'ADD_TODO':
  return [
  ...state,
  todo(undefined, action)
  ];
  case 'TOGGLE_TODO':
  return state.map(t => todo(t, action));
  default:
  return state;
  }
};

const visibilityFilter = (
  state = 'SHOW_ALL',
  action
) => {
  switch(action.type) {
  case 'SET_VISIBILITY_FILTER':
  return action.filter;
  default:
  return state;
  }
};

const todoApp = (state = {}, action) => {
  return {
  todos: todos(
  state.todos,
  action
  ),
  visibilityFilter: visibilityFilter(
  state.visibilityFilter,
  action
  )
  };
};

const store = createStore(todoApp);
```

15. Composition - combineReducers()
- 하드 코딩하던 위의 방식을 combineReducer 를 통해 쉽게 표현할 수 있다.
```js
const todoApp = combineReducers({
     todos: todos,
     visibilityFilter: visibilityFilter
});
```
- 각각의 key 에 Object 를 받고
- todos 가 바뀌면 todos 리듀서의 state tree 가 변경되고
- visibilityFilter 가 바뀌면 visibilityFilter state tree  가 변경되는 식이다.
- 즉, 각각의 state tree 를 갖는 reducer 들을 하나로 묶게 되었다.
- es6 구문에 의해 key 와 value 이름이 같으면 하나로 표현할 수 있다.
```js
const todoApp = combineReducers({
     todos,
     visibilityFilter
});
```
- combineReducer 는 다음처럼 동작한다.
```js
const combineReducers = (reducers) => {
  return (state = {}, action) => {
  return Objects.keys(reducers).reduce(
  (nextState, key) => {
  nextState[key] = reducers[key](
  state[key],
  action
  );
  return nextState;
  },
  {}
  );
  };
};
```
