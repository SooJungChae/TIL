mutable 은 변경이 되는 것, immutable 변경할 수 없는 것을 의미한다.
- Array 와 Object 는 mutable 하다.
    - 안의 컨텐츠는 변경되었지만 메모리의 참조는 변하지 않았기 때문이다.

immutable 하게 만들기 위해선 **object/arrays 를 복사하고 복사된 것을 수정**해야 한다.
- spread 연산자를 사용한다.
```
// https://redux.js.org/tutorials/essentials/part-1-overview-concepts

const obj = {
  a: {
    // To safely update obj.a.c, we have to copy each piece
    c: 3
  },
  b: 2
}

const obj2 = {
  // copy obj
  ...obj,
  // overwrite a
  a: {
    // copy obj.a
    ...obj.a,
    // overwrite c
    c: 42
  }
}

const arr = ['a', 'b']
// Create a new copy of arr, with "c" appended to the end
const arr2 = arr.concat('c')

// or, we can make a copy of the original array:
const arr3 = arr.slice()
// and mutate the copy:
arr3.push('c')
```
