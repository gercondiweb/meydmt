import { Component, Inject, OnInit} from '@angular/core';
import { FormBuilder, FormControl,FormGroup,Validators} from '@angular/forms';
import { RestService } from '../../../dashboard/services/services/rest.service';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { lastValueFrom } from 'rxjs';
import Swal from 'sweetalert2';

interface Prioridad {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-modal-form',
  templateUrl: './modal-form.component.html',
  styleUrl: './modal-form.component.css'
})
export class ModalFormComponent implements OnInit{

  listTiposServ: any;
  tipoServ:any[]=[];

  listServ: any;
  servicios:any[]=[];

  listTecnicos: any;
  tecnicos:any[]=[];

  prioridad: Prioridad[] = [
    {value: 'ALTA', viewValue:'ALTA'},
    {value:'NORMAL', viewValue:'NORMAL'},
    {value: 'BAJA', viewValue:'BAJA'},
  ];

  datosConsulta ={
    opc: ''
  }

  datosTkt = {
    opc: 'UTC',
    id_tkt : null,
    id_tecnico : null
  }

  public response:any;

  public formAsignar!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ModalFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private RestService:RestService) {}

  ngOnInit():void {

    this.formAsignar = this.formBuilder.group({
       id : [{value:'', disabled:this.data.tipo==='Crear'},Validators.required],
       fecha : ['',[Validators.required]],
       hora: ['',[Validators.required]],
       tiposervicio: ['',[Validators.required]],
       servicio: ['',[Validators.required]],
       descripcion: ['',[Validators.required]],
       id_tecnico: ['',[Validators.required]],
       estado: ['',[Validators.required]],
       prioridad: ['',[Validators.required]],
       sucursal:[''],
       id_cliente:['']
    });

    this.cargarMaestros();

    if (this.data.tipo == 'EDITAR'){
      this.cargarDatos();
    }else{

      this.formAsignar.get('id')?.setValue('NUEVO');

    }
  }

  cancelar() {
    this.dialogRef.close();
  }

  async grabar(){
    if (this.data.tipo == 'Crear'){ //------------ Crear Tiket ---------------------------

      this.formAsignar.get('id')?.setValue('0');
      // TODO: hacer el procedimiento para capturar el la empresa del usuario conectado
      this.formAsignar.get('id_cliente')?.setValue('1');


      try{
        const res = await lastValueFrom(this.RestService.crearTkt(this.formAsignar.value));
        this.response = res;
        if(!this.response.error){
          await Swal.fire({
            position: "top-end",
            icon: "success",
            title: this.response.body,
            showConfirmButton: false,
            timer: 1500
          });
          this.dialogRef.close();
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

    }else{ //------------ Asignar Tecnico ---------------------------

      this.datosTkt.id_tkt = this.data.data.id;
      this.datosTkt.id_tecnico = this.formAsignar.value.id_tecnico;
      console.log(this.datosTkt)
      try{
        const res = await lastValueFrom(this.RestService.asignarTecnicoTkt(this.datosTkt));
        this.response = res;
        if(!this.response.error){
          await Swal.fire({
            position: "top-end",
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
    this.dialogRef.close();
  }

  cargarDatos(){
    console.log(this.data)
      this.formAsignar.patchValue({
        id: this.data.data.id,
        fecha: this.data.data.fecha,
        hora: this.data.data.hora,
        tiposervicio: this.data.data.TIPOSERVICIO,
        servicio: this.data.data.DESCRIPCION,
        descripcion: this.data.data.DetalleTKT,
        id_tecnico: this.data.data.id_tecnico,
        estado: this.data.data.estado,
        prioridad: this.data.data.prioridad
      });
  }

  cargarMaestros(){

    this.datosConsulta.opc = 'TSRV';
    this.RestService.getMaestros(this.datosConsulta).subscribe(respuesta=>{
      this.listTiposServ=respuesta;
      this.tipoServ=this.listTiposServ.body[0];
      })
    console.log(this.tipoServ)

    this.datosConsulta.opc = 'SERV';
    this.RestService.getMaestros(this.datosConsulta).subscribe(respuesta2=>{
      this.listServ=respuesta2;
      this.servicios=this.listServ.body[0];
      })
    console.log(this.servicios)

    this.datosConsulta.opc = 'TCN';
    this.RestService.getMaestros(this.datosConsulta).subscribe(respuesta3=>{
      this.listTecnicos=respuesta3;
      this.tecnicos=this.listTecnicos.body[0];
      })
    console.log(this.tecnicos)
  }


}
