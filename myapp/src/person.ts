// person.ts
class Person {
  name: string;
  constructor(name: string) {
    this.name = name;
  }

  sayHello() {
    return `My name is ${this.name}`;
  }
}

export default Person;