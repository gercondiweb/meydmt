import { Component, OnInit } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import { RestService } from '../../services/rest.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-recorridos',
  templateUrl: './recorridos.component.html',
  styleUrl: './recorridos.component.css'
})
export class RecorridosComponent implements OnInit{

  datosBusqueda={
    opc :"ALLSERV",
    
  }

  listDatos: any; datos:any;
  listServicios:any; servicios:any;
  colum = ['id', 'fecha', 'hora', 'tipo', 'cliente', 'placa','estado'];

  cards: any[] = [
    { title: 'Solicitados', icon: 'commute', value: 0, cols: 1, rows: 1, ischarts: false, tipo: '' },
    { title: 'En Ejecucion', icon: 'cancel', value: 0, cols: 1, rows: 1, ischarts: false, tipo: '' },
    { title: 'Cancelados', icon: 'cancel', value: 0, cols: 1, rows: 1, ischarts: false, tipo: '' },
    { title: 'Ejecutados', icon: 'done', value: 0, cols: 1, rows: 1, ischarts: false, tipo: '' },
    { title: 'Asignados', icon: 'user', value: 0, cols: 1, rows: 1, ischarts: false, tipo: '' },
    { title: 'Aplazado', icon: 'user', value: 0, cols: 1, rows: 1, ischarts: false, tipo: '' },
  ];

  constructor(
    private _restService: RestService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(){
    this.datosBusqueda.opc='COUNTSERV';

    this._restService.consultatransporte(this.datosBusqueda)
    .subscribe(respuesta=>{
      this.listDatos = respuesta;
      this.datos = this.listDatos.body[1][0];
      console.log(this.listDatos.body);
      
      this.cards[0].value = this.datos.Pendientes;
      this.cards[1].value = this.datos.Iniciados;
      this.cards[2].value = this.datos.Cancelados;
      this.cards[3].value = this.datos.Completados;
      this.cards[4].value = this.datos.Camino;
      this.cards[5].value = this.datos.Aplazados;
    });

    this.datosBusqueda.opc='ALLSERV';

    this._restService.consultatransporte(this.datosBusqueda)
    .subscribe(respuesta=>{
      this.listServicios = respuesta;
      this.servicios = this.listServicios.body[0];
    });
  }

  digitar(){
    const route = 'transporte/admrecorridos/'  ;
      this.router.navigate([route,'Crear']);
  }

  filtrar(estado : string){

  }
}
