import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RestService } from '../../services/rest.service';
import { DataSharingService } from '@/app/dashboard/services';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-modaltarifa',
  templateUrl: './modaltarifa.component.html',
  styleUrl: './modaltarifa.component.css'
})
export class ModaltarifaComponent implements OnInit{
  frmTarifa : FormGroup;

  listTipoTarifas: any;
  listZonas: any;
  listTipoVehiculos: any;

  datosConsulta={
    opc:'',
    vID:0
  }

  result: any;

  constructor(
     private fb: FormBuilder,
     private restService: RestService,
     private dataSharingService: DataSharingService,
     public dialogRef: MatDialogRef<ModaltarifaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
     
  ) { }
  ngOnInit(): void {
    
    this.frmTarifa = this.fb.group({
      id: [this.data.id],
      codigo: [this.data.codigo],
      id_tipotarifa: [this.data.tipo],
      id_tipovehiculo: [this.data.vehiculo],
      capacidad: [this.data.capacidad],
      origen: [this.data.origen],
      id_zona: [this.data.zona],
      valor: [this.data.valor],
      costo: [this.data.costo] 
    });

    this.cargarMaestros();
  }

  cargarMaestros(){
    this.datosConsulta.opc='TIPOTAR';
    this.restService.getMaestros(this.datosConsulta).subscribe(respuesta=>{
      this.listTipoTarifas=respuesta.body[0];
    });

    this.datosConsulta.opc='ZONA';
    this.restService.getMaestros(this.datosConsulta).subscribe(respuesta=>{
      this.listZonas=respuesta.body[0];
    });

    this.datosConsulta.opc='TIPOVEHI';
    this.restService.getMaestros(this.datosConsulta).subscribe(respuesta=>{
      this.listTipoVehiculos=respuesta.body[0];
    });
  }

  regresar() {
    this.dialogRef.close(this.result);
  }

  async guardarTarifa(){
    try{
      const tarifa = await lastValueFrom(this.restService.getTarifas(this.frmTarifa.value));
      this.result = tarifa.body;

    }catch( e:any ){
      console.log(e);
      await Swal.fire({
        position: "center",
        icon: "error",
        title: e.message,
        showConfirmButton: false,
        timer: 1500
      });
  
    }
    this.regresar();
  }

}
