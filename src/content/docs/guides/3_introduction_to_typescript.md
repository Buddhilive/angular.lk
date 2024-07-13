---
title: TypeScript Fundamentals
description: A beginner-level guide to TypeScript fundamentals for Angular development
---
TypeScript is a superset of JavaScript that adds static typing and other features. It's the primary language used for Angular development. Let's explore its key concepts:

## Basic Types and Syntax

TypeScript introduces several basic types:

1. Number:
```typescript
let decimal: number = 6;
let hex: number = 0xf00d;
let binary: number = 0b1010;
```

2. String:
```typescript
let color: string = "blue";
let fullName: string = `John Doe`;
```

3. Boolean:
```typescript
let isDone: boolean = false;
```

4. Array:
```typescript
let list: number[] = [1, 2, 3];
let fruits: Array<string> = ['apple', 'banana', 'orange'];
```

5. Tuple:
```typescript
let x: [string, number] = ["hello", 10];
```

6. Enum:
```typescript
enum Color {Red, Green, Blue}
let c: Color = Color.Green;
```

7. Any (avoid when possible):
```typescript
let notSure: any = 4;
notSure = "maybe a string instead";
```

8. Void (typically for functions that don't return a value):
```typescript
function warnUser(): void {
    console.log("This is a warning message");
}
```

9. Null and Undefined:
```typescript
let u: undefined = undefined;
let n: null = null;
```

10. Never (represents the type of values that never occur):
```typescript
function error(message: string): never {
    throw new Error(message);
}
```

## Classes and Interfaces

### Classes:
TypeScript supports object-oriented programming with classes:

```typescript
class Greeter {
    greeting: string;
    
    constructor(message: string) {
        this.greeting = message;
    }
    
    greet() {
        return "Hello, " + this.greeting;
    }
}

let greeter = new Greeter("world");
```

### Interfaces:
Interfaces define the structure of objects:

```typescript
interface Person {
    firstName: string;
    lastName: string;
    age?: number; // Optional property
}

function greet(person: Person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}

let user = { firstName: "John", lastName: "Doe" };
console.log(greet(user));
```

## Modules and Decorators

### Modules:
TypeScript uses modules to organize and share code:

```typescript
// math.ts
export function add(x: number, y: number): number {
    return x + y;
}

// main.ts
import { add } from './math';
console.log(add(1, 2));
```

### Decorators:
Decorators are a way to add both annotations and metadata to class declarations. Angular makes extensive use of decorators.

```typescript
function logged(constructor: Function) {
    console.log(constructor);
}

@logged
class Person {
    constructor(public name: string) {}
}
```

In Angular, you'll often see decorators like `@Component`, `@Injectable`, `@Input`, and `@Output`.

Example of a simple Angular component using decorators:

```typescript
import { Component } from '@angular/core';

@Component({
    selector: 'app-hello',
    template: '<h1>Hello, {{name}}!</h1>'
})
export class HelloComponent {
    name: string = 'World';
}
```

## Key TypeScript Features for Angular Development:

1. Type Inference:
TypeScript can often infer types automatically:

```typescript
let x = 3; // TypeScript infers x is a number
```

2. Union Types:
Variables can have multiple types:

```typescript
let id: number | string;
id = 101; // OK
id = "202"; // Also OK
```

3. Type Assertion:
Sometimes you may need to tell TypeScript that you know more about a type than it does:

```typescript
let someValue: any = "this is a string";
let strLength: number = (<string>someValue).length;
```

4. Generics:
Generics allow you to work with multiple types:

```typescript
function identity<T>(arg: T): T {
    return arg;
}

let output = identity<string>("myString");
```

5. Access Modifiers:
TypeScript provides access modifiers for class members:

```typescript
class Animal {
    private name: string;
    protected species: string;
    public constructor(theName: string) { this.name = theName; }
    public move(distanceInMeters: number) {
        console.log(`${this.name} moved ${distanceInMeters}m.`);
    }
}
```

These TypeScript fundamentals are crucial for Angular development. As you progress, you'll find that TypeScript's static typing helps catch errors early, improves code quality, and enhances the development experience in Angular projects.

Remember, while learning these concepts, it's beneficial to practice writing TypeScript code and gradually incorporate these features into your Angular projects. The Angular documentation and official TypeScript handbook are excellent resources for further exploration of these topics.