import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, reduce } from 'rxjs';
import { response } from 'express';

@Injectable({
  providedIn: 'root'
})
export class ProdrestserviceService {

  constructor(private http: HttpClient) { }

  public getOrdenes(datosConsulta:any): Observable<any>{
    return this.http.post('ordenes/consultasorden', datosConsulta); // GET http://localhost:4000/api/ordenes
  }

  public getMaestros(datosMaestro:any): Observable<any>{
    return this.http.post('consultaservicio/serv', datosMaestro); // GET http://localhost:4000/api/clientes
  }

}
