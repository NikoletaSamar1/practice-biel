import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import RegistrationService from '../services/registration.service';

export const AuthorizedGuard: CanActivateFn = (route, state) => {
  const authService = inject(RegistrationService);
  const router = inject(Router);

  if (authService.isLogged) {
    router.navigate(['/home']);
    return true; // This is in order to prevent logged-in user to navigate register and homepage again
  }

  return true; // If the user is not authorized, still let him access the resource (login, register, ...)
};