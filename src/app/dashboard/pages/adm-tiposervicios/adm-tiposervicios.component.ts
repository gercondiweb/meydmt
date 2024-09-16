import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RestService } from '../../services/services/rest.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { DataSharingService } from '../../services/services/data-sharing.service';
import { lastValueFrom } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-adm-tiposervicios',
  templateUrl: './adm-tiposervicios.component.html',
  styleUrl: './adm-tiposervicios.component.css'
})
export class AdmTiposerviciosComponent implements OnInit {

  formTipoServ : FormGroup;
  dataTS :any;
  accion :any;
  response: any;

  constructor(
    private formBuilder: FormBuilder,
    private restService:RestService,
    private route: ActivatedRoute,
    private datePipe: DatePipe,
    private router: Router,
    private dataSharingService: DataSharingService,
  ) { }

  ngOnInit(): void {
    this.formTipoServ = this.formBuilder.group({
      id : ['0',[Validators.required]],
      tiposervicio : ['',[Validators.required]],
      descripcion : [''],
      activo : [1]
    });

    this.accion = this.route.snapshot.paramMap.get('accion') || '';

    if(this.accion === "Editar"){
      this.cargarDatos();

    }else{
      this.formTipoServ.get('id')?.setValue(0);
    }
    
  }

  cargarDatos(){

    this.dataTS = this.dataSharingService.getData();


    console.log('DATOS',this.dataTS)

    this.formTipoServ.patchValue({
      id : this.dataTS.data.id_tiposervicio,
      tiposervicio : this.dataTS.data.TIPOSERVICIO,
      descripcion : this.dataTS.data.DESCRIPCION,
      activo : this.dataTS.data.activo
    });

  }

  async guardarTS(){

    try{
      const res = await lastValueFrom(this.restService.crearTipoServicio(this.formTipoServ.value));

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
      this.regresar();
      
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

  regresar(){
    this.router.navigateByUrl('/dashboard/tiposservicios');
  }
}
