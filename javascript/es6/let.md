# var 과 let 의 차이
[https://youtu.be/RZ3gXcI1MZY](https://youtu.be/RZ3gXcI1MZY)

- **var**는 함수(function) 단위
- **let**은 중괄호({}) 단위
```javascript
function() {
  {
    var a = 1;
  }
  console.log(a); // 1
}

function() {
  {
    let a = 1;
  }
  console.log(a); // undefined error
}
```

- let 은 for 문에서 특이하게 동작하는데, 자세한건 위의 링크를 보면 그 점에 대해 볼 수 있다.
- 요약하자면 let 은 for 문을 돌면서 스코프 체인을 매번 생성하는데 하나만 생성하는 var 와는 다르게 각자의 i 값에 접근할 수 있다는 것이다. 
(뭔 말인지 모르겠지 링크를 보자!ㅋㅋ)

