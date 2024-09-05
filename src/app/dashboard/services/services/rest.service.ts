import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, reduce } from 'rxjs';
import { response } from 'express';


@Injectable({
  providedIn: 'root'
})

export class RestService {
  private readonly url = 'servicios';

  constructor(private http: HttpClient) { }

  public getClientes(datosConsulta:any): Observable<any>{
    return this.http.post('consultaclientes', datosConsulta); // GET http://localhost:4000/api/clientes
  }

  public crearCliente(datosConsulta:any):Observable<any>{
    return this.http.post<{ body: { cliente: any }}>('clientes',datosConsulta)
    .pipe( map( ({ body }) => body ) );
  }

  public saveTickets(datosTiket:any): Observable<any>{
    return this.http.post('tikets', datosTiket); // GET http://localhost:4000/api/documentostecnico
  }

  public getAllTikets(datosConsulta:any): Observable<any>{
    return this.http.post('consultatkt', datosConsulta); // GET http://localhost:4002/api/tikest
  }

  public getCountTikets(datosConsulta:any): Observable<any>{
    return this.http.post('cantktest', datosConsulta); // GET http://localhost:4000/api/clientes
  }

  public getTicketComents(datosConsulta:any): Observable<any>{
    return this.http.post('operacionestikets/ticketcoments', datosConsulta); // GET http://localhost:4000/api/clientes
  }

  public getTicketVisit(datosConsulta:any): Observable<any>{
    return this.http.post('ticketvisits', datosConsulta); // GET http://localhost:4000/api/clientes
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
    return this.http.post('servicios', datosServ); // POST http://localhost:4000/api/servicios
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
    return this.http.post('operacionestikets/creartkt', datosConsulta);
  }

  public listarServicios(datosTipoServ:any):Observable<any>{
    return this.http.post('operacionestikets/creartkt', datosTipoServ);
  }

  public asignarTecnicoTkt(datosConsulta:any):Observable<any>{
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

  public crearTecnicos(datosConsulta:any):Observable<any>{
    return this.http.post('tecnicos',datosConsulta);
  }

  public tecnicosContratos(datosConsulta:any):Observable<any>{
    return this.http.post('operacionescontrato/addTecCont',datosConsulta);
  }

  public consultaEspTecnico(datosConsulta:any): Observable<any>{
    return this.http.post('sptecnicos/consultaEsp', datosConsulta); // GET http://localhost:4000/api/consultaservicio
  }

  public consultaDocTecnico(datosConsulta:any): Observable<any>{
    return this.http.post('sptecnicos/consultaDocs', datosConsulta); // GET http://localhost:4000/api/consultaservicio
  }

  public updTecnicosContratos(datosConsulta:any):Observable<any>{
    return this.http.post('operacionescontrato/updateTecCont',datosConsulta);
  }

  public saveEspTecnico(datosEspTec:any): Observable<any>{
    return this.http.post('especialidadestecnico', datosEspTec); // GET http://localhost:4000/api/clientes
  }

  public saveDocTecnico(datosDocTec:any): Observable<any>{
    return this.http.post('documentostecnico', datosDocTec); // GET http://localhost:4000/api/documentostecnico
  }

  public getEspecialidadesTecnico(datosServicio:any): Observable<any>{
    return this.http.post('consultatecnicos/esp', datosServicio); // GET http://localhost:4000/api/clientes
  }
  public getDocumentosTecnico(datosServicio:any): Observable<any>{
    return this.http.post('consultatecnico/docs', datosServicio); // GET http://localhost:4000/api/clientes
  }

  public comentarios(datosComentario:any): Observable<any>{
    return this.http.post('comentarios', datosComentario); // GET http://localhost:4000/api/clientes
  }

  public sucursales(datosSucursal:any): Observable<any>{
    return this.http.post('sucursales', datosSucursal); // GET http://localhost:4000/api/sucursales
  }

  public areas(datosArea:any): Observable<any>{
    return this.http.post('areas', datosArea); // GET http://localhost:4000/api/areas
  }

  public demografico(dato:any): Observable<any>{
    return this.http.post('consultaclientes/demografico', dato); // GET http://localhost:4000/api/areas
  }


}
