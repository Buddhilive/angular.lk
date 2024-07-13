---
title: State Management
description: A beginner-level guide to State Management in Angular using NgRx
---

As Angular applications grow in complexity, managing state becomes increasingly challenging. NgRx is a popular state management library for Angular that implements the Redux pattern.

## Introduction to NgRx

NgRx provides a way to manage global state in your application using a single, immutable data store. It helps in maintaining consistency across your app and makes state changes predictable.

Key concepts in NgRx:
- Store: A single source of truth for application state
- Actions: Describe unique events in your application
- Reducers: Pure functions that specify how the state changes in response to actions
- Effects: Handle side effects and asynchronous operations
- Selectors: Retrieve slices of state from the store

To get started, install NgRx in your project:

```bash
ng add @ngrx/store @ngrx/effects @ngrx/entity @ngrx/store-devtools
```

## Store, Actions, and Reducers

1. Define the state interface:

```typescript
// src/app/state/app.state.ts
export interface AppState {
  todos: TodoState;
  // other state slices...
}

export interface TodoState {
  todos: Todo[];
  loading: boolean;
  error: string | null;
}
```

2. Create actions:

```typescript
// src/app/state/todos/todo.actions.ts
import { createAction, props } from '@ngrx/store';
import { Todo } from '../../models/todo.model';

export const loadTodos = createAction('[Todo] Load Todos');
export const loadTodosSuccess = createAction(
  '[Todo] Load Todos Success',
  props<{ todos: Todo[] }>()
);
export const loadTodosFailure = createAction(
  '[Todo] Load Todos Failure',
  props<{ error: string }>()
);
```

3. Create a reducer:

```typescript
// src/app/state/todos/todo.reducer.ts
import { createReducer, on } from '@ngrx/store';
import * as TodoActions from './todo.actions';
import { TodoState } from '../app.state';

export const initialState: TodoState = {
  todos: [],
  loading: false,
  error: null
};

export const todoReducer = createReducer(
  initialState,
  on(TodoActions.loadTodos, state => ({ ...state, loading: true })),
  on(TodoActions.loadTodosSuccess, (state, { todos }) => ({
    ...state,
    todos,
    loading: false
  })),
  on(TodoActions.loadTodosFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  }))
);
```

4. Register the reducer in your app.module.ts:

```typescript
import { StoreModule } from '@ngrx/store';
import { todoReducer } from './state/todos/todo.reducer';

@NgModule({
  imports: [
    StoreModule.forRoot({ todos: todoReducer })
  ],
  // ...
})
export class AppModule { }
```

## Effects

Effects handle side effects in your application, such as API calls. They listen for dispatched actions and can dispatch new actions in response.

```typescript
// src/app/state/todos/todo.effects.ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as TodoActions from './todo.actions';
import { TodoService } from '../../services/todo.service';

@Injectable()
export class TodoEffects {
  loadTodos$ = createEffect(() => this.actions$.pipe(
    ofType(TodoActions.loadTodos),
    mergeMap(() => this.todoService.getTodos()
      .pipe(
        map(todos => TodoActions.loadTodosSuccess({ todos })),
        catchError(error => of(TodoActions.loadTodosFailure({ error: error.message })))
      ))
    )
  );

  constructor(
    private actions$: Actions,
    private todoService: TodoService
  ) {}
}
```

Register the effects in your app.module.ts:

```typescript
import { EffectsModule } from '@ngrx/effects';
import { TodoEffects } from './state/todos/todo.effects';

@NgModule({
  imports: [
    EffectsModule.forRoot([TodoEffects])
  ],
  // ...
})
export class AppModule { }
```

## Selectors

Selectors are pure functions used for obtaining slices of store state. They can compute derived data, allowing store to keep only minimal required state.

```typescript
// src/app/state/todos/todo.selectors.ts
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AppState, TodoState } from '../app.state';

export const selectTodoState = createFeatureSelector<AppState, TodoState>('todos');

export const selectAllTodos = createSelector(
  selectTodoState,
  (state: TodoState) => state.todos
);

export const selectTodosLoading = createSelector(
  selectTodoState,
  (state: TodoState) => state.loading
);

export const selectTodosError = createSelector(
  selectTodoState,
  (state: TodoState) => state.error
);
```

Using NgRx in a component:

```typescript
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from './state/app.state';
import * as TodoActions from './state/todos/todo.actions';
import * as TodoSelectors from './state/todos/todo.selectors';
import { Todo } from './models/todo.model';

@Component({
  selector: 'app-todo-list',
  template: `
    <div *ngIf="loading$ | async">Loading...</div>
    <ul>
      <li *ngFor="let todo of todos$ | async">{{ todo.title }}</li>
    </ul>
    <div *ngIf="error$ | async as error">{{ error }}</div>
  `
})
export class TodoListComponent implements OnInit {
  todos$: Observable<Todo[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;

  constructor(private store: Store<AppState>) {
    this.todos$ = this.store.select(TodoSelectors.selectAllTodos);
    this.loading$ = this.store.select(TodoSelectors.selectTodosLoading);
    this.error$ = this.store.select(TodoSelectors.selectTodosError);
  }

  ngOnInit() {
    this.store.dispatch(TodoActions.loadTodos());
  }
}
```

## Key Points to Remember:

1. NgRx follows the Redux pattern: Store, Actions, Reducers, and Effects.

2. The store is the single source of truth for your application state.

3. State is read-only and can only be changed by dispatching actions.

4. Reducers are pure functions that specify how the state changes in response to actions.

5. Effects handle side effects like API calls and can dispatch new actions.

6. Selectors are used to efficiently derive and memoize state.

7. Use the Redux DevTools for debugging and time-travel debugging.

Practical Tips:

1. Start with a simple implementation and gradually add complexity as needed.

2. Use the NgRx schematics to generate boilerplate code (e.g., `ng generate @ngrx/schematics:feature`).

3. Keep your state normalized to avoid duplication and make updates easier.

4. Use the Entity adapter for managing collections of records in state.

5. Implement proper error handling in your effects and display errors to users when appropriate.

6. Consider using NgRx facade services to encapsulate store interactions and provide a cleaner API for your components.

7. Don't feel obligated to put all state in NgRx. Local component state is still useful for UI-specific state.

As you work more with NgRx, you'll discover its power in managing complex application states. The NgRx documentation provides more detailed information and advanced techniques, which can be helpful as you progress in your Angular and state management journey.