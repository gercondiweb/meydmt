import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-campo-orden',
  templateUrl: './campo-orden.component.html',
  styleUrls: ['./campo-orden.component.css']
})
export class CampoOrdenComponent implements OnInit {

  @Input() campocompleto: any[]=[];

  cant: any;
  referencia: any;
  fecha: any;
  comentario: any;
  valor: any;
  sino: any;
  bueno: any;

  constructor() { }

  ngOnInit() {
  }

}
