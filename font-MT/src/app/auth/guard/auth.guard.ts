import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const cookie = inject(CookieService);

  if (cookie.get('token')) {
    router.navigateByUrl('dashboard');
    return false;
  }

  return true;
};
