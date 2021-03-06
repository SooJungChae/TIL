# 배열과 유사배열

요즘 공부의 필요성을 느껴서 도움이 되는 곳은 이곳저곳 돌아다니고 있다.
페이스북, 카페, IT 사이트 등을 매일 들여다 보면서 '오늘도 새로운 걸 배우네' 라고 느낀다.

오늘자 의미있던 것
https://www.zerocho.com/category/JavaScript/post/5af6f9e707d77a001bb579d2


**배열과 유사배열**

javascript 를 하면서 헷갈리고 답답했던 게 HTMLDomElement 였다.
배열 형식이지만 쉽게 DOMElement 를 만들 수 없었고 데이터를 읽어오는 것도 불편했다.
알고보니 이게 바로 **유사배열** 이라고!

유사배열?
배열처럼 대괄호 [] 로 감싸져 있지만, 배열이 아닌 것. 이게 유사배열이다.
```
var age = [10, 11]; // array [10, 11]
var div = document.querySelectorAll('div'); // NodeList [div, div, div, ...]
var els = document.body.children; // HTMLCollection [noscript, link, div, ...]
```


배열과 유사배열을 구분하고 싶다면 다음을 사용한다.
1. isArray
```
Array.isArray(age); // true
Array.isArray(div); // false
Array.isArray(els); // false
```
2. instanceof
```
console.log(age instanceof Array); // true
console.log(div instanceof Array); // false
console.log(els instanceof Array); // false
```

유사배열은 forEach 같은 배열의 메서드를 쓸 수 없다.
```
age.forEach(function(el) { console.log(el); }); // 10, 11
els.forEach(function(el) { console.log(el); }); // Uncaught TypeError: els.forEach is not a function
// (div 는 Node 프로토타입에 forEach 가 있어서 된다.)
```


이럴 때는 배열의 메서드를 **빌려와서** 사용할 수 있다.
call 이나 apply 를 쓰면 된다.
```
var tds = this.getElementsByTagName("td");
Array.prototype.forEach.call(tds, function (el) {
  console.log(el);
});

// <td style="border: 1px solid rgb(176, 176, 176); border-image: none;">00</td>
// <td style="border: 1px solid rgb(176, 176, 176); border-image: none;">전체</td>
// <td style="border: 1px solid rgb(176, 176, 176); border-image: none;">11</td>
```

최신 자바스크립트에서는 Array.from 으로 더 간단히 사용할 수 있다고 하니 참고하면 좋을 듯 하다.
```
Array.from(div).forEach(function(el) { console.log(el) });
```




