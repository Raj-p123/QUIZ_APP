import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection
} from '@angular/core';

import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

import {
  provideClientHydration,
  withEventReplay
} from '@angular/platform-browser';

import {
  provideHttpClient
} from '@angular/common/http';

import { RouteReuseStrategy } from '@angular/router';
import { NoReuseStrategy } from './no-reuse.strategy';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),

    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(),

    // ✅ GLOBAL FIX FOR REFRESH PROBLEM
    {
      provide: RouteReuseStrategy,
      useClass: NoReuseStrategy
    }
  ]
};
