import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Observable, map, tap } from 'rxjs';
import { IUserAuth } from '../types/interfaces';
import { IUserAuthEntity } from '../types/models';
import { toUserAuth } from '../helpers/UserAth.mapper';
import { environment } from '@environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _userAuth = signal< IUserAuth | null >(null);
  private router = inject(Router);
  constructor(private http: HttpClient, private cookieService: CookieService) {}

  get userAuth (): IUserAuth | null {
    return this._userAuth();
  }

  login(username: string, password: string): Observable<boolean> {
    return this.http.post<{
      body:{
        token:string,
        message:string,
        user: IUserAuthEntity
      }
  }>(environment.apiUrl.auth.login, { usuario: username, password })
    .pipe(
      map(({ body: { token, user, message }}) => {
        this.setToken(token);
        this._userAuth.update( userOld => toUserAuth(user));
        return !message;
      })
    );
  }

  check(): Observable<boolean>{
    return this.http.get<IUserAuthEntity>('auth/check')
   .pipe(
      tap( (user) => {
        this._userAuth.update( userOld => toUserAuth(user))
      } ),
      map( (user) => !!user)
   );
  }

  setToken(token: string) {
    this.cookieService.set('token', token,{ path: '/' });
  }

  getToken() {
    const tok = this.cookieService.get('token');
    return tok;
  }

  isLoggedIn(): boolean {
    return !this.getToken();
  }

  logout() {
    this.cookieService.delete('token','/');
    this._userAuth.update( userOld => null );
    this.router.navigateByUrl('/login');
  }
}
