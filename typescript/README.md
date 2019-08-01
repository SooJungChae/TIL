# Typescript 5분 뽀개기
```ts
// greeter.ts
function greeter(person: string) {
    return 'Hello ' + person;
}

const myName = 'Soojung';

document.body.textContent = greeter(myName);
```

변수에 타입을 지정할 수 있다.

타입스크립트를 js 로 만들려면 다음을 커맨드라인에 입력.
```cmd
tsc greeter.ts
```
그럼 js 파일이 생긴다.

## 에러
변수에 다른 타입이 들어오면 에러가 나온다.
(에러가 나도 js 파일은 생긴다.)

```ts
const name = 12345;

// error TS2345: Argument of type '12345' is not assignable to parameter of type 'string'.
```

## Interface
인터페이스를 선언할 수 있다.

```ts
interface fullName {
    firstName: string,
    lastName: string
}

function greeter(person: fullName) {
    return 'Hello ' + person;
}

const user = {
    firstName: 'Chae',
    lastName: 'Soojung'
};

document.body.textContent = greeter(myName);
```

타입을 **인터페이스**로도 만들 수 있다.

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



