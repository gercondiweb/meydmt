import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { ModalService } from '../../../dashboard/services/services/modal.service';
import { ModalFormComponent } from '../modal-form/modal-form.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DataSharingService } from '../../../dashboard/services/services/data-sharing.service';
import { DatePipe } from '@angular/common';
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

  columnsToDisplay = ['Id', 'Cliente','Tipo','Serv', 'Fecha', 'Hora', 'Prioridad', 'Estado'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement!: DetalleServicio | null;

  ngOnChanges(changes: SimpleChanges): void {
    //console.log('data: ', this.datasource);
  }

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private dataSharingService: DataSharingService,
    private datePipe: DatePipe
  ){}

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

  addComent(element: ElementoTablaDetalle){

    const param1 = 'valor1';
    const param2 = 'valor2';
    const data = { data: element };

    //console.log(data)

    this.dataSharingService.setParams(param1, param2, data);

    const route = '/dashboard/admtickets'  ;
    this.router.navigate([route,'editar']);
  }

  eliminarElemento(elemento: ElementoTablaDetalle) {
    // Lógica para eliminar el elemento
    alert('Eliminar:'+ elemento);
  }

  editarTiket(element: any) {
    const param3 = 'valor1';
    const param4 = 'valor2';
    const data2 = { data: element };

    //console.log(data)

    this.dataSharingService.setParams(param3, param4, data2);
    const route = '/dashboard/admtickets'  ;
      this.router.navigate([route,'editar']);
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
