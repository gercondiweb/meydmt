import { Component, Inject, OnInit, inject } from '@angular/core';
import {  FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ProdrestserviceService } from './../../services/prodrestservice.service';
import { lastValueFrom } from 'rxjs';
import { LoadingService } from '@/app/shared/services/loading.service';
import { DataSharingService } from '@/app/dashboard/services';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { INPUT_MODALITY_DETECTOR_DEFAULT_OPTIONS } from '@angular/cdk/a11y';

@Component({
  selector: 'app-adm-propiedad',

  templateUrl: './adm-propiedad.component.html',
  styleUrl: './adm-propiedad.component.css'
})
export class AdmPropiedadComponent  implements OnInit{
  private readonly loadingServer = inject(LoadingService);
  public formatos: any;

  public formPropiedad!: FormGroup;
  accion : any;
  param1!: string;
  param2!: string;

  objetoData: any;
  result: any;

  vPropiedad: any;
  listPropiedad: any[]=[];

  vTipopropiedad: any;
  listTipopropiedad: any[]=[];

  consultaservicio={
    opc:'PROPIEDAD'
  }
  public PropiedadSeleccionado : number = 0;
  public idPropiedad:any;


  constructor(
    private dataSharingService: DataSharingService,
    private router: Router,
    private route: ActivatedRoute,
    private  ProdrestserviceService : ProdrestserviceService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.accion = this.route.snapshot.paramMap.get('accion') || '';

    this.formPropiedad = this.formBuilder.group({
      id: [0],
      propiedad : ['',[Validators.required]],
      activo : [1,[Validators.required]],
      id_tipopropiedad: ['',[Validators.required]]
    });

    //console.log(this.accion)

    if(this.accion === "Editar"){

      this.cargarDatosFormato();
      this.formPropiedad.controls['propiedad'];
      this.formPropiedad.get('id')?.setValue(this.objetoData.data.id);
      this.PropiedadSeleccionado = this.objetoData.data.id;
      this.cargarTipoPropiedadFormato();

    }else{
      this.formPropiedad.get('id')?.setValue(0);
      this.PropiedadSeleccionado = 0;
    }

  }

  cargarDatosFormato(){
    this.param1 = this.dataSharingService.getParam1();
    this.param2 = this.dataSharingService.getParam2();
    this.objetoData = this.dataSharingService.getData();
    this.idPropiedad = this.objetoData.data.Id;

    console.log(this.objetoData)

    this.formPropiedad.patchValue({
      propiedad: this.objetoData.data.propiedad,
      activo: this.objetoData.data.Activo,
      id_tipopropiedad: this.objetoData.data.id_tipopropiedad
    });
    console.log(this.formPropiedad.value)
  }

  cargarPropiedad(){
    this.consultaservicio.opc = 'PROPIEDAD';

    this.ProdrestserviceService.getPropiedades(this.consultaservicio).subscribe((data: any) => {
    this.vPropiedad = data.body[0][0];

    this.formPropiedad.patchValue({
      id: this.vPropiedad.id,
      propiedad: this.vPropiedad.propiedad,
      id_tipopropiedad: this.vPropiedad.id_tipopropiedad,
      activo: this.vPropiedad.activo,
    });
 });
  }

  cargarTipoPropiedadFormato(){
    const   consultaservicio={
      opc:'TIPOPROPIE',
    }
    this.ProdrestserviceService.getTipoPropiedades(consultaservicio).subscribe(respuesta=>{
      this.vTipopropiedad = respuesta.body[0];
      this.listTipopropiedad  = this.vTipopropiedad;
      console.log('TIPOPROPIEDADES-CargarData');

      console.log(respuesta);
    })

  }

  regresar(){
    this.router.navigateByUrl('/produccion/propiedades');
  }

  async guardarPropiedad(){

    try{
  
    this.loadingServer.show();
      const propiedad = await lastValueFrom(this.ProdrestserviceService.crearPropiedades(this.formPropiedad.value));
  
        this.PropiedadSeleccionado = propiedad.id;
        this.formPropiedad.get('id')?.setValue( this.PropiedadSeleccionado );
        this.formPropiedad.get('propiedad');
        this.formPropiedad.patchValue({
          propiedad: propiedad.propiedad,
          id: propiedad.id,
          ...this.formPropiedad.value
        });
  
      this.dataSharingService.setParams(propiedad.id,propiedad.propiedad, propiedad);
  
      console.log( { propiedad });
      console.log( this.formPropiedad.value );
    }catch(e){
      console.log(e);
    }finally{
      this.loadingServer.hidden();
    }
  }

 
}
