# Virtual DOM

> Virtual DOM (VDOM)은 UI의 이상적인 또는 “가상”적인 표현을 메모리에 저장하고 
> ReactDOM과 같은 라이브러리에 의해 “실제” DOM과 동기화하는 프로그래밍 개념입니다. 
> 이 과정을 재조정이라고 합니다.

Reconciliation

O(n) 복잡도의 휴리스틱 알고리즘

- 서로 **다른 타입**의 두 엘리먼트는 서로 **다른 트리**를 만들어낸다.
- 개발자가 **key prop**을 통해, 여러 렌더링 사이에서 어떤 자식 엘리먼트가 변경되지 않아야 할지 표시해 줄 수 있다.

엘리먼트의 타입이 다른 경우

- root 엘리먼트부터 비교한다.
- 트리를 버릴 때 이전 DOM 노드들은 파괴된다. 
- 이전 트리와 연관된 모든 state 는 사라진다.
- 완전히 새로운 트리를 구축한다.

속성만 바뀐다면 변경된 속성들만 갱신한다.
```js
<div className="before" title="stuff" />
// to
<div className="after" title="stuff" />

<div style={{color: 'red', fontWeight: 'bold'}} />
// to
<div style={{color: 'green', fontWeight: 'bold'}} />
```

자식 요소에 key 사용하기

key는 오로지 형제 사이에서만 유일하면 되고, 전역에서 유일할 필요는 없다.
하지만 인덱스를 key 로 사용하면 배열이 재배열 되었을 때 해당 key 도 변할 수 있으니 
성능상으로도 안좋고 state 가 엉망이 되거나 의도하지 않은 방식으로 바뀔 수 있다.

Math.random() 처럼 변하는 key 를 사용하면 많은 컴포넌트 인스턴스와 DOM 노드를 불필요하게 재생성하여
성능이 나빠지거나 자식 컴포넌트의 state 가 유실될 수 있다.

key 는 변하지 않고, 예상 가능하며, 유일해야 한다.

여기서 말하는 재렌더링은 render 를 호출하는 것이지 React 가 언마운트시키고 다시 마운트하는 것은 아니다.   


## 참고
- [Virtual DOM and Internals](https://ko.reactjs.org/docs/faq-internals.html#what-is-the-virtual-dom)
- [재조정 (Reconciliation)](https://ko.reactjs.org/docs/reconciliation.html)
