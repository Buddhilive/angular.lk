---
title: Routing and Navigation
description: A beginner-level guide to Routing and Navigation in Angular
---

Angular's Router enables navigation from one view to another as users perform tasks in your application. It's a crucial part of creating Single Page Applications (SPAs).

## Setting up routes

1. Import the RouterModule in your app.module.ts:

```typescript
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  // ...
})
export class AppModule { }
```

2. Add a router outlet to your app.component.html:

```html
<nav>
  <a routerLink="/home">Home</a>
  <a routerLink="/about">About</a>
  <a routerLink="/contact">Contact</a>
</nav>

<router-outlet></router-outlet>
```

The `<router-outlet>` element tells Angular where to display routed views.

## Route parameters and query parameters

1. Route parameters:
Used to pass required data to a route. Define them in your route configuration:

```typescript
const routes: Routes = [
  { path: 'user/:id', component: UserDetailComponent }
];
```

Access route parameters in the component:

```typescript
import { ActivatedRoute } from '@angular/router';

@Component({...})
export class UserDetailComponent implements OnInit {
  userId: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userId = params['id'];
    });
  }
}
```

Navigate to a route with parameters:

```typescript
// In a component
constructor(private router: Router) {}

goToUser(id: string) {
  this.router.navigate(['/user', id]);
}
```

2. Query parameters:
Used to pass optional data to a route. They don't need to be defined in the route configuration.

Add query parameters when navigating:

```typescript
this.router.navigate(['/users'], { queryParams: { page: '1', order: 'newest' } });
```

Access query parameters in the component:

```typescript
ngOnInit() {
  this.route.queryParams.subscribe(params => {
    this.page = params['page'];
    this.orderBy = params['order'];
  });
}
```

## Child routes

Child routes allow you to create more complex route hierarchies. They are defined within a parent route.

```typescript
const routes: Routes = [
  {
    path: 'users',
    component: UsersComponent,
    children: [
      { path: '', component: UserListComponent },
      { path: ':id', component: UserDetailComponent }
    ]
  }
];
```

In the parent component template (UsersComponent), add another router outlet for child routes:

```html
<h2>Users</h2>
<router-outlet></router-outlet>
```

## Route guards

Route guards are used to control access to routes. There are several types of guards:

a. CanActivate: Controls if a route can be activated
b. CanDeactivate: Controls if a user can leave a route
c. CanActivateChild: Controls access to child routes
d. CanLoad: Controls if a module can be loaded lazily

Example of a CanActivate guard:

```typescript
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
```

Apply the guard to a route:

```typescript
const routes: Routes = [
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] }
];
```

## Key Points to Remember:

1. Always provide a default route and a wildcard route for handling 404 errors.

2. Use the `routerLink` directive for navigation in templates instead of `href` to prevent full page reloads.

3. Route parameters are required and defined in the route configuration, while query parameters are optional.

4. Child routes are useful for creating complex, nested views.

5. Route guards help protect routes and control navigation flow in your application.

6. The Router provides events that you can subscribe to for fine-grained control over the navigation lifecycle.

7. For larger applications, consider using lazy loading to improve initial load time.

Practical Tips:

1. Start with a simple routing setup and gradually add complexity as needed.

2. Use meaningful path names that reflect the purpose of each route.

3. Implement proper error handling for cases where route parameters might be invalid.

4. Consider using route resolvers to pre-fetch data before activating a route.

5. Test your routing thoroughly, including edge cases like browser back/forward navigation and direct URL access.

As you work more with Angular routing, you'll discover its power in creating complex, navigable applications. The Angular Router documentation provides more detailed information and advanced techniques, which can be helpful as you progress in your Angular development journey.