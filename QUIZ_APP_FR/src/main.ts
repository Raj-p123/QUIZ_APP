import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { appConfig } from './app/app.config';

import { provideHttpClient } from '@angular/common/http';

import { provideRouter, withRouterConfig } from '@angular/router';
import { routes } from './app/app.routes';

import { provideCharts, withDefaultRegisterables } from 'ng2-charts';

bootstrapApplication(App, {
  providers: [

    ...(appConfig.providers ?? []),

    provideHttpClient(),

    provideCharts(withDefaultRegisterables()),

    // ⭐ IMPORTANT FIX
    provideRouter(
      routes,
      withRouterConfig({
        onSameUrlNavigation: 'reload'
      })
    )

  ]
}).catch(err => console.error(err));