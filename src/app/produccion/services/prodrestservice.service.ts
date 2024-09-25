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
    return this.http.post('ordenes/consultasorden', datosConsulta); 
  }

  public getMaestros(datosMaestro:any): Observable<any>{
    return this.http.post('consultaservicio/serv', datosMaestro); 
  }

  public getFormatos(datosConsulta:any): Observable<any>{
    return this.http.post('formatos/consultaformato', datosConsulta); 
  }

  public crearFormato( datosConsulta: any ):Observable<any>{
    console.log(datosConsulta);
    return this.http.post<{ body: { formato: any }}>('formatos',datosConsulta)
    .pipe( map( ({ body }) => body ) );
  }

  public getCampos(datosConsulta:any): Observable<any>{
    return this.http.post('campoformato/consulta', datosConsulta); 
  }

  public crearCampos(datosConsulta:any):Observable<any>{
    return this.http.post<{ body: { formato: any }}>('campos',datosConsulta)
    .pipe( map( ({ body }) => body ) );
  }

  public getSeccion(datosConsulta:any): Observable<any>{
    return this.http.post('consultaservicio/serv', datosConsulta); 
  }

  public crearSeccion(datosConsulta:any):Observable<any>{
    return this.http.post<{ body: { formato: any }}>('secciones',datosConsulta)
    .pipe( map( ({ body }) => body ) );
  }
  public getPropiedades(datosConsulta:any): Observable<any>{
    return this.http.post('consultaservicio/serv', datosConsulta); 
  }

  public crearPropiedades(datosConsulta:any):Observable<any>{
    return this.http.post<{ body: { formato: any }}>('propiedad',datosConsulta)
    .pipe( map( ({ body }) => body ) );
  }
  public getTipoPropiedades(datosConsulta:any): Observable<any>{
    return this.http.post('consultaservicio/serv', datosConsulta); 
  }

  public crearTipoPropiedades(datosConsulta:any):Observable<any>{
    return this.http.post<{ body: { formato: any }}>('tipopropiedad',datosConsulta)
    .pipe( map( ({ body }) => body ) );
  }
  public getOrden(datosConsulta:any): Observable<any>{
    return this.http.post('campoformato/consulta', datosConsulta); 
  }

  public crearOrden(datosConsulta:any):Observable<any>{
    return this.http.post<{ body: { formato: any }}>('campoformato',datosConsulta)
    .pipe( map( ({ body }) => body ) );
  }

  public CrearcampoFormato(datosConsulta:any):Observable<any>{
    return this.http.post<{ body: { formato: any }}>('campoformato',datosConsulta)
    .pipe( map( ({ body }) => body ) );
  }

}
