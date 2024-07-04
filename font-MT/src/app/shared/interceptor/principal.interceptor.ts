import { HttpErrorResponse, HttpEvent, HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { environment } from '@environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { catchError, tap, throwError } from 'rxjs';
import Swal from 'sweetalert2'

export const principalInterceptor: HttpInterceptorFn = (req, next) => {
  const cookie = inject(CookieService);
  const token: string = cookie.get('token');
  const { apiUrl } = environment;
  const urlBase = apiUrl.base;
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
    tap((event: HttpEvent<any>) =>{
    //  if(res)
      if (event instanceof HttpResponse && event.body.body.message  ) {
        Swal.fire({
          position: "center",
          icon: "success",
          text: event.body.body.message ,
          showConfirmButton: false,
          timer: 1500
        });

      }

    } ),
     catchError( ( error : HttpErrorResponse ) => {

      const message =  error.error.body.message;
      if(message){
        Swal.fire({
          position: "center",
          icon: "error",
       /*    title: "", */
          text: message,
          showConfirmButton: false,
          timer: 1500
        });
      }
        return throwError(()=>error);
    } )
  );
};
