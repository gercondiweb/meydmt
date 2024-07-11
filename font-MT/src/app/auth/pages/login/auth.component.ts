import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { response } from 'express';
import { CookieService } from 'ngx-cookie-service';
import { lastValueFrom } from 'rxjs';
import { LoadingService } from '@/app/shared/services/loading.service';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export class AuthComponent {
  private readonly loadingService = inject(LoadingService);
  usuario: string = '';
  password: string = '';
  constructor(private router: Router, private authService : AuthService) {}

  async login(){
    this.loadingService.show();
    try {

      const isAuthtenticate = await lastValueFrom(this.authService.login(this.usuario, this.password));
      this.loadingService.hidden();
       if(isAuthtenticate) this.router.navigateByUrl('/dashboard');

    } catch (error) {
      this.loadingService.hidden();
      console.log(error);
    }

  }
}
