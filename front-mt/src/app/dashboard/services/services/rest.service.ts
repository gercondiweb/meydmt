import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class RestService {
  private readonly url = 'servicios';

  constructor(private http: HttpClient) { }

  public getAllClientes(): Observable<any>{
    return this.http.get('clientes'); // GET http://localhost:4000/api/clientes
  }

  public getAllConductores(): Observable<any>{
    return this.http.get('conductoresxplaca'); // GET http://localhost:4000/api/conductoresxplaca
  }
  public getAllPlacas(): Observable<any>{
    return this.http.get('placas'); // GET http://localhost:4000/api/clientes
  }
  public getAllTikets(datosConsulta:any): Observable<any>{
    return this.http.post('consultatkt', datosConsulta); // GET http://localhost:4002/api/tikest
  }

  public getCountTikets(datosConsulta:any): Observable<any>{
    return this.http.post('cantktest', datosConsulta); // GET http://localhost:4000/api/clientes
  }

  public getFiltroServicios(datosConsulta:any): Observable<any>{
    return this.http.post('consultaservicio/servxest', datosConsulta); // GET http://localhost:4000/api/consultaservicio
  }

  public getMaestros(datosServicio:any): Observable<any>{
    return this.http.post('consultaservicio/serv', datosServicio); // GET http://localhost:4000/api/clientes
  }
  public getServicios(datosServicio:any): Observable<any>{
    return this.http.post('consultaservicio/serv', datosServicio);; // GET http://localhost:4000/api/clientes
  }
  public createServicios(datosServ:any):Observable<any>{
    return this.http.post<any>(this.url, datosServ); // POST http://localhost:4000/api/servicios
  }

  public updateServicios(datosServ:any):Observable<any>{
    return this.http.post<any>(this.url, datosServ); // POST http://localhost:4000/api/servicios
  }

  public getServiciosxEstado(datosConsulta:any):Observable<any>{
    return this.http.get('consultaservicio/servxest', datosConsulta);
  }

  public spServicios(datosConsulta:any):Observable<any>{
    //console.log('DATOS CONSULTA ', datosConsulta)
    return this.http.post('consultaservicio/servicios', datosConsulta);
  }

  public crearTkt(datosConsulta:any):Observable<any>{
    //console.log('DATOS CONSULTA ', datosConsulta)
    return this.http.post('operacionestikets/creartkt', datosConsulta);
  }

  public asignarTecnicoTkt(datosConsulta:any):Observable<any>{
    //console.log('DATOS CONSULTA ', datosConsulta)
    return this.http.post('operacionestikets/creartkt', datosConsulta);
  }

  public getContratos(datosConsulta:any):Observable<any>{
    return this.http.post('consultaContratos/',datosConsulta);
  }

  public operacionesContratos(datosConsulta:any):Observable<any>{
    return this.http.post('operacionesContratos/',datosConsulta);
  }
  public crearContratos(datosConsulta:any):Observable<any>{
    return this.http.post('contratos/savecontract',datosConsulta);
  }

  public serviciosContratos(datosConsulta:any):Observable<any>{
    return this.http.post('servicioscontrato/saveSC',datosConsulta);
  }
}