---
title: Server-Side Rendering (SSR)
description: A beginner-level guide for Server-Side Rendering (SSR) with Angular Universal
---

Server-Side Rendering (SSR) is the process of rendering web pages on the server instead of in the browser. Angular Universal is the official SSR solution for Angular applications. It allows you to run your Angular app on the server, generating static application pages that later get bootstrapped on the client.

Benefits of SSR include:
1. Improved performance, especially on slower devices or networks
2. Better SEO, as search engines can easily crawl the fully rendered pages
3. Quicker initial page load, enhancing user experience

## Setting up Angular Universal

Let's go through the process of adding Universal to an existing Angular project:

1. Navigate to your project directory and run:

```bash
ng add @nguniversal/express-engine
```

This command will:
- Install necessary dependencies
- Create new files for server-side rendering
- Modify existing files to support Universal

2. The newly created files include:
   - `server.ts`: The Express server that will serve your Universal application
   - `main.server.ts`: The main entry point for the server application
   - `app.server.module.ts`: The root module for the server application

3. To build and serve your Universal application, use these commands:

```bash
npm run build:ssr
npm run serve:ssr
```

The first command builds both the client and server bundles, while the second serves the Universal application on `http://localhost:4000`.

## Pre-rendering

Pre-rendering is the process of generating static HTML pages for your application during build time. This is useful for mostly static pages that don't require real-time data.

To set up pre-rendering:

1. Install the necessary package:

```bash
npm install @nguniversal/builders --save-dev
```

2. Update your `angular.json` file to include the pre-render configuration:

```json
{
  "projects": {
    "your-project-name": {
      "architect": {
        "prerender": {
          "builder": "@nguniversal/builders:prerender",
          "options": {
            "routes": [
              "/",
              "/about",
              "/contact"
            ]
          },
          "configurations": {
            "production": {}
          }
        }
      }
    }
  }
}
```

3. Run the pre-render command:

```bash
ng run your-project-name:prerender
```

This will generate static HTML files for the specified routes in the `dist/your-project-name/browser` directory.

## SEO Optimization

Angular Universal significantly improves SEO by allowing search engines to crawl the fully rendered pages. Here are some additional steps to optimize SEO:

1. Use the Meta service to manage meta tags:

```typescript
import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  template: '<h1>Welcome to my app!</h1>'
})
export class HomeComponent implements OnInit {
  constructor(private meta: Meta) {}

  ngOnInit() {
    this.meta.updateTag({ name: 'description', content: 'Home page of my awesome app' });
  }
}
```

2. Use the Title service to set the page title:

```typescript
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-about',
  template: '<h1>About Us</h1>'
})
export class AboutComponent implements OnInit {
  constructor(private titleService: Title) {}

  ngOnInit() {
    this.titleService.setTitle('About Us | My Awesome App');
  }
}
```

3. Implement canonical URLs to avoid duplicate content issues:

```typescript
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {
    this.setCanonicalURL();
  }

  setCanonicalURL() {
    const link: HTMLLinkElement = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
    link.setAttribute('href', document.URL);
  }
}
```

4. Create a `robots.txt` file in your `src` folder to guide search engine crawlers:

```
User-agent: *
Allow: /
Sitemap: https://your-domain.com/sitemap.xml
```

5. Generate a `sitemap.xml` file to help search engines discover your pages. You can use libraries like `sitemap` to generate this dynamically:

```typescript
import { SitemapStream, streamToPromise } from 'sitemap';
import { createWriteStream } from 'fs';

const sitemap = new SitemapStream({ hostname: 'https://your-domain.com' });

sitemap.write({ url: '/', changefreq: 'daily', priority: 0.7 });
sitemap.write({ url: '/about', changefreq: 'monthly', priority: 0.5 });
sitemap.write({ url: '/contact', changefreq: 'monthly', priority: 0.5 });

sitemap.end();

streamToPromise(sitemap).then((sm) => {
  createWriteStream('./dist/sitemap.xml').write(sm);
});
```

Remember to run this script as part of your build process.

By implementing these SEO optimizations along with Angular Universal, you'll significantly improve your application's search engine visibility and overall performance.

When working with Angular Universal, keep these points in mind:
- Avoid using browser-only APIs (like `window`, `document`, `navigator`) directly in your components. Instead, use Angular's `isPlatformBrowser` to check the current platform.
- Use Angular's `TransferState` API to avoid duplicate HTTP requests on the client after server-side rendering.
- Test your application thoroughly in both server-side and client-side environments to ensure consistent behavior.

This guide covers the basics of setting up and optimizing an Angular Universal application. As you become more comfortable with these concepts, you can explore more advanced techniques for performance optimization and dynamic content handling.