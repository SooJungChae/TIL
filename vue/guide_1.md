# Vue 인스턴스
## Vue 인스턴스 만들기
```
var vm = new Vue({
  // 옵션
})
```

### 속성과 메소드
각 Vue 인스턴스는 data 객체에 있는 모든 속성을 프록시 처리 합니다.
```
// 데이터 객체
var data = { a: 1 }

// Vue인스턴스에 데이터 객체를 추가합니다.
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

- data에 있는 속성들은 인스턴스가 생성될 때 존재한 것들만 반응형이라는 것입니다
- 어떤 속성이 나중에 필요하다는 것을 알고 있으며, 빈 값이거나 존재하지 않은 상태로 시작한다면 아래와 같이 초기값을 지정할 필요가 있습니다.
- `Object.freeze ()`를 사용하면 기존 속성이 변경되는 것을 막아 반응성 시스템이 추적할 수 없다는 것을 의미합니다.
```
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

Object.freeze(obj)

new Vue({
  el: '#app',
  data: obj
})
```

- 다른 사용자 정의 속성과 구분하기 위해 $ 접두어를 붙인다.
```
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

- this 는 Vue 인스턴스를 가리킨다. this.a => data.a

### 템플릿 문법
- 렌더링 된 DOM을 기본 Vue 인스턴스의 데이터에 선언적으로 바인딩할 수 있는 HTML 기반 템플릿 구문을 사용한다.
- 데이터 바인딩

#### 이중 중괄호
```
<span>{{msg}}</span>
```
- 이중중괄호는 일반 텍스트로 데이터를 해석한다.
- html 출력하려면 v-html 디렉티브 사용
```
<p>Using mustaches: {{ rawHtml }}</p>
<p>Using v-html directive: <span v-html="rawHtml"></span></p>
```
- HTML 속성에 사용할 수 없다. v-bind 를 대신 사용한다.
```
<div v-bind:id="dynamicId"></div>
```
- 하나의 단일 표현식을 사용할 수 있다.

#### 디렉티브
(v-) 접두사가 있는 특수 속성

전달인자 (:)
```
// href 속성을 v-bind 디렉티브에게 알려준다.
<a v-bind:href="url">...</a>
```

수식어 (.)
- 디렉티브를 특별한 방법으로 바인딩 해야 함을 나타낸다.
```
<form v-on:submit.prevent="onSubmit"> ... </form>
```

#### 약어
```
<!-- v-bind -->
<a v-bind:href="url"> ... </a>
<a :href="url"> ... </a>

<!-- v-on -->
<a v-on:click="doSomething"> ... </a>
<a @click="doSomething"> ... </a>
```

# computed 와 watch
- 템플릿 내에 복잡한 로직을 넣으려면 computed 속성을 이용한다.
```
<div id="example">
  <p>원본 메시지: "{{ message }}"</p>
  <p>역순으로 표시한 메시지: "{{ reversedMessage }}"</p>
</div>
```
```
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
- vm.reversedMessage속성에 대한 getter 함수로 사용됩니다.
vm.message = 'Goodbye'
console.log(vm.reversedMessage) // => 'eybdooG'
- 메소드를 호출해서 같은 결과를 얻을 수 있다.
```
<p>뒤집힌 메시지: "{{ reversedMessage() }}"</p>
```
```
// 컴포넌트 내부
methods: {
  reversedMessage: function () {
    return this.message.split('').reverse().join('')
  }
}
```
- computed 속성은 종속 대상에 따라 저장(캐싱)되어서 여러번 요청해도 계산 다시하지 않는다.
- 반면 메서드를 호출하면 렌더링을 할 때마다 항상 함수를 실행한다.
- watch : vue 인스턴스의 데이터 변경을 관찰하고 반응. computed 를 사용하는게 일반적.
```
<div id="demo">{{ fullName }}</div>

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

vs

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
- computed 속성안에 필요한 경우 setter 만들어 쓸 수 있음.
```
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
// ...
```
- 하지만, 데이터 변경에 응답하는 비동기식, 시간이 많이 소요되는 조작을 수행하는 경우 watch 가 유용하다.
```
<div id="watch-example">
  <p>
    yes/no 질문을 물어보세요:
    <input v-model="question">
  </p>
  <p>{{ answer }}</p>
</div>
<!-- 이미 Ajax 라이브러리의 풍부한 생태계와 범용 유틸리티 메소드 컬렉션이 있기 때문에, -->
<!-- Vue 코어는 다시 만들지 않아 작게 유지됩니다. -->
<!-- 이것은 이미 익숙한 것을 선택할 수 있는 자유를 줍니다. -->
<script src="https://unpkg.com/axios@0.12.0/dist/axios.min.js"></script>
<script src="https://unpkg.com/lodash@4.13.1/lodash.min.js"></script>
<script>
var watchExampleVM = new Vue({
  el: '#watch-example',
  data: {
    question: '',
    answer: '질문을 하기 전까지는 대답할 수 없습니다.'
  },
  watch: {
    // 질문이 변경될 때 마다 이 기능이 실행됩니다.
    question: function (newQuestion) {
      this.answer = '입력을 기다리는 중...'
      this.getAnswer()
    }
  },
  methods: {
    // _.debounce는 lodash가 제공하는 기능으로
    // 특히 시간이 많이 소요되는 작업을 실행할 수 있는 빈도를 제한합니다.
    // 이 경우, 우리는 yesno.wtf/api 에 액세스 하는 빈도를 제한하고,
    // 사용자가 ajax요청을 하기 전에 타이핑을 완전히 마칠 때까지 기다리길 바랍니다.
    // _.debounce 함수(또는 이와 유사한 _.throttle)에 대한
    // 자세한 내용을 보려면 https://lodash.com/docs#debounce 를 방문하세요.
    getAnswer: _.debounce(
      function () {
        if (this.question.indexOf('?') === -1) {
          this.answer = '질문에는 일반적으로 물음표가 포함 됩니다. ;-)'
          return
        }
        this.answer = '생각중...'
        var vm = this
        axios.get('https://yesno.wtf/api')
          .then(function (response) {
            vm.answer = _.capitalize(response.data.answer)
          })
          .catch(function (error) {
            vm.answer = '에러! API 요청에 오류가 있습니다. ' + error
          })
      },
      // 사용자가 입력을 기다리는 시간(밀리세컨드) 입니다.
      500
    )
  }
})
</script>
```
