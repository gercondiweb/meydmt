import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { ModalService } from '../../../dashboard/services/services/modal.service';
import { ModalFormComponent } from '../modal-form/modal-form.component';
import { MatDialog } from '@angular/material/dialog';

export interface ElementoTablaDetalle {
  nombre: string;

}

@Component({
  selector: 'app-tabla-detalle',
  templateUrl: './tabla-detalle.component.html',
  styleUrl: './tabla-detalle.component.css',
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class TablaDetalleComponent implements OnChanges {

  @Input() datasource!: any[];
  @Input() columns : any[] = [];

  columnsToDisplay = ['id', 'CLIENTE','TIPOSERVICIO', 'fecha', 'hora', 'prioridad'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement!: DetalleServicio | null;

  ngOnChanges(changes: SimpleChanges): void {
    console.log('data: ', this.datasource);
  }

  constructor(public dialog: MatDialog){

  }

  editarElemento(elemento: ElementoTablaDetalle) {
    // Lógica para editar el elemento
    const dialogRef = this.dialog.open(ModalFormComponent, {
      disableClose: true,
      autoFocus: true,
      closeOnNavigation : false,
      width : '900px',
      data: {
        tipo: 'EDITAR',
        data: elemento,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  eliminarElemento(elemento: ElementoTablaDetalle) {
    // Lógica para eliminar el elemento
    alert('Eliminar:'+ elemento);
  }
}
export interface DetalleServicio {
  id: number;
  id_tiposervicio: number;
  tiposervicio: string;
  cliente: string;
  fecha: string;
  hora: string;
  id_cliente: number;
  usuarios: string;
  origen: string;
  destino: string;
}

const ELEMENT_DATA: DetalleServicio[] = [];
