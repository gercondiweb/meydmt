import {Component} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-tabla-consulta',
  templateUrl: './tabla-consulta.component.html',
  styleUrls: ['./tabla-consulta.component.css'], 
  animations: [
    trigger('detailExpand', [
      state('collapsed, void', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class TablaConsultaComponent {
  dataSource = ELEMENT_DATA;
  columnsToDisplay = ['id', 'nombre', 'estado']; 
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement: PeriodicElement | null;

  eliminarElemento(element: PeriodicElement) {
    // Filtra el elemento a eliminar del array de datos
    this.dataSource = this.dataSource.filter(e => e.id !== element.id);
    alert('Elemento eliminado: ' + element.nombre);
  }
}

export interface PeriodicElement {
  id: number;
  nombre: string;
  estado: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    id: 10,
    nombre: 'ORDEN MOTOR AC 3F',
    estado: 1,
  },
  {
    id: 2,
    nombre: 'ORDEN DE EQUIPOS VARIOS',
    estado: 1,
  },
];
