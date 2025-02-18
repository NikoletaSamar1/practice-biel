import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './commons/auth.interceptor';
import { AppMandatoryServiceInitializer } from './commons/app-mandatory-service.initializer';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    AppMandatoryServiceInitializer,
    provideRouter(routes)
  ]
};
