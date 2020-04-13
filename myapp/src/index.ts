import Person from './Person';

function component() {
  var element = document.createElement('div');
  var person = new Person('John');
  element.innerHTML = `Hello, ${person.sayHello()}`;

  return element;
}

document.body.appendChild(component());