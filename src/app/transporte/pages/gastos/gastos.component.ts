import { RestService } from '../../services/rest.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AdmgastosComponent } from '../admgastos/admgastos.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-gastos',
  templateUrl: './gastos.component.html',
  styleUrl: './gastos.component.css'
})
export class GastosComponent implements OnInit{

  formGasto : FormGroup;

  listConceptos:any;
  listTipoServ:any;

  listGastos:any;
  columnGastos = ['fecha', 'placa', 'concepto', 'descripcion', 'valor'];


  constructor(
    private fb : FormBuilder,
    private restService : RestService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    // Fecha inicial: primer día del mes actual
    const fechaInicio = new Date();
    fechaInicio.setDate(1);

    // Fecha final: último día del mes actual
    const fechaFin = new Date(fechaInicio.getFullYear(), fechaInicio.getMonth() + 1, 0);


    this.formGasto = this.fb.group({
      placa : [''],
      fechainicio:[fechaInicio.toISOString().substring(0, 10)],
      fechafin:[fechaFin.toISOString().substring(0, 10)]
    });

    this.cargargastos(fechaInicio.toISOString().substring(0, 10),fechaFin.toISOString().substring(0, 10));
  }

  datosConsulta={
    opc:'',
    vFechaInicio:'',
    vFechaFin:''
  }

  cargargastos(fechainicio:string, fechafin:string){

    this.datosConsulta.opc='GASTOS';
    this.datosConsulta.vFechaInicio=fechainicio;
    this.datosConsulta.vFechaFin=fechafin;

    this.restService.consultatransporte(this.datosConsulta).subscribe(respuesta=>{
      this.listGastos=respuesta.body[0];
    });
  }

  filtrarGastos(){
    this.cargargastos(this.formGasto.get('fechainicio')?.value, this.formGasto.get('fechafin')?.value);
  }

  agregarGasto(elemento: any){
    // Agregar un nuevo gasto a la lista
    const dialogRef = this.dialog.open(AdmgastosComponent, {
      disableClose: true,
      autoFocus: true,
      closeOnNavigation : false,
      width : '900px',
      data: {
        tipo: 'EDITAR',
        data: elemento,
      }
    });
  }

}
