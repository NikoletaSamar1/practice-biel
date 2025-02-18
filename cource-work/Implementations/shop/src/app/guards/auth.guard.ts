import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot} from '@angular/router';
import {inject} from '@angular/core';
import RegistrationService from '../services/registration.service';


export const AuthGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService = inject(RegistrationService);
  const router = inject(Router);

  if (authService.isLogged) {
    return true;
  }
  router.navigate(['/home']);
  return false;
};