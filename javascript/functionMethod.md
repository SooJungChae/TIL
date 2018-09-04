# Function method
[https://www.zerocho.com/category/JavaScript/post/57433645a48729787807c3fd](https://www.zerocho.com/category/JavaScript/post/57433645a48729787807c3fd)

- 첫번째 인자에 대체될 this object 가 들어간다.
- 이 방식들은 함수의 arguments 를 바꿀 때 주로 사용한다. 즉, 자기 함수인 것 마냥 쓸 수 있다.
```javascript
Array.prototype.join.call(arguments);
```

## Call, Apply 차이
- call 은 보통 함수와 똑같이 인자를 넣는다.
- apply 는 인자를 하나로 묶어 배열로 만들어 넣는다.

```javascript
var example = function (a, b, c) {
  return a + b + c;
};
example(1, 2, 3);
example.call(null, 1, 2, 3);
example.apply(null, [1, 2, 3]);
```

```javascript
var obj = {
  string: 'zero',
  yell: function() {
    alert(this.string);
  }
};
var obj2 = {
  string: 'what?'
};
obj.yell(); // 'zero';
obj.yell.call(obj2); // 'what?'
obj.yell(); // 'zero';
```

## Bind
- call, apply는 호출까지 하는데, bind 는 함수만 반환한다.
- 즉, `call(this,1,2,3) = bind(this)(1,2,3)`
