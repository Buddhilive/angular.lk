---
title: Component Communication
description: A bbeginner-level guide to Component Communication in Angular
---
In Angular, components often need to share data and communicate with each other. There are several ways to achieve this:

## Input and Output Properties

1. Input Properties:
These allow a parent component to pass data to a child component.

Parent component (parent.component.ts):
```typescript
@Component({
  selector: 'app-parent',
  template: '<app-child [message]="parentMessage"></app-child>'
})
export class ParentComponent {
  parentMessage = 'Message from parent';
}
```

Child component (child.component.ts):
```typescript
@Component({
  selector: 'app-child',
  template: '<p>{{ message }}</p>'
})
export class ChildComponent {
  @Input() message: string;
}
```

2. Output Properties:
These allow a child component to send data to a parent component using events.

Child component (child.component.ts):
```typescript
@Component({
  selector: 'app-child',
  template: '<button (click)="sendMessage()">Send Message</button>'
})
export class ChildComponent {
  @Output() messageEvent = new EventEmitter<string>();

  sendMessage() {
    this.messageEvent.emit('Hello from child!');
  }
}
```

Parent component (parent.component.ts):
```typescript
@Component({
  selector: 'app-parent',
  template: '<app-child (messageEvent)="receiveMessage($event)"></app-child>'
})
export class ParentComponent {
  receiveMessage(msg: string) {
    console.log(msg);
  }
}
```

## ViewChild and ContentChild

These decorators allow a parent component to access child components.

1. ViewChild:
Used to access a child component, directive, or DOM element from the template.

```typescript
@Component({
  selector: 'app-parent',
  template: '<app-child></app-child>'
})
export class ParentComponent implements AfterViewInit {
  @ViewChild(ChildComponent) childComponent: ChildComponent;

  ngAfterViewInit() {
    console.log(this.childComponent);
  }
}
```

2. ContentChild:
Similar to ViewChild, but used to access content that is projected into the component.

Parent component template:
```html
<app-container>
  <app-child></app-child>
</app-container>
```

Container component:
```typescript
@Component({
  selector: 'app-container',
  template: '<ng-content></ng-content>'
})
export class ContainerComponent implements AfterContentInit {
  @ContentChild(ChildComponent) childComponent: ChildComponent;

  ngAfterContentInit() {
    console.log(this.childComponent);
  }
}
```

## Services and Dependency Injection

Services provide a way to share data and functionality across components. Dependency Injection is the system Angular uses to provide instances of these services to components.

1. Creating a Service:
Use Angular CLI to generate a new service:

```sh
ng generate service data
```

data.service.ts:
```typescript
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private data = 'Initial data';

  getData() {
    return this.data;
  }

  setData(value: string) {
    this.data = value;
  }
}
```

2. Using the Service in Components:
Inject the service into components that need to use it.

Component 1:
```typescript
@Component({
  selector: 'app-component-one',
  template: '<button (click)="updateData()">Update Data</button>'
})
export class ComponentOneComponent {
  constructor(private dataService: DataService) {}

  updateData() {
    this.dataService.setData('Updated data');
  }
}
```

Component 2:
```typescript
@Component({
  selector: 'app-component-two',
  template: '<p>{{ data }}</p>'
})
export class ComponentTwoComponent implements OnInit {
  data: string;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.data = this.dataService.getData();
  }
}
```

3. Using Observables in Services:
For real-time updates, you can use RxJS Observables in your service.

Updated data.service.ts:
```typescript
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private dataSource = new BehaviorSubject<string>('Initial data');
  currentData = this.dataSource.asObservable();

  updateData(data: string) {
    this.dataSource.next(data);
  }
}
```

Updated Component 2:
```typescript
@Component({
  selector: 'app-component-two',
  template: '<p>{{ data }}</p>'
})
export class ComponentTwoComponent implements OnInit {
  data: string;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.currentData.subscribe(data => this.data = data);
  }
}
```

## Key Points to Remember:

1. Input and Output properties are best for parent-child communication.
2. ViewChild and ContentChild are useful when you need direct access to child components or elements.
3. Services are ideal for sharing data between unrelated components or across the entire application.
4. Always consider unsubscribing from observables in the ngOnDestroy lifecycle hook to prevent memory leaks.

These component communication techniques are fundamental to building complex Angular applications. As you become more comfortable with these concepts, you'll be able to create more interactive and data-driven applications.

Practice implementing these patterns in small projects to solidify your understanding. The Angular documentation provides more in-depth information on each of these topics, which can be helpful as you advance in your Angular development journey.