// interface 테스트하고 싶으면 주석 해제, class 부분은 주석 처리.
// // interface
// interface Human {
//   name: string;
//   age: number;
//   gender?: string;
// }
//
// const person: Human = {
//   name: 'soo',
//   age: 24,
//   gender: 'woman'
// }
//
// const sayHello = (person: Human): void => {
//   console.log(`Hello ${person.name}, you are ${person.age}!`);
// }
//
// sayHello(person);
//
// export {};


// class
class Human {
  // ts 에서는 속성을 선언해줘야 한다.
  public name: string;
  private age: number;
  public gender?: string;

  // class 가 시작할 때마다 호출된다. (객체를 만들 때)
  constructor(name: string, age: number, gender?: string) {
    this.name = name;
    this.age = age;
    this.gender = gender;
  }
}

const person = new Human('soo', 24);

const sayHello = (person: Human): void => {
  console.log(`Hello ${person.name}, you are ${person.age}!`);
}

sayHello(person);

export {};
