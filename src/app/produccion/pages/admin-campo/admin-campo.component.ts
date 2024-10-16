import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ProdrestserviceService } from './../../services/prodrestservice.service';
import { lastValueFrom } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { DataSharingService } from '@/app/dashboard/services';
import { LoadingService } from '@/app/shared/services/loading.service';

@Component({
  selector: 'app-admin-campo',
  templateUrl: './admin-campo.component.html',
  styleUrls: ['./admin-campo.component.css']
})
export class AdminCampoComponent implements OnInit {
  private readonly loadingServer = inject(LoadingService);
  
  public formCampos!: FormGroup;
  accion: any;
  param1!: string;
  param2!: string;

  objetoData: any;
  result: any;

  vPropiedad: any;
  listPropiedades: any[] = [];

  public CampoSeleccionado: number = 0;
  public idCampo: any;

  constructor(
    private dataSharingService: DataSharingService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private ProdrestserviceService: ProdrestserviceService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.accion = this.route.snapshot.paramMap.get('accion') || '';

    this.formCampos = this.formBuilder.group({
      id: [0],
      nombrecampo: ['', [Validators.required]],
      activo: [1, [Validators.required]],
      propiedades: this.formBuilder.array([], Validators.required)
    });

    this.cargarPropiedadFormato();

    if (this.accion === 'Editar') {
        this.cargarDatosCampo();
      
    } else {
        this.formCampos.get('id')?.setValue(0);
      
        
    }
  }

  cargarDatosCampo() {
    this.param1 = this.dataSharingService.getParam1();
    this.param2 = this.dataSharingService.getParam2();
    this.objetoData = this.dataSharingService.getData();

    this.idCampo = this.objetoData.data.Id;

    //console.log('objetoData',this.objetoData);

    this.formCampos.patchValue({
      id: this.objetoData.data.id,
      nombrecampo: this.objetoData.data.nombrecampo,
      activo: this.objetoData.data.activo
    });

    console.log(this.formCampos.value);
  }

  cargarPropiedadFormato() {
    const consultaservicio = {
      opc: 'PROPIEDAD',
    };
    this.ProdrestserviceService.getPropiedades(consultaservicio).subscribe(respuesta => {
      this.vPropiedad = respuesta.body[0];
      this.listPropiedades = this.vPropiedad;
      console.log('PROPIEDADES-CargarData', respuesta);
    });
  }

  regresar() {
    this.router.navigateByUrl('/produccion/campos');
  }

  async guardarCampo() {
    try {
      this.loadingServer.show();
      const campo = await lastValueFrom(this.ProdrestserviceService.crearCampos(this.formCampos.value));
      
      console.log('campo: ',campo)
      
      } catch (e: any) {
      console.error(e);
      await Swal.fire({
        position: 'center',
        icon: 'error',
        title: e.message,
        showConfirmButton: false,
        timer: 1500
      });
    } finally {
      this.loadingServer.hidden();
    }
    this.regresar();
  }

  onCheckboxChange(event: any, propiedad:any) {
    const propiedadesArray: FormArray = this.formCampos.get('propiedades') as FormArray;
    
    console.log('propiedad', propiedad);

    console.log('propiedadesArray', propiedadesArray.value);

    if (event.target.checked) {
      propiedadesArray.push(this.formBuilder.control(propiedad.id));
    } else {
      const index = propiedadesArray.controls.findIndex(x => x.value === propiedad.id);
      propiedadesArray.removeAt(index);
    }
  }
}
