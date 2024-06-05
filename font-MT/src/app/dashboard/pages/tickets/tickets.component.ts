import { Component, OnInit, inject } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { RestService } from '../../services';
import { lastValueFrom } from 'rxjs';
import { ModalComponent } from './modal/modal.component';
import { ModalFormComponent } from '../../../shared/components/modal-form/modal-form.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tickets',
  standalone: false,
  templateUrl: './tickets.component.html',
  styleUrl: './tickets.component.css'
})
export class TicketsComponent implements OnInit{
  private breakpointObserver = inject(BreakpointObserver);


  titulo = ['Asignar Servicios'];

  public listDatos: any;
  public datos: any[] = [];

  public columnas = ['id','TIPOSERVICIO', 'fecha', 'hora', 'prioridad','descipcion', 'estado'];
  public listDatosDetalle: any;
  public datosDetalle! : any;

  public fInicial : any = '';
  public fFinal : any = '';

  public response:any;

  datosBusqueda = {
    opc :"CNT-TKT",
    id_cliente :"1",
    fechainicial :"2024-01-01",
    fechafinal :"2024-03-30",
  }

  datosBusquedaDetalle = {
    opc :"ALL-TKT",
    id_cliente :"1",
    fechainicial :"2024-01-01",
    fechafinal :"2024-03-30",
    id_placa:0,
    id_conductor:1,
    estado:"solicitado",
  }
  mostrar: boolean = false;



  constructor(
    private _restService:RestService,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router
  ){
  }

  cards: any[] = [
    { title: 'Solicitados', icon: 'commute', value: 0, cols: 1, rows: 1, ischarts: false, tipo: '' },
    { title: 'En Ejecucion', icon: 'cancel', value: 0, cols: 1, rows: 1, ischarts: false, tipo: '' },
    { title: 'Cancelados', icon: 'cancel', value: 0, cols: 1, rows: 1, ischarts: false, tipo: '' },
    { title: 'Ejecutados', icon: 'done_outline', value: 0, cols: 1, rows: 1, ischarts: false, tipo: '' },
    { title: 'Asignados', icon: 'commute', value: 0, cols: 1, rows: 1, ischarts: false, tipo: '' },
  ];

  ngOnInit(): void {
    this.mostrar = false;
    this.cargarDetalle();
    this.cargarData();

  }



  public cargarData(){
    //console.log('AQUI VOY ASIGNAR');
    //console.log(this.datosBusqueda);
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

  public async cargarDetalle(){
    this.listDatosDetalle = await lastValueFrom(this._restService.getAllTikets(this.datosBusquedaDetalle));
    this.datosDetalle = this.listDatosDetalle.body[0];
    //console.log(this.datosDetalle)
  }

  public filtrar(){

  }

  public crearTicket(){
    // Lógica para editar el elemento
    /*const dialogRef = this.dialog.open(ModalComponent, {
      disableClose: true,
      autoFocus: true,
      closeOnNavigation : false,
      width : '900px',
      data: {
        tipo: 'Crear',
      }

    });
    this.cargarDetalle();
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });*/

    const route = '/dashboard/admtickets'  ;
      this.router.navigate([route,'crear']);

  }


}
