import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RestService } from '../../services/services/rest.service';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { SelectionModel } from '@angular/cdk/collections';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import Swal from 'sweetalert2';

export interface InfoTecnico {
  id: number;
  foto: string;
  numerodocumento: number;
  nombre: string;
  telefono: string;
}

@Component({
  selector: 'app-adm-tecnicocontrato',
  standalone: false,
  templateUrl: './adm-tecnicocontrato.component.html',
  styleUrl: './adm-tecnicocontrato.component.css'
})
export class AdmTecnicocontratoComponent implements OnInit{
  titulo: string = 'Agregar Tecnicos al Contrato';

  colTecnicos:string[] = ['foto','numerodocumento','nombre','telefono'];
  lTecnicos:any;
  dsTecnicos:  any[]=[];

  response: any;

  public formTecnicoContrato !: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AdmTecnicocontratoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private restService:RestService,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.cargarTecnicos();

    this.formTecnicoContrato= this.formBuilder.group({
          opc:[''],
          id : [0,[Validators.required]],
          id_contrato : ['',[Validators.required]],
          id_tecnico : ['',[Validators.required]],
          activo : [0]
    })
  }

  consultaTec = {
    opc : 'TCN'
  }

  cargarTecnicos() {
    this.restService.getMaestros(this.consultaTec).subscribe((respuesta:any)=>{
    this.lTecnicos = respuesta;
    this.dsTecnicos = this.lTecnicos.body[0];

    this.formTecnicoContrato.get('id_contrato')?.setValue(this.data.data.CONTRATO);
    this.formTecnicoContrato.get('id_contrato')?.disable();

    //console.log( this.dsTecnicos)

  });

  }

  cancelar() {
    this.dialogRef.close();
  }

  async guardarTecnicoCont(){
    //Guardar Servicios Contrato
    if(this.formTecnicoContrato.get('id')?.value == ''){
      this.formTecnicoContrato.get('activo')?.setValue('1');
    }

    this.formTecnicoContrato.get('opc')?.setValue('ADD');

    try{

      //console.log(this.formContrato.value)
      const res = await lastValueFrom(this.restService.
                        tecnicosContratos(this.formTecnicoContrato.value));

      //console.log(res)
      this.response = res;
      if(!this.response.error){
        await Swal.fire({
          position: "center",
          icon: "success",
          title: this.response.body,
          showConfirmButton: false,
          timer: 1500
        });

      }
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

  }

}
