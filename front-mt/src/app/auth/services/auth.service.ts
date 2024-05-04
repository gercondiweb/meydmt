import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, private cookieService: CookieService) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>('auth/login', { usuario: username, password : password });
  }

  setToken(token: string) {
    this.cookieService.set('token', token);
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
  }
}
