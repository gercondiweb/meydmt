import { Component, OnInit, inject } from '@angular/core';
import { RestService } from '../../services';
import { Router } from '@angular/router';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { truncate } from 'fs';

@Component({
  selector: 'app-tablero-adm',
  templateUrl: './tablero-adm.component.html',
  styleUrl: './tablero-adm.component.css'
})
export class TableroAdmComponent implements OnInit{
  private breakpointObserver = inject(BreakpointObserver);

  public listServxestado: any;
  public servxestado: any[] = [];
  public solicitado = 0;

  datosConsulta = {
    opc:'',
    id_cliente:1,
    fechainicial: new Date(),
    fechafinal:new Date()
  }

  constructor (private RestService:RestService, private router: Router){}

  ngOnInit(): void {
    this.datosConsulta.opc = "SC";
    this.cargarNumServiciosxEstado();
  }

  cargarNumServiciosxEstado(){
    // Obtener la fecha actual
    const fechaActual = new Date();

    // Obtener el último día del mes actual
    const ultimoDiaMes = new Date(fechaActual.getFullYear(), fechaActual.getMonth() + 1, 0);

    // Obtener la fecha final (último día del mes) en formato ISO (YYYY-MM-DD)
    const fechaFin = '2024-03-31';//ultimoDiaMes.toISOString().slice(0, 10);

    const fechaIni = '2024-02-01'; //this.datosConsulta.fechainicial.toISOString().slice(0, 10);


    this.datosConsulta.fechainicial = new Date(fechaIni); // Cambia la fecha a la deseada
    this.datosConsulta.fechafinal = new Date(fechaFin);

    console.log('Datos consulta ', this.datosConsulta)

    this.RestService.getServiciosxEstado(this.datosConsulta).subscribe(respuesta=>{
      console.log('resultado', respuesta)
      this.listServxestado=respuesta;
      this.servxestado=this.listServxestado.body;
      this.solicitado = this.servxestado[0];
    })
  }
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Solicitados', cols: 2, rows: 1, icon: 'commute', value: 55, ischarts:false , tipo:''  },
          { title: 'En Progreso', cols: 2, rows: 1, icon: 'play_circle_outline', value: 'NA', ischarts:false , tipo:''   },
          { title: 'Cancelados', cols: 2, rows: 1, icon: 'cancel', value: 2, ischarts:false , tipo:''   },
          { title: 'Finalizados', cols: 2, rows: 1, icon: 'done_outline', value: 23, ischarts:false , tipo:''   },
          { title: 'Servicios Solcitados hoy', cols: 4, rows: 2, icon: 'commute', value: 15, ischarts:true , tipo:'colum'   },
          { title: 'Card 2', cols: 4, rows: 2, icon: 'commute', value: 15, ischarts:true , tipo:'pie'   },
          { title: 'Card 3', cols: 4, rows: 2, icon: 'commute', value: 15, ischarts:true , tipo:'tabla'   }
          //{ title: 'Card 4', cols: 1, rows: 1 }
        ];
      }

      return [
        { title: 'Solicitados', icon: 'commute', value: 55, cols: 1, rows: 1, ischarts:false , tipo:'' },
        { title: 'En Progreso', icon: 'play_circle_outline',value: 10,cols: 1, rows: 1, ischarts:false , tipo:'' },
        { title: 'Cancelados', icon: 'cancel',value: 2,cols: 1, rows: 1, ischarts:false , tipo:'' },
        { title: 'Finalizados', icon: 'done_outline',value: 23,cols: 1, rows: 1, ischarts:false , tipo:'' },

        { title: 'Servicios Solcitados hoy', cols: 2, rows: 3, ischarts:true, tipo:'colum' },
        { title: 'Card 2', cols: 2, rows: 3, ischarts:true, tipo:'pie' },
        { title: 'Card 3', cols: 4, rows: 2, ischarts:true, tipo:'tabla' }
        //{ title: 'Card 4', cols: 1, rows: 1 },
      ];
    })
  );
}
