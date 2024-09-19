import { Component, Inject } from '@angular/core';
import {  FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProdrestserviceService } from './../../services/prodrestservice.service';
import { lastValueFrom } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-adm-propiedad',
  standalone: false,
  templateUrl: './adm-propiedad.component.html',
  styleUrl: './adm-propiedad.component.css'
})
export class AdmPropiedadComponent {
  public formatos: any;

  public formPropiedad!: FormGroup;

  result: any;

  vPropiedad: any;
  listPropiedad: any[]=[];

  vTipopropiedad: any;
  listTipopropiedad: any[]=[];

  consultaservicio={
    opc:'PROPIEDAD'
  }

  constructor(
    public dialogRef: MatDialogRef<AdmPropiedadComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private ProdrestserviceService: ProdrestserviceService,
  ){}

  ngOnInit(): void {
    this.formPropiedad = this.formBuilder.group({
      id :[0],
      propiedad : ['',[Validators.required]],
      tipopropiedad: ['',[Validators.required]],
      activo : [1,[Validators.required]],
      tipopropiedades: this.formBuilder.array([], Validators.required),
    });

    this.cargarTipoPropiedadFormato();
     if (this.data.tipo === 'Crear'){ 
          this.formPropiedad.get('id_propiedad')?.setValue(this.data.id_propiedad);
     }else{
     
      this.cargarPropiedad();
    }
  }

  cargarPropiedad(){
    this.consultaservicio.opc = 'PROPIEDAD';

    this.ProdrestserviceService.getPropiedades(this.consultaservicio).subscribe((data: any) => {
    this.vPropiedad = data.body[0][0];

    this.formPropiedad.patchValue({
      id: this.vPropiedad.id,
      propiedad: this.vPropiedad.propiedad,
      tipopropiedad: this.vPropiedad.tipopropiedad,
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

  regresar() {
    this.dialogRef.close(this.result);
  }

  async guardarPropiedad(){
    try {
      console.log(this.formPropiedad.value);
      const propiedad = await lastValueFrom(this.ProdrestserviceService.crearPropiedades(this.formPropiedad.value));
      this.result = propiedad.body;
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
    const tipopropiedadesArray: FormArray = this.formPropiedad.get('tipopropiedades') as FormArray;
    if (event.target.checked) {
      tipopropiedadesArray.push(this.formBuilder.control(event.target.value));
    } else {
      const index = tipopropiedadesArray.controls.findIndex(x => x.value === event.target.value);
      tipopropiedadesArray.removeAt(index);
    }
  }
}
