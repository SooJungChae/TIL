# Typescript

타입스크립트에서 작성할 수 있는 타입은 자바스크립트의 원시 타입과 같다.
```
number, string, boolean, null, undefined, symbol, object
```
여기에 추가적으로 `any`(아무거나 가능), `unknown`(누군가가 정의할 수 있는 타입), `void`(undefined 를 리턴하거나 아무것도 리턴하지 않는 함수) 타입을 사용할 수 있다.

type 을 만드는 방법이 `Interface` 와 `Type` 2가지 있다. 특정 모양을 필요로 하지 않는 이상 `Interface` 를 선호할 것이다.

```typescript
type WindowStates = "open" | "closed" | "minimized";
type LockStates = "locked" | "unlocked";
type OddNumbersUnderTen = 1 | 3 | 5 | 7 | 9;

function getLength(obj: string | string[]) {
  return obj.length;
}
```

Generic 은 변수를 타입으로 만든다. 예를 들어 배열이 갖고 있는 타입들을 지정할 수 있다.
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
function getAdminUser(): User {
    // ...
}

function deleteUser(user: User) {
    // ...
}
```
## 참고
- [TypeScript for JS Programmers](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html)