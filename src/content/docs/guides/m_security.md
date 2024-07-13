---
title: Angular Security
description: A beginner-level guide to Angular Security
---

Security is a crucial aspect of web application development. Angular provides several built-in protections, but it's important to understand and implement additional security measures.

## Authentication and Authorization

Authentication verifies the identity of a user, while authorization determines what an authenticated user is allowed to do.

1. Authentication:
Typically involves a login process where users provide credentials.

Example of a basic authentication service:

```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  login(username: string, password: string) {
    return this.http.post<any>(`/api/login`, { username, password })
      .pipe(map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
```

2. Authorization:
Often implemented using route guards in Angular.

Example of an auth guard:

```typescript
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  canActivate() {
    const currentUser = this.authService.currentUserValue;
    if (currentUser) {
      // logged in so return true
      return true;
    }

    // not logged in so redirect to login page
    this.router.navigate(['/login']);
    return false;
  }
}
```

## JSON Web Tokens (JWT)

JWTs are a secure way of transmitting information between parties as a JSON object. They are often used for authentication and information exchange.

1. Structure of a JWT:
- Header: Contains the type of token and the hashing algorithm used
- Payload: Contains claims (statements about the user and additional metadata)
- Signature: Ensures that the token hasn't been altered

2. Using JWT in Angular:
After receiving a JWT from your server upon successful login, you typically store it in local storage and include it in the Authorization header of subsequent HTTP requests.

Example of an HTTP interceptor to add the JWT to requests:

```typescript
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add auth header with jwt if user is logged in and request is to the api url
    const currentUser = this.authService.currentUserValue;
    const isLoggedIn = currentUser && currentUser.token;
    const isApiUrl = request.url.startsWith('/api');
    if (isLoggedIn && isApiUrl) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser.token}`
        }
      });
    }

    return next.handle(request);
  }
}
```

## CORS and XSS Prevention

1. CORS (Cross-Origin Resource Sharing):
CORS is a security mechanism that allows or restricts resources on a web page to be requested from another domain outside the domain from which the resource originated.

Angular's HttpClient sends CORS requests by default. The server needs to be configured to handle CORS requests properly.

2. XSS (Cross-Site Scripting) Prevention:
Angular automatically sanitizes and escapes untrusted values for HTML, styles, and URLs to prevent XSS attacks. However, you should still be cautious when using methods that bypass this security, such as bypassSecurityTrustHtml.

Example of safe usage of potentially unsafe content:

```typescript
import { Component } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-xss-example',
  template: '<div [innerHTML]="safeHtml"></div>'
})
export class XssExampleComponent {
  safeHtml: SafeHtml;

  constructor(private sanitizer: DomSanitizer) {
    const unsafeHtml = '<script>alert("XSS")</script>Hello, world!';
    this.safeHtml = this.sanitizer.bypassSecurityTrustHtml(unsafeHtml);
  }
}
```

## Content Security Policy (CSP)

CSP is an added layer of security that helps detect and mitigate certain types of attacks, including XSS and data injection attacks.

To implement CSP:

1. Set appropriate headers on your server. For example:

```
Content-Security-Policy: default-src 'self'; script-src 'self' https://trusted.cdn.com;
```

2. In your Angular application, you may need to adjust your code to comply with CSP, especially if you're using inline styles or scripts.

## Key Points to Remember:

1. Always use HTTPS in production to encrypt data in transit.
2. Never store sensitive information like passwords in local storage.
3. Implement proper authentication and authorization mechanisms.
4. Use Angular's built-in sanitization for untrusted values.
5. Implement and regularly update your Content Security Policy.
6. Keep your Angular version and all dependencies up to date.

## Practical Tips:

1. Use environment variables to store API URLs and other configuration details.
2. Implement token refresh mechanisms to maintain user sessions securely.
3. Use Angular's HttpClient for all HTTP requests to benefit from its built-in security features.
4. Regularly audit your application for security vulnerabilities.
5. Consider using security-focused libraries like AngularFirebase for authentication.
6. Implement proper error handling to avoid exposing sensitive information in error messages.

Example of secure error handling:

```typescript
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Backend error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
```

Remember, security is an ongoing process. Regularly review and update your security practices, stay informed about new vulnerabilities and best practices, and always prioritize the security of your users' data. The Angular security guide in the official documentation provides more detailed information on these topics and should be consulted as you continue to improve the security of your Angular applications.