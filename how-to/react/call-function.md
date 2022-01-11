# React 안에서의 함수 호출

DOM 엘리먼트 이벤트와 다른 처리방식을 사용한다.
```html
<button onclick="activateLasers()">
  Activate Lasers
</button>
```
```jsx
<button onClick={activateLasers}>
  Activate Lasers
</button>
```
- 문자열이 아닌 함수로 이벤트 핸들러를 전달한다.

## `onClick="activateLasers"`
```jsx
<button onClick="activateLasers">
  Activate Lasers
</button>
```
- 메서드를 참조하는 방식

## `onClick="() => activateLasers()"`

```jsx
<button onClick="() => activateLasers()">
  Activate Lasers
</button>
```

- 컴포넌트가 렌더링 될 때마다 다른 콜백이 생성된다.
- 콜백이 하위 컴포넌트에 props 로 전달되면 그 컴포넌트들은 추가로 다시 렌더링을 하게 된다.
- 이런 성능 문제를 피하려면 생성자 안에서 바인딩하거나 클래스 필드 문법을 사용하자. (하지만 난 함수형 컴포넌트를 사용한다.)

## `onClick="activateLasers()"`

```jsx
<button onClick="activateLasers()">
  Activate Lasers
</button>
```

- TODO: 의문이다. 얘는 왜 렌더링 됐을 때 바로 실행하지 않는걸까?