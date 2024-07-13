---
title: Internationalization (i18n)
description: A beginner-level guide for Angular Internationalization (i18n)
---

Internationalization (i18n) is the process of designing your application to support multiple languages and regions. This guide will help you get started with i18n in Angular.

## Setting up translations

1. First, make sure you have the Angular CLI installed:

```bash
npm install -g @angular/cli
```

2. In your Angular project, create a folder called `locale` in the `src` directory to store translation files.

3. For each language you want to support, create a JSON file in the `locale` folder. For example:
   - `src/locale/messages.xlf` (source language, usually English)
   - `src/locale/messages.fr.xlf` (French translations)
   - `src/locale/messages.es.xlf` (Spanish translations)

4. In your `angular.json` file, add the i18n configuration:

```json
{
  "projects": {
    "your-project-name": {
      "i18n": {
        "sourceLocale": "en-US",
        "locales": {
          "fr": "src/locale/messages.fr.xlf",
          "es": "src/locale/messages.es.xlf"
        }
      }
    }
  }
}
```

## Using the built-in i18n tools

1. Mark text for translation in your templates using the `i18n` attribute:

```html
<h1 i18n>Welcome to my app!</h1>
```

2. For more complex translations, use `i18n-*` attributes:

```html
<img [src]="logo" i18n-alt alt="Company logo">
```

3. Extract the marked text to the source language file:

```bash
ng extract-i18n
```

This command will create or update the `src/locale/messages.xlf` file.

4. Translate the extracted text in the language-specific XLF files.

5. To build your app for a specific locale:

```bash
ng build --localize --configuration=production
```

This will generate a separate build for each configured locale.

## Runtime language switching

For runtime language switching, you'll need to use a library like `@ngx-translate/core`. Here's how to set it up:

1. Install the required packages:

```bash
npm install @ngx-translate/core @ngx-translate/http-loader
```

2. In your `app.module.ts`, import and configure the TranslateModule:

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppComponent } from './app.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

3. Create JSON files for each language in `src/assets/i18n/`:
   - `en.json`
   - `fr.json`
   - `es.json`

4. In your component, use the TranslateService to switch languages:

```typescript
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  template: `
    <h1>{{ 'HELLO' | translate }}</h1>
    <button (click)="switchLang('en')">English</button>
    <button (click)="switchLang('fr')">Français</button>
    <button (click)="switchLang('es')">Español</button>
  `
})
export class AppComponent {
  constructor(private translate: TranslateService) {
    translate.setDefaultLang('en');
  }

  switchLang(lang: string) {
    this.translate.use(lang);
  }
}
```

5. Use the translate pipe in your templates:

```html
<p>{{ 'WELCOME_MESSAGE' | translate }}</p>
```

This guide covers the basics of internationalization in Angular. As you become more comfortable with these concepts, you can explore more advanced features and best practices for managing translations in larger applications.