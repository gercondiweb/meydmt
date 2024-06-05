import { Component, Input, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ItemNavigate } from '../../types/interfaces';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-navegacion',
  templateUrl: './navegacion.component.html',
  styleUrl: './navegacion.component.css'
})
export class NavegacionComponent {
  private breakpointObserver = inject(BreakpointObserver);
  private readonly _cookieService = inject(CookieService);

  public token: string = this._cookieService.get('token');

  showSubmenu: boolean = false;

  @Input( { required:true } ) items:ItemNavigate[] = [];

  constructor(
   private router:Router
  ){}

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

    public isAuthenticated = true;

    tablero(){
    this.router.navigate(["tablero"]);
    }

    tikets(){
      this.router.navigate(["principal/tikets"]);
      }

    cargarActivos(){
      this.router.navigate(["principal/activos"]);
    }

    solicitar(){
      this.router.navigate(["principal/solicitar"]);
    }

    cargarClientes(){
      this.router.navigate(["principal/clientes"]);
    }

    logOut(){
      this._cookieService.delete('token', '/' );
      this.router.navigateByUrl('/login');
    }

    toggleSubmenu(): void {
      this.showSubmenu = !this.showSubmenu;
    }



}
