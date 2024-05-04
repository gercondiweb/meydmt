import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { catchError, tap } from 'rxjs';
import Swal from 'sweetalert2';

export const principalInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('°__° interceptado')
  const cookie = inject(CookieService);
  const token: string = cookie.get('token');
  const urlBase = 'http://localhost:4002/api';
  let url = req.url;

  url = `${urlBase}/${url}`;
  if(token){
    req = req.clone({
      url: url,
      setHeaders:{
        authorization: `Bearer ${token}`
      }
    });
  }else{
    req = req.clone({
      url: url,
    });
  }


  return next(req)
  .pipe(
    tap( (res) => {
   /*    Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Petición con exito!!!",
        showConfirmButton: false,
        timer: 1500
      }); */
    } ),
    /* catchError( (e:any) => {

    } ) */
  );
};
