const Person = class Person {
  constructor(firstAndLast) {
    let firstName;
    let lastName;
    this.getFirstName = () => firstName;
    this.getLastName = () => lastName;
    this.getFullName = () => `${firstName} ${lastName}`;
    this.setFirstName = (first) => (firstName = first);
    this.setLastName = (last) => (lastName = last);
    this.setFullName = (firstAndLast) => {
      [firstName, lastName] = firstAndLast.split(' ');
    };
    
    this.setFullName(firstAndLast);
  }
};

const bob = new Person('Bob Ross');

console.log(Object.keys(bob).length); // should return 6.
console.log(bob instanceof Person); // should return true.
console.log(bob.firstName); // should return undefined.
console.log(bob.lastName); // should return undefined.
console.log(bob.getFirstName()); // should return "Bob".
console.log(bob.getLastName()); // should return "Ross".
console.log(bob.getFullName()); // should return "Bob Ross".


// should return "Haskell Ross"
bob.setFirstName("Haskell");
console.log(bob.getFullName());

// should return "Haskell Curry"
bob.setLastName("Curry");
console.log(bob.getFullName());

// should return "Haskell Curry"
bob.setFullName("Haskell Curry");
console.log(bob.getFullName());

// should return "Haskell"
bob.setFullName("Haskell Curry");
console.log(bob.getFirstName());

// should return "Curry"
bob.setFullName("Haskell Curry");
console.log(bob.getLastName());
