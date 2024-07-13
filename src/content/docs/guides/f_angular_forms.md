---
title: Angular Forms
description: A beginner-level guide to Angular Forms
---

Angular provides two approaches to handling user input through forms: template-driven forms and reactive forms. Both approaches share underlying building blocks but differ in terms of philosophy, template syntax, and code flow.

## Template-driven Forms

Template-driven forms rely on directives in the template to create and manipulate the underlying form object. They are easier to set up but can become unwieldy in more complex scenarios.

Steps to create a template-driven form:

1. Import FormsModule in your app.module.ts:
```typescript
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [FormsModule],
  // ...
})
export class AppModule { }
```

2. Create a component with a form:
```typescript
@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html'
})
export class TemplateFormComponent {
  model = { name: '', email: '' };

  onSubmit() {
    console.log(this.model);
  }
}
```

3. Create the form template:
```html
<form (ngSubmit)="onSubmit()" #myForm="ngForm">
  <div>
    <label for="name">Name:</label>
    <input type="text" id="name" name="name" [(ngModel)]="model.name" required>
  </div>
  <div>
    <label for="email">Email:</label>
    <input type="email" id="email" name="email" [(ngModel)]="model.email" required>
  </div>
  <button type="submit" [disabled]="!myForm.form.valid">Submit</button>
</form>
```

## Reactive Forms

Reactive forms provide a model-driven approach to handling form inputs whose values change over time. You create the form control objects in the component class and bind them to the form elements in the template.

Steps to create a reactive form:

1. Import ReactiveFormsModule in your app.module.ts:
```typescript
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [ReactiveFormsModule],
  // ...
})
export class AppModule { }
```

2. Create a component with a form:
```typescript
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html'
})
export class ReactiveFormComponent implements OnInit {
  myForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.myForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    if (this.myForm.valid) {
      console.log(this.myForm.value);
    }
  }
}
```

3. Create the form template:
```html
<form [formGroup]="myForm" (ngSubmit)="onSubmit()">
  <div>
    <label for="name">Name:</label>
    <input type="text" id="name" formControlName="name">
  </div>
  <div>
    <label for="email">Email:</label>
    <input type="email" id="email" formControlName="email">
  </div>
  <button type="submit" [disabled]="!myForm.valid">Submit</button>
</form>
```

## Form Validation

Both template-driven and reactive forms support validation. Angular provides several built-in validators, and you can also create custom validators.

1. Built-in validators:
- required
- minlength
- maxlength
- pattern
- email

2. Template-driven form validation:
```html
<input type="text" id="name" name="name" [(ngModel)]="model.name" required minlength="4" #name="ngModel">
<div *ngIf="name.invalid && (name.dirty || name.touched)">
  <div *ngIf="name.errors?.['required']">Name is required.</div>
  <div *ngIf="name.errors?.['minlength']">Name must be at least 4 characters long.</div>
</div>
```

3. Reactive form validation:
```typescript
this.myForm = this.fb.group({
  name: ['', [Validators.required, Validators.minLength(4)]],
  email: ['', [Validators.required, Validators.email]]
});
```

```html
<input type="text" id="name" formControlName="name">
<div *ngIf="myForm.get('name').invalid && (myForm.get('name').dirty || myForm.get('name').touched)">
  <div *ngIf="myForm.get('name').errors?.['required']">Name is required.</div>
  <div *ngIf="myForm.get('name').errors?.['minlength']">Name must be at least 4 characters long.</div>
</div>
```

4. Custom validators:
You can create custom validators for more specific validation rules.

```typescript
function forbiddenNameValidator(nameRe: RegExp): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const forbidden = nameRe.test(control.value);
    return forbidden ? {'forbiddenName': {value: control.value}} : null;
  };
}

// In your form setup:
this.myForm = this.fb.group({
  name: ['', [Validators.required, forbiddenNameValidator(/bob/i)]],
  // ...
});
```

## Key Points to Remember:

1. Template-driven forms are easier to set up for simple scenarios, while reactive forms offer more flexibility and are better suited for complex forms.

2. Reactive forms are easier to unit test because the form structure is defined in the component class.

3. Both approaches support validation, but reactive forms provide more control over validation logic.

4. Use built-in validators when possible, and create custom validators for specific requirements.

5. Always provide clear feedback to users about validation errors.

6. Consider using form state classes (ng-valid, ng-invalid, ng-touched, ng-untouched, etc.) for styling form elements based on their state.

As you work with Angular forms, you'll develop a feel for when to use each approach. Practice building forms with both methods to understand their strengths and use cases. The Angular documentation provides more detailed information on forms and validation, which can be helpful as you advance in your Angular development journey.