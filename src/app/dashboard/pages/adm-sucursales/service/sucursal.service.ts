import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '@environments/environment';
import { ISucursalEntity } from '../types/models/sucursal.entity';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SucursalService {
  private http = inject(HttpClient);

constructor() { }

  save(data: any){
    return this.http.post<ISucursalEntity>(environment.apiUrl.sucursal, data)
    .pipe(
      map( console.log )
    );
  }
}
