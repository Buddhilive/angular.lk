---
title: Angular Material
description: A beginner-level guide to Angular Material and Styling
---

Angular Material is a UI component library for Angular applications that implements Google's Material Design. It provides a set of reusable, well-tested, and accessible UI components.

## Setting up Angular Material

To get started with Angular Material, you need to install it in your project:

```bash
ng add @angular/material
```

This command will:
- Install Angular Material, the Component Dev Kit (CDK), and Angular Animations
- Add project dependencies to package.json
- Add the Roboto font to your index.html
- Add the Material Design icon font to your index.html
- Add a few global CSS styles to your styles.css file

## Using Material Components

After installation, you can start using Material components in your application. Here's how to use some common components:

1. First, import the modules you need in your app.module.ts:

```typescript
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  imports: [
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    // other imports...
  ],
  // ...
})
export class AppModule { }
```

2. Now you can use these components in your templates:

```html
<mat-card>
  <mat-card-title>Login</mat-card-title>
  <mat-card-content>
    <mat-form-field>
      <input matInput placeholder="Username">
    </mat-form-field>
    <mat-form-field>
      <input matInput type="password" placeholder="Password">
    </mat-form-field>
  </mat-card-content>
  <mat-card-actions>
    <button mat-raised-button color="primary">Login</button>
  </mat-card-actions>
</mat-card>
```

## Custom Theming

Angular Material allows you to customize the theme of your application:

1. Create a custom theme file, e.g., custom-theme.scss:

```scss
@import '~@angular/material/theming';

@include mat-core();

$my-primary: mat-palette($mat-blue, 700);
$my-accent: mat-palette($mat-orange, 800);
$my-warn: mat-palette($mat-red);

$my-theme: mat-light-theme($my-primary, $my-accent, $my-warn);

@include angular-material-theme($my-theme);
```

2. Import this file in your styles.scss:

```scss
@import './custom-theme.scss';
```

3. If you want to create a dark theme or switch themes dynamically:

```scss
.dark-theme {
  $dark-primary: mat-palette($mat-blue-grey);
  $dark-accent: mat-palette($mat-amber, A200, A100, A400);
  $dark-warn: mat-palette($mat-deep-orange);
  $dark-theme: mat-dark-theme($dark-primary, $dark-accent, $dark-warn);

  @include angular-material-theme($dark-theme);
}
```

Then, you can apply the dark theme by adding the 'dark-theme' class to your body or any container element.

## CSS Encapsulation in Angular

Angular provides three view encapsulation strategies to manage component styles:

1. Emulated (default): Angular emulates Shadow DOM behavior by adding unique attributes to elements and scoping the component's styles to those attributes.

2. None: Styles are not encapsulated and are instead global to the application.

3. ShadowDom: Uses the browser's native Shadow DOM API to encapsulate styles.

You can set the encapsulation mode in your component decorator:

```typescript
import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-my-component',
  templateUrl: './my-component.component.html',
  styleUrls: ['./my-component.component.css'],
  encapsulation: ViewEncapsulation.Emulated // or None, or ShadowDom
})
export class MyComponentComponent { }
```

Regardless of the encapsulation mode, you can always make styles global by placing them in the styles.css file in the src folder.

## Key Points to Remember:

1. Angular Material provides a comprehensive set of pre-built, accessible UI components.

2. Always import the necessary Material modules in your app.module.ts or feature modules.

3. Custom theming allows you to align Material components with your brand colors.

4. CSS encapsulation helps prevent style conflicts between components.

5. Use the :host selector to style the host element of your component.

6. You can use ng-deep to force a style to apply to all child components, breaking encapsulation.

## Practical Tips:

1. Start with the default Material theme and gradually customize as needed.

2. Use Angular Material's typography system for consistent text styling across your app.

3. Leverage Angular Material's responsive layout directives (fxLayout, fxFlex) for creating flexible layouts.

4. When customizing components, check the Material Design guidelines to ensure your designs align with best practices.

5. Use Angular Material's CDK (Component Dev Kit) for creating custom components that fit seamlessly with Material Design.

6. Remember that global styles (in styles.css) will override component-specific styles unless you use `!important` (which should be used sparingly).

7. When using ViewEncapsulation.None, be cautious of naming conflicts with other components or global styles.

Example of combining Material components with custom styling:

```typescript
@Component({
  selector: 'app-custom-card',
  template: `
    <mat-card class="custom-card">
      <mat-card-title>{{ title }}</mat-card-title>
      <mat-card-content>{{ content }}</mat-card-content>
      <mat-card-actions>
        <button mat-button color="primary">LIKE</button>
        <button mat-button color="accent">SHARE</button>
      </mat-card-actions>
    </mat-card>
  `,
  styles: [`
    .custom-card {
      max-width: 400px;
      margin: 16px;
      background-color: #f0f0f0;
    }
    mat-card-actions {
      display: flex;
      justify-content: flex-end;
    }
  `]
})
export class CustomCardComponent {
  @Input() title: string;
  @Input() content: string;
}
```

This example shows how you can combine Material components (mat-card, mat-button) with custom styling to create a unique look while still leveraging the built-in functionality of Angular Material.

As you work more with Angular Material and CSS in Angular, you'll discover powerful ways to create beautiful, responsive, and accessible user interfaces. The Angular Material documentation provides more detailed information and examples, which can be helpful as you progress in your Angular development journey.