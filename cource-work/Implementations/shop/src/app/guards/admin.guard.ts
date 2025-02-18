import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import RegistrationService from '../services/registration.service';

export const AdminGuard: CanActivateFn = (route, state) => {
  const authService = inject(RegistrationService);
  const router = inject(Router);

  if (authService.isAdmin) {
    return true;
  }
  router.navigate(['/home']);
  return false;
};