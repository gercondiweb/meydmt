import { Component, Inject, OnInit, inject } from '@angular/core';
import {  FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProdrestserviceService } from './../../services/prodrestservice.service';
import { lastValueFrom } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DataSharingService } from '@/app/dashboard/services';
import { LoadingService } from '@/app/shared/services/loading.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-adm-tipopropiedad',
  standalone: false,
  templateUrl: './adm-tipopropiedad.component.html',
  styleUrl: './adm-tipopropiedad.component.css'
})
export class AdmTipopropiedadComponent implements OnInit {
  private readonly loadingServer = inject(LoadingService);
  public formatos: any;

  public formTipoPropiedad!: FormGroup;

  accion : any;
  param1!: string;
  param2!: string;

  objetoData: any;
  result: any;

  vTipopropiedad: any;
  listTipopropiedad: any[]=[];

  consultaservicio={
    opc:'TIPOPROPIE'
  }

  public TipoPropiedadSeleccionado : number = 0;
  public idTipoPropiedad:any;

  constructor(
    private dataSharingService: DataSharingService,
    private router: Router,
    private route: ActivatedRoute,
    private  ProdrestserviceService : ProdrestserviceService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog){}

  ngOnInit(): void {
    this.accion = this.route.snapshot.paramMap.get('accion') || '';

    this.formTipoPropiedad = this.formBuilder.group({
      id: [0],
      tipopropiedad : ['',[Validators.required]],
      activo : [1,[Validators.required]]
    });

    //console.log(this.accion)

    if(this.accion === "Editar"){

      this.cargarDatosFormato();
      this.formTipoPropiedad.controls['propiedad'];
      this.formTipoPropiedad.get('id')?.setValue(this.objetoData.data.id);
      this.TipoPropiedadSeleccionado = this.objetoData.data.id;

    }else{
      this.formTipoPropiedad.get('id')?.setValue(0);
      this.TipoPropiedadSeleccionado = 0;
    }

  }

  cargarDatosFormato(){
    this.param1 = this.dataSharingService.getParam1();
    this.param2 = this.dataSharingService.getParam2();
    this.objetoData = this.dataSharingService.getData();
    this.idTipoPropiedad = this.objetoData.data.Id;

    console.log(this.objetoData)

    this.formTipoPropiedad.patchValue({
      id: this.objetoData.data.id,
      tipopropiedad: this.objetoData.data.tipopropiedad,
      activo: this.objetoData.data.Activo
    });
    console.log(this.formTipoPropiedad.value)
  }

  cargarPropiedad(){
    this.consultaservicio.opc = 'PROPIEDAD';

    this.ProdrestserviceService.getPropiedades(this.consultaservicio).subscribe((data: any) => {
    this.vTipopropiedad = data.body[0][0];

    this.formTipoPropiedad.patchValue({
      id: this.vTipopropiedad.id,
      propiedad: this.vTipopropiedad.propiedad,
      tipopropiedad: this.vTipopropiedad.tipopropiedad,
      activo: this.vTipopropiedad.activo,
    });
 });
  }

  regresar() {
    this.router.navigateByUrl('/produccion/tipopropiedades');
  }

  async guardarTipoPropiedad(){
    try {
        this.loadingServer.show();
          const tipopropiedad = await lastValueFrom(this.ProdrestserviceService.crearTipoPropiedades(this.formTipoPropiedad.value));
      
            this.TipoPropiedadSeleccionado = tipopropiedad.id;
            this.formTipoPropiedad.get('id')?.setValue( this.TipoPropiedadSeleccionado );
            this.formTipoPropiedad.get('tipopropiedad');
            this.formTipoPropiedad.patchValue({
              tipopropiedad: tipopropiedad.tipopropiedad,
              id: tipopropiedad.id,
              ...this.formTipoPropiedad.value
            });
      
          this.dataSharingService.setParams(tipopropiedad.id,tipopropiedad.tipopropiedad, tipopropiedad);
      
          console.log( { tipopropiedad });
          console.log( this.formTipoPropiedad.value );
        }catch(e){
          console.log(e);
        }finally{
          this.loadingServer.hidden();
        }
  }
}
