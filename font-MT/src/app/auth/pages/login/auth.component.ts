import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { response } from 'express';
import { CookieService } from 'ngx-cookie-service';
import { lastValueFrom } from 'rxjs';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export class AuthComponent {
  usuario: string = '';
  password: string = '';
  isLoading = signal(false);
  private readonly _cookieService = inject(CookieService)

  constructor(private router: Router, private authService : AuthService) {}

  async login(){
    this.isLoading.update( l => true);
    try {

      const isAuthtenticate = await lastValueFrom(this.authService.login(this.usuario, this.password));
      this.isLoading.update( l => false)
       if(isAuthtenticate) this.router.navigateByUrl('/dashboard');

    } catch (error) {
      this.isLoading.update( l => false)
      console.log(error);
    }

  }
}
