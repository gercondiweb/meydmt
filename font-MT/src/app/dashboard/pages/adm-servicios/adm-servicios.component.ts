import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RestService } from '../../../dashboard/services/services/rest.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { lastValueFrom } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-adm-servicios',
  standalone: false,
  templateUrl: './adm-servicios.component.html',
  styleUrl: './adm-servicios.component.css'
})
export class AdmServiciosComponent {

  accion : any;
  titulo:any;

  response: any;

  public formServicio !: FormGroup;

  listServicios : any;
  lServicios: any[]=[];

  consultaSrv={
    opc:'SERV'
  }

  constructor(
    public dialogRef: MatDialogRef<AdmServiciosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private restService:RestService,
    private route: ActivatedRoute,
    private datePipe: DatePipe) {}

  ngOnInit(): void {


     this.cargarServicios();

     // Formateando la fecha
      const fechaIniFormateada = this.datePipe.transform(this.data.data.fechainicio, 'dd/MM/yyyy');
      const fechaFinFormateada = this.datePipe.transform(this.data.data.fechafin, 'dd/MM/yyyy');

     this.formServicio= this.formBuilder.group({
      opc:[''],
      id : ['0',[Validators.required]],
      id_contrato : ['',[Validators.required]],
      id_servicio : ['',[Validators.required]],
      fechainicio : [fechaIniFormateada],
      fechafin : [fechaFinFormateada],
      ans : [0, [Validators.required]],
      vhh : [0, [Validators.required]],
      activo:[0,[Validators.required]]
    });

    if(this.data.tipo === 'Editar'){
      this.titulo = 'Editar Servicio';
      this.cargarDatosServicio();
    }else{
      this.titulo = 'Agregar Servicio';
      this.cargarDatosContrato();


    }

  }

  formatDate(isoDate: string): string {
    const date = new Date(isoDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }


  cargarDatosContrato(){

    this.formServicio.patchValue({
      id_contrato : this.data.data.data.CONTRATO,
      fechainicio : this.formatDate(this.data.data.data.FECHAINICIO),
      fechafin : this.formatDate(this.data.data.data.FECHAFIN)
    })

  }

  cargarDatosServicio(){



    this.formServicio.patchValue({
      id: this.data.data.Id,
      id_contrato : this.data.data.IDCONTRATO,
      id_servicio : this.data.data.id_servicio,
      fechainicio : this.formatDate(this.data.data.fechainicio),
      fechafin : this.formatDate(this.data.data.fechafin),
      ans : this.data.data.ans,
      vhh : this.data.data.vhh,
      activo:this.data.data.activo
    });

    console.log(this.formServicio.value)
  }

  cargarServicios(){
    this.restService.getMaestros(this.consultaSrv).subscribe((datacs: any) => {
      this.listServicios = datacs;
      this.lServicios = this.listServicios.body[0];

    });
  }

  cancelar() {
    this.dialogRef.close(this.formServicio.value);
  }

  async guardarServCont(){

    //Guardar Servicios Contrato
    if(this.formServicio.get('id')?.value === 0){
      this.formServicio.get('activo')?.setValue('1');
    }

    try{

      //console.log(this.formContrato.value)
      const res = await lastValueFrom(this.restService.serviciosContratos(this.formServicio.value));

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
    this.cancelar();

  }



}
