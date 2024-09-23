import { Component, OnInit } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import { RestService } from '../../services/rest.service';


@Component({
  selector: 'app-recorridos',
  templateUrl: './recorridos.component.html',
  styleUrl: './recorridos.component.css'
})
export class RecorridosComponent implements OnInit{

  datosBusqueda={
    opc :"CNT-TKT",
    id_cliente :"1",
    fechainicial :"2024-01-01",
    fechafinal :"2024-03-30"
  }

  listDatos: any; datos:any;

  cards: any[] = [
    { title: 'Solicitados', icon: 'commute', value: 0, cols: 1, rows: 1, ischarts: false, tipo: '' },
    { title: 'En Ejecucion', icon: 'cancel', value: 0, cols: 1, rows: 1, ischarts: false, tipo: '' },
    { title: 'Cancelados', icon: 'cancel', value: 0, cols: 1, rows: 1, ischarts: false, tipo: '' },
    { title: 'Ejecutados', icon: 'done', value: 0, cols: 1, rows: 1, ischarts: false, tipo: '' },
    { title: 'Asignados', icon: 'user', value: 0, cols: 1, rows: 1, ischarts: false, tipo: '' },
  ];

  constructor(
    private _restService: RestService
  ) { }

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(){
    this._restService.getCountTikets(this.datosBusqueda)
    .subscribe(respuesta=>{
      this.listDatos = respuesta;
      this.datos = this.listDatos.body;

      this.cards[0].value = this.datos[0][0].servicios_solicitados;
      this.cards[1].value = this.datos[0][0].servicios_iniciados;
      this.cards[2].value = this.datos[0][0].servicios_cancelados;
      this.cards[3].value = this.datos[0][0].servicios_ejecutados;
      this.cards[4].value = this.datos[0][0].servicios_asignados;

    });
  }

  digitar(){

  }

  filtrar(estado : string){

  }
}
