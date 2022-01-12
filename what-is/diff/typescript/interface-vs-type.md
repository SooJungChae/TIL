# `interface` vs `type`

> TypeScript의 핵심 원칙 중 하나는 타입 검사가 값의 형태에 초점을 맞추고 있다는 것입니다. 이를 "덕 타이핑(duck typing)" 혹은 "구조적 서브타이핑 (structural subtyping)"이라고도 합니다. TypeScript에서, 인터페이스는 이런 타입들의 이름을 짓는 역할을 하고 코드 안의 계약을 정의하는 것뿐만 아니라 프로젝트 외부에서 사용하는 코드의 계약을 정의하는 강력한 방법입니다.
> - [Typescript 공식문서 - 인터페이스](https://typescript-kr.github.io/pages/interfaces.html)

중요한 것은 '형태'뿐이다.

## `interface`

- 규격사항 -> 올바르게 구현하는 목적
- 의사소통을 할 때 도와주는 것.
- 규격을 통해 다른 부분이 구현되어야 한다면 `interface` 로 정의하자.
- ex) object

## `type Alias`

- 데이터를 담을 때. 데이터의 모습, 데이터의 타입 -> 데이터를 담을 목적
- 오로지 데이터를 표현한다면 `type` 을 쓰자. 
- ex) 리터럴, 상수

---

예전에는 Type alias 가 지원하는 기능이 많이 없어서 interface 를 많이 사용했다.
이제는 둘 사이의 공통점도 많이 생겨서 구분이 안될 것 같지만 
상수값이나 명확한 의미를 담고 있는 리터럴 object 같은 경우는 type 을 쓰는게 바람직해 보인다.

```ts
type DateTime = string;

type Option = {
  label: string;
  value: number;
}

interface BannerDay extends Option { index: number; }

interface Banner {
  id: number;
  beginDate: DateTime;
  endDate: DateTime;
  day: BannerDay[];
  text: string;
}

export const postBanner = (banner: Banner) =>
  request.post(`${HOST_API}/banner`, banner);
```

---

# 공통점 & 차이점
 
## 1. Objects / Functions

- 둘 다 Object 를 표현할 수 있는데 syntax 가 다르다.

interface
```ts
interface Point {
  x: number;
  y: number;
}

interface SetPoint {
  (x: number, y: number): void;
}
```
type alias
```ts
type Point = { x: number; y: number; }
type SetPoint = (x: number, y: number) => void;
```

## 2. Other Types

interface 와 다르게 type 은 다른 primitives, unions, tuples 타입으로 쓰일 수 있다.

```ts
// Primitive
type Name = string;

// object
type PartialPointX = { x: number; };
type PartialPointY = { y: number; };

// union
type PartialPoint = PartialPointX | PartialPointY;

// tuple
type Data = [number, string];
```

## 3. Extend

- 둘다 extend 할 수 있지만 구문이 다르다.

interface extends interface
```ts
interface PartialPointX { x: number; }
interface Point extends PartialPointX { y: number; }
```

type extends type
```ts
type PartialPointX = { x: number; };
type Point = PartialPointX & { y: number; }; 
```

interface extends type
```ts
type PartialPointX = { x: number; };
interface Point extends PartialPointX { y: number; } 
```

type extends interface
```ts
interface PartialPointX { x: number; }
type Point = PartialPointX & { y: number; }
```

## 4. Implements

- class 에서 interface 와 type 을 상속할 수 있다.

```ts
interface Point {
  x: number;
  y: number;
}

class SomePoint implements Point {
  x = 1;
  y = 2;
}

type Point2 = {
  x: number;
  y: number;
}

class SomePoint2 implements Point2 {
  x = 1;
  y = 2;
}

type PartialPoint = { x: number; } | { y: number; };

// can not implement a union type
class SomePartialPoint implements PartialPoint {
  x = 1;
  y = 2;
}
```

## 5. Declaration merging

- interface 는 여러번 정의 할 수 있다.
- 그리고 이렇게 하면 merge 가 되어 하나의 interface 로 간주한다.

```ts
interface Point { x: number; }
interface Point { y: number; }

const point: Point = { x:1, y: 2};
``` 

## 6. computed type
- type 은 유틸리티, map, index 타입 이용 가능.

```ts
type Person = {
  name: string,
  age: number,
}

type Name = Person['name'];
```

## 참고
- [Interfaces vs Types in TypeScript](https://stackoverflow.com/questions/37233735/interfaces-vs-types-in-typescript)
