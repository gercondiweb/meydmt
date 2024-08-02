import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RestService } from '../../services';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import Swal from 'sweetalert2';
import { DataSharingService } from '../../services/services/data-sharing.service';

@Component({
  selector: 'app-adm-masterservicios',
  templateUrl: './adm-masterservicios.component.html',
  styleUrl: './adm-masterservicios.component.css'
})
export class AdmMasterserviciosComponent implements OnInit{

  public formServicios !: FormGroup;

  response:any;
  accion:any;
  objetoData: any;

  listTipoServicios: any;
  vTipoServicio: any[]=[];

  datosConsulta = {
    opc:'TSRV'
  };

  constructor(
    private formBuilder: FormBuilder,
    private resService: RestService,
    private route: ActivatedRoute,
    private router:Router,
    private dataSharingService: DataSharingService,
  ) { }

  ngOnInit(): void {

    this.cargarTipoServicio();

    this.formServicios = this.formBuilder.group({
      id: [0],
      descripcion: [''],
      observaciones: [''],
      id_tiposervicio: [0],
      activo: [0]
    });

    this.accion = this.route.snapshot.paramMap.get('accion') || '';
    if(this.accion === 'Editar'){
      this.llenarDatosServicio();
    }

  }

  cargarTipoServicio() {

    this.resService.getMaestros(this.datosConsulta).subscribe(respuesta=>{
        this.listTipoServicios = respuesta;
        this.vTipoServicio = this.listTipoServicios.body[0];
    });
  }

  llenarDatosServicio(){
    this.objetoData = this.dataSharingService.getData();

    this.formServicios.patchValue({
      id: this.objetoData.data.id,
      descripcion: this.objetoData.data.Descripcion,
      observaciones: this.objetoData.data.observaciones,
      id_tiposervicio: this.objetoData.data.id_tiposervicio,
      activo: this.objetoData.data.activo
    });
  }

  regresar(){
    this.router.navigateByUrl('/dashboard/masterservicios');
  }

  async guardarServicio(){
    try{
      //console.log(this.formCliente.value)
      const res = await lastValueFrom(this.resService.createServicios(this.formServicios.value));


      this.formServicios.get('id')?.setValue(res.insertId);
      this.formServicios.get('id')?.enabled;

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
  }
}
