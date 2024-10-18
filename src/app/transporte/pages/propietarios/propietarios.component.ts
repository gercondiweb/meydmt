import { Component } from '@angular/core';

@Component({
  selector: 'app-propietarios',
  templateUrl: './propietarios.component.html',
  styleUrl: './propietarios.component.css'
})
export class PropietariosComponent {
  titulo=['Administrador de Proveedor'];
  columnas=['proveedor','telefono','direccion'];
  listPropietarios: any;

  constructor() { }

  ngOnInit(): void {
  }
}
