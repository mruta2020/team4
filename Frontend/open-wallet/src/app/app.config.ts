import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import {HttpClient, provideHttpClient, withInterceptors} from '@angular/common/http';
import MyPreset from './themes/preset';
import {MessageService} from "primeng/api";
import {jwtInterceptor} from "./interceptors/token.interceptor";
import {provideTranslateService, TranslateLoader, TranslateService} from "@ngx-translate/core";
import {TranslateHttpLoader} from "./loader/translate-loader";
import {provideTranslateHttpLoader} from "@ngx-translate/http-loader";


export const appConfig: ApplicationConfig = {
  providers: [
    provideTranslateService({
      loader: provideTranslateHttpLoader({
        prefix: '/assets/i18n/',
        suffix: '.json'
      }),
      fallbackLang: 'it',
      lang: 'it'
    }),
    provideHttpClient(withInterceptors([jwtInterceptor])),
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: MyPreset,
        options: {
          darkModeSelector: false || 'none'
        }
      }
    }),
    MessageService
  ]
};
