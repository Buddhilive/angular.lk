---
title: Progressive Web Apps (PWAs)
description: A beginner-level guide for creating Progressive Web Apps (PWAs) with Angular
---

Progressive Web Apps (PWAs) are web applications that use modern web capabilities to deliver an app-like experience to users. They are:

1. Reliable - Load instantly and never show the "downasaur" (Chrome's offline dinosaur) even in uncertain network conditions.
2. Fast - Respond quickly to user interactions with silky smooth animations and no janky scrolling.
3. Engaging - Feel like a natural app on the device, with an immersive user experience.

PWAs combine the best of web and native apps. They can work offline, send push notifications, and even be installed on the home screen, without the need for an app store.

## Service Workers

Service workers are a key technology behind PWAs. They act as a proxy between the web app and the network, allowing you to control how network requests are handled.

To add a service worker to your Angular app:

1. Use the Angular CLI to add PWA support:

```bash
ng add @angular/pwa
```

This command will:
- Add the `@angular/service-worker` package
- Enable service worker build support in the CLI
- Import and register the service worker in the app module
- Update the `index.html` file
- Create a configuration file `ngsw-config.json`
- Create app icons in `src/assets/icons`

2. The `ngsw-config.json` file configures the service worker. Here's a basic example:

```json
{
  "$schema": "./node_modules/@angular/service-worker/config/schema.json",
  "index": "/index.html",
  "assetGroups": [
    {
      "name": "app",
      "installMode": "prefetch",
      "resources": {
        "files": [
          "/favicon.ico",
          "/index.html",
          "/manifest.webmanifest",
          "/*.css",
          "/*.js"
        ]
      }
    },
    {
      "name": "assets",
      "installMode": "lazy",
      "updateMode": "prefetch",
      "resources": {
        "files": [
          "/assets/**",
          "/*.(eot|svg|cur|jpg|png|webp|gif|otf|ttf|woff|woff2|ani)"
        ]
      }
    }
  ]
}
```

This configuration tells the service worker to prefetch and cache the app's core files and lazy-load other assets.

## App Manifests

The Web App Manifest is a JSON file that provides information about your web application. It tells the browser how your app should behave when installed on the user's desktop or mobile device.

When you add PWA support to your Angular app, a `manifest.webmanifest` file is automatically created in the `src` folder. Here's an example:

```json
{
  "name": "My Angular PWA",
  "short_name": "AngularPWA",
  "theme_color": "#1976d2",
  "background_color": "#fafafa",
  "display": "standalone",
  "scope": "./",
  "start_url": "./",
  "icons": [
    {
      "src": "assets/icons/icon-72x72.png",
      "sizes": "72x72",
      "type": "image/png",
      "purpose": "maskable any"
    },
    // ... other icon sizes ...
  ]
}
```

You can customize this file to change how your app appears when installed.

## Offline Capabilities

PWAs can work offline or in low-quality network conditions. Here's how to implement offline capabilities:

1. Cache static assets:
   The `ngsw-config.json` file already configures caching for your app's static assets.

2. Handle dynamic data:
   For dynamic data, you can use strategies like "Cache then network" or "Network then cache". Implement these in your services:

```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private cache: any = {};

  constructor(private http: HttpClient) {}

  getData(url: string): Observable<any> {
    // Check cache first
    if (this.cache[url]) {
      return of(this.cache[url]);
    }

    // If not in cache, fetch from network
    return this.http.get(url).pipe(
      tap(response => {
        // Save response in cache
        this.cache[url] = response;
      }),
      catchError(error => {
        console.error('Error fetching data', error);
        // If offline, return cached data if available
        return this.cache[url] ? of(this.cache[url]) : of(null);
      })
    );
  }
}
```

3. Handle offline state:
   Use the `Online/Offline` events to detect network status:

```typescript
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div *ngIf="!isOnline">You are currently offline</div>
    <!-- rest of your app -->
  `
})
export class AppComponent implements OnInit {
  isOnline: boolean = navigator.onLine;

  ngOnInit() {
    window.addEventListener('online', this.updateOnlineStatus.bind(this));
    window.addEventListener('offline', this.updateOnlineStatus.bind(this));
  }

  updateOnlineStatus() {
    this.isOnline = navigator.onLine;
  }
}
```

4. Testing offline functionality:
   - Use Chrome DevTools: Go to the Network tab and check the "Offline" box.
   - Use Lighthouse in Chrome DevTools to audit your PWA.

By following these steps, you'll have created a basic PWA with Angular that works offline, can be installed on devices, and provides a native app-like experience.

Remember to thoroughly test your PWA in various network conditions and on different devices to ensure a smooth user experience.