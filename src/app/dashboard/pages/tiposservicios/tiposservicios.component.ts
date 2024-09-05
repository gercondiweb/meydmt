import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tiposservicios',
  templateUrl: './tiposservicios.component.html',
  styleUrls: ['./tiposservicios.component.css']
})
export class TiposserviciosComponent implements OnInit {

  titulo =['Administrar Tipos de Servicios'];
  colTipoServicio = []

  constructor() { }

  ngOnInit() {
  }

}
