import {APP_INITIALIZER, FactoryProvider} from '@angular/core';
import {Observable} from 'rxjs';
import RegistrationService from '../services/registration.service';


export function initializeAuthServiceFactory(authService: RegistrationService): () => Observable<void> {
  return () => authService.init();
}

export const AppMandatoryServiceInitializer: FactoryProvider = {
  provide: APP_INITIALIZER,
  useFactory: initializeAuthServiceFactory,
  deps: [RegistrationService],
  multi: true
};