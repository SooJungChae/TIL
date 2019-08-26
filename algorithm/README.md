## TIP
### 해시함수
- 배열에서 특정 요소 찾을 땐 sort 해서 찾는 게 더 빠르다. [hash_player](./programmers/hash_player.html)
- 정렬하려면 배열을 만들어 sort 를 하자. [hash_bestAlbum](./programmers/hash_bestAlbum.html)

### sort
- javascript 의 정렬에서는 문자열로 sort 하기 때문에 100, 2, 5 를 sort 하면 원하지 않는 답이 나올 수 있다...100보다 5가 더 크다고 나옴. :anguished: 그러니 compare function 을 추가해주기!
- 숫자 첫번째 글자부터 비교할 때 map 으로 한 번에 string 으로 만들자. 그리고 이 구문 사용. [sort_KNumber](./programmers/sort_biggestNumber.html)
```js
(b + a) * 1 - (a + b) * 1
```

### 탐색
- 최대값 구할 때 sort 도 있지만 Math.max() 함수도 있다.
- 소수 판별할 땐 제곱근을 사용한다. Math.sqrt()
- for...in 객체의 key 에 접근
- for...of iterable 속성의 value 에 접근