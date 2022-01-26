## Type

- string
- number
- float
- boolean (False, True)
- none (None)

## convention

- snake_case 사용하기

## print(a_something)

출력

## type(a_number)

type 을 보여준다.


## Sequence type

### list

- mutable 
```py
days = ["Mon", "Tue", "Wed", "Thur", "Fri"]
```

### Tuple

- immutable
```py
days = ("Mon", "Tue", "Wed", "Thur", "Fri")
```

## Dictionary

```py
soo = {
    "name": "Soo",
    "age": 22,
}
```

## Function

- `def` 로 함수 선언
- `:` 를 꼭 사용
- `{}` 없이 tab 으로 블록 처리

```py
def plus(a, b):
    print(a + b)

plus(2,3) // 5
``` 

## keyword arguments

```py
def say_hello(name, age):
    return f"Hello {name} you are {age} years old"

say_hello(age=24, name='soo') # Hello soo you are 24 years old
```
- string 앞에`f` 를 붙이면 arguments 이름을 바로 사용할 수 있다.
- arguments 에 keyword 를 붙이면 위치에 상관없이 해당 변수에 일치하는 곳에 값이 들어간다.

## modules

- import 로 만들어진 함수 라이브러리를 가져올 수 있다.
- 다 가져올 필요없이 사용하는 함수만 가져오는 게 효율적.
- 파일명도 바로 import 가능

```py
# import math 대신에 from & import 사용
# as 로 이름 변경 가능
from math import ceil, fsum as sexy_sum

print(ceil(1.2))    // 2
print(sexy_sum([1,2,3,4])   //28.0
```

---

## Code challenge 

숙제) 7가지 연산자를 활용해 계산기 만들기
주의) 사용자 입력을 고려해야 한다. (string 을 넣을 경우 예외처리) 

**Build-in Functions** 문서 참고
- plus x + y
- minus x - y
- times x * y
- division x / y
- remainder x % y
- nagation -x
- power x ** y

**Built-in Types** 문서 참고
```python
def isNumber(x, y):
  if (type(x) is int and type(y) is int):
    return True
  else:
    return False
```

---


- [파이썬 테스트 웹 사이트 replit.com](https://replit.com/@SooJungChae)
- [파이썬 표준 라이브러리](https://docs.python.org/ko/3/library/index.html)
