import { Campo } from './../adm-produccion/adm-produccion.component';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProdrestserviceService } from './../../services/prodrestservice.service';
import { lastValueFrom } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-adm-campos',
  standalone: false,
  templateUrl: './adm-campos.component.html',
  styleUrl: './adm-campos.component.css'
})
export class AdmCamposComponent {
  public formatos: any;
  public formCampos!: FormGroup;

  result: any;
  vCampo: any;
  listCampos: any[] = [];

  vPropiedad: any;
  listPropiedades: any[] = [];

  campoformato = {
    opc: 'CAMPOPROP'
  };

  constructor(
    public dialogRef: MatDialogRef<AdmCamposComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private ProdrestserviceService: ProdrestserviceService,
  ) { }

  ngOnInit(): void {
    this.formCampos = this.formBuilder.group({
      id: [0],
      nombrecampo: ['', [Validators.required]],
      activo: [1, [Validators.required]],
      propiedades: this.formBuilder.array([], Validators.required),
    });
    this.cargarPropiedadFormato();

    if (this.data.tipo === 'Crear') {
      this.formCampos.get('id_campo')?.setValue(this.data.idCampo);
    } else {
      this.cargarCampo();
    }
  }

  cargarCampo() {
    this.campoformato.opc = 'CAMPOPROP';

    this.ProdrestserviceService.getMaestros(this.campoformato).subscribe((data: any) => {
      this.vCampo = data.body[0][0];

      this.formCampos.patchValue({
        id: this.vCampo.id,
        nombrecampo: this.vCampo.nombrecampo,
        activo: this.vCampo.activo,
      });
    });
  }

  cargarPropiedadFormato() {
    const consultaservicio = {
      opc: 'PROPIEDAD',
    };
    this.ProdrestserviceService.getPropiedades(consultaservicio).subscribe(respuesta => {
      this.vPropiedad = respuesta.body[0];
      this.listPropiedades = this.vPropiedad;
      console.log('PROPIEDADES-CargarData');
      console.log(respuesta);
    });
  }

  regresar() {
    this.dialogRef.close(this.result);
  }

  async guardarCampo() {
    try {
      console.log(this.formCampos.value);
      const campo = await lastValueFrom(this.ProdrestserviceService.crearCampos(this.formCampos.value));
      this.result = campo.body;
    } catch (e: any) {
      console.log(e);
      await Swal.fire({
        position: "center",
        icon: "error",
        title: e.message,
        showConfirmButton: false,
        timer: 1500
      });
    }
    this.regresar();
  }

  onCheckboxChange(event: any) {
    const propiedadesArray: FormArray = this.formCampos.get('propiedades') as FormArray;
    if (event.target.checked) {
      propiedadesArray.push(this.formBuilder.control(event.target.value));
    } else {
      const index = propiedadesArray.controls.findIndex(x => x.value === event.target.value);
      propiedadesArray.removeAt(index);
    }
  }
}
