// A simple function with types
function greet(name: string, age: number): string {
  return `Hello, ${name}! You are ${age} years old.`;
}

// A simple interface
interface Person {
  name: string;
  age: number;
}

// Using the interface
const user: Person = {
  name: "Alex",
  age: 25,
};

console.log(greet(user.name, user.age));

// A simple array with types
const numbers: number[] = [1, 2, 3, 4, 5];
const doubled = numbers.map((n) => n * 2);

console.log("Original:", numbers);
console.log("Doubled:", doubled);

// A simple class
class Counter {
  private count: number = 0;

  increment(): void {
    this.count++;
  }

  getCount(): number {
    return this.count;
  }
}

const counter = new Counter();
counter.increment();
counter.increment();
counter.increment();

console.log("Counter:", counter.getCount());