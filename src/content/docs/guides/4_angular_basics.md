---
title: Angular Basics
description: A beginner-level guide to Angular basics
---

Angular basics covers components and templates, data binding, directives, and pipes:

## Components and Templates

Components are the fundamental building blocks of Angular applications. They consist of three main parts: a TypeScript class, an HTML template, and styles.

1. Creating a Component:
Use Angular CLI to generate a new component:

```sh
ng generate component hello
```

This creates a new directory with four files:
- `hello.component.ts`: The component class
- `hello.component.html`: The HTML template
- `hello.component.css`: The component's styles
- `hello.component.spec.ts`: The test file

2. Component Class:
```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-hello',
  templateUrl: './hello.component.html',
  styleUrls: ['./hello.component.css']
})
export class HelloComponent {
  name: string = 'World';
}
```

3. Template:
```html
<h1>Hello, {{ name }}!</h1>
```

## Data Binding

Angular provides four forms of data binding:

1. Interpolation: 
Displays component property values in the template.
```html
<h1>{{ title }}</h1>
```

2. Property Binding: 
Sets an element's property to a component property value.
```html
<img [src]="imageUrl">
```

3. Event Binding: 
Listens for events and calls component methods.
```html
<button (click)="onSave()">Save</button>
```

4. Two-way Binding: 
Combines property and event binding, typically used with form inputs.
```html
<input [(ngModel)]="name">
```
Note: To use `ngModel`, you need to import `FormsModule` in your Angular module.

## Directives

Directives are classes that add behavior to elements in Angular applications. There are three kinds of directives:

1. Components: Directives with templates (which we've already covered).

2. Structural Directives: Change the DOM layout by adding and removing elements.

- `*ngIf`: Conditionally includes a template based on a boolean expression.
```html
<div *ngIf="isLoggedIn">Welcome, User!</div>
```

- `*ngFor`: Repeats a template for each item in a list.
```html
<ul>
  <li *ngFor="let item of items">{{ item }}</li>
</ul>
```

- `*ngSwitch`: Switches between alternative views.
```html
<div [ngSwitch]="color">
  <p *ngSwitchCase="'red'">The color is red</p>
  <p *ngSwitchCase="'blue'">The color is blue</p>
  <p *ngSwitchDefault>The color is neither red nor blue</p>
</div>
```

4. Attribute Directives: Change the appearance or behavior of an element.

- `ngClass`: Adds or removes CSS classes.
```html
<div [ngClass]="{'active': isActive, 'disabled': isDisabled}">Content</div>
```

- `ngStyle`: Adds or removes inline styles.
```html
<div [ngStyle]="{'color': textColor, 'font-size': fontSize + 'px'}">Styled text</div>
```

## Pipes

Pipes transform displayed values within a template. Angular provides several built-in pipes, and you can create custom pipes.

1. Using pipes:
```html
<p>{{ birthday | date }}</p>
<p>{{ price | currency:'USD' }}</p>
<p>{{ name | uppercase }}</p>
```

2. Chaining pipes:
```html
<p>{{ birthday | date:'fullDate' | uppercase }}</p>
```

3. Pipe parameters:
Some pipes accept parameters to customize their behavior.
```html
<p>{{ birthday | date:'dd/MM/yyyy' }}</p>
```

4. Common built-in pipes:
- `DatePipe`: Formats dates
- `UpperCasePipe`: Transforms text to uppercase
- `LowerCasePipe`: Transforms text to lowercase
- `CurrencyPipe`: Formats numbers as currency
- `DecimalPipe`: Formats numbers with decimal points
- `PercentPipe`: Formats numbers as percentages

5. Custom Pipe:
You can create custom pipes for specific formatting needs. Use Angular CLI to generate a pipe:

```sh
ng generate pipe exponential
```

Example implementation:
```typescript
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'exponential'
})
export class ExponentialPipe implements PipeTransform {
  transform(value: number, exponent = 1): number {
    return Math.pow(value, exponent);
  }
}
```

Usage in template:
```html
<p>{{ 2 | exponential:3 }}</p> <!-- Output: 8 -->
```

These Angular basics form the foundation of building Angular applications. As you become more comfortable with these concepts, you'll be able to create more complex and interactive components and applications.

Remember to practice these concepts by building small components and gradually increasing complexity. The Angular documentation is an excellent resource for more detailed information on each of these topics.