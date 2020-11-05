# Typescript

타입스크립트에서 작성할 수 있는 타입은 자바스크립트의 원시 타입과 같다.
```
number, string, boolean, null, undefined, symbol, object
```
여기에 추가적으로 `any`(아무거나 가능), `unknown`(누군가가 정의할 수 있는 타입), `void`(undefined 를 리턴하거나 아무것도 리턴하지 않는 함수) 타입을 사용할 수 있다.

type 을 만드는 방법이 `Interface` 와 `Type` 2가지 있다. 주로 `Interface` 를 사용한다.

### interface
특정한 형태를 갖도록 제약한다.

```typescript
type WindowStates = "open" | "closed" | "minimized";
type LockStates = "locked" | "unlocked";
type OddNumbersUnderTen = 1 | 3 | 5 | 7 | 9;

function getLength(obj: string | string[]) {
  return obj.length;
}
```

### Generic
타입이 정해지지 않았을 때 사용한다.
- `<`, `>`로 변수명을 감싸 정의한다. 
- 대문자로 시작하며 PascalCase 방식을 사용한다.

**Generic interface** 인터페이스 이름 뒤에 타입 변수 정의를 붙인 형태
```typescript
interface MyResponse<Data> {
    data: Data;
    status: number;
    ok: boolean;
}

inteface User {
  name: string;
  readonly height: number;
}

const user: MyReponse<User> = await getUserApiCall(userId);
user.name; // 타입 시스템은 user.name이 string임을 알 수 있다.
```
함수 인터페이스에서도 제너릭을 사용할 수 있다.
```typescript
interface GetData {
  <Data>(response: MyResponse<Data>): Data;
}
```

- 타입별칭은 타입을 새로 생성하지 않고, 인터페이스는 새로운 타입을 생성한다.
- 인터페이스는 `extends` 키워드를 이용해 확장 할 수 있다.
 
Generic 은 여러 타입에 대해 동일한 규칙을 갖고 동작하는 타입. 변수를 타입으로 만든다. 예를 들어 배열이 갖고 있는 타입들을 지정할 수 있다.
여러 타입에 동작하는 함수를 정의한다. 해당 함수를 정의할 때는 알 수 있고 사용할 때만 알수있는 타입 정보.

**타입 변수**는 요소를 사용하는 시점에서만 알 수 있는 타입을 담아두기 위한 변수이다.

```typescript
function getFirstElem<T>(arr: T[]): T {
  /* 함수 본문 */
}
```
> 임의의 타입 T에 대해, getFirstElem은 T 타입 값의 배열 arr를 인자로 받아 T 타입 값을 반환하는 함수다.


```typescript
type StringArray = Array<string>;
type NumberArray = Array<number>;
type ObjectWithNameArray = Array<{ name: string }>;
``` 

Generic 을 사용해 사용자 정의 type 을 만들 수도 있다.
```typescript
interface Backpack<Type> {
  add: (obj: Type) => void;
  get: () => Type;
}

// Typescript 한테 backpack const 변수에 대해 설명한다.
declare const backpack: Backpack<string>;

// 위에서 string 타입을 넣었기 때문에 object 는 string 타입임을 알 수 있다. 
const object = backpack.get();

// string 위치에 숫자를 넣으니 에러가 발생한다.
backpack.add(23);
>>> Argument of type 'number' is not assignable to parameter of type 'string'.
```

배열을 만드는 방법이 2가지 있다.
```typescript
// 배열에 타입을 직접 지정해주거나
let list: number[] = [1,2,3];

// Generic array type 으로 만들기
let list: Array<number> = [1,2,3];
```


 
타입이 정의된 object 를 만들려면 타입을 포함해주면 된다. 다음과 같은 object 가 있다면 interface 에 정의를 해준다.

```js
const user = {
    name: 'Soo',
    id: 0
}
```
```typescript
interface User {
    name: string;
    id: number;
}
```
object 에 인터페이스 형태를 만들어주겠다고 `: TypeName` syntax 를 사용해 알려주면 된다.
만약 interface 에 정의되지 않은 property 가 있을 경우 error 를 내보낸다.
```js
const user: User = {
    name: 'Soo',
    id: 0,
    username: "Hayes",
>>>    Type '{ name: string; id: number; username: string; }' is not assignable to type 'User'.
>>>     Object literal may only specify known properties, and 'username' does not exist in type 'User'.
}
```

class 를 사용할 수도 있다.
```js
interface User {
  name: string;
  id: number;
}

class UserAccount {
  name: string;
  id: number;

  constructor(name: string, id: number) {
    this.name = name;
    this.id = id;
  }
}

const user: User = new UserAccount("Jung", 1);
```

interface 를 파라미터와 리턴 value 에도 적용할 수 있다.
```js
function deleteUser(user: User) {
    // ...
}

function getAdminUser(): User {
    // ...
}
```
화살표 함수는 표기법이 좀 다른데 `반환 타입` 을 화살표함수를 추가해 따로 표기해줘야 한다.
```typescript
(...매개변수 나열) => 반환 타입

const sum = (a, b) => a + b;

const sum: (a: number, b: number) => number = (a, b) => (a + b);

// 타입 별칭도 가능하다.
type SumFunction = (a: number, b: number) => number;
const definitelySum: SumFunction = (a, b) => (a + b); 
```

선택 속성 `?`
```typescript
const userWithUnknownHeight: { name: string; height?: number; } = { 
  name: '김수한무' 
};
```

읽기 전용 `readonly`
```typescript
const user: { 
  readonly name: string; 
  id: numer; 
} = { name: '채수정', id: 0 };
```

타입 별칭
- 기존에 존재하는 타입에 다른 이름을 붙일 수 있다.
```typescript
type UUID = string;
type Height = number;
type AnotherUUID = UUID;
type Animals = Animal[];
type User = {
  name: string;
  height: number;
};

function printHeight(height: Height) {
    // ...
}
```

기본값 `=`
```typescript
function greetings(name: string = 'stranger'): void {
  console.log(`Hello, ${name}`);
}
```

함수 오버로딩
- 함수는 **하나 이상의 타입 시그니처**를 가질 수 있다.
- 함수는 **단 하나의 구현**을 가질 수 있다.
- 호출하는 인자에 따라 다른 리턴값을 가질 수 있다.

```typescript
// 이런 함수들
function doubleString(str: string): string {
    return `${str}${str}`;
}
function doubleNumber(num: number): number {
    return (num * 2);
}
function doubleBooleanArray(arr: boolean[]): boolean[] {
    return arr.concat(arr);
}

// 시그니처를 구현하고
function double(str: string): string;
function double(num: number): number;
function double(arr: boolean[]): boolean[];을

// 함수 본문을 정의하니다.
function double(arg) {
    if (typeof arg === 'string') {
        return `${arg}${arg}`;
    } else if (typeof arg === 'number') {
        return arg * 2;
    } else if (Array.isArray(arg)) {
        return arg.concat(arg);
    }
}
```
### 유니온 타입
"여러 경우 중 하나" 인 타입을 표현하는 타입이다. `|` 기호로 이어서 표현한다.
```typescript
type SquaredType = string | number;
```

하나의 타입을 제외하고 모든 부분이 똑같거나 반환값을 할당하는 변수의 타입을 정의하기 어렵다면 **유니온 타입**을 사용하면 된다.
```typescript
function square(value: number, returnString: boolean): number;
function square(value: number, returnString: boolean): string;
function square(value, returnString = false) {
  /* 본문 동일 */
}
const mystery: ??? = square(randomNumber, randomBoolean);

// 유니온 타입으로 만들어보자.
function square(value: number, returnString: boolean = false): string | number {
  /* 본문 동일 */
}

// 타입 별칭을 붙여 복잡함을 줄인다.
type SquaredType = string | number;
function square(value: number, returnOnString: boolean = false): SquaredType {
  /* 본문 동일 */
}

const stringOrNumber: string | number = square(randomNumber, randomBoolean);
```

this 타입을 지정할 수 있다.
```typescript
interface HTMLElement {
  tagName: string;
  /* ... */
}
interface Handler {
  (this: HTMLElement, event: Event, callback: () => void): void;
}
let cb: any;
// 실제 함수 매개변수에는 this가 나타나지 않음
const onClick: Handler = function(event, cb) {
  // this는 HTMLElement 타입
  console.log(this.tagName);
  cb();
}

// this 타입을 void 로 지정하면 this 접근을 막을 수 있다.
interface NoThis {
    (this: void): void;
}
const noThis: NoThis = function() {
  console.log(this.a); // Property 'a' does not exist on type 'void'.
}
```

### 인터섹션 타입
여러개의 타입을 조합하고 싶을 때 사용한다.
```typescript

type Programmer = { favoriteLanguage: string };
type BeerLover = { favoriteBeer: string };

// to be

type BeerLovingProgrammer = Programmar & BeerLover;
```

### 열거형
`enum`으로 표현한다.
멤버값을 초기화하지 않을 경우 0부터 순차적으로 증가한다.
```typescript
enum Direction {
  East,
  West,
  South,
  North
}
enum ExplicitDirection {
  East = 0,
  West = 1,
  South = 2,
  North = 3
}
```
초기화 하지 않은 멤버가 섞여 있다면 이전에 초기화된 멤버값 + 1 로 결정된다.
```typescript
enum InitializedDirection2 {
  East = 3,
  West /* 4 */,
  South = 7,
  North /* 8 */
}
```
문자형으로도 초기화할수있지만 증가되지 않는다.
```typescript
enum Direction {
  East = 'EAST',
  West = 'WEST',
  South = 'SOUTH',
  North = 'NORTH'
}
```
컴파일 과정에서 값을 대체시킬 수도 있다.
```typescript
const enum ConstEnum {
  A,
  B = 2,
  C = B * 2,
  D = -C,
}
```
색인 시그니처

## CRA 프로젝트에 ts 적용하기
```
npm install --save typescript @types/node @types/react @types/react-dom @types/jest
```

yarn start 를 했을 때 dependency 에러가 나면 해당 패키지를 따로 추가해주면 된다.
난 추가적으로 개발용 패키지에 `@types/react-redux`, `@types/react-router-dom` 를 설치했다.



## 참고
- [TypeScript for JS Programmers](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html)
- [](https://ahnheejong.gitbook.io/ts-for-jsdev/03-basic-grammar/object)