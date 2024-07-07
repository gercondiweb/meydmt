import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RestService } from '../../services/services/rest.service';
import { DataSharingService } from '../../services/services/data-sharing.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { lastValueFrom } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tecnico-especialidad',
  templateUrl: './tecnico-especialidad.component.html',
  styleUrl: './tecnico-especialidad.component.css'
})
export class TecnicoEspecialidadComponent implements OnInit{
  formTecEsp !: FormGroup;

  listEspecialidades: any;
  vEspecialidad: any[]=[];

  response : any;
  objetoData : any;

  consulta={
    opc:'ESPC'
  };

  constructor(  public dialogRef: MatDialogRef<TecnicoEspecialidadComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any,
                private formBuilder: FormBuilder,
                private restService:RestService,
                private dataSharingService: DataSharingService,
  ) { }

  ngOnInit(): void {
      this.cargarEspecialidades();

      this.formTecEsp= this.formBuilder.group({
        id: [0],
        id_tecnico: [0],
        id_especialidad: [0],
        fechaemision:['2024-07-01'],
        fechavencimiento:['2024-12-31'],
        observaciones:[''],
        activo:[1]

    });
  }

  cargarEspecialidades(){

    this.restService.getMaestros(this.consulta).subscribe(respuesta=>{
      this.listEspecialidades=respuesta;
      this.vEspecialidad=this.listEspecialidades.body[0];
      })
  }

  async guardarEspecialidad(){
    //TODO: validar si el tecnico esta recien creado, que no haga la consulta al servicio de datos compartidos

    this.objetoData = this.dataSharingService.getData();
    //console.log(this.objetoData);
    this.formTecEsp.get('id_tecnico')?.setValue(this.objetoData.data.id);

    console.log(this.formTecEsp.value)

    try{

      //console.log(this.formCliente.value)
      const res = await lastValueFrom(this.restService.saveEspTecnico (this.formTecEsp.value));

      //this.clienteCreado = res.insertId;

      //console.log(res)
      this.response = res;
      if(!this.response.error){
        await Swal.fire({
          position: "center",
          icon: "success",
          title: this.response.body + ' - ' +  res.insertId,
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
    this.regresar();
  }

  regresar(){
    this.dialogRef.close();
  }

}
