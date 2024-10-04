import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rutas',
  templateUrl: './rutas.component.html',
  styleUrl: './rutas.component.css'
})
export class RutasComponent implements OnInit {

  titulo = ['Administrador de Rutas'];
  columnas = ['cliente', 'nombre', 'hora','origen','destino','zona'];

  listRutas : any;

  formAdm ='admrutas';

  constructor(
  ) { }

  ngOnInit(): void {
  
  }
}
