---
title: Performance Optimization
description: A beginner-level guide to Angular Performance Optimization
---

As Angular applications grow in size and complexity, optimizing performance becomes crucial. Here are some key strategies to improve your Angular app's performance:

## Change Detection Strategies

Change detection is the process by which Angular determines if the view needs to be updated based on changes in the component's data.

1. Default Change Detection:
By default, Angular checks every binding in the component tree whenever any data changes.

2. OnPush Change Detection:
This strategy tells Angular to only check for changes when:
- The component receives a new reference to an @Input property
- An event originated from the component or one of its children
- You manually trigger change detection

To use OnPush:

```typescript
import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-my-component',
  templateUrl: './my-component.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyComponentComponent {
  // Component logic
}
```

Best practices:
- Use immutable data structures with OnPush
- Manually trigger change detection when needed using ChangeDetectorRef

```typescript
constructor(private cd: ChangeDetectorRef) {}

updateView() {
  // Update data
  this.cd.markForCheck();
}
```

## Lazy Loading

Lazy loading is a design pattern that defers the initialization of a module until it's needed. This can significantly reduce the initial bundle size and improve startup time.

To implement lazy loading:

1. Create a feature module with its own routing:

```typescript
// in feature.module.ts
@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: FeatureComponent }
  ])],
  declarations: [FeatureComponent]
})
export class FeatureModule { }
```

2. In your main routing file, use loadChildren:

```typescript
// in app-routing.module.ts
const routes: Routes = [
  { path: 'feature', loadChildren: () => import('./feature/feature.module').then(m => m.FeatureModule) }
];
```

## AOT (Ahead-of-Time) Compilation

AOT compilation converts your Angular HTML and TypeScript code into efficient JavaScript code during the build phase, before the browser downloads and runs that code.

Benefits:
- Faster rendering
- Fewer asynchronous requests
- Smaller framework download size
- Earlier detection of template errors
- Better security

AOT is enabled by default for production builds:

```bash
ng build --prod
```

## Caching Strategies

Implementing effective caching can significantly improve your app's performance, especially for data that doesn't change frequently.

1. HTTP Caching:
Use Angular's HttpInterceptor to add caching headers:

```typescript
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpResponse } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable()
export class CachingInterceptor implements HttpInterceptor {
  private cache = new Map<string, any>();

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (!this.isCachable(req)) {
      return next.handle(req);
    }

    const cachedResponse = this.cache.get(req.url);
    if (cachedResponse) {
      return of(cachedResponse);
    }

    return next.handle(req).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          this.cache.set(req.url, event);
        }
      })
    );
  }

  private isCachable(req: HttpRequest<any>) {
    return req.method === 'GET';
  }
}
```

2. In-memory Caching:
For frequently accessed data, consider implementing an in-memory cache service:

```typescript
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  private cache = new Map<string, any>();

  set(key: string, value: any, ttl: number = 60000) {
    const item = {
      value: value,
      expiry: Date.now() + ttl
    };
    this.cache.set(key, item);
  }

  get(key: string) {
    const item = this.cache.get(key);
    if (!item) return null;
    if (Date.now() > item.expiry) {
      this.cache.delete(key);
      return null;
    }
    return item.value;
  }
}
```

## Key Points to Remember:

1. Use OnPush change detection for components that don't need frequent updates.

2. Implement lazy loading for large feature modules that aren't immediately necessary.

3. Always use production builds with AOT compilation for deployed applications.

4. Implement appropriate caching strategies based on your data update frequency and user needs.

5. Use trackBy with *ngFor to improve rendering performance of lists.

6. Avoid computation in templates; move complex calculations to the component class.

## Practical Tips:

1. Use Angular CLI's built-in optimization flags:
```bash
   ng build --prod
   ```
This enables AOT compilation, minification, and tree-shaking.

2. Regularly audit your app with Chrome DevTools' Performance tab and Angular's built-in performance profiler.

3. Consider using Web Workers for CPU-intensive tasks to keep the main thread free.

4. Optimize images and use lazy loading for images not immediately visible.

5. Use Angular's pureProxy for pure pipes to avoid unnecessary recalculations.

6. Implement virtual scrolling for long lists using Angular CDK's ScrollingModule.

Example of implementing virtual scrolling:

```typescript
import { Component } from '@angular/core';
import { ScrollingModule } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-virtual-scroll',
  template: `
    <cdk-virtual-scroll-viewport itemSize="50" class="example-viewport">
      <div *cdkVirtualFor="let item of items" class="example-item">{{item}}</div>
    </cdk-virtual-scroll-viewport>
  `,
  styles: [`
    .example-viewport {
      height: 200px;
      width: 200px;
      border: 1px solid black;
    }
    .example-item {
      height: 50px;
    }
  `]
})
export class VirtualScrollComponent {
  items = Array.from({length: 100000}).map((_, i) => `Item #${i}`);
}
```

Remember, performance optimization is an ongoing process. Regularly profile your application, identify bottlenecks, and apply these techniques as needed. The Angular documentation provides more detailed information on performance optimization techniques, which can be helpful as you continue to improve your Angular applications.