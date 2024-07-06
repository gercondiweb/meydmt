import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RestService } from '../../../dashboard/services/services/rest.service';
import { lastValueFrom } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-adm-especialidad',
  templateUrl: './adm-especialidad.component.html',
  styleUrl: './adm-especialidad.component.css'
})
export class AdmEspecialidadComponent implements OnInit{

  response : any;

  public formEspecialidades!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AdmEspecialidadComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private RestService:RestService,
  ){}

  ngOnInit(): void {
    this.formEspecialidades= this.formBuilder.group({
        id: [0],
        nombre:['',Validators.minLength(3), Validators.required],
        descripcion:[''],
        activo:[0]

    });
  }

  async guardarEspecialidad(){

    //Guardar Especialidad Tecnico
    if(this.formEspecialidades.get('id')?.value === 0){
      this.formEspecialidades.get('activo')?.setValue('1');
    }

    try{

      //console.log(this.formContrato.value)
      const res = await lastValueFrom(this.RestService.serviciosContratos(this.formEspecialidades.value));

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

    //Cerramos el dialogo
    this.regresar();

  }

  regresar() {
    this.dialogRef.close();
  }

}
