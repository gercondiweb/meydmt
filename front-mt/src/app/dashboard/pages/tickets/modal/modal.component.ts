import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { RestService } from '../../../../dashboard/services/services/rest.service';
import { identity, lastValueFrom } from 'rxjs';
import Swal from 'sweetalert2';

interface Prioridad {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-modal',
  standalone: false,
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent implements OnInit {
  ticket: any;
  data: any;
  tiposServ: any;
  servControl: any;
  value = 'Clear me';

  datosBusquedaMaestro={
    opc:''
  }

  datosgrabar={
    opc:'NEW',
    id_tkt:0,
    fecha:'',
    hora:'',
    id_servicio:0,
    id_cliente: 0,
    descripcion:'',
    estado:'SOL',
    prioridad:'',
    id_tiposervicio: 0,
    id_tecnico: 0
  }

  prioridad: Prioridad[] = [
    {value: 'ALTA', viewValue:'ALTA'},
    {value:'NORMAL', viewValue:'NORMAL'},
    {value: 'BAJA', viewValue:'BAJA'},
  ];

  listTiposServ: any;
  tipoServ:any[]=[];

  listServ: any;
  servicios:any[]=[];

  listTecnicos: any;
  tecnicos:any[]=[];

  response:any;

  constructor (
    public dialogRef: MatDialogRef<ModalComponent>,
    private RestService:RestService
  ){}

  ngOnInit(){
     this.cargarMaestros();
  }

  cargarMaestros(){

    this.datosBusquedaMaestro.opc = 'TSRV';
    this.RestService.getMaestros(this.datosBusquedaMaestro).subscribe(respuesta=>{
      this.listTiposServ=respuesta;
      this.tiposServ=this.listTiposServ.body[0];
      })


    this.datosBusquedaMaestro.opc = 'SERV';
    this.RestService.getServicios(this.datosBusquedaMaestro).subscribe(respuesta2=>{
      this.listServ=respuesta2;
      this.servicios=this.listServ.body[0];
      })

    this.datosBusquedaMaestro.opc = 'TECN';
    this.RestService.getMaestros(this.datosBusquedaMaestro).subscribe(respuesta3=>{
      this.listTecnicos=respuesta3;
      this.tecnicos=this.listTecnicos.body[0];
      })

  }

  async grabar(){
    // TODO: hacer el procedimiento para capturar el la empresa del usuario conectado
    this.datosgrabar.id_cliente = 1;

    console.log(this.datosgrabar)
    try{
      const res = await lastValueFrom(this.RestService.crearTkt(this.datosgrabar));
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
  }

  cancelar(){
    this.dialogRef.close();
  }

}
