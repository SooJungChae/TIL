[목차]
- [ts 를 js 로 만들기](#ts-를-js-로-만들기)
- [Typescript 5분 뽀개기](#Typescript-5분-뽀개기)
- [Typescript 기본 타입](#Typescript-기본-타입)

# ts 를 js 로 만들기
타입스크립트를 js 로 만들려면 다음을 커맨드라인에 입력.
```cmd
tsc greeter.ts
```
그럼 js 파일이 생긴다.


변수에 다른 타입이 들어오면 에러가 나온다.
(에러가 나도 js 파일은 생긴다.)

```ts
const name = 12345;

// error TS2345: Argument of type '12345' is not assignable to parameter of type 'string'.
```

# Typescript 5분 뽀개기

## Interface
- 객체의 형태를 나타낸다.
- 함수에서 매개변수와 리턴 값을 명시할 수 있다.

객체의 형태를 나타내기
```ts
interface User {
    name: string;
    id: number;
}

const user: User = {
    name: "Soo",
    id: 0
}
```

함수에서 매개변수와 리턴 값을 명시하기
```ts
function getAdminUser(): User { ... }

function deleteAdminUser(user: User) { ... }
```

## 타입 구성
객체를 조합해서 크고 복잡한 객체를 만드는 방법에는 `Union`, `Generic` 이 있다.

**Unions**<br/>
타입이 여러 타입 중 하나일 수 있다.
```ts
type myBool = true | false;
```

**Generic**<br/>
타입에 변수를 제공하는 방법

---

# Typescript 기본 타입
자바스크립트와 동일한데 몇가지가 더 추가된다. 
`string`, `boolean`, `number`, `undefined`, `null`, **`Tuple`**, **`enum`**, **`any`**, **`void`**, **`never`** 

**Tuple**<br/>
타입과 개수가 고정된 배열을 사용할 수 있다.
```ts
let x: [string, number];

// success
x = ["hello", 10];

// error
x = [10, "hello"];
```

**Enum**<br/>
값의 집합에 이름을 붙여줄 수 있다. 
```ts
// `0` 부터 시작해서 멤버들의 번호를 매긴다.
enum Color { Red, Green, Blue }

// 시작값을 변경할 수도 있다.
enum Color { Red = 1, Green, Blue }

enum Color { Red = 2, Green = 3, Blue = 5 }

// 매겨진 값을 사용해 enum 멤버의 이름을 알아낼 수 있다.
enum Color { Red, Green, Blue }
let colorName: string = Color[2];

console.log(colorName); // 'Blue'
```

---

## Class
자바스크립트 객체지향 프로그램을 목표로 ES6에서 클래스가 생겼다.
**객체를 생성하고 상속을 다루는데** 단순하고 명확한 문법을 제공한다.
이런식으로 `class` 와 `constructor` 로 구현해주면 된다.
```js
class Polygon {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }
}
```
`constructor` 는 **class 로 생성된 객체를 생성**하고 **초기화**하기 위한 메소드다.
아까로 돌아가서 코드를 만들어볼까 ~

```ts
class Student {
    fullName: string;
    constructor(public firstName: string, public lastName: string) {
        this.fullName = firstName + lastName;
    }
}

interface Person {
    firstName: string;
    lastName: string;
}

function greeter(person: Person) {
    return 'Hello ' + person;
}

const user = new Student('Chae', 'Soojung');

document.body.textContent = greeter(user);
```

`Student` 를 선언해서 `constructor` 로 public 변수들을 사용했는데
어떻게 `greeter` 에서 `Person` 타입을 받을 수 있었던 거지?
`Student` 와 `Person` 이 어떻게 연결된 걸까. 변환된 js 파일을 보니 `class` 안에 `interface` 에 선언한 부분도 들어간 걸 볼 수 있었다.

```js
var Student = /** @class */ (function () {
    function Student(firstName, middleInitial, lastName) {
        this.firstName = firstName;
        this.middleInitial = middleInitial;
        this.lastName = lastName;
        this.fullName = firstName + " " + middleInitial + " " + lastName;
    }
    return Student;
}());
function greeter(person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}
var user = new Student("Jane", "M.", "User");
document.body.textContent = greeter(user);
```

`interface` 는 `Person` 을 자세하게 명시한 타입을 나타내기 위해 사용한 것 같았다.

## typescript 사용하기
typescript 를 사용하려면 html 에 변환된 js 를 추가해주면 된다.

greeter.html
```html
<!DOCTYPE html>
<html>
    <head><title>TypeScript Greeter</title></head>
    <body>
        <script src="greeter.js"></script>
    </body>
</html>
```



