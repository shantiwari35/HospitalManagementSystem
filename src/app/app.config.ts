import { ApplicationConfig, InjectionToken, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';


export const API_URL = new InjectionToken<string>('API_URL');
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(),
    provideRouter(routes),
    {
      provide: API_URL,
      useValue: 'http://localhost:8080/api'
    }
  ]
};
