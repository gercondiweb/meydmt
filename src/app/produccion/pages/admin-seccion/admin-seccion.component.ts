import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProdrestserviceService } from './../../services/prodrestservice.service';
import { lastValueFrom } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { DataSharingService } from '@/app/dashboard/services';
import { LoadingService } from '@/app/shared/services/loading.service';

@Component({
  selector: 'app-admin-seccion',
  templateUrl: './admin-seccion.component.html',
  styleUrls: ['./admin-seccion.component.css']
})
export class AdminSeccionComponent implements OnInit {
  private readonly loadingServer = inject(LoadingService);

  public formSecciones!: FormGroup;
  accion: any;
  param1!: string;
  param2!: string;

  objetoData: any;
  result: any;

  public SeccionSeleccionada: number = 0;
  public idSeccion: any;

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

    this.formSecciones = this.formBuilder.group({
      id: [0],
      seccion: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      activo: [1, [Validators.required]]
    });

    if (this.accion === 'Editar') {
      this.cargarDatosSeccion();
    } else {
      this.formSecciones.get('id')?.setValue(0);
      this.SeccionSeleccionada = 0;
    }
  }

  cargarDatosSeccion() {
    this.param1 = this.dataSharingService.getParam1();
    this.param2 = this.dataSharingService.getParam2();
    this.objetoData = this.dataSharingService.getData();
    this.idSeccion = this.objetoData.data.Id;

    console.log(this.objetoData);

    this.formSecciones.patchValue({
      id: this.objetoData.data.id,
      seccion: this.objetoData.data.seccion,
      descripcion: this.objetoData.data.descripcion,
      activo: this.objetoData.data.Activo,
    });

    console.log(this.formSecciones.value);
  }

  regresar() {
    this.router.navigateByUrl('/produccion/secciones');
  }

  async guardarSeccion() {
    try {
      this.loadingServer.show();
      const seccion = await lastValueFrom(this.ProdrestserviceService.crearSeccion(this.formSecciones.value));

      this.SeccionSeleccionada = seccion.id;
      this.formSecciones.patchValue({
        id: seccion.id,
        seccion: seccion.seccion,
        descripcion: seccion.descripcion,
        ...this.formSecciones.value
      });

      this.dataSharingService.setParams(seccion.id, seccion.seccion, seccion);
      console.log({ seccion });
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
}
