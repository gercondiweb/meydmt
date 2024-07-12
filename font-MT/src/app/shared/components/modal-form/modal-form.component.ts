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

  tiketSeleccionado: any;

  listTiposServ: any;
  tipoServ:any[]=[];

  listServ: any;
  servicios:any[]=[];

  listTecnicos: any;
  tecnicos:any[]=[];

  listClientes: any;
  clientes:any[]=[];

  listTipoTiket: any;
  tipoTiket:any[]=[];

  prioridad: Prioridad[] = [
    {value: 'ALTA', viewValue:'ALTA'},
    {value:'NORMAL', viewValue:'NORMAL'},
    {value: 'BAJA', viewValue:'BAJA'},
  ];

  datosBusquedaMaestro={
    opc:''
  }

  datosTkt = {
    opc: 'UTC',
    id_tkt : 0,
    id_tecnico : 0
  }

  public response:any;

  public formAsignar!: FormGroup;

  formattedDate!: string;

  constructor(
    public dialogRef: MatDialogRef<ModalFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private RestService:RestService) {}

  ngOnInit():void {

    this.formAsignar = this.formBuilder.group({
       opc:[''],
       id : [{value:'', disabled:this.data.tipo==='Crear'},Validators.required],
       fecha : ['',[Validators.required]],
       hora: ['',[Validators.required]],
       tiposervicio: ['',[Validators.required]],
       servicio: ['',[Validators.required]],
       descripcion: ['',[Validators.required]],
       id_tecnico: ['',[Validators.required]],
       estado: ['SOL',[Validators.required]],
       prioridad: ['',[Validators.required]],
       sucursal:[''],
       id_cliente:[''],
       cliente:[''],
       tipo_tiket:[0]
    });

    this.cargarMaestros();

    if (this.data.tipo === 'EDITAR'){
      this.formAsignar.controls['id_cliente'].disable();
      this.cargarDatos();
    }else{

      this.formAsignar.get('id')?.setValue('NUEVO');

    }

    this.formattedDate = this.formatDate(this.data.data.fecha);
  }

  cancelar() {
    this.dialogRef.close();
  }

  async grabar(){

    console.log(this.data.tipo)

    if (this.data.tipo === 'Crear'){ //------------ Crear Tiket ---------------------------
      this.formAsignar.get('opc')?.setValue('NEW');
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

      this.datosTkt.id_tkt = this.data.data.Id;
      this.datosTkt.id_tecnico = this.formAsignar.get('id_tecnico')?.value;
      console.log(this.data)
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
    this.tiketSeleccionado = this.data.data.Id;

    this.formAsignar.patchValue({
        id: this.data.data.Id,
        id_cliente:this.data.data.id_cliente,
        cliente:this.data.data.Cliente,
        fecha: this.data.data.Fecha.split('T')[0],
        hora: this.data.data.Hora,
        tiposervicio: this.data.data.Tipo,
        servicio: this.data.data.Descripcion,
        descripcion: this.data.data.DetalleTKT,
        id_tecnico: this.data.data.id_tecnico,
        estado: this.data.data.estado,
        prioridad: this.data.data.Prioridad
      });
  }

  cargarMaestros(){

    this.datosBusquedaMaestro.opc = 'TCN';
    this.RestService.getMaestros(this.datosBusquedaMaestro).subscribe(respuesta3=>{
      this.listTecnicos=respuesta3;
      this.tecnicos=this.listTecnicos.body[0];
      })

  }

  formatDate(isoDate: string): string {
    const date = new Date(isoDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

}
