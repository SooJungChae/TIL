# 목차

## Vue

> 사용자 인터페이스를 만드는 **프레임워크**

## Nuxt.js

> Vue.js 어플리케이션을 만드는 프레임워크. UI렌더링을 처리한다.

## 동작방식

## 라이프사이클

> - Creation : 컴포넌트 초기화 단계
> - Mounting : DOM 삽입 단계
> - Updating : Diff 및 재 렌더링 단계
> - Destruction : 해체 단계

- [Vue.js 2.0 라이프사이클 이해하기](https://medium.com/witinweb/vue-js-%EB%9D%BC%EC%9D%B4%ED%94%84%EC%82%AC%EC%9D%B4%ED%81%B4-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0-7780cdd97dd4)


## 옵션

> - data
> - props
> - computed
> - watch
> - methods

## 디렉티브

> vue 엘리먼트에게 이렇게 작동하라고 지시하는 지시

### data

> 함수여야 한다.

```js
data: function() {
    return {
        count: 0
    }
}
```

### props

> 컴포넌트에 등록할 수 있는 사용자 정의 속성.

- props 가 전달되면, 해당 컴포넌트 인스턴스의 속성이 된다.

## 컴포넌트

> 이름을 사용해서 재사용될 수 있는 vue 인스턴스.

## v-bind 과 v-model 차이

> 단방향 바인딩, 양방향 바인딩

### v-model

> 사용자 입력 이벤트에 대한 데이터를 업데이트하는 syntax sugar

```html
<!-- 이 구문을 -->
<input :value="message" @input="message = $event.target.value" type="text">
<p>{{ message }}</p>

<!-- 이렇게 간결하게 표현할 수 있다.-->
<input v-model="message" />
<p>{{ message }}</p>
...
data: function() {
    return ({
        message: '메세지가 들어가는 곳'
    });
}
```
- [양방향 데이터 바인딩](#양방향-바인딩)
- 한글을 사용하려면 v-bind:value 와 v-on:input 으로 구현해야 한다.

```html
<input v-bind="message" @input="message = $event.target.value" type="text">
<p>{{ message }}</p>
```

## 양방향 바인딩

> 뷰 <-> 데이터 형태로 바인딩해서 데이터가 양 방향으로 흐르게 해주는 것.

```html
<comp :foo.sync="bar"></comp>

아래와 같다

<comp :foo="bar" @update:foo="val => bar = val"></comp>
```
foo 를 갱신하려면 명시적으로 이벤트를 보내야 한다.
```js
this.$emit('update:foo', newValue)
```

## 리스트 렌더링

> 원본 배열을 변경하지 않는 경우엔 변경 사항을 감지할 수 없다. (filter, concat, slice)

## 변경을 감지할 수 없는 상황

> - 인덱스로 배열에 있는 항목을 직접 설정하는 경우
> - 배열 길이를 수정하는 경우

## method 와 compute 를 사용하는 경우

## 참고 사이트
https://vuejs.org/v2