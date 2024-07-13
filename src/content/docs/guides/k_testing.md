---
title: Testing Angular Apps
description: A beginner-level guide to testing Angular applications
---

Testing is a crucial part of developing robust Angular applications. Angular comes with built-in testing tools and supports various types of tests.

## Unit Testing with Jasmine and Karma

Jasmine is a behavior-driven development framework for testing JavaScript code, and Karma is a test runner. Both come pre-configured with Angular projects created via Angular CLI.

Basic structure of a Jasmine test:

```typescript
describe('ComponentName', () => {
  it('should do something specific', () => {
    // Test code here
    expect(actualValue).toBe(expectedValue);
  });
});
```

Key Jasmine functions:
- `describe()`: Defines a test suite
- `it()`: Defines a test spec
- `expect()`: Creates an expectation
- `beforeEach()`: Runs before each test in a suite
- `afterEach()`: Runs after each test in a suite

## Component Testing

To test a component, you typically create a test bed that simulates the Angular testing module.

Example of a component test:

```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyComponent } from './my.component';

describe('MyComponent', () => {
  let component: MyComponent;
  let fixture: ComponentFixture<MyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyComponent ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a title', () => {
    expect(component.title).toBe('My Component');
  });

  it('should render title', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('My Component');
  });
});
```

## Service Testing

Services are typically easier to test as they don't involve the DOM. You can test services in isolation or with a minimal TestBed setup.

Example of a service test:

```typescript
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DataService } from './data.service';

describe('DataService', () => {
  let service: DataService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ DataService ]
    });

    service = TestBed.inject(DataService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve data from the API', () => {
    const dummyData = { id: 1, name: 'Test Data' };

    service.getData().subscribe(data => {
      expect(data).toEqual(dummyData);
    });

    const req = httpMock.expectOne('api/data');
    expect(req.request.method).toBe('GET');
    req.flush(dummyData);
  });
});
```

## End-to-End Testing with Protractor

End-to-End (E2E) tests simulate user interactions with your application. Protractor is an E2E test framework for Angular applications.

Example of an E2E test:

```typescript
import { browser, by, element } from 'protractor';

describe('My App', () => {
  beforeEach(() => {
    browser.get('/');
  });

  it('should display welcome message', () => {
    expect(element(by.css('app-root h1')).getText()).toEqual('Welcome to my app!');
  });

  it('should navigate to about page', () => {
    element(by.css('a[routerLink="/about"]')).click();
    expect(browser.getCurrentUrl()).toContain('/about');
  });
});
```

To run E2E tests:

```bash
ng e2e
```

## Key Points to Remember:

1. Always aim for high test coverage, but focus on critical paths and edge cases.

2. Use `TestBed.configureTestingModule()` to set up the testing environment for components and services.

3. Use `fixture.detectChanges()` to trigger change detection in component tests.

4. Mock external dependencies and services to isolate the unit being tested.

5. Use `async/await` or `fakeAsync/tick` for testing asynchronous operations.

6. End-to-end tests are slower but provide confidence that your app works as a whole.

Practical Tips:

1. Write tests as you develop, not after. This practice is known as Test-Driven Development (TDD).

2. Keep your tests DRY (Don't Repeat Yourself) by using `beforeEach()` for common setup code.

3. Use `fdescribe()` and `fit()` to focus on specific test suites or specs during development.

4. Use `xdescribe()` and `xit()` to temporarily exclude test suites or specs.

5. For complex components, consider testing in isolation first, then integrate with child components.

6. Use debug elements (`fixture.debugElement`) for more powerful querying in component tests.

7. Remember to test both success and error scenarios, especially for service methods.

Example of testing a component with input and output:

```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CounterComponent } from './counter.component';

describe('CounterComponent', () => {
  let component: CounterComponent;
  let fixture: ComponentFixture<CounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CounterComponent ]
    }).compileComponents();

    fixture = TestBed.createComponent(CounterComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should increment counter', () => {
    component.count = 0;
    const button = fixture.debugElement.query(By.css('button'));
    button.triggerEventHandler('click', null);
    expect(component.count).toBe(1);
  });

  it('should emit countChange event', () => {
    let emittedCount: number | undefined;
    component.countChange.subscribe((count: number) => emittedCount = count);

    component.increment();
    expect(emittedCount).toBe(1);
  });
});
```

As you become more comfortable with testing, you'll find that it not only catches bugs early but also helps you design better, more modular code. The Angular testing documentation provides more detailed information and advanced techniques, which can be helpful as you progress in your Angular testing journey.