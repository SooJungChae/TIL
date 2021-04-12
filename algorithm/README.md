## TIP

### 몫 / 나머지
- 나머지가 있는 경우 + 를 해줘야 하는 경우가 있다. (인원수별로 구비해야하는 연필 한 다스 갯수)
- `parseInt(n / 12) + parseInt(n % 12)` 를 해줄 수도 있지만, `Math.ceil(n)` 을 쓰면 바로 되지롱.  

### 최대값 / 최솟값
- for 문으로 배열을 돌면서 하나씩 비교할 수 있다.
- min 초기 값은 `Math.MAX_SAFE_INTEGER` 을 사용할 수 있다. 
- 내장함수를 사용한다.
    - `Math.min()`, `Math.max()`
    - 인자는 배열이 들어가면 안되니, 배열 인자일 경우 `spread 연산자`를 사용하거나, `apply(null, arr)` 를 사용한다. 

### 해시함수
- 배열에서 특정 요소 찾을 땐 sort 해서 찾는 게 더 빠르다. [hash_player](./programmers/hash_player.html)
- 정렬하려면 배열을 만들어 sort 를 하자. [hash_bestAlbum](./programmers/hash_bestAlbum.html)

### sort
- javascript 의 정렬에서는 문자열로 sort 하기 때문에 100, 2, 5 를 sort 하면 원하지 않는 답이 나올 수 있다...100보다 5가 더 크다고 나옴. :anguished: 그러니 compare function 을 추가해주기!
- 숫자 첫번째 글자부터 비교할 때 map 으로 한 번에 string 으로 만들자. 그리고 이 구문 사용. [sort_KNumber](./programmers/sort_biggestNumber.html)
```js
(b + a) * 1 - (a + b) * 1
```
- 문자열 sort 할 땐 부등호를 사용한다. [여행 경로](./programmers/dfsbfs_travelRoute.html.html)
```js
return +(b.arrive < a.arrive) || +(b.arrive < a.arrive) - 1;
```

### 탐색
- 소수 판별할 땐 제곱근을 사용한다. Math.sqrt()
- for...in 객체의 key 에 접근
- for...of iterable 속성의 value 에 접근

### DFS/BFS
