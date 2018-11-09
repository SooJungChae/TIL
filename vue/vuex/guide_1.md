:sparkles: [https://vuex.vuejs.org](https://vuex.vuejs.org) 사이트를 정리한 내용입니다.

# Vuex
vue.js 어플리케이션 **상태 관리 패턴 + 라이브러리**.

## store
- Vuex 의 중심에는 **store**가 있다. 
- "저장소"는 상태를 보유하고 있다.
- `this.$store` 로 사용할 수 있다.

저장소와 일반 전역 객체가 다른 점
- Vuex store 는 반응형이다.
- 저장소의 상태를 직접 변경할 수 없다. -> mutations 과 commit 을 이용해 저장소의 상태를 변경할 수 있다.
- 기록이 남기 때문에 추적이 가능해서 앱을 더 잘 이해할 수 있다.

저장소 만들기
```js
const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  }
})
```

이 state 객체에 `store.state` 로 접근해서 `store.commit`메소드로 상태 변경을 할 수 있다.
```js
store.commit('increment');
console.log(store.state.count); // 1
```

### 저장소 검색 
computed 속성 내에서 상태를 가져온다.
```js
// Counter 컴포넌트를 만듭니다
const Counter = {
  template: `<div>{{ count }}</div>`,
  computed: {
    count () {
      return store.state.count
    }
  }
}
```
- store.state.count 가 변경되면 계산된 속성이 변경되고, 관련 DOM 업데이트가 트리거된다.
- 그런데 이 경우, 전역 저장소 하나에만 의존하기 때문에 테스트할 땐 각 컴포넌트에서 저장소를 가져다 쓴다.
```js
const app = new Vue({
  el: '#app',
  // "store" 옵션을 사용하여 저장소를 제공하십시오.
  // 그러면 모든 하위 컴포넌트에 저장소 인스턴스가 삽입됩니다.
  store,
  components: { Counter },
  template: `
    <div class="app">
      <counter></counter>
    </div>
  `
})

// Counter
const Counter = {
  template: `<div>{{ count }}</div>`,
  computed: {
    count () {
      return this.$store.state.count
    }
  }
}
```
--------

### Getters
저장소 상태를 기반으로 상태를 계산해야하는 경우, <br/>
Vuex 의 데이터를 접근할 때 중복된 코드를 반복호출하게 되는 경우를 해결해준다.

```js
// App.vue
computed: {
  doubleCounter() {
    return this.$store.state.counter * 2;
  }
},

// Child.vue
computed: {
  doubleCounter() {
    return this.$store.state.counter * 2;
  }
},
```

다음처럼 사용한다.
```html
<!-- App.vue -->
<div id="app">
  Parent counter : {{ doubleCounter }}
  <!-- ... -->
</div>
```
```js
// store.js (Vuex)
// getter 를 Vuex 에 추가
export const store = new Vuex.Store({
  // ...
  getters: {
      doubleCounter: function (state) {
        return state.counter * 2;
      }
  }
});

// App.vue
computed: {
  doubleCounter() {
    return this.$store.getters.doubleCounter;
  }
},

// Child.vue
computed: {
  doubleCounter() {
    return this.$store.getters.doubleCounter;
  }
},
```
- 첫 번째 전달인자로 `state` 를 받는다.
- 두 번째 전달인자로 다른 `getter` 도 받는다.
- this.$store 를 이용해 getters 에 접근한다.
- 코드 가독성 증가
- 성능상 이점
- 호출될 때마다 실행된다. **결과가 캐싱되지 않음.**
- 일부 속성에 변경된 경우만 다시 재계산 된다.

문제점
- 여러 뷰가 같은 상태에 의존하는 경우, prop 기 장황할 수 있다.
- 서로 다른 뷰에서 동일한 상태를 반영해야 할 수 있다. ->
부모/자식 인스턴스를 참조하거나 이벤트를 통해 여러 복사본을 변경 및 동기화 하는 방법을
사용해야 한다.

해결방법
- 트리에 상관없이 상태에 엑세스 하거나 동작을 트리거 할 수 있도록
공유된 상태를 **전역 싱글톤으로 관리**해야 한다.

-----

### Mutations
**state 값을 변경하는 유일한 방법.**

```js
// Vuex 에 mutations 속성 추가
const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state, payload) {
      state.count = payload.value;
    }
  }
})
```
```js
store.commit('increment', 10);

console.log(store.state.count) // -> 10
```
- 첫 번째 전달인자로 `state` 를 받는다.
- `payload` 라는 추가 전달인자를 사용할 수 있다.
- mutations 를 직접 호출할 수는 없고,`store.commit` 메소드로 변이 핸들러를 호출해야 한다.
- store.commit 으로 상태 변경을 한다.
- store.state 로 접근가능 
- `store.state.count++` 이런식으로 직접 변경하는 대신 'mutations'를 수행한다. -> 추적이 가능하기 때문 !

`type` 속성을 가진 객체를 사용해서 commit 을 할 수도 있다.
```js
store.commit({
  type: 'increment',
  amount: 10
})
```

### Mutations 와 Getter 의 차이점
Mutations
- 인자를 받아 Vuex 에 넘겨줄 수 있다.
- computed 가 아닌, methods 에 등록한다.
- 변이는 **무조건 동기적** 이어야 한다. 순차적으로 일어나야 각 컴포넌트의 반영 여부를 제대로 추적할 수 있다.

---------

### Actions
- Mutations 와 유사.
- actions 으로 mutations 을 `commit` 하여 상태를 변화 시킨다.
- 비동기 작업이 포함될 수 있다.

```js
const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  },
  actions: {
    increment (context) {
      context.commit('increment')
    }
  }
})
```
- 액션은 `store.dispatch` 메소드로 시작된다.
- 액션 내에서 비동기 작업을 수행할 수 있다.
 ```js
actions: {
  incrementAsync ({ commit }) {
    setTimeout(() => {
      commit('increment')
    }, 1000)
  }
}

// 이런식으로 호출 한다.

// 페이로드와 함께 디스패치
store.dispatch('incrementAsync', {
    amount: 10
})

// 객체와 함께 디스패치
store.dispatch({
    type: 'incrementAsync',
    amount: 10
})
```

액션이 실용적으로 쓰이는 경우는, **비동기 API 호출** 을 하거나 **여러 개의 변이를 커밋**하는 경우다.
```js
actions: {
  checkout ({ commit, state }, products) {
    // 장바구니에 현재있는 항목을 저장하십시오.
    const savedCartItems = [...state.cart.added]

    // 결제 요청을 보낸 후 장바구니를 비웁니다.
    commit(types.CHECKOUT_REQUEST)

    // 상점 API는 성공 콜백 및 실패 콜백을 받습니다.
    shop.buyProducts(
      products,
      // 요청 성공 핸들러
      () => commit(types.CHECKOUT_SUCCESS),
      // 요청 실패 핸들러
      () => commit(types.CHECKOUT_FAILURE, savedCartItems)
    )
  }
}
```

