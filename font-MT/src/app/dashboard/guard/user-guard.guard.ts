import { AuthService } from '@/app/auth/services/auth.service';
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { lastValueFrom } from 'rxjs';

export const userGuard: CanActivateFn = async (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  if (authService.isLoggedIn()) {
    router.navigateByUrl('/login');
    return false;
  }

  const isSucces = await lastValueFrom(authService.check());
  if(!isSucces){
    router.navigateByUrl('/login');
    return false;
  }

  return true;
};
