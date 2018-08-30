# Array method

### forEach
각각 요소에 대해 실행

### map
각각 요소를 호출해서 새로운 array 결과 반환

### filter
filter 조건에 맞는 요소들만 추려서 새로운 array 배열 반환

### find
배열에 있는 요소가 필터 조건에 맞는다면 value 리턴하고, 없으면 undefined 리턴

### every
모든 요소가 조건에 맞는지를 검사. (true/false)<br/>
* 중간에 break 되면 **return false**를 한다.

### some
배열의 일부 요소가 조건을 포함하고 있는지 검사 (true/false)<br/>
* 중간에 break 되면 **return true**를 한다.
* https://stackoverflow.com/a/6260865

### reduce
배열의 각 요소를 차례로 함수에 적용해 하나의 값으로 줄여준다.
```javascript
const array1 = [1, 2, 3, 4];
const reducer = (accumulator, currentValue) => accumulator + currentValue;

// 1 + 2 + 3 + 4
console.log(array1.reduce(reducer));
// expected output: 10

// 5 + 1 + 2 + 3 + 4
console.log(array1.reduce(reducer, 5));
// expected output: 15
```

### reject
