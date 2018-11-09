# Vue 인스턴스
Vue 인스턴스 만들기
```js
var vm = new Vue({
  // 옵션
})
```

## 속성과 메소드
각 Vue 인스턴스는 data 객체에 있는 모든 속성을 프록시 처리 한다.
```js
// 데이터 객체
var data = { a: 1 }

// Vue 인스턴스에 데이터 객체를 추가.
var vm = new Vue({
  data: data
})

// 같은 객체를 참조합니다!
vm.a === data.a // => true

// 속성 설정은 원본 데이터에도 영향을 미칩니다.
vm.a = 2
data.a // => 2

// ... 당연하게도
data.a = 3
vm.a // => 3
```

- data에 있는 속성들은 인스턴스가 생성될 때 있던 것들만 반응형이다.

```js
data: {
  newTodoText: '',
  visitCount: 0,
  hideCompletedTodos: false,
  todos: [],
  error: null
}

var obj = {
  foo: 'bar'
}

new Vue({
  el: '#app',
  data: obj
})
```
- 어떤 속성이 나중에 필요하다는 것을 알고 있으며, 빈 값이거나 존재하지 않은 상태로 시작한다면 
아래와 같이 초기값을 지정한다.

 ```js
Object.freeze(obj)
```
- `Object.freeze ()`를 사용하면 기존 속성이 변경되는 것을 막아 반응성 시스템이 추적할 수 없다.

```js
var data = { a: 1 }
var vm = new Vue({
  el: '#example',
  data: data
})

vm.$data === data // => true
vm.$el === document.getElementById('example') // => true

// $watch 는 인스턴스 메소드 입니다.
vm.$watch('a', function (newVal, oldVal) {
  // `vm.a`가 변경되면 호출 됩니다.
})
```
- 다른 사용자 정의 속성과 구분하기 위해 $ 접두어를 붙인다.
- this 는 Vue 인스턴스를 가리킨다. this.a => data.a

------

## 템플릿 문법
- 렌더링 된 DOM 을 기본 Vue 인스턴스의 데이터에 선언적으로 바인딩할 수 있는 HTML 기반 템플릿 구문을 사용한다.
- 데이터 바인딩

### 이중 중괄호
```html
<span>{{msg}}</span>
```
```html
<p>Using mustaches: {{ rawHtml }}</p>
<p>Using v-html directive: <span v-html="rawHtml"></span></p>
```
- 이중중괄호는 일반 텍스트로 데이터를 해석한다.
- html 출력하려면 v-html 디렉티브 사용
```html
<div v-bind:id="dynamicId"></div>
```
- HTML 속성에 사용할 수 없다. v-bind 를 대신 사용한다.
- 하나의 단일 표현식을 사용할 수 있다.

### 디렉티브
(v-) 접두사가 있는 특수 속성

전달인자 (:)
```html
<a v-bind:href="url">...</a>
```
- href 속성을 v-bind 디렉티브에게 알려준다.

수식어 (.)
```html
<form v-on:submit.prevent="onSubmit"> ... </form>
```
- 디렉티브를 특별한 방법으로 바인딩 해야 함을 나타낸다.

### 약어
```html
<!-- v-bind -->
<a v-bind:href="url"> ... </a>
<a :href="url"> ... </a>

<!-- v-on -->
<a v-on:click="doSomething"> ... </a>
<a @click="doSomething"> ... </a>
```

# computed 와 watch
- 템플릿 내에 복잡한 로직을 넣으려면 computed 속성을 이용한다.
```html
<div id="example">
  <p>원본 메시지: "{{ message }}"</p>
  <p>역순으로 표시한 메시지: "{{ reversedMessage }}"</p>
</div>
```
```js
var vm = new Vue({
  el: '#example',
  data: {
    message: '안녕하세요'
  },
  computed: {
    // 계산된 getter
    reversedMessage: function () {
      // `this` 는 vm 인스턴스를 가리킵니다.
      return this.message.split('').reverse().join('')
    }
  }
})
```
- 작성한 함수는 getter 함수로 사용되어 `vm.reversedMessage = 'eybdooG'` 이런식으로 사용 될 수 있다.

#### 메소드
```html
<p>뒤집힌 메시지: "{{ reversedMessage() }}"</p>
```
```js
// 컴포넌트 내부
methods: {
  reversedMessage: function () {
    return this.message.split('').reverse().join('')
  }
}
```
- 메소드를 호출해서 같은 결과를 얻을 수 있다.
- **computed 속성은 종속 대상에 따라 저장(캐싱)** 되어서 여러번 요청해도 계산 다시하지 않고 계산되어 있던 결과를 즉시 반환한다. 
즉, `message` 가 변경되지 않는 한, `reversedMessage`를 여러번 호출해도 다시 계산하지 않는다는 것.
- 반면 **메서드를 호출하면 렌더링을 할 때마다 항상 함수를 실행한다.**

### watch
vue 인스턴스의 데이터 변경을 관찰하고 반응한다.

```html
<div id="demo">{{ fullName }}</div>
```
```js
var vm = new Vue({
  el: '#demo',
  data: {
    firstName: 'Foo',
    lastName: 'Bar',
    fullName: 'Foo Bar'
  },
  watch: {
    firstName: function (val) {
      this.fullName = val + ' ' + this.lastName
    },
    lastName: function (val) {
      this.fullName = this.firstName + ' ' + val
    }
  }
})
```
- 감시할 데이터를 지정하고, 그 데이터가 바뀌면 함수를 실행하고 있다. 
- 이걸, 명령형 프로그래밍 방식이라고 한다.
- 그런데 computed 속성은, 선언형 프로그래밍 방식이다. 다음을 보자.

```js
var vm = new Vue({
  el: '#demo',
  data: {
    firstName: 'Foo',
    lastName: 'Bar'
  },
  computed: {
    fullName: function () {
      return this.firstName + ' ' + this.lastName
    }
  }
})
```
- 계산해야 하는 목표 데이터를 정의하고 있다.
- 코드 반복이 적고 보기 좋기 때문에 computed 를 사용하는게 일반적이다.
```js
// ...
computed: {
  fullName: {
    // getter
    get: function () {
      return this.firstName + ' ' + this.lastName
    },
    // setter
    set: function (newValue) {
      var names = newValue.split(' ')
      this.firstName = names[0]
      this.lastName = names[names.length - 1]
    }
  }
}
```
- computed 속성안에 기본적으로 getter 함수만 갖고 있지만, 필요한 경우 setter 만들어 쓸 수 있다.

```js
watch: {
    // 질문이 변경될 때 마다 이 기능이 실행됩니다.
    question: function (newQuestion) {
      this.answer = '입력을 기다리는 중...'
      this.getAnswer()
    }
  },
```
- **데이터 변경에 응답하는 비동기식, 시간이 많이 소요되는 조작을 수행하는 경우에 watch 가 유용하다.**
- 연산을 얼마나 자주 수행하는지 제한하고, 최종 응답을 얻을 때까지 중간 상태를 설정할 수 있다.