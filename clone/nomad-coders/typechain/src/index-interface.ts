// interface
interface Human {
  name: string;
  age: number;
  gender?: string;
}

const person: Human = {
  name: 'soo',
  age: 24,
  gender: 'woman'
}

const sayHello = (person: Human): void => {
  console.log(`Hello ${person.name}, you are ${person.age}!`);
}

sayHello(person);

export {};
