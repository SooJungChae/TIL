# `substring` vs `slice`

## 탄생 배경
Netscape 2.0 에서 Javascript 가 만들어졌을 때 `substring` 메소드밖에 없었다.
만약 arguments 가 음수라면, 0으로 간주했다.

이후 Netscape 4.0 에서 Javascript 1.2 가 소개되었다.

**문자열 끝에서부터의 거리**를 의미하는 음수 인덱스를 가져오도록 만들고 싶었는데,
`substring` 으로는 음수를 0 으로 간주했기 때문에 기존 로직을 수정할 수 없었고, 
음수 인덱스 기능을 지원하는 새로운 함수 `slice` 를 만들게 되었다. 이 함수는 `String` 뿐 아니라 `Array`에도 추가되었다.

## 차이점
탄생배경에서 보다시피 argument 를 처리하는 방식이 다르다. `substring` 은 음수가 들어오면 0 으로 간주하고, 
`slice` 에서 음수가 들어오면 뒤에서부터 잘라낼 거리를 계산한다.

```js
var text = 'Mozilla';
console.log(text.substring(0, -1)); // => ""
console.log(text.slice(0, -1));     // => "Mozill"
```

또 다른 점은 arguments 의 순서다.
 
`substring` 에서 argument 의 순서는 중요하지 않다. `substring(5, 2)` 는 `substring(2, 5)` 결과와 같다.
`slice` 는 이와 다르게 `slice(5,2)` 을 호출하면 빈 문자열을 리턴한다.   

```js
var text = 'Mozilla';
console.log(text.substring(5, 2)); // => "zil"
console.log(text.slice(5, 2));     // => ""
```

## 출처

- https://stackoverflow.com/questions/18224226/why-two-different-methods-slice-substring/18224720#18224720
- https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/String/substring#differences_between_substring_and_slice
